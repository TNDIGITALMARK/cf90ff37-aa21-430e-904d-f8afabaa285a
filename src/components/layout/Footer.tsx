'use client';

import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    customerService: {
      title: 'CUSTOMER SERVICE',
      links: [
        { name: 'FAQ', href: '/faq' },
        { name: 'Shipping & Returns', href: '/shipping-returns' },
        { name: 'Size Guide', href: '/size-guide' },
        { name: 'Care Instructions', href: '/care-instructions' },
        { name: 'Contact Us', href: '/contact' },
      ]
    },
    company: {
      title: 'COMPANY',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Story', href: '/story' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Sustainability', href: '/sustainability' },
      ]
    },
    collections: {
      title: 'COLLECTIONS',
      links: [
        { name: 'New Arrivals', href: '/new-arrivals' },
        { name: 'Evening Wear', href: '/collections/evening-wear' },
        { name: 'Casual Luxe', href: '/collections/casual-luxe' },
        { name: 'Accessories', href: '/collections/accessories' },
        { name: 'Sale', href: '/sale' },
      ]
    },
    connect: {
      title: 'CONNECT',
      links: [
        { name: 'Personal Styling', href: '/personal-styling' },
        { name: 'VIP Program', href: '/vip' },
        { name: 'Gift Cards', href: '/gift-cards' },
        { name: 'Store Locator', href: '/stores' },
        { name: 'Appointments', href: '/appointments' },
      ]
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-luxe-gold/20">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl lg:text-4xl mb-4">
              JOIN OUR EXCLUSIVE CIRCLE
            </h2>
            <p className="text-primary-foreground/80 mb-8 font-body">
              Be the first to discover new collections, exclusive events, and receive personalized styling insights from our fashion experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-primary-foreground/10 border-luxe-gold/30 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button className="bg-luxe-gold text-luxe-black hover:bg-luxe-gold/90 font-medium px-8">
                SUBSCRIBE
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/60 mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Customer Service */}
          <div>
            <h3 className="font-heading text-lg mb-6 text-luxe-gold">
              {footerSections.customerService.title}
            </h3>
            <ul className="space-y-3">
              {footerSections.customerService.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-luxe-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-lg mb-6 text-luxe-gold">
              {footerSections.company.title}
            </h3>
            <ul className="space-y-3">
              {footerSections.company.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-luxe-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-heading text-lg mb-6 text-luxe-gold">
              {footerSections.collections.title}
            </h3>
            <ul className="space-y-3">
              {footerSections.collections.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-luxe-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Contact */}
          <div>
            <h3 className="font-heading text-lg mb-6 text-luxe-gold">
              {footerSections.connect.title}
            </h3>
            <ul className="space-y-3 mb-8">
              {footerSections.connect.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-luxe-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-luxe-gold" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-luxe-gold" />
                <span>concierge@luxeatelier.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-luxe-gold mt-0.5" />
                <div>
                  <div>123 Fashion Avenue</div>
                  <div>New York, NY 10001</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-sm font-medium mb-4 text-luxe-gold">FOLLOW US</h4>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/80 hover:text-luxe-gold hover:bg-luxe-gold/10"
                  asChild
                >
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/80 hover:text-luxe-gold hover:bg-luxe-gold/10"
                  asChild
                >
                  <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/80 hover:text-luxe-gold hover:bg-luxe-gold/10"
                  asChild
                >
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-luxe-gold/20" />
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="text-sm text-primary-foreground/60 text-center lg:text-left">
            © {currentYear} LUXE ATELIER. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm text-primary-foreground/60">
            <Link href="/privacy-policy" className="hover:text-luxe-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-luxe-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-luxe-gold transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="hover:text-luxe-gold transition-colors">
              Sitemap
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-xs text-primary-foreground/60">Secure payments</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-primary-foreground/10 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground/60">VISA</span>
              </div>
              <div className="w-8 h-5 bg-primary-foreground/10 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground/60">MC</span>
              </div>
              <div className="w-8 h-5 bg-primary-foreground/10 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground/60">AMEX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;