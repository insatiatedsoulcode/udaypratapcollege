// components/Header.tsx
'use client'; // This component uses client-side hooks

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js Image component
import { usePathname } from 'next/navigation';
// import collegeLogo from '/images/logo.png'; // Assuming logo.png is in public/images/

const navLinks = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/student-life", label: "Student Life" },
  { href: "/contact", label: "Contact Us" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenuAndNavigate = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white py-2 border-b-3 border-blue-500 sticky top-0 z-50"> {/* Example Tailwind classes */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="logo-container">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png" // Path relative to public folder
              alt="Uday Pratap College Logo"
              width={80} // Adjust actual width of your logo
              height={1} // Adjust actual height of your logo
              className="header-logo" // You can keep your custom class for other specific styles if needed
              priority //  Load logo image with priority
            />
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center"> {/* Desktop Nav */}
          <ul className="flex space-x-1">
            {navLinks.map(link => {
              const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href) && link.href !== "/";
              return (
                <li key={link.href}>
                  <Link href={link.href}
                    className={`px-3 py-2 rounded-t-md text-sm font-medium transition-colors
                                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hidden md:block"> {/* Desktop Apply Now Button */}
          <Link href="/admissions#apply-now" className="cta-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Apply Now
          </Link>
        </div>
        <div className="md:hidden"> {/* Mobile Hamburger Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="hamburger-menu text-gray-300 hover:text-white focus:outline-none focus:text-white p-2"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            &#9776; {/* Hamburger icon */}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-lg">
          <ul className="flex flex-col items-center py-2">
            {navLinks.map(link => {
               const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href) && link.href !== "/";
              return (
                <li key={link.href} className="w-full">
                  <Link href={link.href}
                    onClick={closeMenuAndNavigate}
                    className={`block text-center px-3 py-3 text-base font-medium w-full transition-colors
                                ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="w-full mt-2">
              <Link href="/admissions#apply-now"
                onClick={closeMenuAndNavigate}
                className="block text-center cta-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded w-11/12 mx-auto">
                Apply Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
