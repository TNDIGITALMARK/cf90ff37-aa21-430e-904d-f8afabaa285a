export const dynamic = 'force-dynamic'

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';

export default function HomePage() {
  // Sample featured products data
  const featuredProducts = [
    {
      id: '1',
      name: 'THE ARCHER BLAZER',
      price: 1200,
      originalPrice: undefined,
      images: ['/placeholder.svg'],
      category: 'BLAZERS',
      isNew: false,
      isSale: false,
      href: '/product/archer-blazer',
    },
    {
      id: '2',
      name: 'NOCTURE DRESS',
      price: 1890,
      originalPrice: undefined,
      images: ['/placeholder.svg'],
      category: 'DRESSES',
      isNew: true,
      isSale: false,
      href: '/product/nocture-dress',
    },
    {
      id: '3',
      name: 'ECHO LEATHER BOOTS',
      price: 1750,
      originalPrice: undefined,
      images: ['/placeholder.svg'],
      category: 'FOOTWEAR',
      isNew: false,
      isSale: false,
      href: '/product/echo-leather-boots',
    },
    {
      id: '4',
      name: 'STELLAR TOTE',
      price: 1400,
      originalPrice: undefined,
      images: ['/placeholder.svg'],
      category: 'ACCESSORIES',
      isNew: false,
      isSale: false,
      href: '/product/stellar-tote',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-muted">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-muted/80 to-muted/40"
          style={{
            backgroundImage: "url('/placeholder.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            UNVEIL YOUR ESSENCE
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience Curated Elegance
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-sm tracking-wider font-medium"
            asChild
          >
            <Link href="/collections">
              SHOP THE COLLECTION
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              FEATURED COLLECTIONS
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of luxury pieces, each chosen for its exceptional craftsmanship and timeless appeal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
              asChild
            >
              <Link href="/collections">
                VIEW ALL COLLECTIONS
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Designer Spotlight */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-luxe-gold text-luxe-black font-medium w-fit">
                    DESIGNER SPOTLIGHT
                  </Badge>
                  <h2 className="font-heading text-3xl md:text-4xl text-foreground">
                    Craftsmanship Meets Innovation
                  </h2>
                  <p className="font-body text-muted-foreground text-lg leading-relaxed">
                    Each piece in our collection represents a collaboration with the world's most visionary designers. From emerging talents to established masters, every creation tells a story of artisanal excellence and contemporary sophistication.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    asChild
                  >
                    <Link href="/designers">
                      MEET OUR DESIGNERS
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <Link href="/about">
                      OUR STORY
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] relative overflow-hidden luxury-shadow-lg">
                  <div 
                    className="absolute inset-0 bg-muted"
                    style={{
                      backgroundImage: "url('/placeholder.svg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Services */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              EXCLUSIVE SERVICES
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Beyond exceptional fashion, we offer personalized services designed to elevate your luxury shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-luxe-gold rounded-full"></div>
              </div>
              <h3 className="font-heading text-xl text-foreground">Personal Styling</h3>
              <p className="font-body text-muted-foreground">
                One-on-one consultations with our expert stylists to curate pieces that perfectly complement your lifestyle and aesthetic.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-luxe-gold rounded-full"></div>
              </div>
              <h3 className="font-heading text-xl text-foreground">Exclusive Access</h3>
              <p className="font-body text-muted-foreground">
                First access to limited collections, designer collaborations, and invitation-only events in our luxury showrooms.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-luxe-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-luxe-gold rounded-full"></div>
              </div>
              <h3 className="font-heading text-xl text-foreground">Concierge Service</h3>
              <p className="font-body text-muted-foreground">
                White-glove delivery, custom alterations, and 24/7 client support to ensure every detail exceeds expectations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}