// app/academics/programs/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
// import Link from 'next/link';

const programsData = [
  {
    id: 'bba',
    name: 'Bachelor of Business Administration (BBA)',
    description: 'A comprehensive program designed to equip students with essential business management skills...',
    duration: '3 Years',
    eligibility: '10+2 or equivalent from a recognized board.',
    imageUrl: '/images/programs/BBA.png',
  },
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications (BCA)',
    description: 'Focuses on computer science fundamentals, software development, and application design...',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics as a subject or equivalent.',
    imageUrl: '/images/programs/BCA.png',
  },
  {
    id: 'ba',
    name: 'Bachelor of Arts (BA)',
    description: 'A versatile degree offering a broad understanding of humanities and social sciences...',
    duration: '3 Years',
    eligibility: '10+2 or equivalent from a recognized board.',
    imageUrl: '/images/programs/BA.png',
    specializations: [
      'English',
      'Political Science',
      'Home Science',
      'Hindi',
      'Economics',
    ],
  },
];

const ProgramsOfferedPage = () => {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
        Our Academic Programs
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Uday Pratap College offers a diverse range of undergraduate programs designed to foster intellectual growth, critical thinking, and career readiness. Explore our offerings below to find the path that&apos;s right for you.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programsData.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            {program.imageUrl && (
              <div className="relative w-full bg-pink-500" style={{ height: '192px' }}> {/* Removed h-48, added inline style */} {/* <<< Pink background (bg-pink-500) REMOVED HERE */}
                <Image
                  src={program.imageUrl}
                  alt={`${program.name} program image`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Program Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl lg:text-2xl font-semibold text-orange-600 mb-3">{program.name}</h2>
              <p className="text-gray-700 text-sm mb-4 flex-grow">{program.description}</p>

              {program.specializations && program.specializations.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Specializations include:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                    {program.specializations.map(spec => <li key={spec}>{spec}</li>)}
                  </ul>
                </div>
              )}

              <div className="text-xs text-gray-500 space-y-1 mt-auto pt-4 border-t border-gray-200">
                <p><strong>Duration:</strong> {program.duration}</p>
                <p><strong>Eligibility:</strong> {program.eligibility}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProgramsOfferedPage;