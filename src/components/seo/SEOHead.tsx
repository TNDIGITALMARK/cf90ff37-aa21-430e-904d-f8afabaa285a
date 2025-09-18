'use client';

import Head from 'next/head';
import { structuredData } from '@/lib/seo/structured-data';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  robots?: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
  product?: {
    name: string;
    description: string;
    images: string[];
    brand: string;
    sku: string;
    category: string;
    url: string;
    price: number;
    compareAtPrice?: number;
    inStock: boolean;
    rating?: number;
    reviewCount?: number;
  };
  collection?: {
    name: string;
    description: string;
    url: string;
    products: Array<{
      name: string;
      url: string;
      image: string;
      price: number;
      inStock: boolean;
    }>;
  };
  faqs?: Array<{ question: string; answer: string }>;
}

const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  robots = 'index,follow',
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage = '/og-default.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
  breadcrumbs,
  product,
  collection,
  faqs,
}) => {
  const baseUrl = 'https://luxeatelier.com';
  const currentUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;
  
  // Generate structured data
  const schemas = [];
  
  // Always include organization and website schema
  schemas.push(structuredData.getOrganizationSchema());
  schemas.push(structuredData.getWebSiteSchema());
  
  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(structuredData.getBreadcrumbSchema(breadcrumbs));
  }
  
  // Add product schema if provided
  if (product) {
    schemas.push(structuredData.getProductSchema(product));
  }
  
  // Add collection schema if provided
  if (collection) {
    schemas.push(structuredData.getCollectionSchema(collection));
  }
  
  // Add FAQ schema if provided
  if (faqs && faqs.length > 0) {
    schemas.push(structuredData.getFAQSchema(faqs));
  }
  
  // Add custom schema if provided
  if (schema) {
    schemas.push(schema);
  }

  const jsonLd = structuredData.generateMultipleSchemas(schemas);

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="robots" content={robots} />
      <meta name="author" content="Luxe Atelier" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content="Luxe Atelier" />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`} />
      <meta property="og:image:alt" content={ogTitle || title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@luxeatelier" />
      <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      <meta name="twitter:image" content={twitterImage || (ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`)} />
      <meta name="twitter:image:alt" content={twitterTitle || ogTitle || title} />
      
      {/* Product-specific meta tags */}
      {product && (
        <>
          <meta property="product:price:amount" content={product.price.toString()} />
          <meta property="product:price:currency" content="USD" />
          <meta property="product:availability" content={product.inStock ? "in stock" : "out of stock"} />
          <meta property="product:brand" content={product.brand} />
          <meta property="product:category" content={product.category} />
        </>
      )}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#010203" />
      <meta name="msapplication-TileColor" content="#010203" />
      <meta name="apple-mobile-web-app-title" content="Luxe Atelier" />
      <meta name="application-name" content="Luxe Atelier" />
      
      {/* Language and Region */}
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href={currentUrl} />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.ctfassets.net" />
      <link rel="preconnect" href="https://cdn.shopify.com" />
      
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      
      {/* Additional meta tags for luxury e-commerce */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Security headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Favicon and app icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SEOHead;