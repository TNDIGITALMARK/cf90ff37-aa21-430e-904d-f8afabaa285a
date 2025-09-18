'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/cart';

const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalItems,
    getSubtotal,
    getTax,
    getShipping,
    getTotalPrice,
  } = useCartStore();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="pb-6">
          <SheetTitle className="font-heading text-xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
            {totalItems > 0 && (
              <Badge className="bg-luxe-gold text-luxe-black">
                {totalItems}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground">
                Discover our curated selection of luxury pieces
              </p>
            </div>
            <Button asChild onClick={closeCart}>
              <Link href="/collections">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                  <div className="relative w-20 h-24 bg-muted rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.size} · {item.color}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 -mt-1 -mr-1"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t pt-6 space-y-4">
              {/* Shipping Notice */}
              {shipping > 0 && (
                <div className="flex items-center gap-2 p-3 bg-luxe-gold/10 rounded-lg">
                  <Truck className="h-4 w-4 text-luxe-gold" />
                  <p className="text-sm">
                    Add {formatPrice(500 - subtotal)} more for free shipping
                  </p>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
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
                      <span className="text-luxe-gold">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                  onClick={closeCart}
                >
                  <Link href="/checkout">
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  asChild
                  onClick={closeCart}
                >
                  <Link href="/cart">
                    View Full Cart
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;