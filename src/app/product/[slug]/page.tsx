'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Truck, RefreshCw, Shield, Star, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ProductCard from '@/components/product/ProductCard';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  category: string;
  designer: string;
  materials: string[];
  care: string[];
  measurements: { [key: string]: string };
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
}

const ProductDetailPage = () => {
  const params = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product data (in a real app, this would be fetched based on the slug)
  const product: Product = {
    id: '1',
    name: 'THE ARCHER BLAZER',
    description: 'A sophisticated blazer crafted from premium Italian wool, featuring a tailored silhouette that embodies modern elegance. The Archer Blazer is designed for the contemporary woman who values both style and substance. Its clean lines and impeccable construction make it a versatile piece that transitions effortlessly from boardroom to evening occasions.',
    images: [
      { id: '1', src: '/placeholder.svg', alt: 'The Archer Blazer - Front View' },
      { id: '2', src: '/placeholder.svg', alt: 'The Archer Blazer - Back View' },
      { id: '3', src: '/placeholder.svg', alt: 'The Archer Blazer - Detail' },
      { id: '4', src: '/placeholder.svg', alt: 'The Archer Blazer - Styled' },
    ],
    variants: [
      { id: 'v1', size: 'XS', color: 'Black', price: 1200, inStock: true },
      { id: 'v2', size: 'S', color: 'Black', price: 1200, inStock: true },
      { id: 'v3', size: 'M', color: 'Black', price: 1200, inStock: true },
      { id: 'v4', size: 'L', color: 'Black', price: 1200, inStock: false },
      { id: 'v5', size: 'XS', color: 'Navy', price: 1200, inStock: true },
      { id: 'v6', size: 'S', color: 'Navy', price: 1200, inStock: true },
    ],
    category: 'Blazers',
    designer: 'Aria Collective',
    materials: ['100% Italian Wool', 'Silk Lining', 'Horn Buttons'],
    care: ['Dry clean only', 'Store on padded hangers', 'Professional pressing recommended'],
    measurements: {
      'Chest (XS)': '32"',
      'Waist (XS)': '28"',
      'Length (XS)': '25"',
      'Shoulder (XS)': '15"',
    },
    isNew: false,
    isSale: false,
    rating: 4.8,
    reviewCount: 24,
  };

  const relatedProducts = [
    {
      id: '2',
      name: 'SILK SIGNATURE SCARF',
      price: 420,
      images: ['/placeholder.svg'],
      category: 'Accessories',
      href: '/product/silk-scarf',
    },
    {
      id: '3',
      name: 'MANHATTAN COAT',
      price: 2100,
      images: ['/placeholder.svg'],
      category: 'Outerwear',
      href: '/product/manhattan-coat',
    },
    {
      id: '4',
      name: 'NOCTURE DRESS',
      price: 1890,
      images: ['/placeholder.svg'],
      category: 'Dresses',
      href: '/product/nocture-dress',
    },
  ];

  const currentVariant = product.variants.find(v => v.id === selectedVariant);
  const availableSizes = product.variants
    .filter(v => v.color === (currentVariant?.color || 'Black'))
    .map(v => ({ size: v.size, inStock: v.inStock, id: v.id }));

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (!selectedVariant || !selectedSize) {
      // Show error message
      return;
    }
    console.log('Added to cart:', { productId: product.id, variantId: selectedVariant, quantity });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-6">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-foreground">Collections</Link>
          <span>/</span>
          <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-foreground">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted luxury-shadow-lg">
              <Image
                src={product.images[selectedImageIndex].src}
                alt={product.images[selectedImageIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background/90"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur hover:bg-background/90"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              {/* Image Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-luxe-gold text-luxe-black">NEW</Badge>
                )}
                {product.isSale && (
                  <Badge className="bg-destructive text-destructive-foreground">SALE</Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  className={`aspect-square relative overflow-hidden bg-muted luxury-shadow ${
                    index === selectedImageIndex ? 'ring-2 ring-luxe-gold' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-body tracking-wide uppercase mb-2">
                    {product.category} · {product.designer}
                  </p>
                  <h1 className="font-heading text-3xl lg:text-4xl text-foreground">
                    {product.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleWishlistToggle}
                    className="hover:bg-luxe-gold/10"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isWishlisted ? 'fill-luxe-gold text-luxe-gold' : 'text-muted-foreground'
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-luxe-gold/10">
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-luxe-gold text-luxe-gold'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-medium text-foreground">
                  {formatPrice(currentVariant?.price || product.variants[0].price)}
                </span>
                {currentVariant?.originalPrice && currentVariant.originalPrice > currentVariant.price && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(currentVariant.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selection */}
              <div className="space-y-3">
                <Label className="font-heading text-base">Size</Label>
                <div className="grid grid-cols-4 gap-2">
                  {availableSizes.map(({ size, inStock, id }) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      disabled={!inStock}
                      onClick={() => {
                        setSelectedSize(size);
                        setSelectedVariant(id);
                      }}
                      className="h-12 relative"
                    >
                      {size}
                      {!inStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-px bg-destructive rotate-45" />
                        </div>
                      )}
                    </Button>
                  ))}
                </div>
                <Link href="/size-guide" className="text-sm text-muted-foreground hover:text-luxe-gold underline">
                  Size Guide
                </Link>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="font-heading text-base">Quantity</Label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14"
                onClick={handleAddToCart}
                disabled={!selectedSize}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              {!selectedSize && (
                <p className="text-sm text-muted-foreground text-center">
                  Please select a size
                </p>
              )}
            </div>

            {/* Product Benefits */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-5 w-5 text-luxe-gold" />
                <span>Free shipping on orders over $500</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RefreshCw className="h-5 w-5 text-luxe-gold" />
                <span>30-day returns & exchanges</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-5 w-5 text-luxe-gold" />
                <span>Authenticity guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-24">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="description" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none bg-transparent"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none bg-transparent"
              >
                Details & Care
              </TabsTrigger>
              <TabsTrigger 
                value="sizing" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none bg-transparent"
              >
                Sizing
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-luxe-gold rounded-none bg-transparent"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <div className="max-w-3xl">
                <p className="font-body text-muted-foreground leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-8">
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-heading text-lg mb-3">Materials</h3>
                  <ul className="space-y-1">
                    {product.materials.map((material, index) => (
                      <li key={index} className="font-body text-muted-foreground">
                        • {material}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg mb-3">Care Instructions</h3>
                  <ul className="space-y-1">
                    {product.care.map((instruction, index) => (
                      <li key={index} className="font-body text-muted-foreground">
                        • {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sizing" className="mt-8">
              <div className="max-w-3xl">
                <h3 className="font-heading text-lg mb-6">Measurements (in inches)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.measurements).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="font-body">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/size-guide" 
                  className="inline-block mt-6 text-luxe-gold hover:underline"
                >
                  View Complete Size Guide →
                </Link>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="max-w-3xl">
                <p className="font-body text-muted-foreground">
                  Customer reviews will be displayed here. This would integrate with a review system like Yotpo.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="font-heading text-3xl text-foreground mb-12 text-center">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                {...relatedProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;