// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// import AuthProvider from '@/components/AuthProvider'; // <<< REMOVED for now to fix build
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Uday Pratap College, Varanasi',
    default: 'Uday Pratap College, Varanasi | Official Website',
  },
  description: 'Official website of Uday Pratap College, Varanasi. Explore our undergraduate and postgraduate programs, admissions process, campus life, and more.',
  openGraph: {
    title: ' Uday Pratap College, Varanasi',
    description: 'A hub for academic excellence and research in Varanasi.',
    url: 'https://www.udaypratapcollege.com',
    siteName: 'Uday Pratap College',
    images: [
      {
        url: 'https://www.udaypratapcollege.com/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased flex flex-col min-h-full`}>
        {/* AuthProvider wrapper removed for now */}

        <TopBar />
        <Header />
        <Breadcrumbs />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
