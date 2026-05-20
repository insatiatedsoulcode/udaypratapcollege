// src/components/TopBar.tsx
'use client'; // <<< Must be a client component to use session hooks

import React from 'react';
import Link from 'next/link';
//import { useSession } from 'next-auth/react'; // <<< Import useSession hook
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { getCollegeInfo } from '@/lib/content';

const TopBar = () => {
  const { social } = getCollegeInfo();

  const commonLinkClasses = "hover:text-gray-300 transition-colors duration-150 focus:outline-none focus:text-gray-300 focus:ring-1 focus:ring-sky-500 rounded-sm";
  const socialIconClasses = "hover:text-sky-300 transition-colors duration-150 focus:outline-none focus:text-sky-300 focus:ring-1 focus:ring-sky-500 rounded-sm p-0.5";

  return (
    <div className="bg-blue-900 text-white text-xs py-2">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">

        {/* Left Side: Links */}
        <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-3 sm:space-x-4 rtl:sm:space-x-reverse mb-2 lg:mb-0">
          <Link href="/career-services" className={commonLinkClasses}>Career Services</Link>
          <Link href="/" className={commonLinkClasses}>Uday Pratap College</Link>
          <Link href="/contact-us" className={commonLinkClasses}>Contact</Link>
        </div>

        {/* Right Side: Login, Apply Now, Admin, Social Icons */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-3 sm:space-x-4 rtl:sm:space-x-reverse">


          <Link href="/apply" legacyBehavior>
            <a className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-3 text-xs rounded-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-blue-900">
              Apply Now
            </a>
          </Link>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-2 rtl:sm:space-x-reverse pl-2">
            <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={socialIconClasses}>
              <FaTwitter size="1.1em" />
            </a>
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialIconClasses}>
              <FaInstagram size="1.1em" />
            </a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialIconClasses}>
              <FaFacebookF size="1.1em" />
            </a>
            <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialIconClasses}>
              <FaYoutube size="1.1em" />
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialIconClasses}>
              <FaLinkedinIn size="1.1em" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
