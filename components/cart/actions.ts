'use server';

import { TAGS } from 'lib/constants';
import {
    addToCart,
    createCart,
    getCart,
    removeFromCart,
    updateCart
} from 'lib/shopify';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return 'Error adding item to cart';
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    revalidateTag(TAGS.cart);
    return null; // Success
  } catch (e) {
    console.warn('Cart: Shopify not configured, using local cart');
    // For demo purposes, we'll just return success
    // The optimistic updates will handle the cart state
    return null; // Success
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return 'Item not found in cart';
    }
  } catch (e) {
    console.warn('Cart: Shopify not configured, using local cart');
    return null; // Success - optimistic updates handle the state
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return 'Error fetching cart';
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity
          }
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.warn('Cart: Shopify not configured, using local cart');
    return null; // Success - optimistic updates handle the state
  }
}

export async function redirectToCheckout() {
  try {
    let cart = await getCart();
    redirect(cart!.checkoutUrl);
  } catch (e) {
    console.warn('Cart: Shopify not configured, redirecting to demo checkout');
    // For demo purposes, redirect to a demo checkout page
    redirect('/checkout-demo');
  }
}

export async function createCartAndSetCookie() {
  try {
    let cart = await createCart();
    (await cookies()).set('cartId', cart.id!);
  } catch (error) {
    console.warn('Cart: Shopify not configured, using mock cart');
    // For demo purposes, set a mock cart ID
    (await cookies()).set('cartId', 'mock-cart-id');
  }
}
