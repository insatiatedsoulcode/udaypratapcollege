'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  enableAnalytics?: boolean;
}

export default function Analytics({ 
  googleAnalyticsId, 
  enableAnalytics = false 
}: AnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enableAnalytics || !googleAnalyticsId) return;

    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', googleAnalyticsId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Track page views on route changes
    gtag('config', googleAnalyticsId, {
      page_path: pathname,
    });

    return () => {
      // Cleanup if needed
    };
  }, [googleAnalyticsId, enableAnalytics, pathname]);

  // Performance monitoring
  useEffect(() => {
    if (!enableAnalytics) return;

    // Track Core Web Vitals
    const trackWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime),
            event_category: 'Performance',
          });
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(entry.processingStart - entry.startTime),
              event_category: 'Performance',
            });
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Performance',
          });
        }
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackWebVitals();
    } else {
      window.addEventListener('load', trackWebVitals);
    }

    return () => {
      window.removeEventListener('load', trackWebVitals);
    };
  }, [enableAnalytics]);

  // Track user interactions
  useEffect(() => {
    if (!enableAnalytics) return;

    const trackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link) {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        
        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'Link',
            event_label: text || href,
            value: href,
          });
        }
      }
    };

    const trackFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.id || 'unknown';
      
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'Form',
          event_label: formName,
        });
      }
    };

    document.addEventListener('click', trackClick);
    document.addEventListener('submit', trackFormSubmit);

    return () => {
      document.removeEventListener('click', trackClick);
      document.removeEventListener('submit', trackFormSubmit);
    };
  }, [enableAnalytics]);

  return null;
}

// Utility functions for custom event tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
