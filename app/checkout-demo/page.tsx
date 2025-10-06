import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutDemo() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Demo Checkout</CardTitle>
            <p className="text-muted-foreground">
              This is a demo checkout page. In a real application, this would integrate with your payment processor.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold mb-2">Demo Cart Items</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Product items would be listed here</p>
                <p>• Pricing and totals would be calculated</p>
                <p>• Payment processing would be integrated</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full" size="lg">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Complete Demo Purchase
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">
                  Continue Shopping
                </Link>
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>This is a demonstration of the cart functionality.</p>
              <p>In production, this would connect to Shopify or your preferred e-commerce platform.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
