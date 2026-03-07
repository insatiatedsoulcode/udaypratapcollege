'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center">

        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" aria-label="Facebook" className="hover:text-white transition-colors"><FaFacebookF size="1.2em" /></a>
          <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><FaTwitter size="1.2em" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><FaInstagram size="1.2em" /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors"><FaLinkedinIn size="1.2em" /></a>
          <a href="#" aria-label="YouTube" className="hover:text-white transition-colors"><FaYoutube size="1.2em" /></a>
        </div>

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Uday Pratap College, Varanasi. All Rights Reserved.
        </p>

        <div className="mt-4 border-t border-gray-700 pt-4 flex justify-center">
          <Link
            href="/contact-us"
            className="text-xs text-gray-500 hover:text-white hover:underline transition-colors"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
