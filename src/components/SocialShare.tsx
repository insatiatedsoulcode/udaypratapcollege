// src/components/SocialShare.tsx
import React from 'react';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaTelegram, FaCopy } from 'react-icons/fa';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Uday Pratap College - Premier Educational Institution',
  description = 'Quality education in BA, BBA, and BCA programs. Join our prestigious institution for academic excellence and career success.',
  className = ''
}) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Link copied to clipboard!');
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`social-share ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Share this page:</h3>
      <div className="flex flex-wrap gap-3">
        {/* Facebook */}
        <button
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-full hover:bg-[#166FE5] transition-colors duration-200"
          title="Share on Facebook"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={18} />
        </button>

        {/* Twitter */}
        <button
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="flex items-center justify-center w-10 h-10 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1A91DA] transition-colors duration-200"
          title="Share on Twitter"
          aria-label="Share on Twitter"
        >
          <FaTwitter size={18} />
        </button>

        {/* WhatsApp */}
        <button
          onClick={() => openShareWindow(shareLinks.whatsapp)}
          className="flex items-center justify-center w-10 h-10 bg-[#25D366] text-white rounded-full hover:bg-[#22C55E] transition-colors duration-200"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={18} />
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="flex items-center justify-center w-10 h-10 bg-[#0077B5] text-white rounded-full hover:bg-[#006BA1] transition-colors duration-200"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin size={18} />
        </button>

        {/* Telegram */}
        <button
          onClick={() => openShareWindow(shareLinks.telegram)}
          className="flex items-center justify-center w-10 h-10 bg-[#0088CC] text-white rounded-full hover:bg-[#0077B3] transition-colors duration-200"
          title="Share on Telegram"
          aria-label="Share on Telegram"
        >
          <FaTelegram size={18} />
        </button>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors duration-200"
          title="Copy Link"
          aria-label="Copy Link"
        >
          <FaCopy size={16} />
        </button>
      </div>

      {/* Share URL Display */}
      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600 mb-1">Share URL:</p>
        <p className="text-sm font-mono text-gray-800 break-all">{url}</p>
      </div>
    </div>
  );
};

export default SocialShare;
