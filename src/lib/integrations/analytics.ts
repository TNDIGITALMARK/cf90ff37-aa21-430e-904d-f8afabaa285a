// Google Analytics 4 and Hotjar Integration

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    hj: (command: string, ...args: any[]) => void;
    _hjSettings: {
      hjid: number;
      hjsv: number;
    };
  }
}

// Google Analytics 4 Integration
export class GoogleAnalytics {
  private measurementId: string;
  private isInitialized: boolean = false;

  constructor() {
    this.measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  }

  // Initialize GA4
  init(): void {
    if (typeof window === 'undefined' || !this.measurementId || this.isInitialized) {
      return;
    }

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.gtag = window.gtag || function (...args: any[]) {
      (window.gtag as any).q = (window.gtag as any).q || [];
      (window.gtag as any).q.push(args);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
  }

  // Page view tracking
  pageView(url: string, title?: string): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', this.measurementId, {
      page_location: url,
      page_title: title || document.title,
    });
  }

  // E-commerce events
  purchase(transactionId: string, value: number, currency: string = 'USD', items: any[]): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    });
  }

  addToCart(currency: string = 'USD', value: number, items: any[]): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'add_to_cart', {
      currency: currency,
      value: value,
      items: items,
    });
  }

  removeFromCart(currency: string = 'USD', value: number, items: any[]): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'remove_from_cart', {
      currency: currency,
      value: value,
      items: items,
    });
  }

  viewItem(currency: string = 'USD', value: number, items: any[]): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'view_item', {
      currency: currency,
      value: value,
      items: items,
    });
  }

  beginCheckout(currency: string = 'USD', value: number, items: any[]): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items,
    });
  }

  addPaymentInfo(currency: string = 'USD', value: number, paymentType: string): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'add_payment_info', {
      currency: currency,
      value: value,
      payment_type: paymentType,
    });
  }

  addShippingInfo(currency: string = 'USD', value: number, shippingTier: string): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'add_shipping_info', {
      currency: currency,
      value: value,
      shipping_tier: shippingTier,
    });
  }

  viewItemList(itemListId: string, itemListName: string, items: any[]): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'view_item_list', {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: items,
    });
  }

  selectItem(itemListId: string, itemListName: string, items: any[]): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'select_item', {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: items,
    });
  }

  search(searchTerm: string): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }

  // Custom events
  customEvent(eventName: string, parameters: { [key: string]: any }): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('event', eventName, parameters);
  }

  // User identification
  setUserId(userId: string): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', this.measurementId, {
      user_id: userId,
    });
  }

  // User properties
  setUserProperties(properties: { [key: string]: any }): void {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('config', this.measurementId, {
      custom_map: properties,
    });
  }
}

// Hotjar Integration
export class Hotjar {
  private hjId: string;
  private isInitialized: boolean = false;

  constructor() {
    this.hjId = process.env.NEXT_PUBLIC_HOTJAR_ID || '';
  }

  // Initialize Hotjar
  init(): void {
    if (typeof window === 'undefined' || !this.hjId || this.isInitialized) {
      return;
    }

    window._hjSettings = {
      hjid: parseInt(this.hjId),
      hjsv: 6,
    };

    const script = document.createElement('script');
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${this.hjId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(script);

    this.isInitialized = true;
  }

  // Identify user
  identify(userId: string, attributes?: { [key: string]: any }): void {
    if (typeof window === 'undefined' || !window.hj) return;

    window.hj('identify', userId, attributes);
  }

  // Send event
  event(eventName: string): void {
    if (typeof window === 'undefined' || !window.hj) return;

    window.hj('event', eventName);
  }

  // Trigger manual recording
  trigger(triggerName: string): void {
    if (typeof window === 'undefined' || !window.hj) return;

    window.hj('trigger', triggerName);
  }

  // Virtual page view
  vpv(relativeUrl: string): void {
    if (typeof window === 'undefined' || !window.hj) return;

    window.hj('vpv', relativeUrl);
  }

  // Form analysis
  formAnalysis(): void {
    if (typeof window === 'undefined' || !window.hj) return;

    window.hj('formAnalysis');
  }
}

// Combined Analytics Manager
export class AnalyticsManager {
  private ga: GoogleAnalytics;
  private hotjar: Hotjar;
  private isInitialized: boolean = false;

  constructor() {
    this.ga = new GoogleAnalytics();
    this.hotjar = new Hotjar();
  }

  // Initialize all analytics
  init(): void {
    if (this.isInitialized) return;

    this.ga.init();
    this.hotjar.init();
    this.isInitialized = true;
  }

  // Page tracking
  pageView(url: string, title?: string): void {
    this.ga.pageView(url, title);
    this.hotjar.vpv(url);
  }

  // E-commerce tracking
  trackPurchase(transactionId: string, value: number, items: any[]): void {
    this.ga.purchase(transactionId, value, 'USD', items);
    this.hotjar.event('purchase');
  }

  trackAddToCart(value: number, items: any[]): void {
    this.ga.addToCart('USD', value, items);
    this.hotjar.event('add_to_cart');
  }

  trackRemoveFromCart(value: number, items: any[]): void {
    this.ga.removeFromCart('USD', value, items);
    this.hotjar.event('remove_from_cart');
  }

  trackViewItem(value: number, items: any[]): void {
    this.ga.viewItem('USD', value, items);
    this.hotjar.event('view_item');
  }

  trackBeginCheckout(value: number, items: any[]): void {
    this.ga.beginCheckout('USD', value, items);
    this.hotjar.event('begin_checkout');
  }

  trackSearch(searchTerm: string): void {
    this.ga.search(searchTerm);
    this.hotjar.event('search');
  }

  // User tracking
  identifyUser(userId: string, attributes?: { [key: string]: any }): void {
    this.ga.setUserId(userId);
    this.hotjar.identify(userId, attributes);
  }

  // Custom events
  trackCustomEvent(eventName: string, parameters?: { [key: string]: any }): void {
    this.ga.customEvent(eventName, parameters || {});
    this.hotjar.event(eventName);
  }

  // Luxury e-commerce specific events
  trackDesignerView(designerName: string): void {
    this.trackCustomEvent('view_designer', { designer_name: designerName });
  }

  trackCollectionView(collectionName: string): void {
    this.trackCustomEvent('view_collection', { collection_name: collectionName });
  }

  trackWishlistAdd(productId: string, productName: string): void {
    this.trackCustomEvent('add_to_wishlist', { 
      product_id: productId,
      product_name: productName,
    });
  }

  trackVipSignup(tier: string): void {
    this.trackCustomEvent('vip_signup', { vip_tier: tier });
  }

  trackNewsletterSignup(): void {
    this.trackCustomEvent('newsletter_signup');
  }

  trackLiveChat(): void {
    this.trackCustomEvent('live_chat_started');
  }

  trackSizeGuide(): void {
    this.trackCustomEvent('size_guide_viewed');
  }

  trackProductRecommendation(productId: string, source: string): void {
    this.trackCustomEvent('product_recommendation_clicked', {
      product_id: productId,
      recommendation_source: source,
    });
  }
}

// Export singleton instance
export const analytics = new AnalyticsManager();
export default analytics;