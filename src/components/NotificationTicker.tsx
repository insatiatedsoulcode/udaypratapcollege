// components/NotificationTicker.tsx
'use client'; // If it uses any client-side hooks in future or for consistency
import React from 'react';
import Link from 'next/link'; // Use next/link

const notifications = [
  { id: 1, text: "Admissions for 2025-26 are now open!", link: "/admissions" },
  { id: 2, text: "Annual Sports Meet on Dec 15th.", link: "/events/sports-meet" },
  // ... more notifications
];

const NotificationTicker = () => {
  const tickerItems = [...notifications, ...notifications, ...notifications];

  return (
    <div className="notification-ticker-container">
      <div className="notification-ticker">
        {tickerItems.map((item, index) => (
          <span key={`${item.id}-${index}`}>
            {item.link ? (
              <Link href={item.link}>{item.text}</Link>
            ) : (
              item.text
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NotificationTicker;
