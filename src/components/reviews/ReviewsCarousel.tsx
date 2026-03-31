import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ReviewCard } from './ReviewCard';
import type { Review } from './types';

interface ReviewsCarouselProps {
  reviews: Review[];
}

/**
 * Horizontal carousel of review cards using Embla.
 * Shows one card at a time on mobile, and partial peeks on wider screens.
 */
export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  if (reviews.length === 0) return null;

  return (
    <div
      className="reviews-carousel-wrapper"
      role="region"
      aria-roledescription="carousel"
      aria-label="Kundenbewertungen"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Carousel viewport */}
      <div className="reviews-carousel-viewport" ref={emblaRef}>
        <div className="reviews-carousel-container">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="reviews-carousel-slide"
              role="group"
              aria-roledescription="slide"
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next Buttons */}
      <button
        type="button"
        className="reviews-carousel-button prev"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Vorherige Bewertung"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        className="reviews-carousel-button next"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Nächste Bewertung"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      {reviews.length > 1 && (
        <div className="reviews-carousel-dots" role="tablist" aria-label="Bewertung auswählen">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`reviews-carousel-dot ${i === selectedIndex ? 'active' : ''}`}
              onClick={() => scrollTo(i)}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Bewertung ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
