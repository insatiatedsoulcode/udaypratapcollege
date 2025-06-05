// app/academics/programs/page.tsx
'use client';

import React, { useState } from 'react'; // <<< Import useState
import Image from 'next/image';
import Link from 'next/link';
// --- VVV ADD THESE IMPORTS VVV ---
import Modal from '@/components/Modal';
import InquiryForm from '@/components/InquiryForm';
import KeyFeatureSection from '@/components/KeyFeatureSection';
// --- ^^^ END OF ADDED IMPORTS ^^^ ---

// Import icons
import { FaFlask, FaLaptopCode, FaLightbulb, FaBookReader, FaUsers, FaChartLine, FaChevronRight } from 'react-icons/fa';

const programsData = [
  {
    id: 'bba',
    name: 'Bachelor of Business Administration (BBA)',
    tagline: 'Strategic Innovation & Data-Driven Decisions',
    description: 'Our BBA program integrates core business principles with modern data analytics and research methodologies, preparing leaders for an evolving global market.',
    imageUrl: '/images/programs/bbav1.png',
    keyFeatures: [
      { icon: FaChartLine, text: 'Business Analytics Focus' },
      { icon: FaLightbulb, text: 'Entrepreneurship & Innovation Lab' },
      { icon: FaUsers, text: 'Industry Research Projects' },
    ],
    detailsLink: '/academics/programs/bba',
  },
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications (BCA)',
    tagline: 'Pioneering Software & AI Solutions',
    description: 'Explore the frontiers of computer science with hands-on experience in AI, machine learning, and software engineering within our advanced research labs.',
    imageUrl: '/images/programs/bcav1.png',
    keyFeatures: [
      { icon: FaLaptopCode, text: 'Advanced Software Development' },
      { icon: FaLightbulb, text: 'AI & Machine Learning Research' },
      { icon: FaFlask, text: 'Dedicated Project Labs' },
    ],
    detailsLink: '/academics/programs/bca',
  },
  {
    id: 'ba',
    name: 'Bachelor of Arts (BA)',
    tagline: 'Critical Inquiry & Societal Impact',
    description: 'Our BA program encourages in-depth research across humanities and social sciences, fostering analytical skills to address complex societal challenges.',
    imageUrl: '/images/programs/bav1.png',
    specializations: [
      'English (Focus: Digital Humanities Research)',
      'Political Science (Focus: Policy Analysis & Research)',
      // ... more specializations
    ],
    keyFeatures: [
      { icon: FaBookReader, text: 'Interdisciplinary Research Methods' },
      { icon: FaUsers, text: 'Community-Engaged Projects' },
    ],
    detailsLink: '/academics/programs/ba',
  },
];


const ProgramsOfferedPage = () => {
  // --- VVV ADD STATE AND HANDLERS FOR THE MODAL VVV ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openInquiryModal = () => setIsModalOpen(true);
  const closeInquiryModal = () => setIsModalOpen(false);
  // --- ^^^ END OF ADDED STATE AND HANDLERS ^^^ ---

  return (
    <> {/* Wrap in a React Fragment to accommodate the Modal at the same level as main */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4 text-center rounded-xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Explore Our Online Degree Programs</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our online UG & PG degree programs and begin an exciting educational journey
          </p>
        </section>
        <KeyFeatureSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {programsData.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 group"
            >
              {program.imageUrl && (
                <div className="relative w-full h-48 sm:h-52">
                  <Image
                    src={program.imageUrl}
                    alt={`${program.name} program image`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="p-5 md:p-6 flex flex-col flex-grow">
                {/* ... card content (h3, p, keyFeatures, etc.) ... */}
                <h3 className="text-lg md:text-xl font-semibold text-sky-700 mb-1">{program.name}</h3>
                {program.tagline && (
                  <p className="text-xs text-sky-600 font-medium mb-3">{program.tagline}</p>
                )}
                <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed">{program.description}</p>

                {program.keyFeatures && program.keyFeatures.length > 0 && (
                  <div className="mb-4 pt-3 border-t border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Features:</h4>
                    <ul className="space-y-1.5">
                      {program.keyFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start text-xs text-slate-600">
                          <feature.icon className="h-3.5 w-3.5 text-sky-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {program.detailsLink && (
                  <div className="mt-5 pt-3 border-t border-slate-200">
                    <Link
                      href={program.detailsLink}
                      className="inline-flex items-center justify-center w-full sm:w-auto bg-sky-600 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all duration-150 shadow-md hover:shadow-lg"
                    >
                      Program Details
                      <FaChevronRight className="ml-2 h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <section className="mt-20 py-12 px-4 bg-yellow-50 text-center rounded-lg shadow-inner">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Ready to Begin Your Journey?</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-5">Explore detailed program information or get in touch with our admissions team today.</p>
          {/* --- VVV UPDATED BUTTON VVV --- */}
          <button
            onClick={openInquiryModal} // Add onClick handler to open the modal
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-all"
          >
            Contact Admissions
          </button>
          {/* --- ^^^ END OF UPDATED BUTTON ^^^ --- */}
        </section>
      </main>

      {/* --- VVV ADD MODAL COMPONENT AT THE END VVV --- */}
      <Modal isOpen={isModalOpen} onClose={closeInquiryModal}>
        <InquiryForm onSuccess={closeInquiryModal} />
      </Modal>
      {/* --- ^^^ END OF ADDED MODAL COMPONENT ^^^ --- */}
    </>
  );
};

export default ProgramsOfferedPage;