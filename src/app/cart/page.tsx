'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Truck, Heart, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/cart';
import ProductCard from '@/components/product/ProductCard';

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTax,
    getShipping,
    getTotalPrice,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Sample recommended products
  const recommendedProducts = [
    {
      id: '1',
      name: 'SILK SIGNATURE SCARF',
      price: 420,
      images: ['/placeholder.svg'],
      category: 'Accessories',
      href: '/product/silk-scarf',
    },
    {
      id: '2',
      name: 'LEATHER GLOVES',
      price: 380,
      images: ['/placeholder.svg'],
      category: 'Accessories',
      href: '/product/leather-gloves',
    },
    {
      id: '3',
      name: 'PEARL EARRINGS',
      price: 290,
      images: ['/placeholder.svg'],
      category: 'Jewelry',
      href: '/product/pearl-earrings',
    },
  ];

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsApplyingPromo(false);
    
    // In a real app, handle promo code validation here
    console.log('Applying promo code:', promoCode);
  };

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <h1 className="font-heading text-3xl text-foreground">
                Your Cart is Empty
              </h1>
              <p className="font-body text-muted-foreground text-lg">
                Discover our curated selection of luxury pieces and start building your perfect wardrobe.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/collections">
                  Explore Collections
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/new-arrivals">
                  View New Arrivals
                </Link>
              </Button>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-24">
            <h2 className="font-heading text-3xl text-center mb-12">
              DISCOVER LUXURY
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl text-foreground">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground mt-1">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/collections">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-xl">Your Items</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Clear All
              </Button>
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 border border-border rounded-lg luxury-shadow">
                  <div className="relative w-32 h-40 bg-muted rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-heading text-lg">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground">
                          Size: {item.size} · Color: {item.color}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <>
                              <span className="text-muted-foreground line-through text-sm">
                                {formatPrice(item.originalPrice)}
                              </span>
                              <Badge className="bg-destructive text-destructive-foreground text-xs">
                                SALE
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-luxe-gold"
                        >
                          <Heart className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Label className="text-sm">Quantity:</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {item.quantity >= item.maxQuantity && (
                          <p className="text-xs text-muted-foreground">
                            Max quantity reached
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="font-heading text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <p className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6 luxury-shadow">
              <h2 className="font-heading text-xl mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="space-y-3 mb-6">
                <Label htmlFor="promo-code">Promo Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="promo-code"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button
                    onClick={handleApplyPromo}
                    disabled={!promoCode.trim() || isApplyingPromo}
                    className="px-6"
                  >
                    {isApplyingPromo ? 'Applying...' : 'Apply'}
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-luxe-gold font-medium">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                
                {/* Shipping Progress */}
                {shipping > 0 && (
                  <div className="bg-luxe-gold/10 p-3 rounded-lg mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="h-4 w-4 text-luxe-gold" />
                      <span className="text-sm font-medium">Free Shipping</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Add {formatPrice(500 - subtotal)} more to qualify for free shipping
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className="bg-luxe-gold h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <Separator />
                
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14"
                asChild
              >
                <Link href="/checkout">
                  <Lock className="h-5 w-5 mr-2" />
                  Secure Checkout
                </Link>
              </Button>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Secure SSL Encryption</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  30-day returns · Free exchanges · Authenticity guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-24">
          <h2 className="font-heading text-3xl text-center mb-12">
            COMPLETE YOUR LOOK
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;