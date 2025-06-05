// app/academics/programs/bca/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import icons
import { FaLaptopCode, FaLightbulb, FaFlask, FaNetworkWired, FaBriefcase, FaListOl } from 'react-icons/fa';

// --- BCA Program Specific Data ---
const bcaProgramData = {
  title: 'Bachelor of Computer Applications (BCA)',
  tagline: 'Pioneering Software & AI Solutions',
  bannerImageUrl: '/images/programs/bca-banner.jpg', // Replace with a high-quality banner image for BCA
  overview: [
    'Our BCA program is a comprehensive three-year undergraduate course that provides a strong foundation in computer science and its applications. The curriculum is meticulously designed to meet the dynamic demands of the IT industry.',
    'Students are trained in modern programming languages, software engineering principles, data structures, and artificial intelligence. Through intensive lab work and project-based learning, graduates are prepared to innovate and lead in the world of technology.'
  ],
  keyFeatures: [
    { icon: FaLaptopCode, text: 'Advanced Software Development' },
    { icon: FaLightbulb, text: 'AI & Machine Learning Research' },
    { icon: FaFlask, text: 'Dedicated Project & Research Labs' },
    { icon: FaNetworkWired, text: 'Focus on Network & Cyber Security' },
  ],
  curriculumHighlights: [
    'Core courses in Data Structures & Algorithms, Object-Oriented Programming, and Database Management Systems.',
    'Specialized tracks in Web Development, Mobile App Development, and Cloud Computing.',
    'A mandatory final year project to solve a real-world problem.',
    'Workshops on emerging technologies and industry-standard development tools.'
  ],
  careerProspects: [
    'Software Developer', 'Web Developer', 'Systems Analyst', 'Network Administrator', 'Database Administrator', 'Mobile App Developer', 'IT Consultant'
  ]
};
// --- End of Data Definition ---


const BcaProgramPage = () => {
  return (
    <main>
      {/* 1. Hero/Banner Section */}
      <section className="relative h-64 md:h-80 bg-slate-800">
        <Image
          src={bcaProgramData.bannerImageUrl}
          alt="BCA Program Banner"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {bcaProgramData.title}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-sky-300 font-medium">
            {bcaProgramData.tagline}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 lg:gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Program Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                {bcaProgramData.overview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaListOl className="mr-3 text-sky-600" /> Curriculum Highlights
              </h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                {bcaProgramData.curriculumHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaBriefcase className="mr-3 text-sky-600" /> Career Prospects
              </h2>
              <div className="flex flex-wrap gap-2">
                {bcaProgramData.careerProspects.map((prospect, index) => (
                  <span key={index} className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full">
                    {prospect}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="mt-12 lg:mt-0">
            <div className="bg-slate-50 p-6 rounded-lg shadow-md sticky top-28">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {bcaProgramData.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <feature.icon className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t pt-5">
                <Link
                  href="/admissions/how-to-apply"
                  className="inline-block w-full text-center bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default BcaProgramPage;