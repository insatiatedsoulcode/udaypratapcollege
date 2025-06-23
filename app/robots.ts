// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Applies to all search engine bots
      allow: '/', // Allow crawling of the entire site
      disallow: '/admin/', // IMPORTANT: Disallow crawling of your private admin pages
    },
    sitemap: 'https://www.udaypratapcollege.com/sitemap.xml',
  };
}