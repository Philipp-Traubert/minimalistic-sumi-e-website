import { defineConfig, splitVendorChunkPlugin, loadEnv } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';

// ─── Dev-server plugin: handles /api/google-reviews locally ──────────────────
//
// In production (Vercel) the same logic lives in api/google-reviews.ts.
// Here we mirror it as a Vite Connect middleware so `npm run dev` returns
// real reviews without needing `vercel dev`.
// ─────────────────────────────────────────────────────────────────────────────
function devGoogleReviewsPlugin(env: Record<string, string>): Plugin {
  // Simple in-memory cache that matches the serverless function's behaviour
  let cache: { data: unknown; timestamp: number } | null = null;
  const CACHE_TTL = 3_600_000; // 1 hour

  return {
    name: 'dev-google-reviews',
    apply: 'serve', // development only – never included in the build

    configureServer(server) {
      server.middlewares.use(
        '/api/google-reviews',
        async (req: IncomingMessage, res: ServerResponse) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
          res.setHeader('Content-Type', 'application/json');

          if (req.method === 'OPTIONS') {
            res.statusCode = 200;
            res.end();
            return;
          }

          // ── Serve from cache if still fresh ───────────────────────────────
          const now = Date.now();
          if (cache && now - cache.timestamp < CACHE_TTL) {
            res.statusCode = 200;
            res.end(JSON.stringify(cache.data));
            return;
          }

          const placeId = env.GOOGLE_PLACE_ID;
          const apiKey = env.GOOGLE_PLACES_API_KEY;
          const businessName = env.GOOGLE_BUSINESS_NAME ?? 'loslasszen Körperarbeit';

          if (!apiKey) {
            res.statusCode = 500;
            res.end(
              JSON.stringify({ error: 'Missing GOOGLE_PLACES_API_KEY in .env' }),
            );
            return;
          }

          type RawReview = {
            authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
            text?: { text?: string };
            rating?: number;
            relativePublishTimeDescription?: string;
            publishTime?: string;
          };

          type PlaceData = {
            error?: unknown;
            rating?: number;
            userRatingCount?: number;
            reviews?: RawReview[];
          };

          const FIELD_MASK = 'id,displayName,rating,userRatingCount,reviews';

          function normalise(place: PlaceData) {
            const reviews = (place.reviews ?? []).map((r, i) => ({
              author_name: r.authorAttribution?.displayName ?? 'Unbekannt',
              profile_photo_url: r.authorAttribution?.photoUri,
              author_url: r.authorAttribution?.uri,
              rating: r.rating ?? 5,
              text: r.text?.text ?? '',
              relative_time_description: r.relativePublishTimeDescription ?? '',
              time: r.publishTime
                ? Math.floor(new Date(r.publishTime).getTime() / 1000)
                : Math.floor(Date.now() / 1000) - i * 86_400,
            }));
            return {
              platform: 'google',
              averageRating: place.rating ?? null,
              totalReviews: place.userRatingCount ?? reviews.length,
              reviews,
              fetchedAt: new Date().toISOString(),
            };
          }

          function sendPayload(payload: ReturnType<typeof normalise>) {
            cache = { data: payload, timestamp: now };
            res.statusCode = 200;
            res.end(JSON.stringify(payload));
          }

          try {
            // ── 1. Places API (New) – fetch by Place ID ────────────────────
            if (placeId) {
              const r = await fetch(
                `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
                {
                  headers: {
                    'X-Goog-Api-Key': apiKey,
                    'X-Goog-FieldMask': FIELD_MASK,
                    'Accept-Language': 'de',
                  },
                },
              );
              if (r.ok) {
                const data = (await r.json()) as PlaceData;
                if (!data.error) {
                  sendPayload(normalise(data));
                  return;
                }
              }
            }

            // ── 2. Places API (New) – text search fallback ─────────────────
            {
              const r = await fetch(
                'https://places.googleapis.com/v1/places:searchText',
                {
                  method: 'POST',
                  headers: {
                    'X-Goog-Api-Key': apiKey,
                    'X-Goog-FieldMask': `places.${FIELD_MASK}`,
                    'Content-Type': 'application/json',
                    'Accept-Language': 'de',
                  },
                  body: JSON.stringify({ textQuery: businessName, languageCode: 'de' }),
                },
              );
              if (r.ok) {
                const data = (await r.json()) as { places?: PlaceData[] };
                const place = data.places?.[0];
                if (place) {
                  sendPayload(normalise(place));
                  return;
                }
              }
            }

            // ── 3. Legacy Places API fallback ──────────────────────────────
            if (placeId) {
              const url = new URL(
                'https://maps.googleapis.com/maps/api/place/details/json',
              );
              url.searchParams.set('place_id', placeId);
              url.searchParams.set('fields', 'name,rating,user_ratings_total,reviews');
              url.searchParams.set('key', apiKey);
              url.searchParams.set('language', 'de');

              const r = await fetch(url.toString());
              const data = (await r.json()) as {
                status?: string;
                result?: {
                  rating?: number;
                  user_ratings_total?: number;
                  reviews?: unknown[];
                };
              };

              if (data.status === 'OK') {
                const payload = {
                  platform: 'google',
                  averageRating: data.result?.rating ?? null,
                  totalReviews: data.result?.user_ratings_total ?? 0,
                  reviews: data.result?.reviews ?? [],
                  fetchedAt: new Date().toISOString(),
                };
                cache = { data: payload, timestamp: now };
                res.statusCode = 200;
                res.end(JSON.stringify(payload));
                return;
              }
            }

            throw new Error(
              'Could not find business via any Google Places API method',
            );
          } catch (err) {
            console.error('[dev-google-reviews] Error:', err);
            res.statusCode = 500;
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : 'Failed to fetch reviews',
              }),
            );
          }
        },
      );
    },
  };
}

// ─── Vite config ──────────────────────────────────────────────────────────────
export default defineConfig(({ mode }) => {
  // Load ALL env vars (no prefix restriction) so non-VITE_ keys are accessible
  // inside the dev-server plugin.  These are NOT forwarded to the browser.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), splitVendorChunkPlugin(), devGoogleReviewsPlugin(env)],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/b67594e9b3c439245fdadadaacf25076d0420eda.png': path.resolve(__dirname, './src/assets/b67594e9b3c439245fdadadaacf25076d0420eda.png'),
        'figma:asset/8cfb0e5f0d316e68bd46ca0ec126ba3f6183d08a.png': path.resolve(__dirname, './src/assets/8cfb0e5f0d316e68bd46ca0ec126ba3f6183d08a.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      target: 'esnext',
      outDir: 'dist'
    },
    server: {
      port: 3000,
      open: true
    }
  };
});
