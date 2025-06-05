// app/admissions/page.tsx
'use client'; // This component uses hooks (useState) for the FAQ accordion

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Import icons for visual appeal
import {
  FaGraduationCap,
  FaFileSignature,
  FaDollarSign,
  FaCalendarAlt,
  FaChevronDown,
} from 'react-icons/fa';

// --- Data for this page (easy to edit) ---
const keyInfoCards = [
  {
    icon: FaGraduationCap,
    title: 'Programs Offered',
    description: 'Explore our diverse range of UG & PG programs.',
    link: '/academics/programs'
  },
  {
    icon: FaFileSignature,
    title: 'How to Apply',
    description: 'A step-by-step guide to our application process.',
    link: '/admissions/how-to-apply'
  },
  {
    icon: FaDollarSign,
    title: 'Fees & Scholarships',
    description: 'Details on our fee structure and financial aid options.',
    link: '/admissions/fee-structure'
  },
  {
    icon: FaCalendarAlt,
    title: 'Important Dates',
    description: 'View the academic calendar and admission deadlines.',
    link: '/admissions/important-dates'
  },
];

const faqData = [
  {
    question: 'What are the eligibility criteria for undergraduate programs?',
    answer: 'For most undergraduate programs, the minimum eligibility is completion of 10+2 or an equivalent examination from a recognized board. Specific programs, like BCA, may require Mathematics as a subject. Please visit the individual program pages for detailed criteria.'
  },
  {
    question: 'Is there an entrance exam for admission?',
    answer: 'Admission procedures may vary by program. Some programs may require scores from national entrance exams, while others may have their own entrance test or base admission on merit. Please check the "How to Apply" page for details.'
  },
  {
    question: 'How can I apply for scholarships?',
    answer: 'Information regarding available scholarships, eligibility, and the application process will be made available on our "Fees & Scholarships" page. We offer both merit-based and need-based financial aid.'
  },
  {
    question: 'What documents are required for the application?',
    answer: 'A standard set of documents including mark sheets for 10th and 12th grades, a transfer certificate, a recent photograph, and an ID proof are required. A complete checklist is available on the "How to Apply" page.'
  }
];
// --- End of Data Definition ---


const AdmissionsPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="relative h-64 md:h-80 bg-slate-700 text-white">
        <Image
          src="/images/admissions-banner.jpg" // IMPORTANT: Replace with a high-quality, inspiring photo
          alt="Students on Uday Pratap College campus"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight shadow-sm">
            Admissions 2025-2026
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">
            Begin your journey towards academic excellence and a successful future with us.
          </p>
        </div>
      </section>

      {/* 2. Key Info Cards Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {keyInfoCards.map((card, index) => (
            <Link
              key={index}
              href={card.link}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex items-start space-x-4"
            >
              <card.icon className="h-8 w-8 text-sky-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-gray-800">{card.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-slate-600">
              Have questions? Find quick answers here.
            </p>
          </div>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-slate-50 focus:outline-none focus:bg-slate-100"
                  aria-expanded={openFaqIndex === index}
                >
                  <span>{faq.question}</span>
                  <FaChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="p-5 pt-0 text-gray-600 leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA Section */}
      <section className="bg-sky-700 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Apply?</h2>
          <p className="max-w-xl mx-auto mb-6">
            Our admissions team is ready to assist you. Start your application or contact us for any further queries.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/admissions/how-to-apply"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Apply Now
            </Link>
            <Link
              href="/contact-us"
              className="bg-white text-sky-700 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 hover:shadow-lg transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdmissionsPage;