'use client';

import { Badge } from 'components/ui/badge';
import { Price } from 'components/ui/price';
import { motion } from 'framer-motion';

interface ProductPriceProps {
  price: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice?: {
      amount: string;
      currencyCode: string;
    };
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'sale' | 'luxury' | 'minimal';
  showCurrency?: boolean;
  className?: string;
}

export function ProductPrice({ 
  price, 
  size = 'lg', 
  variant = 'default',
  showCurrency = true,
  className 
}: ProductPriceProps) {
  const { maxVariantPrice, minVariantPrice } = price;
  const isOnSale = minVariantPrice && parseFloat(minVariantPrice.amount) !== parseFloat(maxVariantPrice.amount);
  const discountPercentage = isOnSale 
    ? Math.round(((parseFloat(maxVariantPrice.amount) - parseFloat(minVariantPrice!.amount)) / parseFloat(maxVariantPrice.amount)) * 100)
    : 0;

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Price
        price={minVariantPrice || maxVariantPrice}
        compareAtPrice={isOnSale ? maxVariantPrice : undefined}
        size={size}
        variant={isOnSale ? 'sale' : variant}
        showCurrency={showCurrency}
      />
      
      {isOnSale && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
        >
          <Badge variant="destructive" className="text-xs font-medium">
            -{discountPercentage}%
          </Badge>
        </motion.div>
      )}
    </motion.div>
  );
}
