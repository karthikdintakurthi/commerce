'use client';

import LogoSquare from 'components/logo-square';
import { Badge } from 'components/ui/badge';
import { Button } from 'components/ui/button';
import { Container } from 'components/ui/container';
import { Grid } from 'components/ui/grid';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

const { COMPANY_NAME, SITE_NAME } = process.env;

interface FooterClientProps {
  menu: any[];
}

export default function FooterClient({ menu }: FooterClientProps) {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'New Arrivals', href: '/collections/new' },
        { name: 'Best Sellers', href: '/collections/bestsellers' },
        { name: 'Sale', href: '/collections/sale' },
        { name: 'Gift Cards', href: '/gift-cards' },
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Accessibility', href: '/accessibility' },
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="border-t bg-background">
      {/* Main Footer Content */}
      <Container className="py-12">
        <Grid columns="auto-fit" minItemWidth="250px" gap="lg">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link className="flex items-center space-x-2" href="/">
              <LogoSquare size="sm" />
              <span className="text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Discover premium Indian luxury products with authentic craftsmanship and timeless elegance.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@vanitha.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8"
                >
                  <Link href={social.href} aria-label={social.name}>
                    <social.icon className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Grid>

        {/* Newsletter Signup */}
        <motion.div 
          className="mt-8 pt-6 border-t"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-lg">
            <h3 className="text-sm font-semibold mb-2">Stay Updated</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Get exclusive offers and new arrivals.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-chip-gold focus:border-transparent"
              />
              <Button size="sm" className="px-4">
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Bottom Footer */}
      <div className="border-t bg-muted/30">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <p>
                &copy; {copyrightDate} {copyrightName}
                {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Secure Checkout
              </Badge>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>Powered by</span>
                <Link href="https://vercel.com" className="hover:text-foreground transition-colors">
                  ▲ Vercel
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
