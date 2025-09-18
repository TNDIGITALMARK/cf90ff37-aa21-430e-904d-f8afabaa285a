import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
  metadata?: { [key: string]: string };
}

export interface PaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  billing_details: {
    name?: string;
    email?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
}

export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
  };
  payment_methods: PaymentMethod[];
  default_source?: string;
  created: number;
}

export interface CheckoutSession {
  id: string;
  url: string;
  success_url: string;
  cancel_url: string;
  payment_status: string;
  amount_total: number;
  currency: string;
  customer_details?: {
    email?: string;
    name?: string;
  };
  metadata?: { [key: string]: string };
}

export const stripeApi = {
  // Payment Intent functions
  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    metadata: { [key: string]: string } = {},
    customerId?: string
  ): Promise<PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata,
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret || '',
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  },

  async confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string): Promise<PaymentIntent> {
    try {
      const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret || '',
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      console.error('Error confirming payment intent:', error);
      throw error;
    }
  },

  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent | null> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret || '',
        metadata: paymentIntent.metadata,
      };
    } catch (error) {
      console.error('Error retrieving payment intent:', error);
      return null;
    }
  },

  // Customer functions
  async createCustomer(
    email: string,
    name?: string,
    phone?: string,
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    },
    metadata: { [key: string]: string } = {}
  ): Promise<StripeCustomer> {
    try {
      const customer = await stripe.customers.create({
        email,
        name,
        phone,
        address,
        metadata,
      });

      return {
        id: customer.id,
        email: customer.email || '',
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address || undefined,
        payment_methods: [],
        default_source: customer.default_source as string || undefined,
        created: customer.created,
      };
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  async getCustomer(customerId: string): Promise<StripeCustomer | null> {
    try {
      const customer = await stripe.customers.retrieve(customerId);
      
      if (customer.deleted) return null;

      // Get payment methods for customer
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return {
        id: customer.id,
        email: customer.email || '',
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address || undefined,
        payment_methods: paymentMethods.data.map(pm => ({
          id: pm.id,
          type: pm.type,
          card: pm.card ? {
            brand: pm.card.brand,
            last4: pm.card.last4,
            exp_month: pm.card.exp_month,
            exp_year: pm.card.exp_year,
          } : undefined,
          billing_details: pm.billing_details,
        })),
        default_source: customer.default_source as string || undefined,
        created: customer.created,
      };
    } catch (error) {
      console.error('Error retrieving customer:', error);
      return null;
    }
  },

  async updateCustomer(
    customerId: string,
    updates: {
      email?: string;
      name?: string;
      phone?: string;
      address?: {
        line1?: string;
        line2?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
      };
      metadata?: { [key: string]: string };
    }
  ): Promise<StripeCustomer> {
    try {
      const customer = await stripe.customers.update(customerId, updates);

      return {
        id: customer.id,
        email: customer.email || '',
        name: customer.name || undefined,
        phone: customer.phone || undefined,
        address: customer.address || undefined,
        payment_methods: [],
        default_source: customer.default_source as string || undefined,
        created: customer.created,
      };
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },

  // Checkout Session functions
  async createCheckoutSession(
    items: {
      price_data: {
        currency: string;
        product_data: {
          name: string;
          description?: string;
          images?: string[];
          metadata?: { [key: string]: string };
        };
        unit_amount: number;
      };
      quantity: number;
    }[],
    successUrl: string,
    cancelUrl: string,
    customerId?: string,
    metadata: { [key: string]: string } = {}
  ): Promise<CheckoutSession> {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer: customerId,
        metadata,
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB', 'AU', 'FR', 'DE', 'IT', 'ES'],
        },
        billing_address_collection: 'required',
        allow_promotion_codes: true,
      });

      return {
        id: session.id,
        url: session.url || '',
        success_url: session.success_url || '',
        cancel_url: session.cancel_url || '',
        payment_status: session.payment_status || '',
        amount_total: session.amount_total || 0,
        currency: session.currency || 'usd',
        customer_details: session.customer_details ? {
          email: session.customer_details.email || undefined,
          name: session.customer_details.name || undefined,
        } : undefined,
        metadata: session.metadata || {},
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  async getCheckoutSession(sessionId: string): Promise<CheckoutSession | null> {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      return {
        id: session.id,
        url: session.url || '',
        success_url: session.success_url || '',
        cancel_url: session.cancel_url || '',
        payment_status: session.payment_status || '',
        amount_total: session.amount_total || 0,
        currency: session.currency || 'usd',
        customer_details: session.customer_details ? {
          email: session.customer_details.email || undefined,
          name: session.customer_details.name || undefined,
        } : undefined,
        metadata: session.metadata || {},
      };
    } catch (error) {
      console.error('Error retrieving checkout session:', error);
      return null;
    }
  },

  // Payment Method functions
  async attachPaymentMethod(paymentMethodId: string, customerId: string): Promise<PaymentMethod> {
    try {
      const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      return {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod.card ? {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          exp_month: paymentMethod.card.exp_month,
          exp_year: paymentMethod.card.exp_year,
        } : undefined,
        billing_details: paymentMethod.billing_details,
      };
    } catch (error) {
      console.error('Error attaching payment method:', error);
      throw error;
    }
  },

  async detachPaymentMethod(paymentMethodId: string): Promise<void> {
    try {
      await stripe.paymentMethods.detach(paymentMethodId);
    } catch (error) {
      console.error('Error detaching payment method:', error);
      throw error;
    }
  },

  // Webhook functions
  constructEvent(payload: string | Buffer, sig: string): any {
    try {
      return stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (error) {
      console.error('Error constructing webhook event:', error);
      throw error;
    }
  },

  // Utility functions
  formatAmount(amount: number, currency: string = 'usd'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100); // Convert from cents
  },
};

export default stripeApi;