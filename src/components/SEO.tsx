// src/components/SEO.tsx
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultSEO = {
  title: 'Uday Pratap College - Premier Educational Institution',
  description: 'Uday Pratap College offers quality education in BA, BBA, and BCA programs. Join our prestigious institution for academic excellence and career success.',
  keywords: 'college, education, BA, BBA, BCA, admissions, Uday Pratap College, higher education, academic programs',
  ogImage: '/images/og-image.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
};

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType,
  twitterCard,
  structuredData,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const seo = {
    title: title ? `${title} | Uday Pratap College` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    canonical: canonical || 'https://udaypratapcollege.com',
    ogImage: ogImage || defaultSEO.ogImage,
    ogType: ogType || defaultSEO.ogType,
    twitterCard: twitterCard || defaultSEO.twitterCard,
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
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:site_name" content="Uday Pratap College" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seo.twitterCard} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />

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
