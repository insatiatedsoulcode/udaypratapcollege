// app/not-found.tsx
import Link from 'next/link';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-[60vh] bg-slate-50">
      <div className="text-center p-8 max-w-md w-full">
        <FaExclamationTriangle className="mx-auto h-16 w-16 text-orange-400 mb-6" />
        <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="mt-3 text-gray-500">
          We&apos;re sorry, but the page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors shadow-md"
          >
            <FaHome className="mr-2" />
            Go Back to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}