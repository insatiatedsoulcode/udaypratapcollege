// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Example: Using Next/Font
import './globals.css'; // Your global styles
import Header from '@/components/Header'; // Assuming components are in src/components or root/components aliased to @/components
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uday Pratap College, Varanasi',
  description: 'Official website of Uday Pratap College, Varanasi. Admissions open.',
  // Add more metadata like open graph tags, keywords etc.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}> {/* Applies Inter font to body */}
        <Header />
        <main>
          {children} {/* Page specific content will be rendered here */}
        </main>
        <Footer />
      </body>
    </html>
  );
}
