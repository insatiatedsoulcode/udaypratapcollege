'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsProps {
  googleAnalyticsId?: string;
  enableAnalytics?: boolean;
}

export default function Analytics({
  googleAnalyticsId,
  enableAnalytics = false,
}: AnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enableAnalytics || !googleAnalyticsId) return;

    // Load gtag script once
    if (!document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => { window.dataLayer.push(args); };
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', googleAnalyticsId);
    }

    // Track page views on route change
    if (window.gtag) {
      window.gtag('config', googleAnalyticsId, { page_path: pathname });
    }
  }, [googleAnalyticsId, enableAnalytics, pathname]);

  return null;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
