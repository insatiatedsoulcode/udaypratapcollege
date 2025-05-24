// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Example: Using Next/Font
import './globals.css'; // Your global styles

// Import your components
import TopBar from '@/components/TopBar';   // <--- ADD THIS IMPORT
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Uday Pratap College, Varanasi', // You can customize this
  description: 'Official website of Uday Pratap College, Varanasi. Explore courses, admissions, campus life, and more.', // Customize description
  // Consider adding more specific keywords or Open Graph tags here
  // e.g., keywords: ['Uday Pratap College', 'UP College Varanasi', 'Varanasi colleges', 'higher education India'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}> {/* Applies Inter font and antialiasing */}
        <TopBar /> {/* <--- ADD THE TOPBAR COMPONENT HERE */}
        <Header />
        <main className="flex-grow"> {/* Added flex-grow if you want main content to push footer down in a flex column layout */}
          {children} {/* Page specific content will be rendered here */}
        </main>
        <Footer />
      </body>
    </html>
  );
}