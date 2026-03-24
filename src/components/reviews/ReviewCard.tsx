import { StarRating } from './StarRating';
import { PlatformBadge } from './PlatformBadge';
import type { Review } from './types';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const {
    platform,
    authorName,
    authorPhoto,
    rating,
    reviewText,
    relativeTime,
    profileUrl,
  } = review;

  const cardContent = (
    <article className="review-card" aria-label={`Bewertung von ${authorName}`}>
      <div className="review-card-header">
        <StarRating rating={rating} size="md" />
        <PlatformBadge platform={platform} />
      </div>

      <div className="review-card-body">
        <p className="review-text">
          &ldquo;{reviewText}&rdquo;
        </p>
      </div>

      <div className="review-card-footer">
        <div className="review-author">
          {authorPhoto ? (
            <img
              src={authorPhoto}
              alt={authorName}
              className="review-author-photo"
              loading="lazy"
              width={40}
              height={40}
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="review-author-photo review-author-placeholder" aria-hidden="true">
              {authorName.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="review-author-info">
            <span className="review-author-name">{authorName}</span>
            <span className="review-time">
              {platform === 'google' ? 'auf Google' : 'auf Facebook'} · {relativeTime}
            </span>
          </div>
        </div>
      </div>
    </article>
  );

  if (profileUrl) {
    return (
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="review-card-link"
        aria-label={`Bewertung von ${authorName} auf Google öffnen`}
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
