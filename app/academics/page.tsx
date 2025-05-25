// app/academics/page.tsx
import React from 'react';

// You can add specific imports for this page later, e.g.:
// import Link from 'next/link';
// import SomeSpecificAcademicComponent from '@/components/SomeSpecificAcademicComponent';

const AcademicsPage = () => {
  return (
    <main className="container mx-auto px-4 py-12"> {/* Use <main> for page content */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Our Academics
      </h1>

      <div className="prose lg:prose-xl mx-auto"> {/* Using Tailwind Typography for nice text styling */}
        <p>
          Welcome to the Academics section of Uday Pratap College. Here, you will find detailed information
          about our diverse range of programs, dedicated faculty, innovative research initiatives,
          and the academic resources available to our students.
        </p>
        <p>
          Our commitment is to foster an environment of academic excellence and intellectual curiosity,
          preparing our students for successful careers and lifelong learning.
        </p>
        {/* You can add more sections here, for example:
          - Links to different departments
          - Overview of research areas
          - Information about the library or academic support services
          - <SomeSpecificAcademicComponent />
        */}
      </div>

      <div className="mt-12 text-center">
        <Link href="/academics/programs" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Explore Our Programs
        </Link>
      </div>
    </main>
  );
};

export default AcademicsPage; // <--- THIS LINE IS CRUCIAL