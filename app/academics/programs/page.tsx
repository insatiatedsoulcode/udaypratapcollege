// app/academics/programs/page.tsx
'use client';

import React, { useState } from 'react'; // <<< Import useState
import Link from 'next/link';
// --- VVV ADD THESE IMPORTS VVV ---
import Modal from '@/components/Modal';
import InquiryForm from '@/components/InquiryForm';
import KeyFeatureSection from '@/components/KeyFeatureSection';
// --- ^^^ END OF ADDED IMPORTS ^^^ ---

const programsData = [
  {
    id: 'ba',
    name: 'Bachelor of Arts',
    shortName: 'BA',
    duration: '3 Years',
    description: 'Explore diverse subjects and develop critical thinking skills in our comprehensive liberal arts program.',
    annualFee: '5,000',
    detailsLink: '/academics/programs/ba',
    theme: {
      border: 'border-blue-500',
      bgCard: 'bg-blue-50/50',
      bgBadge: 'bg-blue-600',
      textMain: 'text-blue-600',
      bgPill: 'bg-white',
      borderPill: 'border-blue-100',
      btnHover: 'hover:bg-blue-700'
    }
  },
  {
    id: 'bba',
    name: 'Bachelor of Business Administration',
    shortName: 'BBA',
    duration: '3 Years',
    description: 'Develop leadership skills and business acumen to excel in the corporate world.',
    annualFee: '25,000',
    detailsLink: '/academics/programs/bba',
    theme: {
      border: 'border-emerald-500',
      bgCard: 'bg-emerald-50/50',
      bgBadge: 'bg-emerald-600',
      textMain: 'text-emerald-600',
      bgPill: 'bg-white',
      borderPill: 'border-emerald-100',
      btnHover: 'hover:bg-emerald-700'
    }
  },
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications',
    shortName: 'BCA',
    duration: '3 Years',
    description: 'Master cutting-edge technology and programming skills for the digital age.',
    annualFee: '25,000',
    detailsLink: '/academics/programs/bca',
    theme: {
      border: 'border-purple-500',
      bgCard: 'bg-purple-50/50',
      bgBadge: 'bg-purple-600',
      textMain: 'text-purple-600',
      bgPill: 'bg-white',
      borderPill: 'border-purple-100',
      btnHover: 'hover:bg-purple-700'
    }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
          {programsData.map((program) => (
            <div
              key={program.id}
              className={`relative ${program.theme.bgCard} rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden border-t-[6px] ${program.theme.border} group`}
            >

              <div className="p-8 md:p-10 flex flex-col flex-grow relative z-10">

                {/* Header Row: Badge & Duration */}
                <div className="flex justify-between items-start mb-10 text-center">
                  <div className={`w-20 h-20 ${program.theme.bgBadge} text-white rounded-[1.25rem] flex items-center justify-center shadow-md transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300`}>
                    <span className="text-[1.75rem] font-black tracking-tight">{program.shortName}</span>
                  </div>
                  <span className={`text-[13px] font-bold ${program.theme.textMain} ${program.theme.bgPill} border ${program.theme.borderPill} px-4 py-1.5 rounded-full shadow-sm`}>
                    {program.duration}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight leading-tight pr-4">
                  {program.name}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-base md:text-[1.05rem] mb-auto">
                  {program.description}
                </p>

                {/* Pricing Block */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none pb-1">Annual Fee</span>
                    <span className="text-[2rem] font-black text-gray-900 leading-none">₹{program.annualFee}</span>
                  </div>

                  {program.detailsLink && (
                    <Link
                      href={program.detailsLink}
                      className={`flex items-center justify-center w-full ${program.theme.bgBadge} ${program.theme.btnHover} text-white text-[1.05rem] font-bold py-4 rounded-xl transition-colors duration-200 shadow-md group-hover:shadow-lg`}
                    >
                      Explore Program
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                  )}
                </div>

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