'use client';

import React, { useEffect, useState } from 'react';
import { analytics } from '@/lib/integrations/analytics';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

const PerformanceOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize analytics
    analytics.init();

    // Performance optimization
    optimizePerformance();

    // Measure Core Web Vitals
    measureCoreWebVitals();

    setIsLoaded(true);
  }, []);

  const optimizePerformance = () => {
    // Preload critical resources
    preloadCriticalResources();

    // Optimize images
    optimizeImages();

    // Implement service worker for caching
    registerServiceWorker();

    // Prefetch likely navigation targets
    prefetchNavigation();
  };

  const preloadCriticalResources = () => {
    // Preload critical CSS
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    ];

    criticalFonts.forEach((font) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'style';
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Preload hero images
    const heroImages = [
      '/hero-image-1.jpg',
      '/hero-image-2.jpg',
    ];

    heroImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      document.head.appendChild(link);
    });
  };

  const optimizeImages = () => {
    // Lazy load images that are not immediately visible
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach((img) => {
        const image = img as HTMLImageElement;
        image.src = image.dataset.src || '';
      });
    }
  };

  const registerServiceWorker = () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
  };

  const prefetchNavigation = () => {
    // Prefetch likely next pages on hover
    const prefetchLinks = [
      '/collections',
      '/new-arrivals',
      '/designers',
      '/account',
    ];

    prefetchLinks.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  };

  const measureCoreWebVitals = () => {
    // Web Vitals measurement
    if (typeof window === 'undefined') return;

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        const fcp = fcpEntry.startTime;
        setMetrics((prev) => ({ ...prev, fcp }));
        
        // Track in analytics
        analytics.trackCustomEvent('core_web_vital_fcp', { value: fcp });
      }
    });
    
    try {
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Fallback for browsers that don't support paint timing
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = lastEntry.startTime;
      setMetrics((prev) => ({ ...prev, lcp }));
      
      // Track in analytics
      analytics.trackCustomEvent('core_web_vital_lcp', { value: lcp });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Fallback
    }

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        setMetrics((prev) => ({ ...prev, fid }));
        
        // Track in analytics
        analytics.trackCustomEvent('core_web_vital_fid', { value: fid });
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Fallback
    }

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      setMetrics((prev) => ({ ...prev, cls: clsValue }));
      
      // Track in analytics
      analytics.trackCustomEvent('core_web_vital_cls', { value: clsValue });
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Fallback
    }

    // Time to First Byte (TTFB)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      setMetrics((prev) => ({ ...prev, ttfb }));
      
      // Track in analytics
      analytics.trackCustomEvent('core_web_vital_ttfb', { value: ttfb });
    }
  };

  // Report performance metrics to analytics
  useEffect(() => {
    if (Object.keys(metrics).length > 0) {
      // Send performance data to analytics
      const performanceData = {
        ...metrics,
        userAgent: navigator.userAgent,
        connectionType: (navigator as any).connection?.effectiveType,
        timestamp: Date.now(),
      };
      
      // Store in localStorage for debugging (development only)
      if (process.env.NODE_ENV === 'development') {
        localStorage.setItem('performance-metrics', JSON.stringify(performanceData));
      }
    }
  }, [metrics]);

  // Performance budget monitoring
  useEffect(() => {
    if (metrics.lcp && metrics.lcp > 2500) {
      console.warn('LCP exceeds recommended threshold (2.5s):', metrics.lcp);
    }
    
    if (metrics.fid && metrics.fid > 100) {
      console.warn('FID exceeds recommended threshold (100ms):', metrics.fid);
    }
    
    if (metrics.cls && metrics.cls > 0.1) {
      console.warn('CLS exceeds recommended threshold (0.1):', metrics.cls);
    }
  }, [metrics]);

  // Critical resource hints
  useEffect(() => {
    // DNS prefetch for external domains
    const externalDomains = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//images.ctfassets.net',
      '//cdn.shopify.com',
      '//js.stripe.com',
    ];

    externalDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical third-party origins
    const criticalOrigins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    criticalOrigins.forEach((origin) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  // Return null as this is a performance utility component
  return null;
};

// Hook for accessing performance metrics
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    const savedMetrics = localStorage.getItem('performance-metrics');
    if (savedMetrics) {
      setMetrics(JSON.parse(savedMetrics));
    }
  }, []);

  return metrics;
};

// Performance monitoring component for development
export const PerformanceMonitor: React.FC = () => {
  const metrics = usePerformanceMetrics();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Performance Metrics</div>
      {metrics.fcp && (
        <div className={metrics.fcp > 1800 ? 'text-red-400' : 'text-green-400'}>
          FCP: {Math.round(metrics.fcp)}ms
        </div>
      )}
      {metrics.lcp && (
        <div className={metrics.lcp > 2500 ? 'text-red-400' : 'text-green-400'}>
          LCP: {Math.round(metrics.lcp)}ms
        </div>
      )}
      {metrics.fid && (
        <div className={metrics.fid > 100 ? 'text-red-400' : 'text-green-400'}>
          FID: {Math.round(metrics.fid)}ms
        </div>
      )}
      {metrics.cls && (
        <div className={metrics.cls > 0.1 ? 'text-red-400' : 'text-green-400'}>
          CLS: {metrics.cls.toFixed(3)}
        </div>
      )}
    </div>
  );
};

export default PerformanceOptimizer;