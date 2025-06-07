// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Import your components
import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AuthProvider from '@/components/AuthProvider'; // For NextAuth.js session management

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uday Pratap College, Varanasi',
  description: 'Official website of Uday Pratap College, Varanasi. Explore courses, admissions, campus life, and more.',
  // Add your favicon details here if you want to manage them via metadata
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', // Example
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full"> {/* Added h-full for sticky footer */}
      <body className={`${inter.className} antialiased flex flex-col min-h-full`}> {/* Flex classes for sticky footer */}
        <AuthProvider> {/* Provider must wrap everything to share session state */}

          {/* These components will appear on every page by default */}
          <TopBar />
          <Header />
          <Breadcrumbs />

          <main className="flex-grow">
            {children} {/* Page specific content (e.g., from page.tsx) will be rendered here */}
          </main>

          <Footer />

        </AuthProvider>
      </body>
    </html>
  );
}