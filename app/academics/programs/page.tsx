// app/academics/programs/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaTh, FaList } from 'react-icons/fa';
import KeyFeatureSection from '@/components/KeyFeatureSection';

const programsData = [
  {
    id: 'bba',
    name: 'Bachelor of Business Administration (BBA)',
    description: 'A comprehensive program designed to equip students with essential business management skills...',
    duration: '3 Years',
    eligibility: '10+2 or equivalent from a recognized board.',
    imageUrl: '/images/programs/bbav1.png',
  },
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications (BCA)',
    description: 'Focuses on computer science fundamentals, software development, and application design...',
    duration: '3 Years',
    eligibility: '10+2 with Mathematics as a subject or equivalent.',
    imageUrl: '/images/programs/bcav1.png',
  },
  {
    id: 'ba',
    name: 'Bachelor of Arts (BA)',
    description: 'A versatile degree offering a broad understanding of humanities and social sciences...',
    duration: '3 Years',
    eligibility: '10+2 or equivalent from a recognized board.',
    imageUrl: '/images/programs/bav1.png',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);

  const filteredPrograms = programsData.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4 text-center rounded-xl mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Explore Your Future with Uday Pratap College</h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Transform your passion into a profession with our dynamic and diverse academic programs.
        </p>
      </section>

      {/* Why Choose Us */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">Why Choose Us?</h2>
      <section className="mb-20">
        <KeyFeatureSection />
      </section>

      {/* Academic Programs */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">Our Academic Programs</h2>
      <p className="text-base sm:text-lg text-gray-600 mb-6 text-center max-w-3xl mx-auto">
        Uday Pratap College offers a diverse range of undergraduate programs designed to foster intellectual growth, critical thinking, and career readiness. Explore our offerings below to find the path that&apos;s right for you.
      </p>

      {/* Search and Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-4xl mx-auto gap-4 mb-10">
        <input
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg text-sm transition-all flex items-center gap-2"
        >
          {isGridView ? <FaList /> : <FaTh />} {isGridView ? 'List View' : 'Grid View'}
        </button>
      </div>

      {/* Program Cards */}
      <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10" : "space-y-6"}>
        {filteredPrograms.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            {program.imageUrl && (
              <div className="group relative w-full overflow-hidden" style={{ height: '180px' }}>
                <Image
                  src={program.imageUrl}
                  alt={`${program.name} program image`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg sm:text-xl font-semibold text-orange-600 mb-3">
                {program.name}
              </h2>
              <p className="text-gray-700 text-sm mb-4 flex-grow">
                {program.description}
              </p>

              {program.specializations && program.specializations.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-1">Specializations include:</h4>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                    {program.specializations.map((spec) => (
                      <li key={spec}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="text-xs text-gray-500 space-y-1 mt-auto pt-4 border-t border-gray-200">
                <p><strong>Duration:</strong> {program.duration}</p>
                <p><strong>Eligibility:</strong> {program.eligibility}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Section */}
      <section className="mt-20 py-12 px-4 bg-yellow-50 text-center rounded-lg shadow-inner">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Ready to Begin Your Journey?</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-5">Explore detailed program information or get in touch with our admissions team today.</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-all">
          Contact Admissions
        </button>
      </section>
    </main>
  );
};

export default ProgramsOfferedPage;
