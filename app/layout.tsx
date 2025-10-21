// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// import AuthProvider from '@/components/AuthProvider'; // <<< REMOVED for now
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageTransition from '@/components/PageTransition'; // Import for page transitions
import { ThemeProvider } from '@/components/ThemeProvider';
import Analytics from '@/components/Analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://udaypratapcollege.com'),
  title: {
    template: '%s | Uday Pratap College',
    default: 'Uday Pratap College - Premier Educational Institution | BA, BBA, BCA Programs',
  },
  description: 'Uday Pratap College offers quality education in BA, BBA, and BCA programs. Join our prestigious institution for academic excellence, modern facilities, and career success.',
  keywords: [
    'college',
    'education',
    'BA program',
    'BBA program', 
    'BCA program',
    'admissions',
    'Uday Pratap College',
    'higher education',
    'academic excellence',
    'undergraduate programs',
    'college admissions',
    'educational institution',
    'Varanasi college',
    'Uttar Pradesh education',
    'best college Varanasi',
    'college in UP',
    'BA admission 2025',
    'BBA admission 2025',
    'BCA admission 2025',
    'college placement',
    'student portal',
    'online admission',
    'college facilities',
    'expert faculty',
    'modern education'
  ],
  authors: [{ name: 'Uday Pratap College' }],
  creator: 'Uday Pratap College',
  publisher: 'Uday Pratap College',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Uday Pratap College - Premier Educational Institution',
    description: 'Quality education in BA, BBA, and BCA programs. Modern facilities, experienced faculty, and excellent placement opportunities.',
    url: 'https://udaypratapcollege.com',
    siteName: 'Uday Pratap College',
    images: [
      {
        url: 'https://udaypratapcollege.com/images/og-image-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Uday Pratap College - Premier Educational Institution',
        type: 'image/jpeg',
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@udaypratapcollege',
    creator: '@udaypratapcollege',
    title: 'Uday Pratap College - Premier Educational Institution',
    description: 'Quality education in BA, BBA, and BCA programs. Join us for academic excellence and career success.',
    images: ['https://udaypratapcollege.com/images/og-image-1200x630.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' }
    ],
    apple: '/icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://udaypratapcollege.com',
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Uday Pratap College",
    "description": "Premier educational institution offering BA, BBA, and BCA programs with academic excellence and modern facilities.",
    "url": "https://udaypratapcollege.com",
    "logo": "https://udaypratapcollege.com/images/logo.png",
    "image": "https://udaypratapcollege.com/images/campus-slide-1.JPG",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Varanasi",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-12345-67890",
      "contactType": "Admissions",
      "email": "info@udaypratapcollege.com"
    },
    "sameAs": [
      "https://www.facebook.com/udaypratapcollege",
      "https://www.twitter.com/udaypratapcollege",
      "https://www.instagram.com/udaypratapcollege"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Academic Programs",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Bachelor of Arts (BA)",
            "description": "Comprehensive program covering humanities, social sciences, and languages"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Bachelor of Business Administration (BBA)",
            "description": "Prepare for a career in business management with strong foundation in business principles"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Bachelor of Computer Applications (BCA)",
            "description": "Master the fundamentals of computer science and software development"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} antialiased flex flex-col min-h-full`}>
        <ThemeProvider defaultTheme="system" storageKey="uday-pratap-college-theme">
          <Analytics 
            googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
            enableAnalytics={process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true'}
          />
          <Header />
          <Breadcrumbs />

          <main className="flex-grow">
            {/* The PageTransition component wraps the page content for animation */}
            <PageTransition>
              {children}
            </PageTransition>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
