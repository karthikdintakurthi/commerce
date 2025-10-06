import { cn, formatPrice } from '@/lib/utils';
import * as React from 'react';

export interface PriceProps {
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  className?: string;
  showCurrency?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'sale' | 'luxury' | 'minimal';
}

const Price = React.forwardRef<HTMLDivElement, PriceProps>(
  ({
    price,
    compareAtPrice,
    className,
    showCurrency = true,
    size = 'md',
    variant = 'default',
    ...props
  }, ref) => {
    const isOnSale = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
    const discountPercentage = isOnSale 
      ? Math.round(((parseFloat(compareAtPrice!.amount) - parseFloat(price.amount)) / parseFloat(compareAtPrice!.amount)) * 100)
      : 0;

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    const variantClasses = {
      default: '',
      sale: 'text-destructive',
      luxury: 'text-primary font-semibold',
      minimal: 'text-muted-foreground',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        {isOnSale ? (
          <>
            <span className={cn(
              'font-semibold',
              sizeClasses[size],
              variantClasses[variant]
            )}>
              {formatPrice(parseFloat(price.amount), { 
                currency: price.currencyCode,
                notation: showCurrency ? 'standard' : 'compact'
              })}
            </span>
            <span className={cn(
              'text-muted-foreground line-through',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              {formatPrice(parseFloat(compareAtPrice!.amount), { 
                currency: compareAtPrice!.currencyCode,
                notation: showCurrency ? 'standard' : 'compact'
              })}
            </span>
            <span className={cn(
              'text-destructive font-medium',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              -{discountPercentage}%
            </span>
          </>
        ) : (
          <span className={cn(
            'font-semibold',
            sizeClasses[size],
            variantClasses[variant]
          )}>
            {formatPrice(parseFloat(price.amount), { 
            currency: price.currencyCode,
            notation: showCurrency ? 'standard' : 'compact'
          })}
          </span>
        )}
      </div>
    );
  }
);

Price.displayName = 'Price';

export { Price };
