/**
 * Shimmer skeleton cards shown while reviews are being fetched.
 */
export function ReviewsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="reviews-skeleton-container" aria-busy="true" aria-label="Bewertungen werden geladen">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="reviews-skeleton" />
      ))}
    </div>
  );
}
