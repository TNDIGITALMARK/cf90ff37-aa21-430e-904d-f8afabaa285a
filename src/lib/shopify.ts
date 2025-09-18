import Client from 'shopify-buy';

// Initialize Shopify Buy client
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
});

// Shopify Types
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: ShopifyImage[];
  variants: ShopifyProductVariant[];
  options: ShopifyProductOption[];
  tags: string[];
  productType: string;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  seo: {
    title?: string;
    description?: string;
  };
  metafields: ShopifyMetafield[];
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  weight: number;
  availableForSale: boolean;
  sku: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
  quantityAvailable: number;
}

export interface ShopifyProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifyImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
}

export interface ShopifyMetafield {
  id: string;
  namespace: string;
  key: string;
  value: string;
  type: string;
  description?: string;
}

export interface ShopifyCheckout {
  id: string;
  webUrl: string;
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalTax: {
    amount: string;
    currencyCode: string;
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: ShopifyLineItem[];
  shippingAddress?: ShopifyAddress;
  billingAddress?: ShopifyAddress;
  email?: string;
  phone?: string;
  shippingLine?: {
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
  };
  taxLines: {
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    rate: number;
  }[];
  discountApplications: any[];
  note?: string;
  customAttributes: {
    key: string;
    value: string;
  }[];
  completedAt?: string;
}

export interface ShopifyLineItem {
  id: string;
  title: string;
  variant: ShopifyProductVariant;
  quantity: number;
  customAttributes: {
    key: string;
    value: string;
  }[];
  discountAllocations: any[];
}

export interface ShopifyAddress {
  id?: string;
  address1: string;
  address2?: string;
  city: string;
  company?: string;
  country: string;
  firstName: string;
  lastName: string;
  phone?: string;
  province: string;
  zip: string;
}

export interface ShopifyCustomer {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  defaultAddress?: ShopifyAddress;
  addresses: ShopifyAddress[];
  orders: ShopifyOrder[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  acceptsMarketing: boolean;
}

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  subtotalPrice: {
    amount: string;
    currencyCode: string;
  };
  totalShippingPrice: {
    amount: string;
    currencyCode: string;
  };
  totalTax: {
    amount: string;
    currencyCode: string;
  };
  lineItems: ShopifyLineItem[];
  shippingAddress?: ShopifyAddress;
  billingAddress?: ShopifyAddress;
  fulfillmentStatus: string;
  financialStatus: string;
  email: string;
  phone?: string;
  statusUrl: string;
}

// Shopify API functions
export const shopifyApi = {
  // Product functions
  async getAllProducts(first: number = 20, after?: string): Promise<ShopifyProduct[]> {
    try {
      const products = await client.product.fetchAll(first);
      return products as ShopifyProduct[];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  async getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
    try {
      const product = await client.product.fetchByHandle(handle);
      return product as ShopifyProduct | null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async getProductById(id: string): Promise<ShopifyProduct | null> {
    try {
      const product = await client.product.fetch(id);
      return product as ShopifyProduct | null;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return null;
    }
  },

  async getProductRecommendations(productId: string): Promise<ShopifyProduct[]> {
    try {
      // This would typically use Shopify's product recommendations API
      // For now, we'll fetch related products by similar tags
      const product = await this.getProductById(productId);
      if (!product) return [];

      const allProducts = await this.getAllProducts(50);
      return allProducts
        .filter((p) => p.id !== productId && p.tags.some((tag) => product.tags.includes(tag)))
        .slice(0, 4);
    } catch (error) {
      console.error('Error fetching product recommendations:', error);
      return [];
    }
  },

  // Collection functions
  async getCollections(): Promise<any[]> {
    try {
      const collections = await client.collection.fetchAllWithProducts();
      return collections;
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  },

  async getCollectionByHandle(handle: string): Promise<any | null> {
    try {
      const collection = await client.collection.fetchByHandle(handle);
      return collection;
    } catch (error) {
      console.error('Error fetching collection:', error);
      return null;
    }
  },

  // Checkout functions
  async createCheckout(): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.create();
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error creating checkout:', error);
      throw error;
    }
  },

  async addLineItemsToCheckout(
    checkoutId: string,
    lineItemsToAdd: { variantId: string; quantity: number; customAttributes?: { key: string; value: string }[] }[]
  ): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error adding line items to checkout:', error);
      throw error;
    }
  },

  async updateLineItemsInCheckout(
    checkoutId: string,
    lineItemsToUpdate: { id: string; quantity: number; variantId?: string }[]
  ): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error updating line items in checkout:', error);
      throw error;
    }
  },

  async removeLineItemsFromCheckout(checkoutId: string, lineItemIds: string[]): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIds);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error removing line items from checkout:', error);
      throw error;
    }
  },

  async fetchCheckout(checkoutId: string): Promise<ShopifyCheckout | null> {
    try {
      const checkout = await client.checkout.fetch(checkoutId);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error fetching checkout:', error);
      return null;
    }
  },

  async updateCheckoutAttributes(
    checkoutId: string,
    customAttributes: { key: string; value: string }[]
  ): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.updateAttributes(checkoutId, {
        customAttributes,
      });
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error updating checkout attributes:', error);
      throw error;
    }
  },

  async updateCheckoutShippingAddress(checkoutId: string, shippingAddress: ShopifyAddress): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.updateShippingAddress(checkoutId, shippingAddress);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error updating shipping address:', error);
      throw error;
    }
  },

  async fetchShippingRates(checkoutId: string): Promise<any[]> {
    try {
      const checkout = await this.fetchCheckout(checkoutId);
      return checkout?.availableShippingRates?.shippingRates || [];
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
      return [];
    }
  },

  async updateCheckoutShippingLine(checkoutId: string, shippingRateHandle: string): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.updateShippingLine(checkoutId, shippingRateHandle);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error updating shipping line:', error);
      throw error;
    }
  },

  async applyDiscountCode(checkoutId: string, discountCode: string): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.addDiscount(checkoutId, discountCode);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error applying discount code:', error);
      throw error;
    }
  },

  async removeDiscountCode(checkoutId: string, discountCode: string): Promise<ShopifyCheckout> {
    try {
      const checkout = await client.checkout.removeDiscount(checkoutId, discountCode);
      return checkout as ShopifyCheckout;
    } catch (error) {
      console.error('Error removing discount code:', error);
      throw error;
    }
  },

  // Utility functions
  formatPrice(price: { amount: string; currencyCode: string }): string {
    const amount = parseFloat(price.amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currencyCode,
    }).format(amount);
  },

  getOptimizedImageUrl(image: ShopifyImage, width?: number, height?: number): string {
    if (!image?.url) return '';
    
    let url = image.url;
    const params = new URLSearchParams();
    
    if (width) params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    
    const queryString = params.toString();
    return queryString ? `${url}&${queryString}` : url;
  },

  // Search functions
  async searchProducts(query: string, first: number = 20): Promise<ShopifyProduct[]> {
    try {
      // For basic search, filter products by title
      const allProducts = await this.getAllProducts(100);
      return allProducts
        .filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, first);
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },
};

export default shopifyApi;