'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function DesignTokensDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-display font-bold text-foreground">
          Design Tokens Demo
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Showcasing our comprehensive design system with jewelry-inspired colors,
          typography, spacing, and motion tokens.
        </p>
      </motion.div>

      {/* Color Palette */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="w-full h-16 bg-primary rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Primary</p>
            <p className="text-xs text-muted-foreground">Emerald</p>
          </Card>
          <Card className="p-4">
            <div className="w-full h-16 bg-chip-ruby rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Ruby</p>
            <p className="text-xs text-muted-foreground">Jewelry</p>
          </Card>
          <Card className="p-4">
            <div className="w-full h-16 bg-chip-gold rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Gold</p>
            <p className="text-xs text-muted-foreground">Accent</p>
          </Card>
          <Card className="p-4">
            <div className="w-full h-16 bg-chip-sage rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Sage</p>
            <p className="text-xs text-muted-foreground">Secondary</p>
          </Card>
          <Card className="p-4">
            <div className="w-full h-16 bg-chip-sand rounded-lg mb-2"></div>
            <p className="text-sm font-medium">Sand</p>
            <p className="text-xs text-muted-foreground">Neutral</p>
          </Card>
        </div>
      </motion.section>

      {/* Typography Scale */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Typography Scale</h2>
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">
              Display Heading (Cinzel)
            </h1>
            <p className="text-sm text-muted-foreground">42-56px, tight leading</p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-semibold text-foreground">
              Section Heading
            </h2>
            <p className="text-sm text-muted-foreground">30-40px, luxury feel</p>
          </div>
          <div>
            <p className="text-base font-body text-foreground">
              Body text using Inter/Sarabun for clarity and readability.
            </p>
            <p className="text-sm text-muted-foreground">15-16px, normal tracking</p>
          </div>
        </div>
      </motion.section>

      {/* Spacing & Layout */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Spacing & Layout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>4-Point Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4 bg-primary"></div>
                <span className="text-sm">4px</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-4 bg-primary"></div>
                <span className="text-sm">8px</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-4 bg-primary"></div>
                <span className="text-sm">12px</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary"></div>
                <span className="text-sm">16px</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Border Radius</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary rounded-sm"></div>
                <span className="text-sm">Buttons (14-16px)</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary rounded-2xl"></div>
                <span className="text-sm">Cards (24px)</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Motion & Animation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Motion & Animation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="p-4 bg-card border rounded-lg"
          >
            <h3 className="font-semibold mb-2">Spring Animation</h3>
            <p className="text-sm text-muted-foreground">Gentle, natural feel</p>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="p-4 bg-card border rounded-lg"
          >
            <h3 className="font-semibold mb-2">Hover Lift</h3>
            <p className="text-sm text-muted-foreground">Smooth elevation</p>
          </motion.div>
          
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(15, 108, 91, 0.4)",
                "0 0 0 10px rgba(15, 108, 91, 0)",
                "0 0 0 0 rgba(15, 108, 91, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 bg-primary text-primary-foreground rounded-lg"
          >
            <h3 className="font-semibold mb-2">Pulse Effect</h3>
            <p className="text-sm opacity-90">Attention-grabbing</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Component Examples */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Component Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </motion.section>
    </div>
  );
}
