/**
 * Serverless function to fetch Facebook Page Recommendations / Reviews.
 *
 * Deploy targets:
 *   - Vercel:  works out of the box (files in /api are auto-deployed)
 *   - Netlify: move to netlify/functions/facebook-reviews.ts and adjust handler
 *
 * Required environment variables:
 *   FACEBOOK_PAGE_ID       – numeric page ID from Facebook
 *   FACEBOOK_ACCESS_TOKEN  – long-lived Page Access Token
 */

// ─── In-memory cache ────────────────────────────────────────────────────────
let cache: { data: unknown; timestamp: number } | null = null;
const CACHE_TTL = 3_600_000; // 1 hour

export default async function handler(
  req: { method?: string },
  res: {
    status: (code: number) => {
      json: (body: unknown) => void;
      end: () => void;
    };
    setHeader: (key: string, value: string) => void;
  },
) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return cached data if fresh
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return res.status(200).json(cache.data);
  }

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!pageId || !accessToken) {
    return res.status(500).json({ error: 'Missing FACEBOOK_PAGE_ID or FACEBOOK_ACCESS_TOKEN env vars' });
  }

  try {
    const url = new URL(`https://graph.facebook.com/v19.0/${pageId}/ratings`);
    url.searchParams.set(
      'fields',
      'reviewer{name,picture},created_time,rating,review_text,recommendation_type',
    );
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'Facebook API error');
    }

    const payload = {
      platform: 'facebook',
      reviews: data.data ?? [],
      fetchedAt: new Date().toISOString(),
    };

    // Update cache
    cache = { data: payload, timestamp: now };

    return res.status(200).json(payload);
  } catch (err: unknown) {
    console.error('Error fetching Facebook reviews:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Failed to fetch reviews',
    });
  }
}
