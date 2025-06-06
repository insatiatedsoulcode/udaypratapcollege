// app/error.tsx
'use client'; // Error components must be Client Components

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FaExclamationCircle, FaRedo, FaHome } from 'react-icons/fa';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // You can log the error to a logging service here
    console.error(error);
  }, [error]);

  return (
    <main className="flex items-center justify-center min-h-[60vh] bg-slate-50">
      <div className="text-center p-8 max-w-lg w-full">
        <FaExclamationCircle className="mx-auto h-16 w-16 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800">Something went wrong!</h1>
        <p className="mt-3 text-gray-500">
          We apologize for the inconvenience. An unexpected error has occurred. You can try to reload the page or return to the homepage.
        </p>

        {/* Optional: Display error message during development for easier debugging */}
        {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 p-4 bg-red-100 text-red-700 text-xs text-left rounded-md overflow-x-auto">
                <code>{error.message}</code>
            </pre>
        )}

        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className="inline-flex items-center bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors shadow-md"
          >
            <FaRedo className="mr-2" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            <FaHome className="mr-2" />
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}