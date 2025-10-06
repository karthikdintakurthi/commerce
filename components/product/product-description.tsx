import { Product } from 'lib/shopify/types';

interface ProductDescriptionProps {
  product: Product | any; // Allow demo products too
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div className="prose prose-sm max-w-none">
      {product.descriptionHtml ? (
        <div 
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          className="text-gray-600 leading-relaxed"
        />
      ) : product.description ? (
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      ) : (
        <p className="text-gray-600 leading-relaxed">
          This is a high-quality product that offers excellent value and performance.
        </p>
      )}
    </div>
  );
}
