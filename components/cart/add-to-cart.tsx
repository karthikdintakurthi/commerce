'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import { useProduct } from 'components/product/product-context';
import { Product } from 'lib/shopify/types';
import { useActionState } from 'react';
import { useCart } from './cart-context';

// Ensure Tailwind classes are detected
// relative flex w-full items-center justify-center rounded-full bg-primary p-4 tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium hover:opacity-90

function SubmitButton({
  availableForSale,
  selectedVariantId,
  finalVariant,
  addCartItem,
  message
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  finalVariant: any;
  addCartItem: any;
  message: any;
}) {
         const buttonClasses =
           'relative flex w-full items-center justify-center rounded-full bg-primary p-4 tracking-wide text-primary-foreground hover:bg-primary-700 transition-colors duration-200 font-medium';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        'hover:opacity-90': true
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: any) =>
    variant.selectedOptions.every(
      (option: any) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  return (
    <form action={addItemAction}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
        finalVariant={finalVariant}
        addCartItem={addCartItem}
        message={message}
      />
    </form>
  );
}
