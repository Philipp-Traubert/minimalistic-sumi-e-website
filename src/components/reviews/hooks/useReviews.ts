import { useMemo } from 'react';
import type { Platform, PlatformFilter, Review, ReviewsData } from '../types';
import {
  STATIC_GOOGLE_REVIEWS,
  STATIC_AVERAGE_RATING,
  STATIC_TOTAL_REVIEWS,
} from '../mockData';

export function useReviews(
  _platforms: Platform[] = ['google'],
): ReviewsData & { filterByPlatform: (filter: PlatformFilter) => Review[] } {
  const data: ReviewsData = {
    reviews: STATIC_GOOGLE_REVIEWS,
    loading: false,
    error: null,
    averageRating: STATIC_AVERAGE_RATING,
    totalCount: STATIC_TOTAL_REVIEWS,
    googleRating: STATIC_AVERAGE_RATING,
    facebookRating: null,
  };

  const filterByPlatform = useMemo(() => {
    return (filter: PlatformFilter) => {
      if (filter === 'all') return data.reviews;
      return data.reviews.filter((r) => r.platform === filter);
    };
  }, [data.reviews]);

  return { ...data, filterByPlatform };
}
