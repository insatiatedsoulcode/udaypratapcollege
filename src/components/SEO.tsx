// src/components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: object;
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

const defaultSEO = {
  title: 'Uday Pratap College - Premier Educational Institution',
  description: 'Uday Pratap College offers quality education in BA, BBA, and BCA programs. Join our prestigious institution for academic excellence and career success.',
  keywords: 'college, education, BA, BBA, BCA, admissions, Uday Pratap College, higher education, academic programs',
  ogImage: '/images/og-image-1200x630.jpg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Uday Pratap College - Premier Educational Institution',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: '@udaypratapcollege',
  twitterCreator: '@udaypratapcollege',
};

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogImageWidth,
  ogImageHeight,
  ogImageAlt,
  ogType,
  twitterCard,
  twitterSite,
  twitterCreator,
  structuredData,
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | Uday Pratap College` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    canonical: canonical || 'https://udaypratapcollege.com',
    ogImage: ogImage || defaultSEO.ogImage,
    ogImageWidth: ogImageWidth || defaultSEO.ogImageWidth,
    ogImageHeight: ogImageHeight || defaultSEO.ogImageHeight,
    ogImageAlt: ogImageAlt || defaultSEO.ogImageAlt,
    ogType: ogType || defaultSEO.ogType,
    twitterCard: twitterCard || defaultSEO.twitterCard,
    twitterSite: twitterSite || defaultSEO.twitterSite,
    twitterCreator: twitterCreator || defaultSEO.twitterCreator,
  };

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={seo.canonical} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      <meta property="og:image:width" content={seo.ogImageWidth.toString()} />
      <meta property="og:image:height" content={seo.ogImageHeight.toString()} />
      <meta property="og:image:alt" content={seo.ogImageAlt} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:site_name" content="Uday Pratap College" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Additional Open Graph Tags */}
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags && tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:site" content={seo.twitterSite} />
      <meta name="twitter:creator" content={seo.twitterCreator} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />
      <meta name="twitter:image:alt" content={seo.ogImageAlt} />

      {/* WhatsApp Specific Meta Tags */}
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:secure_url" content={seo.ogImage} />
      
      {/* Additional Social Media Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="author" content="Uday Pratap College" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}
