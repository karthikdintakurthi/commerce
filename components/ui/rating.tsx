import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import * as React from 'react';

export interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showCount?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({
    rating,
    maxRating = 5,
    size = 'md',
    showValue = false,
    showCount = false,
    reviewCount,
    interactive = false,
    onRatingChange,
    className,
    ...props
  }, ref) => {
    const [hoveredRating, setHoveredRating] = React.useState<number | null>(null);
    const [selectedRating, setSelectedRating] = React.useState(rating);

    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    const textSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const handleStarClick = (starRating: number) => {
      if (interactive && onRatingChange) {
        setSelectedRating(starRating);
        onRatingChange(starRating);
      }
    };

    const handleStarHover = (starRating: number | null) => {
      if (interactive) {
        setHoveredRating(starRating);
      }
    };

    const displayRating = hoveredRating ?? selectedRating;

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        <div className="flex">
          {[...Array(maxRating)].map((_, index) => {
            const starRating = index + 1;
            const isFilled = starRating <= Math.floor(displayRating);
            const isHalfFilled = starRating === Math.ceil(displayRating) && displayRating % 1 !== 0;

            return (
              <button
                key={index}
                type="button"
                className={cn(
                  'transition-colors',
                  interactive && 'cursor-pointer hover:scale-110',
                  !interactive && 'cursor-default'
                )}
                onClick={() => handleStarClick(starRating)}
                onMouseEnter={() => handleStarHover(starRating)}
                onMouseLeave={() => handleStarHover(null)}
                disabled={!interactive}
                aria-label={`Rate ${starRating} star${starRating !== 1 ? 's' : ''}`}
              >
                <Star
                  className={cn(
                    sizeClasses[size],
                    isFilled || isHalfFilled
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300',
                    interactive && 'hover:text-yellow-300'
                  )}
                />
              </button>
            );
          })}
        </div>

        {(showValue || showCount) && (
          <div className={cn('flex items-center gap-1', textSizeClasses[size])}>
            {showValue && (
              <span className="text-muted-foreground">
                {displayRating.toFixed(1)}
              </span>
            )}
            {showCount && reviewCount && (
              <span className="text-muted-foreground">
                ({reviewCount})
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export { Rating };
