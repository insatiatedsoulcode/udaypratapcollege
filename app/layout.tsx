// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// import AuthProvider from '@/components/AuthProvider'; // <<< REMOVED for now
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import PageTransition from '@/components/PageTransition'; // Import for page transitions

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
    'educational institution'
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
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased flex flex-col min-h-full`}>
        {/* AuthProvider wrapper has been removed. */}

        <TopBar />
        <Header />
        <Breadcrumbs />

        <main className="flex-grow">
          {/* The PageTransition component wraps the page content for animation */}
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        <Footer />

      </body>
    </html>
  );
}
