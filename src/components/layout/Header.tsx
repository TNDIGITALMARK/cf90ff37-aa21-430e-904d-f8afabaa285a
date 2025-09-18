'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, toggleCart } = useCartStore();

  const navigationItems = [
    { name: 'NEW ARRIVALS', href: '/new-arrivals' },
    { 
      name: 'COLLECTIONS', 
      href: '/collections',
      submenu: [
        { name: 'Evening Wear', href: '/collections/evening-wear' },
        { name: 'Casual Luxe', href: '/collections/casual-luxe' },
        { name: 'Business Attire', href: '/collections/business-attire' },
        { name: 'Seasonal', href: '/collections/seasonal' },
      ]
    },
    { 
      name: 'DESIGNERS', 
      href: '/designers',
      submenu: [
        { name: 'Featured Designers', href: '/designers/featured' },
        { name: 'Emerging Talent', href: '/designers/emerging' },
        { name: 'Exclusive Collaborations', href: '/designers/exclusive' },
      ]
    },
    { name: 'SALE', href: '/sale' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80 border-b border-luxe-gold/20">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-luxe-gold/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-primary border-luxe-gold/20">
                <nav className="flex flex-col space-y-6 mt-8">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="block text-primary-foreground hover:text-luxe-gold transition-colors text-sm font-medium tracking-wide"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block text-sm text-primary-foreground/70 hover:text-luxe-gold transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-primary-foreground">
            <span className="font-heading text-xl lg:text-2xl font-normal tracking-wide">
              LUXE ATELIER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList className="space-x-8">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent text-primary-foreground hover:text-luxe-gold hover:bg-luxe-gold/10 text-sm font-medium tracking-wide">
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-64 p-6 bg-primary border border-luxe-gold/20">
                            <div className="space-y-3">
                              {item.submenu.map((subItem) => (
                                <NavigationMenuLink key={subItem.name} asChild>
                                  <Link
                                    href={subItem.href}
                                    className="block text-sm text-primary-foreground hover:text-luxe-gold transition-colors py-2"
                                  >
                                    {subItem.name}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-primary-foreground hover:text-luxe-gold transition-colors text-sm font-medium tracking-wide px-4 py-2"
                      >
                        {item.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center">
                  <Input
                    type="search"
                    placeholder="Search luxury fashion..."
                    className="w-64 bg-primary-foreground/10 border-luxe-gold/30 text-primary-foreground placeholder:text-primary-foreground/60"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 text-primary-foreground hover:bg-luxe-gold/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="text-primary-foreground hover:bg-luxe-gold/10"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            {/* User Account */}
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-luxe-gold/10"
              asChild
            >
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Shopping Bag */}
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-luxe-gold/10 relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {/* Cart item count badge */}
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-luxe-gold text-luxe-black text-xs flex items-center justify-center font-medium">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;