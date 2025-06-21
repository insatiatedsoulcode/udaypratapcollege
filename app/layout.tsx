// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

//import AuthProvider from '@/components/AuthProvider'; // For NextAuth.js session management
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uday Pratap College, Varanasi',
  description: 'Official website of Uday Pratap College, Varanasi. Explore courses, admissions, campus life, and more.',
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
      {/* NO WHITESPACE between <html> and <body> */}
      <body className={`${inter.className} antialiased flex flex-col min-h-full`}>

          {/* This layout structure will apply to your public pages.
              The AdminLayout will automatically take over for /admin routes. */}

          <TopBar />
          <Header />
          <Breadcrumbs />

          <main className="flex-grow">
            {children} {/* This is where your page content will be rendered */}
          </main>

          <Footer />


      </body>
    </html>
  );
}
