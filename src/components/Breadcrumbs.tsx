// src/components/Breadcrumbs.tsx
'use client'; // This component uses client-side hooks (usePathname)

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Don't show breadcrumbs on the homepage itself
  if (pathname === '/') {
    return null;
  }

  // Split the path into segments and filter out empty strings (from leading/trailing slashes)
  const pathSegments = pathname.split('/').filter(segment => segment);

  // Function to generate a readable label from a path segment
  // Example: 'contact-us' becomes 'Contact Us'
  const generateLabel = (segment: string) => {
    if (!segment) return '';
    return segment
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' ');
  };

  // Build the breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' } // Always start with Home
  ];

  let accumulatedPath = '';
  pathSegments.forEach(segment => {
    accumulatedPath += `/${segment}`;
    breadcrumbItems.push({
      label: generateLabel(segment),
      href: accumulatedPath
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-1.5 sm:space-x-2 py-2.5 text-xs sm:text-sm text-slate-600">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <li>
                {index === breadcrumbItems.length - 1 ? (
                  // Current page - not a link, styled differently
                  <span className="font-medium text-slate-800" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  // Previous pages in the trail - are links
                  <Link
                    href={item.href}
                    className="hover:text-orange-600 hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
              {index < breadcrumbItems.length - 1 && (
                // Separator
                <li aria-hidden="true" className="text-slate-400">
                  &gt; {/* You can use '/' or any other separator */}
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;