// src/components/SocialShare.tsx
// Trimmed to WhatsApp + Copy Link only — practical for Varanasi student audience.
'use client';

import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCopy, FaCheck } from 'react-icons/fa';

interface SocialShareProps {
  url?: string;
  title?: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url: urlProp,
  title = 'Uday Pratap College - Premier Educational Institution',
  className = '',
}) => {
  const [url, setUrl] = useState(urlProp ?? '');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!urlProp) {
      setUrl(window.location.href);
    }
  }, [urlProp]);

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`social-share flex flex-col items-center max-w-sm mx-auto ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 hidden">Share this page:</h3>
      <div className="flex items-center gap-3">
        {/* WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white rounded-full hover:bg-[#22C55E] transition-colors duration-200 text-sm font-semibold shadow-md"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={18} />
          WhatsApp
        </a>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-6 py-2.5 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors duration-200 text-sm font-semibold shadow-md"
          aria-label="Copy link"
        >
          {copied ? <FaCheck size={16} /> : <FaCopy size={16} />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
};

export default SocialShare;
