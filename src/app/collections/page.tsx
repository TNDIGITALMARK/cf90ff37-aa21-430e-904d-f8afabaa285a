'use client';

import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import ProductCard from '@/components/product/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  designer: string;
  color: string;
  size: string[];
  isNew?: boolean;
  isSale?: boolean;
  href: string;
}

const CollectionsPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample products data
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'THE ARCHER BLAZER',
      price: 1200,
      images: ['/placeholder.svg'],
      category: 'Blazers',
      designer: 'Aria Collective',
      color: 'Black',
      size: ['XS', 'S', 'M', 'L'],
      isNew: false,
      isSale: false,
      href: '/product/archer-blazer',
    },
    {
      id: '2',
      name: 'NOCTURE DRESS',
      price: 1890,
      images: ['/placeholder.svg'],
      category: 'Dresses',
      designer: 'Luna Noir',
      color: 'Midnight Blue',
      size: ['XS', 'S', 'M'],
      isNew: true,
      isSale: false,
      href: '/product/nocture-dress',
    },
    {
      id: '3',
      name: 'ECHO LEATHER BOOTS',
      price: 1750,
      images: ['/placeholder.svg'],
      category: 'Footwear',
      designer: 'Heritage Craft',
      color: 'Black',
      size: ['36', '37', '38', '39', '40'],
      isNew: false,
      isSale: false,
      href: '/product/echo-leather-boots',
    },
    {
      id: '4',
      name: 'STELLAR TOTE',
      price: 1400,
      images: ['/placeholder.svg'],
      category: 'Accessories',
      designer: 'Modern Edge',
      color: 'Cognac',
      size: ['One Size'],
      isNew: false,
      isSale: false,
      href: '/product/stellar-tote',
    },
    {
      id: '5',
      name: 'SILK SIGNATURE SCARF',
      price: 420,
      originalPrice: 580,
      images: ['/placeholder.svg'],
      category: 'Accessories',
      designer: 'Atelier Luxe',
      color: 'Gold',
      size: ['One Size'],
      isNew: false,
      isSale: true,
      href: '/product/silk-scarf',
    },
    {
      id: '6',
      name: 'MANHATTAN COAT',
      price: 2100,
      images: ['/placeholder.svg'],
      category: 'Outerwear',
      designer: 'Urban Elite',
      color: 'Camel',
      size: ['XS', 'S', 'M', 'L', 'XL'],
      isNew: true,
      isSale: false,
      href: '/product/manhattan-coat',
    },
  ];

  const categories = [...new Set(allProducts.map(p => p.category))];
  const designers = [...new Set(allProducts.map(p => p.designer))];
  const colors = [...new Set(allProducts.map(p => p.color))];
  const sizes = [...new Set(allProducts.flatMap(p => p.size))];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesDesigner = selectedDesigners.length === 0 || selectedDesigners.includes(product.designer);
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
      const matchesSize = selectedSizes.length === 0 || product.size.some(size => selectedSizes.includes(size));

      return matchesPrice && matchesCategory && matchesDesigner && matchesColor && matchesSize;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  }, [allProducts, priceRange, selectedCategories, selectedDesigners, selectedColors, selectedSizes, sortBy]);

  const toggleFilter = (value: string, currentFilters: string[], setFilters: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter(item => item !== value));
    } else {
      setFilters([...currentFilters, value]);
    }
  };

  const clearAllFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setSelectedDesigners([]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  const activeFiltersCount = selectedCategories.length + selectedDesigners.length + selectedColors.length + selectedSizes.length;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
              />
              <Label htmlFor={`category-${category}`} className="font-body text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Designers */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg">Designer</h3>
        <div className="space-y-2">
          {designers.map((designer) => (
            <div key={designer} className="flex items-center space-x-2">
              <Checkbox
                id={`designer-${designer}`}
                checked={selectedDesigners.includes(designer)}
                onCheckedChange={() => toggleFilter(designer, selectedDesigners, setSelectedDesigners)}
              />
              <Label htmlFor={`designer-${designer}`} className="font-body text-sm">
                {designer}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg">Color</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => toggleFilter(color, selectedColors, setSelectedColors)}
              />
              <Label htmlFor={`color-${color}`} className="font-body text-sm">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? "default" : "outline"}
              size="sm"
              className="h-8"
              onClick={() => toggleFilter(size, selectedSizes, setSelectedSizes)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
              COLLECTIONS
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of luxury fashion pieces, each chosen for its exceptional quality and timeless design.
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl">Filters</h2>
                {activeFiltersCount > 0 && (
                  <Badge className="bg-luxe-gold text-luxe-black">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center gap-4">
                <p className="font-body text-muted-foreground">
                  {filteredProducts.length} products
                </p>
                {activeFiltersCount > 0 && (
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {activeFiltersCount} filters applied
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-2 bg-luxe-gold text-luxe-black text-xs">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="font-heading">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none border-l"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    className={viewMode === 'list' ? 'flex gap-6' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="font-body text-muted-foreground text-lg mb-4">
                  No products found matching your filters.
                </p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;