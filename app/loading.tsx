// app/loading.tsx
import React from 'react';

// This is a special Next.js file that will be automatically
// shown as a fallback while the content of a page is loading.
// It's built on top of React Suspense.

export default function Loading() {
  return (
    // This creates a full-screen overlay with a semi-transparent background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Spinner: A div with a rotating border using Tailwind CSS animations */}
        <div className="w-16 h-16 border-4 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-sky-700">Loading...</p>
      </div>
    </div>
  );
}
