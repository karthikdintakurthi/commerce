'use client';

import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function CartTestPage() {
  const { cart, updateCartItem, isLoaded } = useCart();

  const handleAddTestItem = () => {
    // Create a mock product and variant for testing
    const mockProduct = {
      id: 'test-product',
      title: 'Test Product',
      handle: 'test-product',
      description: 'A test product for cart functionality',
      availableForSale: true,
      priceRange: {
        minVariantPrice: { amount: '29.99', currencyCode: 'USD' },
        maxVariantPrice: { amount: '29.99', currencyCode: 'USD' }
      },
      featuredImage: {
        url: '/api/placeholder/300/300',
        altText: 'Test Product'
      }
    };

    const mockVariant = {
      id: 'test-variant',
      title: 'Default Title',
      availableForSale: true,
      price: { amount: '29.99', currencyCode: 'USD' },
      selectedOptions: []
    };

    // This would normally be called by the AddToCart component
    // For testing, we'll simulate the cart context directly
    console.log('Adding test item to cart');
  };

  const handleClearCart = () => {
    if (cart?.lines) {
      cart.lines.forEach(item => {
        updateCartItem(item.merchandise.id, 'delete');
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart Test Page
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cart Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cart Status</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Loaded:</strong> {isLoaded ? 'Yes' : 'No'}</p>
                  <p><strong>Items:</strong> {cart?.totalQuantity || 0}</p>
                  <p><strong>Total:</strong> {cart?.cost?.totalAmount?.amount || '0'} {cart?.cost?.totalAmount?.currencyCode || 'USD'}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddTestItem} variant="outline">
                    Add Test Item
                  </Button>
                  <Button onClick={handleClearCart} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Cart Items</h3>
                {cart?.lines && cart.lines.length > 0 ? (
                  <div className="space-y-2">
                    {cart.lines.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{item.merchandise.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} × {item.cost.totalAmount.amount} {item.cost.totalAmount.currencyCode}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartItem(item.merchandise.id, 'minus')}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateCartItem(item.merchandise.id, 'plus')}
                          >
                            +
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateCartItem(item.merchandise.id, 'delete')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No items in cart</p>
                )}
              </div>
            </div>

            {/* Debug Info */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Debug Info</h4>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(cart, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
