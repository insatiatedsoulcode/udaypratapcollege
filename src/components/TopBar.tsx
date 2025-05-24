// src/components/TopBar.tsx
import React from 'react';
import Link from 'next/link';

// Optional: If you want to use icons, you can install a library like react-icons
// For example: npm install react-icons
// Then import them:
// import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const TopBar = () => {
  return (
    // You can customize the background color (e.g., bg-emerald-700, bg-teal-800, or your custom color)
    // and text color (e.g., text-gray-200, text-white)
    // py-2 provides vertical padding, text-xs makes font small. Adjust as needed.
    <div className="bg-slate-800 text-slate-300 text-xs py-2">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        {/* Left Side: Contact Info */}
        {/* On small (xs) screens, contact items will be centered and stack. */}
        {/* On sm screens and up, they'll be in a row. */}
        {/* The whole contact block will stack above links on screens smaller than md. */}
        <div className="flex flex-col text-center sm:flex-row sm:text-left items-center space-y-1 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse mb-2 md:mb-0">
          <div className="flex items-center">
            {/* Example of using an icon: <FaPhoneAlt className="mr-1.5 text-slate-400" /> */}
            <span>Mobile: +91 XXXXXXXXXX</span> {/* Replace with your actual phone number */}
          </div>
          <div className="flex items-center">
            {/* Example of using an icon: <FaEnvelope className="mr-1.5 text-slate-400" /> */}
            <span>Email: info@udaypratapcollege.ac.in</span> {/* Replace with your actual email */}
          </div>
        </div>

        {/* Right Side: Links */}
        {/* On small (xs) screens, links will be centered. */}
        <nav className="flex flex-wrap justify-center items-center space-x-3 sm:space-x-4 rtl:sm:space-x-reverse">
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog {/* Replace with your link label */}
          </Link>
          {/* Simple separator, hidden on extra-small screens to prevent awkward wrapping */}
          <span className="text-slate-500 hidden sm:inline">|</span>
          <Link href="/disclosures" className="hover:text-white transition-colors">
            Disclosures {/* Replace with your link label */}
          </Link>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <Link href="/contact-info" className="hover:text-white transition-colors"> {/* Example: maybe a more specific contact page */}
            Support {/* Replace with your link label */}
          </Link>
        </nav>

      </div>
    </div>
  );
};

export default TopBar;