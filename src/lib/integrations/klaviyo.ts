// Klaviyo Email Marketing Integration

interface KlaviyoProfile {
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  properties?: {
    [key: string]: any;
  };
}

interface KlaviyoEvent {
  event: string;
  customer_properties: KlaviyoProfile;
  properties?: {
    [key: string]: any;
  };
  time?: number;
}

export class KlaviyoApi {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.KLAVIYO_API_KEY || '';
    this.baseUrl = 'https://a.klaviyo.com/api';
  }

  private async request(endpoint: string, method: string = 'GET', body?: any) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Authorization': `Klaviyo-API-Key ${this.apiKey}`,
      'Content-Type': 'application/json',
      'revision': '2024-06-15',
    };

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Klaviyo API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Klaviyo API request failed:', error);
      throw error;
    }
  }

  // Profile Management
  async createOrUpdateProfile(profile: KlaviyoProfile): Promise<any> {
    const payload = {
      data: {
        type: 'profile',
        attributes: {
          email: profile.email,
          first_name: profile.first_name,
          last_name: profile.last_name,
          phone_number: profile.phone_number,
          properties: profile.properties,
        },
      },
    };

    return this.request('/profiles/', 'POST', payload);
  }

  async getProfile(profileId: string): Promise<any> {
    return this.request(`/profiles/${profileId}/`);
  }

  async updateProfile(profileId: string, updates: Partial<KlaviyoProfile>): Promise<any> {
    const payload = {
      data: {
        type: 'profile',
        id: profileId,
        attributes: updates,
      },
    };

    return this.request(`/profiles/${profileId}/`, 'PATCH', payload);
  }

  // Event Tracking
  async trackEvent(event: KlaviyoEvent): Promise<any> {
    const payload = {
      data: {
        type: 'event',
        attributes: {
          metric: {
            data: {
              type: 'metric',
              attributes: {
                name: event.event,
              },
            },
          },
          profile: {
            data: {
              type: 'profile',
              attributes: event.customer_properties,
            },
          },
          properties: event.properties,
          time: event.time ? new Date(event.time * 1000).toISOString() : new Date().toISOString(),
        },
      },
    };

    return this.request('/events/', 'POST', payload);
  }

  // E-commerce specific events
  async trackViewedProduct(email: string, product: {
    item_name: string;
    item_id: string;
    categories?: string[];
    image_url?: string;
    url?: string;
    brand?: string;
    price?: number;
    compare_at_price?: number;
  }): Promise<any> {
    return this.trackEvent({
      event: 'Viewed Product',
      customer_properties: { email },
      properties: {
        'Product Name': product.item_name,
        'Product ID': product.item_id,
        'Categories': product.categories,
        'Image URL': product.image_url,
        'URL': product.url,
        'Brand': product.brand,
        'Price': product.price,
        'Compare At Price': product.compare_at_price,
      },
    });
  }

  async trackAddedToCart(email: string, product: {
    item_name: string;
    item_id: string;
    quantity: number;
    price: number;
    image_url?: string;
    url?: string;
    brand?: string;
  }): Promise<any> {
    return this.trackEvent({
      event: 'Added to Cart',
      customer_properties: { email },
      properties: {
        'Product Name': product.item_name,
        'Product ID': product.item_id,
        'Quantity': product.quantity,
        'Price': product.price,
        'Image URL': product.image_url,
        'URL': product.url,
        'Brand': product.brand,
      },
    });
  }

  async trackStartedCheckout(email: string, cart: {
    total_price: number;
    items: Array<{
      item_name: string;
      item_id: string;
      quantity: number;
      price: number;
    }>;
  }): Promise<any> {
    return this.trackEvent({
      event: 'Started Checkout',
      customer_properties: { email },
      properties: {
        'Total Price': cart.total_price,
        'Items': cart.items,
        'Item Count': cart.items.length,
      },
    });
  }

  async trackPlacedOrder(email: string, order: {
    order_id: string;
    total_price: number;
    items: Array<{
      item_name: string;
      item_id: string;
      quantity: number;
      price: number;
    }>;
    discount_code?: string;
    discount_value?: number;
  }): Promise<any> {
    return this.trackEvent({
      event: 'Placed Order',
      customer_properties: { email },
      properties: {
        'Order ID': order.order_id,
        'Total Price': order.total_price,
        'Items': order.items,
        'Item Count': order.items.length,
        'Discount Code': order.discount_code,
        'Discount Value': order.discount_value,
      },
    });
  }

  async trackOrderFulfilled(email: string, order: {
    order_id: string;
    total_price: number;
    items: Array<{
      item_name: string;
      item_id: string;
      quantity: number;
      price: number;
    }>;
    tracking_number?: string;
  }): Promise<any> {
    return this.trackEvent({
      event: 'Fulfilled Order',
      customer_properties: { email },
      properties: {
        'Order ID': order.order_id,
        'Total Price': order.total_price,
        'Items': order.items,
        'Item Count': order.items.length,
        'Tracking Number': order.tracking_number,
      },
    });
  }

  // List Management
  async addProfileToList(listId: string, email: string): Promise<any> {
    const payload = {
      data: [
        {
          type: 'profile',
          attributes: {
            email,
            subscriptions: {
              email: {
                marketing: {
                  consent: 'SUBSCRIBED',
                },
              },
            },
          },
        },
      ],
    };

    return this.request(`/lists/${listId}/relationships/profiles/`, 'POST', payload);
  }

  async removeProfileFromList(listId: string, profileId: string): Promise<any> {
    const payload = {
      data: [
        {
          type: 'profile',
          id: profileId,
        },
      ],
    };

    return this.request(`/lists/${listId}/relationships/profiles/`, 'DELETE', payload);
  }

  // Newsletter Subscription
  async subscribeToNewsletter(
    email: string,
    firstName?: string,
    lastName?: string,
    properties?: { [key: string]: any }
  ): Promise<any> {
    const profile: KlaviyoProfile = {
      email,
      first_name: firstName,
      last_name: lastName,
      properties: {
        ...properties,
        'Newsletter Subscription': true,
        'Subscription Date': new Date().toISOString(),
      },
    };

    // Create or update profile
    await this.createOrUpdateProfile(profile);

    // Track subscription event
    return this.trackEvent({
      event: 'Subscribed to Newsletter',
      customer_properties: profile,
      properties: {
        'List': 'Newsletter',
        'Source': 'Website',
      },
    });
  }

  // VIP Program Events
  async trackVipEnrollment(email: string, tier: string): Promise<any> {
    return this.trackEvent({
      event: 'VIP Enrolled',
      customer_properties: { 
        email,
        properties: {
          'VIP Tier': tier,
          'VIP Enrollment Date': new Date().toISOString(),
        },
      },
      properties: {
        'VIP Tier': tier,
        'Enrollment Date': new Date().toISOString(),
      },
    });
  }

  async trackVipUpgrade(email: string, oldTier: string, newTier: string): Promise<any> {
    return this.trackEvent({
      event: 'VIP Tier Upgraded',
      customer_properties: { 
        email,
        properties: {
          'VIP Tier': newTier,
        },
      },
      properties: {
        'Previous Tier': oldTier,
        'New Tier': newTier,
        'Upgrade Date': new Date().toISOString(),
      },
    });
  }

  // Segmentation
  async createSegment(name: string, definition: any): Promise<any> {
    const payload = {
      data: {
        type: 'segment',
        attributes: {
          name,
          definition,
        },
      },
    };

    return this.request('/segments/', 'POST', payload);
  }

  // Campaign Management
  async getCampaigns(): Promise<any> {
    return this.request('/campaigns/');
  }

  async getCampaign(campaignId: string): Promise<any> {
    return this.request(`/campaigns/${campaignId}/`);
  }
}

// Export singleton instance
export const klaviyoApi = new KlaviyoApi();
export default klaviyoApi;