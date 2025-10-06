'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Calendar,
    CheckCircle,
    CreditCard,
    Lock,
    MapPin,
    Shield,
    Truck
} from 'lucide-react';
import { useState } from 'react';

export function ProductTrustArea() {
  const [zipCode, setZipCode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState<string | null>(null);

  const handleZipCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate delivery estimate calculation
    const estimate = Math.floor(Math.random() * 3) + 2; // 2-4 days
    setDeliveryEstimate(`${estimate} business days`);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Payment Methods */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Secure Payment
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Visa</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Mastercard</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">American Express</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">PayPal</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4 text-sm text-gray-600">
              <Lock className="h-4 w-4 text-green-600" />
              <span>256-bit SSL encryption</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Trust Badges
            </h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                SSL Secure
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Authentic Guarantee
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Truck className="h-3 w-3 mr-1" />
                Free Returns
              </Badge>
            </div>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Estimate
            </h3>
            <form onSubmit={handleZipCodeSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter ZIP code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button type="submit" variant="outline">
                  <MapPin className="h-4 w-4 mr-2" />
                  Check
                </Button>
              </div>
              {deliveryEstimate && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Estimated delivery: {deliveryEstimate}
                  </span>
                </div>
              )}
            </form>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Shipping Information
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <Truck className="h-4 w-4 text-blue-600 mt-0.5" />
                <div>
                  <span className="font-medium">Standard Shipping:</span>
                  <p>3-5 business days • Free on orders over $75</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Truck className="h-4 w-4 text-green-600 mt-0.5" />
                <div>
                  <span className="font-medium">Express Shipping:</span>
                  <p>1-2 business days • $9.99</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-purple-600 mt-0.5" />
                <div>
                  <span className="font-medium">International:</span>
                  <p>7-14 business days • $19.99</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Support
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📞 <span className="font-medium">Phone:</span> 1-800-VANITHA</p>
              <p>✉️ <span className="font-medium">Email:</span> support@vanitha.com</p>
              <p>💬 <span className="font-medium">Live Chat:</span> Available 9 AM - 6 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
