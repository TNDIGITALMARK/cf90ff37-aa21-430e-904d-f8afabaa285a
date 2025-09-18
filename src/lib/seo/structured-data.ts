// Structured Data and Schema Markup for Luxe Atelier

export interface Organization {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    email: string;
  };
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export interface Product {
  "@type": "Product";
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": "Brand";
    name: string;
  };
  sku: string;
  gtin?: string;
  category: string;
  offers: {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    price: number;
    priceValidUntil?: string;
    availability: string;
    seller: {
      "@type": "Organization";
      name: string;
    };
    shippingDetails?: {
      "@type": "OfferShippingDetails";
      shippingRate: {
        "@type": "MonetaryAmount";
        value: number;
        currency: string;
      };
      shippingDestination: {
        "@type": "DefinedRegion";
        addressCountry: string;
      };
      deliveryTime: {
        "@type": "ShippingDeliveryTime";
        handlingTime: {
          "@type": "QuantitativeValue";
          minValue: number;
          maxValue: number;
          unitCode: string;
        };
        transitTime: {
          "@type": "QuantitativeValue";
          minValue: number;
          maxValue: number;
          unitCode: string;
        };
      };
    };
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
  review?: Review[];
}

export interface Review {
  "@type": "Review";
  reviewRating: {
    "@type": "Rating";
    ratingValue: number;
    bestRating: number;
  };
  author: {
    "@type": "Person";
    name: string;
  };
  reviewBody: string;
  datePublished: string;
}

export interface WebSite {
  "@type": "WebSite";
  url: string;
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface BreadcrumbList {
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }[];
}

export interface FAQPage {
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }[];
}

export interface CollectionPage {
  "@type": "CollectionPage";
  name: string;
  description: string;
  url: string;
  mainEntity: {
    "@type": "ItemList";
    numberOfItems: number;
    itemListElement: {
      "@type": "Product";
      position: number;
      name: string;
      url: string;
      image: string;
      offers: {
        "@type": "Offer";
        price: number;
        priceCurrency: string;
        availability: string;
      };
    }[];
  };
}

export class StructuredData {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://luxeatelier.com') {
    this.baseUrl = baseUrl;
  }

  // Organization Schema
  getOrganizationSchema(): Organization {
    return {
      "@type": "Organization",
      name: "Luxe Atelier",
      url: this.baseUrl,
      logo: `${this.baseUrl}/logo.png`,
      description: "Premium designer clothing and luxury fashion platform featuring curated collections from world-renowned designers.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-555-123-4567",
        contactType: "Customer Service",
        email: "concierge@luxeatelier.com",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Fashion Avenue",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10001",
        addressCountry: "US",
      },
      sameAs: [
        "https://www.instagram.com/luxeatelier",
        "https://www.facebook.com/luxeatelier",
        "https://twitter.com/luxeatelier",
        "https://www.pinterest.com/luxeatelier",
      ],
    };
  }

  // Website Schema with Search
  getWebSiteSchema(): WebSite {
    return {
      "@type": "WebSite",
      url: this.baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };
  }

  // Product Schema
  getProductSchema(product: {
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
    reviews?: Array<{
      rating: number;
      author: string;
      body: string;
      date: string;
    }>;
  }): Product {
    const availability = product.inStock 
      ? "https://schema.org/InStock" 
      : "https://schema.org/OutOfStock";

    const productSchema: Product = {
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.images,
      brand: {
        "@type": "Brand",
        name: product.brand,
      },
      sku: product.sku,
      category: product.category,
      offers: {
        "@type": "Offer",
        url: `${this.baseUrl}${product.url}`,
        priceCurrency: "USD",
        price: product.price,
        availability,
        seller: {
          "@type": "Organization",
          name: "Luxe Atelier",
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: 25,
            currency: "USD",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "US",
          },
          deliveryTime: {
            "@type": "ShippingDeliveryTime",
            handlingTime: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 3,
              unitCode: "DAY",
            },
            transitTime: {
              "@type": "QuantitativeValue",
              minValue: 3,
              maxValue: 7,
              unitCode: "DAY",
            },
          },
        },
      },
    };

    // Add aggregate rating if available
    if (product.rating && product.reviewCount) {
      productSchema.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      };
    }

    // Add reviews if available
    if (product.reviews && product.reviews.length > 0) {
      productSchema.review = product.reviews.map((review) => ({
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: 5,
        },
        author: {
          "@type": "Person",
          name: review.author,
        },
        reviewBody: review.body,
        datePublished: review.date,
      }));
    }

    return productSchema;
  }

  // Collection Page Schema
  getCollectionSchema(collection: {
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
  }): CollectionPage {
    return {
      "@type": "CollectionPage",
      name: collection.name,
      description: collection.description,
      url: `${this.baseUrl}${collection.url}`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: collection.products.length,
        itemListElement: collection.products.map((product, index) => ({
          "@type": "Product",
          position: index + 1,
          name: product.name,
          url: `${this.baseUrl}${product.url}`,
          image: product.image,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: product.inStock 
              ? "https://schema.org/InStock" 
              : "https://schema.org/OutOfStock",
          },
        })),
      },
    };
  }

  // Breadcrumb Schema
  getBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbList {
    return {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${this.baseUrl}${crumb.url}`,
      })),
    };
  }

  // FAQ Page Schema
  getFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQPage {
    return {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  // Generate JSON-LD script tag
  generateJSONLD(schema: any): string {
    const structuredData = {
      "@context": "https://schema.org",
      ...schema,
    };

    return JSON.stringify(structuredData, null, 2);
  }

  // Helper to create multiple schemas
  generateMultipleSchemas(schemas: any[]): string {
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": schemas,
    };

    return JSON.stringify(structuredData, null, 2);
  }
}

// Export default instance
export const structuredData = new StructuredData();
export default structuredData;