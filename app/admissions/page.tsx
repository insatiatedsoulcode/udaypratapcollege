// app/admissions/page.tsx
import React from 'react';
// If you plan to use Next.js Link component on this page, uncomment the next line:
// import Link from 'next/link';

const AdmissionsPage = () => {
  return (
    <main className="container mx-auto px-4 py-12"> {/* Use <main> for page content */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Admissions at Uday Pratap College
      </h1>

      <div className="prose lg:prose-xl mx-auto text-center"> {/* Using Tailwind Typography for nice text styling */}
        <p>
          Welcome to the Admissions portal of Uday Pratap College. Here you&apos;ll find all the necessary
          information regarding our application process, eligibility criteria, important deadlines,
          and how to become a part of our esteemed institution.
        </p>
        <p className="mt-4">
          We are excited to help you take the next step in your academic journey.
        </p>

        {/* Example: You can add links or specific admission components here later */}
        {/*
        <div className="mt-10">
          <Link href="/admissions/how-to-apply" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Learn How to Apply
          </Link>
        </div>
        */}
      </div>
    </main>
  );
};

export default AdmissionsPage; // <--- This is the essential line