// app/academics/programs/ba/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import icons
import { FaBookOpen, FaUsers, FaBrain, FaGavel, FaBriefcase, FaListOl } from 'react-icons/fa';

// --- BA Program Specific Data ---
const baProgramData = {
  title: 'Bachelor of Arts (BA)',
  tagline: 'Critical Inquiry & Societal Impact',
  bannerImageUrl: '/images/programs/ba-banner.jpg', // Replace with a high-quality banner image for BA
  overview: [
    'The Bachelor of Arts program offers a rich and versatile education in the humanities and social sciences. It is designed to develop students\' critical thinking, communication, and analytical skills through rigorous academic inquiry.',
    'With a wide range of specializations, students can tailor their studies to their interests and career aspirations. Our curriculum emphasizes interdisciplinary research, enabling students to understand and address complex societal, cultural, and political issues.'
  ],
  keyFeatures: [
    { icon: FaBookOpen, text: 'Interdisciplinary Research Methods' },
    { icon: FaUsers, text: 'Community-Engaged Field Projects' },
    { icon: FaBrain, text: 'Advanced Critical Thinking Seminars' },
    { icon: FaGavel, text: 'Focus on Policy & Social Justice' },
  ],
  curriculumHighlights: [
    'Choice of major specializations including English, Political Science, Home Science, Hindi, and Economics.',
    'Foundation courses in research methodology and academic writing.',
    'Opportunities for independent research projects under faculty mentorship.',
    'Guest lectures from distinguished academics, authors, and policymakers.'
  ],
  careerProspects: [
    'Civil Services', 'Journalism & Media', 'Academia & Research', 'Social Work', 'Public Policy', 'Content Creation & Publishing', 'Law'
  ]
};
// --- End of Data Definition ---


const BaProgramPage = () => {
  return (
    <main>
      {/* 1. Hero/Banner Section */}
      <section className="relative h-64 md:h-80 bg-slate-800">
        <Image
          src={baProgramData.bannerImageUrl}
          alt="BA Program Banner"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {baProgramData.title}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-sky-300 font-medium">
            {baProgramData.tagline}
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
                {baProgramData.overview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaListOl className="mr-3 text-sky-600" /> Curriculum Highlights
              </h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                {baProgramData.curriculumHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaBriefcase className="mr-3 text-sky-600" /> Career Prospects
              </h2>
              <div className="flex flex-wrap gap-2">
                {baProgramData.careerProspects.map((prospect, index) => (
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
                {baProgramData.keyFeatures.map((feature, index) => (
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

export default BaProgramPage;