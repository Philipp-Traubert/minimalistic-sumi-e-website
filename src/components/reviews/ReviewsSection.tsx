import { useState, useMemo } from 'react';
import { useReviews } from './hooks/useReviews';
import { ReviewsCarousel } from './ReviewsCarousel';
import { ReviewsSkeleton } from './ReviewsSkeleton';
import { StarRating } from './StarRating';
import { GOOGLE_BUSINESS_PROFILE_URL, GOOGLE_WRITE_REVIEW_URL } from './mockData';
import type { PlatformFilter } from './types';

/**
 * Top-level reviews section that fetches data, shows platform filter
 * tabs, and renders the carousel inside a glass-panel styled container.
 *
 * Includes Schema.org structured data for SEO.
 */
export function ReviewsSection() {
  const openBusinessProfile = () => {
    window.open(GOOGLE_BUSINESS_PROFILE_URL, '_blank', 'noopener,noreferrer');
  };
  const {
    reviews,
    loading,
    error,
    averageRating,
    totalCount,
    googleRating,
    filterByPlatform,
  } = useReviews(['google']); // Add 'facebook' to this array once your FB page is ready

  const [activeFilter, setActiveFilter] = useState<PlatformFilter>('all');

  const filteredReviews = useMemo(
    () => filterByPlatform(activeFilter),
    [filterByPlatform, activeFilter],
  );

  // Schema.org structured data for SEO rich snippets
  const schemaData = useMemo(() => {
    if (reviews.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'loslasszen Körperarbeit',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating.toFixed(1),
        reviewCount: totalCount,
        bestRating: '5',
        worstRating: '1',
      },
      review: reviews.slice(0, 5).map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.authorName },
        datePublished: r.timestamp,
        reviewBody: r.reviewText,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: '5',
          worstRating: '1',
        },
      })),
    };
  }, [reviews, averageRating, totalCount]);

  // Determine which platform tabs to show
  const hasGoogle = reviews.some((r) => r.platform === 'google');
  const hasFacebook = reviews.some((r) => r.platform === 'facebook');
  const showFilter = hasGoogle && hasFacebook;

  return (
    <section
      className="reviews-section reviews-section-clickable"
      id="bewertungen"
      aria-label="Kundenbewertungen"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest('a, button')) return;
        openBusinessProfile();
      }}
    >
      {/* Schema.org structured data */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      {/* Section Header */}
      <div className="reviews-section-header">
        <div>
          <h2 className="heading-lg">Was meine Klienten sagen</h2>
          <div className="separator" />
        </div>

        {/* Overall rating summary */}
        {!loading && totalCount > 0 && (
          <div className="reviews-overall-rating">
            <span className="reviews-rating-number">{averageRating.toFixed(1)}</span>
            <StarRating rating={averageRating} size="lg" />
            <span className="reviews-rating-count">
              ({totalCount} {totalCount === 1 ? 'Bewertung' : 'Bewertungen'})
            </span>
          </div>
        )}

        {/* Google rating badge row */}
        {!loading && googleRating !== null && (
          <div className="reviews-platform-summary">
            <span className="reviews-platform-chip google">
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google {googleRating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Platform filter tabs (only if both platforms have reviews) */}
      {showFilter && (
        <div className="platform-filter" role="tablist" aria-label="Bewertungen filtern">
          {(['all', 'google', 'facebook'] as PlatformFilter[]).map((filter) => {
            const label =
              filter === 'all'
                ? 'Alle'
                : filter === 'google'
                  ? 'Google'
                  : 'Facebook';
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                className={`platform-filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Content */}
      {loading && <ReviewsSkeleton count={3} />}

      {error && (
        <div className="reviews-error" role="alert">
          <p>Bewertungen konnten nicht geladen werden.</p>
          <small>{error}</small>
        </div>
      )}

      {!loading && !error && filteredReviews.length > 0 && (
        <ReviewsCarousel reviews={filteredReviews} />
      )}

      {!loading && !error && filteredReviews.length === 0 && (
        <p className="reviews-empty text-body" style={{ textAlign: 'center', opacity: 0.6 }}>
          Noch keine Bewertungen vorhanden.
        </p>
      )}

      {/* "Leave a Review" call‑to‑action */}
      {!loading && (
        <div className="reviews-cta">
          <a
            href={GOOGLE_WRITE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="reviews-write-btn"
          >
            Bewertung schreiben
          </a>
        </div>
      )}
    </section>
  );
}
