'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  href: string;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  images,
  category,
  isNew = false,
  isSale = false,
  href,
  className = '',
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic
    console.log('Added to cart:', id);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <Link href={href}>
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <Image
            src={images[currentImageIndex] || '/placeholder.svg'}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-luxe-gold text-luxe-black font-medium">
                NEW
              </Badge>
            )}
            {isSale && (
              <Badge className="bg-destructive text-destructive-foreground font-medium">
                SALE
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={`h-5 w-5 ${
                isWishlisted
                  ? 'fill-luxe-gold text-luxe-gold'
                  : 'text-muted-foreground'
              }`}
            />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary/90 backdrop-blur text-primary-foreground hover:bg-primary"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {/* Image Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentImageIndex
                      ? 'bg-luxe-gold'
                      : 'bg-background/60'
                  }`}
                  onMouseEnter={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="pt-4 space-y-2">
          <div className="text-sm text-muted-foreground font-body tracking-wide uppercase">
            {category}
          </div>
          <h3 className="font-heading text-lg text-foreground group-hover:text-luxe-gold transition-colors">
            {name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-foreground">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;