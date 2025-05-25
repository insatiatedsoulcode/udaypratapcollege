// src/components/TopBar.tsx
import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa'; // Krea social icons

const TopBar = () => {
  const commonLinkClasses = "hover:text-gray-300 transition-colors duration-150 focus:outline-none focus:text-gray-300 focus:ring-1 focus:ring-sky-500 rounded-sm";
  const socialIconClasses = "hover:text-sky-300 transition-colors duration-150 focus:outline-none focus:text-sky-300 focus:ring-1 focus:ring-sky-500 rounded-sm p-0.5";


  return (
    // Krea top bar: Dark blue background, white/light text, minimal padding
    <div className="bg-blue-900 text-white text-xs py-2"> {/* Adjusted to a blue shade */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">

        {/* Left Side: Links */}
        <div className="flex flex-wrap justify-center lg:justify-start items-center space-x-3 sm:space-x-4 rtl:sm:space-x-reverse mb-2 lg:mb-0">
          <Link href="/campus-visit" className={commonLinkClasses}>Campus Visit</Link>
          <Link href="/career-services" className={commonLinkClasses}>Career Services</Link>
          <Link href="https://krea.edu.in" target="_blank" rel="noopener noreferrer" className={commonLinkClasses}>Uday Pratap College</Link> {/* Example external link */}
          <Link href="/contact" className={commonLinkClasses}>Contact</Link>
        </div>

        {/* Right Side: Login, Apply Now, Social Icons */}
        <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-3 sm:space-x-4 rtl:sm:space-x-reverse">
          <Link href="/portal-login" className={commonLinkClasses}>Portal Login</Link>

          <Link href="/apply" legacyBehavior>
            <a className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-3 text-xs rounded-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-blue-900">
              Apply Now
            </a>
          </Link>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse pl-2">
            <a href="https://twitter.com/kreauniversity" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={socialIconClasses}>
              <FaTwitter size="1.1em" />
            </a>
            <a href="https://www.instagram.com/kreauniversity/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialIconClasses}>
              <FaInstagram size="1.1em" />
            </a>
            <a href="https://www.facebook.com/KreaUniversity/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialIconClasses}>
              <FaFacebookF size="1.1em" />
            </a>
            <a href="https://www.youtube.com/c/KreaUniversity/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialIconClasses}>
              <FaYoutube size="1.1em" />
            </a>
            <a href="https://www.linkedin.com/school/kreauniversity" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialIconClasses}>
              <FaLinkedinIn size="1.1em" />
            </a>
            {/* Replace with your actual social media links */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopBar;