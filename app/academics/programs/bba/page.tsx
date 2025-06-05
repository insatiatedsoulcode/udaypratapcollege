// app/academics/programs/bba/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Import icons that you might use
import { FaChartLine, FaLightbulb, FaUsers, FaGraduationCap, FaBriefcase, FaListOl } from 'react-icons/fa';

// --- BBA Program Specific Data ---
// It's good practice to keep the page-specific content in an object like this for easy editing.
const bbaProgramData = {
  title: 'Bachelor of Business Administration (BBA)',
  tagline: 'Strategic Innovation & Data-Driven Decisions',
  bannerImageUrl: '/images/programs/bbav2.png', // Replace with a high-quality banner image for BBA
  overview: [
    'Our Bachelor of Business Administration program is designed to cultivate the next generation of business leaders and innovators. The curriculum integrates core business principles with a strong emphasis on quantitative analysis, data-driven decision-making, and strategic thinking.',
    'Students are immersed in a dynamic learning environment that challenges them to solve real-world business problems through research, case studies, and project-based work, preparing them for leadership roles in the modern technology-driven economy.'
  ],
  keyFeatures: [
    { icon: FaChartLine, text: 'Business Analytics & Big Data Focus' },
    { icon: FaLightbulb, text: 'Entrepreneurship & Innovation Lab' },
    { icon: FaUsers, text: 'Live Industry Research Projects' },
    { icon: FaGraduationCap, text: 'Specialized Final Year Research Thesis' },
  ],
  curriculumHighlights: [
    'Core courses in Financial Management, Marketing Analytics, and Operations Research.',
    'Advanced electives in FinTech, Supply Chain Analytics, and Digital Marketing.',
    'Semester-long internship program with leading corporate partners.',
    'Workshops on statistical software (R, Python) and business intelligence tools.'
  ],
  careerProspects: [
    'Business Analyst', 'Data Analyst', 'Market Research Analyst', 'Management Consultant', 'Product Manager', 'Startup Founder'
  ]
};
// --- End of Data Definition ---


const BbaProgramPage = () => {
  return (
    <main>
      {/* 1. Hero/Banner Section */}
      <section className="relative h-64 md:h-80 bg-slate-800">
        <Image
          src={bbaProgramData.bannerImageUrl}
          alt="BBA Program Banner"
          fill
          className="object-cover opacity-30"
          priority // Load this main image with priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {bbaProgramData.title}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-sky-300 font-medium">
            {bbaProgramData.tagline}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 lg:gap-12">

          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* 2. Program Overview Section */}
            <section>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Program Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                {bbaProgramData.overview.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* 3. Curriculum Highlights Section */}
            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaListOl className="mr-3 text-sky-600" /> Curriculum Highlights
              </h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700">
                {bbaProgramData.curriculumHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </section>

             {/* 4. Career Prospects Section */}
            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaBriefcase className="mr-3 text-sky-600" /> Career Prospects
              </h2>
              <div className="flex flex-wrap gap-2">
                {bbaProgramData.careerProspects.map((prospect, index) => (
                  <span key={index} className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full">
                    {prospect}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="mt-12 lg:mt-0">
            <div className="bg-slate-50 p-6 rounded-lg shadow-md sticky top-28"> {/* sticky top-28 to account for your header height */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {bbaProgramData.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <feature.icon className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t pt-5">
                <Link
                  href="/admissions/how-to-apply" // Link to a general or specific application page
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

export default BbaProgramPage;