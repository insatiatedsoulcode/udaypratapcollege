// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about/',
          '/academics/',
          '/admissions/',
          '/apply',
          '/student-life/',
          '/gallery/',
          '/contact-us',
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/data/',
          '/uploads/',
          '/test-form',
          '/test-application',
          '/_next/',
          '/static/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/data/',
          '/uploads/',
          '/test-form',
          '/test-application',
        ],
        crawlDelay: 0,
      },
    ],
    sitemap: 'https://udaypratapcollege.com/sitemap.xml',
    host: 'https://udaypratapcollege.com',
  };
}