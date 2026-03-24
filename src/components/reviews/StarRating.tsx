interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Renders filled / half / empty stars for a numeric rating.
 * Uses inline SVG so there are no external dependencies.
 */
export function StarRating({ rating, maxStars = 5, size = 'md' }: StarRatingProps) {
  const sizeMap = { sm: 16, md: 20, lg: 24 };
  const px = sizeMap[size];

  const stars = Array.from({ length: maxStars }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1);
    return (
      <span key={i} className="star-icon" style={{ width: px, height: px }}>
        <svg
          viewBox="0 0 24 24"
          width={px}
          height={px}
          aria-hidden="true"
        >
          {/* empty star (background) */}
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            fill="rgba(0,0,0,0.12)"
          />
          {/* filled portion */}
          {fill > 0 && (
            <>
              <defs>
                <clipPath id={`star-clip-${i}-${rating}`}>
                  <rect x="0" y="0" width={24 * fill} height="24" />
                </clipPath>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
                fill="#FFC107"
                clipPath={`url(#star-clip-${i}-${rating})`}
              />
            </>
          )}
        </svg>
      </span>
    );
  });

  return (
    <div
      className="star-rating"
      role="img"
      aria-label={`${rating} von ${maxStars} Sternen`}
    >
      {stars}
    </div>
  );
}
