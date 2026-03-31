import { useEffect, useMemo, useState } from 'react';
import type {
  GooglePlacesResponse,
  Platform,
  PlatformFilter,
  Review,
  ReviewsData,
} from '../types';
import {
  GOOGLE_BUSINESS_PROFILE_URL,
  STATIC_GOOGLE_REVIEWS,
  STATIC_AVERAGE_RATING,
  STATIC_TOTAL_REVIEWS,
} from '../mockData';

function normalizeGoogleResponse(payload: GooglePlacesResponse): ReviewsData {
  const reviews: Review[] = (payload.reviews ?? []).map((review, index) => ({
    id: `google-live-${index}-${review.time}`,
    platform: 'google',
    authorName: review.author_name,
    authorPhoto: review.profile_photo_url,
    rating: review.rating,
    reviewText: review.text,
    relativeTime: review.relative_time_description,
    timestamp: new Date((review.time ?? 0) * 1000).toISOString(),
    profileUrl: review.author_url || GOOGLE_BUSINESS_PROFILE_URL,
  }));

  return {
    reviews,
    loading: false,
    error: null,
    averageRating: payload.averageRating ?? STATIC_AVERAGE_RATING,
    totalCount: payload.totalReviews ?? reviews.length,
    googleRating: payload.averageRating ?? STATIC_AVERAGE_RATING,
    facebookRating: null,
  };
}

function getStaticFallback(): ReviewsData {
  return {
    reviews: STATIC_GOOGLE_REVIEWS,
    loading: false,
    error: null,
    averageRating: STATIC_AVERAGE_RATING,
    totalCount: STATIC_TOTAL_REVIEWS,
    googleRating: STATIC_AVERAGE_RATING,
    facebookRating: null,
  };
}

export function useReviews(
  _platforms: Platform[] = ['google'],
): ReviewsData & { filterByPlatform: (filter: PlatformFilter) => Review[] } {
  const [data, setData] = useState<ReviewsData>({
    reviews: STATIC_GOOGLE_REVIEWS,
    loading: true,
    error: null,
    averageRating: STATIC_AVERAGE_RATING,
    totalCount: STATIC_TOTAL_REVIEWS,
    googleRating: STATIC_AVERAGE_RATING,
    facebookRating: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews');
        if (!response.ok) {
          throw new Error(`Google Reviews API returned ${response.status}`);
        }

        const payload = (await response.json()) as GooglePlacesResponse;
        if (cancelled) return;

        const normalized = normalizeGoogleResponse(payload);
        setData(normalized.reviews.length > 0 ? normalized : getStaticFallback());
      } catch (error) {
        if (cancelled) return;
        setData({
          ...getStaticFallback(),
          error: error instanceof Error ? error.message : 'Reviews konnten nicht geladen werden',
        });
      }
    };

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const filterByPlatform = useMemo(() => {
    return (filter: PlatformFilter) => {
      if (filter === 'all') return data.reviews;
      return data.reviews.filter((r) => r.platform === filter);
    };
  }, [data.reviews]);

  return { ...data, filterByPlatform };
}
