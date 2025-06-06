// app/admissions/how-to-apply/page.tsx
import React from 'react';
import Link from 'next/link';
// Import icons to make the steps more visual
import { FaUserCheck, FaFileAlt, FaFileUpload, FaCreditCard, FaCheckCircle, FaChevronRight } from 'react-icons/fa';

// Placeholder data for easy editing. Replace with your actual information.
const applicationSteps = [
  {
    icon: FaUserCheck,
    title: 'Check Your Eligibility',
    description: 'Before applying, please ensure you meet the eligibility criteria for your chosen program. You can review the details on each individual program page.',
  },
  {
    icon: FaFileAlt,
    title: 'Fill the Online Application Form',
    description: 'Click on the "Start Application" button below to access our secure online portal. Fill in your personal, academic, and contact details carefully.',
  },
  {
    icon: FaFileUpload,
    title: 'Upload Required Documents',
    description: 'Scan and upload clear copies of all the required documents. Please refer to the checklist below to ensure you have everything ready.',
  },
  {
    icon: FaCreditCard,
    title: 'Pay the Application Fee',
    description: 'Complete your application by paying the non-refundable application fee through our secure online payment gateway. We accept various payment methods.',
  },
  {
    icon: FaCheckCircle,
    title: 'Submit & Track',
    description: 'Once you have reviewed your application and completed the payment, submit the form. You will receive a confirmation email with your application number, which you can use to track your application status.',
  },
];

const requiredDocuments = [
  'Recent passport-sized photograph',
  'Scanned signature of the applicant',
  '10th Standard / SSLC mark sheet',
  '12th Standard / PUC mark sheet',
  'Transfer Certificate (TC) from the last institution attended',
  'Caste/Community certificate (if applicable)',
  'Aadhaar Card or other government-issued ID proof',
];

const importantDates = [
  { event: 'Online Application Opens', date: 'To be announced' },
  { event: 'Last Date to Apply', date: 'To be announced' },
  { event: 'Entrance Test (if applicable)', date: 'To be announced' },
  { event: 'Merit List Announcement', date: 'To be announced' },
];

const HowToApplyPage = () => {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 text-center">
        How to Apply
      </h1>
      <p className="text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
        Follow our simple step-by-step guide to complete your application for admission to Uday Pratap College. We look forward to reviewing your application.
      </p>

      {/* Step-by-Step Guide Section */}
      <div className="max-w-4xl mx-auto">
        {applicationSteps.map((step, index) => (
          <div key={index} className="flex items-start mb-8">
            <div className="flex flex-col items-center mr-6">
              <div className="bg-sky-600 text-white rounded-full h-12 w-12 flex items-center justify-center">
                <step.icon className="h-6 w-6" />
              </div>
              {index < applicationSteps.length - 1 && (
                <div className="w-0.5 h-16 bg-slate-200 mt-2"></div> // Connector line
              )}
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 flex-1">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Step {index + 1}: {step.title}</h2>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Button */}
      <div className="text-center my-12">
        <Link
          href="/apply" // This should link to your actual application portal
          className="inline-block bg-orange-500 text-white text-lg font-semibold px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
        >
          Start Your Application Now
        </Link>
      </div>

      {/* Required Documents & Important Dates */}
      <div className="grid md:grid-cols-2 gap-12 mt-16 pt-10 border-t">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Required Documents</h3>
          <ul className="space-y-2">
            {requiredDocuments.map((doc, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <FaChevronRight className="h-3 w-3 text-sky-500 mr-2 mt-1.5 flex-shrink-0" /> {doc}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Important Dates</h3>
          <ul className="space-y-2">
            {importantDates.map((item, index) => (
              <li key={index} className="flex justify-between border-b pb-1">
                <span className="text-gray-700">{item.event}:</span>
                <span className="font-semibold text-gray-800">{item.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default HowToApplyPage;