export type Platform = 'google' | 'facebook';

export interface Review {
  id: string;
  platform: Platform;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  reviewText: string;
  relativeTime: string;
  timestamp: string;
  profileUrl?: string;
}

export interface GooglePlacesReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlacesResponse {
  platform: 'google';
  averageRating: number;
  totalReviews: number;
  reviews: GooglePlacesReview[];
  fetchedAt: string;
}

export interface FacebookReview {
  reviewer?: {
    name: string;
    picture?: {
      data?: {
        url: string;
      };
    };
  };
  created_time: string;
  rating?: number;
  review_text?: string;
  recommendation_type?: 'positive' | 'negative';
}

export interface FacebookResponse {
  platform: 'facebook';
  reviews: FacebookReview[];
  fetchedAt: string;
}

export interface ReviewsData {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  averageRating: number;
  totalCount: number;
  googleRating: number | null;
  facebookRating: number | null;
}

export type PlatformFilter = 'all' | Platform;
