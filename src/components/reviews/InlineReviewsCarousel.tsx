import { useMemo } from 'react';
import { useReviews } from './hooks/useReviews';
import { ReviewsCarousel } from './ReviewsCarousel';
import { ReviewsSkeleton } from './ReviewsSkeleton';
import { StarRating } from './StarRating';

export function InlineReviewsCarousel() {
  const {
    reviews,
    loading,
    error,
    averageRating,
    totalCount,
  } = useReviews(['google']);

  const filteredReviews = useMemo(() => reviews.filter((review) => review.platform === 'google'), [reviews]);

  return (
    <div className="inline-reviews-block" aria-label="Google-Bewertungen">
      <div className="inline-reviews-header">
        <div>
          <h2 className="heading-lg">Stimmen aus bisherigen Sitzungen</h2>
          <div className="separator" />
        </div>

        {!loading && totalCount > 0 && (
          <div className="inline-reviews-rating">
            <span className="reviews-rating-number">{averageRating.toFixed(1)}</span>
            <StarRating rating={averageRating} size="lg" />
            <span className="reviews-rating-count">
              ({totalCount} {totalCount === 1 ? 'Bewertung' : 'Bewertungen'})
            </span>
          </div>
        )}
      </div>

      {loading && <ReviewsSkeleton count={2} />}

      {error && (
        <div className="reviews-error" role="alert">
          <p>Bewertungen konnten nicht geladen werden.</p>
          <small>{error}</small>
        </div>
      )}

      {!loading && !error && filteredReviews.length > 0 && (
        <div className="inline-reviews-carousel-shell">
          <ReviewsCarousel reviews={filteredReviews} />
        </div>
      )}

      {!loading && !error && filteredReviews.length === 0 && (
        <p className="reviews-empty text-body" style={{ textAlign: 'center', opacity: 0.6 }}>
          Noch keine Bewertungen vorhanden.
        </p>
      )}
    </div>
  );
}
