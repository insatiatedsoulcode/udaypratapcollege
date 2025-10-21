// src/components/NotificationTicker.tsx
import React from 'react';
import Link from 'next/link';
import { FaBullhorn } from 'react-icons/fa';

// Define your announcements here for easy editing
const announcements = [
  { text: 'Admissions for 2025-26 are now open!', link: '/admissions' },
  { text: 'Annual Sports Meet on Dec 15th.', link: '/events/sports-meet' },
  { text: 'Results for the 3rd Semester have been declared.', link: '/results' },
];

const NotificationTicker = () => {
  return (
    <div className="bg-blue-100 border-b border-blue-200">
      <div className="container mx-auto px-4 py-1.5 flex items-center overflow-hidden">
        <FaBullhorn className="text-blue-700 mr-3 flex-shrink-0" />
        <div className="marquee-container relative flex-auto h-5">
          <div className="marquee absolute whitespace-nowrap">
            {/* Repeat the content multiple times to ensure a seamless loop */}
            {[...announcements, ...announcements].map((announcement, index) => (
              <span key={index} className="mx-4 text-sm font-medium">
                <Link
                  href={announcement.link}
                  // Use a darker text color for better contrast on the blue background
                  className="text-blue-800 hover:text-blue-900 hover:underline"
                >
                  {announcement.text}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .marquee-container {
          overflow: hidden;
        }
        .marquee {
          animation: marquee-scroll 25s linear infinite;
        }
        @keyframes marquee-scroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationTicker;
