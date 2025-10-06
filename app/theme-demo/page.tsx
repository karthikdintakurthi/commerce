'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DesktopThemeToggle,
    MobileThemeToggle,
    ThemeToggle
} from '@/components/ui/theme-toggle';
import { useTheme } from '@/lib/contexts/theme-context';
import { motion } from 'framer-motion';
import {
    Eye,
    Monitor,
    Moon,
    Palette,
    Settings,
    Sparkles,
    Sun
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeDemo() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Theme System Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Loading theme system...
          </p>
        </div>
      </div>
    );
  }

  const themeContext = useTheme();
  
  if (!themeContext) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          <p className="text-muted-foreground">
            Theme context not available
          </p>
        </div>
      </div>
    );
  }

  const { theme, setTheme, resolvedTheme } = themeContext;

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { value: 'system', label: 'System', icon: Monitor, description: 'Follows your device preference' },
  ];

  return (
    <div className="container mx-auto py-8 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Palette className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-display font-bold text-foreground">
            Theme System Demo
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience our comprehensive theme system with system preference detection, 
          localStorage persistence, and keyboard accessibility.
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Badge variant="emerald">Current: {resolvedTheme}</Badge>
          <Badge variant="gold">Mode: {theme}</Badge>
        </div>
      </motion.div>

      {/* Theme Toggle Components */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold flex items-center space-x-2">
          <Settings className="h-6 w-6" />
          <span>Theme Toggle Components</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun className="h-5 w-5" />
                <span>Simple Toggle</span>
              </CardTitle>
              <CardDescription>
                Basic theme toggle with icon swap
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ThemeToggle showLabel />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5" />
                <span>Desktop Dropdown</span>
              </CardTitle>
              <CardDescription>
                Full theme selector with system option
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <DesktopThemeToggle />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="h-5 w-5" />
                <span>Mobile Toggle</span>
              </CardTitle>
              <CardDescription>
                Compact mobile-optimized toggle
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <MobileThemeToggle />
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Theme Options */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold flex items-center space-x-2">
          <Eye className="h-6 w-6" />
          <span>Theme Options</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.value;
            
            return (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    isActive 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="ml-auto">
                          <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Color Palette Showcase */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Color Palette</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 bg-primary rounded-lg"></div>
            <p className="text-sm font-medium">Primary</p>
            <p className="text-xs text-muted-foreground">Emerald</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chip-ruby rounded-lg"></div>
            <p className="text-sm font-medium">Ruby</p>
            <p className="text-xs text-muted-foreground">Jewelry</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chip-gold rounded-lg"></div>
            <p className="text-sm font-medium">Gold</p>
            <p className="text-xs text-muted-foreground">Accent</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chip-sage rounded-lg"></div>
            <p className="text-sm font-medium">Sage</p>
            <p className="text-xs text-muted-foreground">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chip-sand rounded-lg"></div>
            <p className="text-sm font-medium">Sand</p>
            <p className="text-xs text-muted-foreground">Neutral</p>
          </div>
        </div>
      </motion.section>

      {/* Interactive Elements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Interactive Elements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and variants</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="luxury">Luxury</Button>
                <Button variant="jewelry">Jewelry</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators and labels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="emerald">Emerald</Badge>
                <Badge variant="ruby">Ruby</Badge>
                <Badge variant="gold">Gold</Badge>
                <Badge variant="sage">Sage</Badge>
                <Badge variant="sand">Sand</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Typography Showcase */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">Typography</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-cinzel font-bold text-foreground mb-2">
                  Cinzel Display Font
                </h1>
                <p className="text-sm text-muted-foreground">
                  Perfect for luxury headings and elegant titles
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-cormorant font-semibold text-foreground mb-2">
                  Cormorant Garamond
                </h2>
                <p className="text-sm text-muted-foreground">
                  Elegant serif for body text and sophisticated content
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-inter font-medium text-foreground mb-2">
                  Inter Sans Serif
                </h3>
                <p className="text-sm text-muted-foreground">
                  Clean and modern for UI elements and interface text
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-sarabun font-medium text-foreground mb-2">
                  Sarabun Thai Font
                </h4>
                <p className="text-sm text-muted-foreground">
                  International typography support for global accessibility
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* System Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-display font-semibold">System Information</h2>
        
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Current Theme</h3>
                <p className="text-sm text-muted-foreground">
                  Selected: <span className="font-medium">{theme}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Resolved: <span className="font-medium">{resolvedTheme}</span>
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Features</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✅ System preference detection</li>
                  <li>✅ localStorage persistence</li>
                  <li>✅ Keyboard accessibility</li>
                  <li>✅ Smooth transitions</li>
                  <li>✅ Hydration-safe</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
