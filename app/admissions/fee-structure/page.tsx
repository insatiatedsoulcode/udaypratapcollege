// app/admissions/fee-structure/page.tsx
import React from 'react';
import Link from 'next/link';
import { FaGraduationCap, FaHandHoldingUsd, FaMoneyCheckAlt, FaInfoCircle } from 'react-icons/fa';

// --- Placeholder Fee Data ---
// IMPORTANT: Replace this with your actual program fee details.
const feeData = [
  {
    program: 'Bachelor of Business Administration (BBA)',
    tuition: '₹60,000',
    exam: '₹5,000',
    other: '₹5,000',
    total: '₹70,000'
  },
  {
    program: 'Bachelor of Computer Applications (BCA)',
    tuition: '₹65,000',
    exam: '₹5,000',
    other: '₹7,500',
    total: '₹77,500'
  },
  {
    program: 'Bachelor of Arts (BA)',
    tuition: '₹30,000',
    exam: '₹5,000',
    other: '₹2,500',
    total: '₹37,500'
  },
];

const scholarshipsData = [
  {
    name: 'Merit-Based Scholarships',
    description: 'Awarded to students with outstanding academic achievements in their qualifying examinations or during their studies at the college.'
  },
  {
    name: 'Need-Based Financial Aid',
    description: 'Financial assistance is available for students from economically weaker sections to ensure that financial constraints do not hinder their academic pursuits.'
  },
  {
    name: 'Special Scholarships',
    description: 'Scholarships are also available for students excelling in sports, cultural activities, and for specific categories as per university and government norms.'
  }
];

const FeeStructurePage = () => {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Fee Structure & Financial Aid
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          We believe in transparent and affordable education. Here you can find a detailed breakdown of our fees and information on available scholarships.
        </p>
      </div>

      <section>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaGraduationCap className="mr-3 text-sky-600" /> Program Tuition Fees (Per Annum)
        </h2>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">Program Name</th>
                <th scope="col" className="px-6 py-3 text-right">Tuition Fee</th>
                <th scope="col" className="px-6 py-3 text-right">Exam Fee</th>
                <th scope="col" className="px-6 py-3 text-right">Other Fees</th>
                <th scope="col" className="px-6 py-3 text-right font-bold">Total Annual Fee</th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((programData, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {programData.program}
                  </th>
                  <td className="px-6 py-4 text-right">{programData.tuition}</td>
                  <td className="px-6 py-4 text-right">{programData.exam}</td>
                  <td className="px-6 py-4 text-right">{programData.other}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{programData.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaHandHoldingUsd className="mr-3 text-sky-600" /> Scholarships & Financial Aid
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarshipsData.map((scholarship, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-lg text-orange-600 mb-2">{scholarship.name}</h3>
              <p className="text-sm text-gray-600">{scholarship.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">For detailed eligibility and application procedures, please <Link href="/contact-us" className="text-sky-600 font-medium hover:underline">contact the admissions office</Link>.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaMoneyCheckAlt className="mr-3 text-sky-600" /> How to Pay Fees
        </h2>
        <div className="bg-white p-6 rounded-lg border border-slate-200 prose prose-sm max-w-none">
          <p>
            College fees can be paid through our online payment portal, bank transfer (NEFT/RTGS), or Demand Draft.
          </p>
          <p>
            For online payments, please use the official student portal. Ensure you enter the student&apos;s registration number correctly.
          </p>
          <div className="mt-4">
            <Link href="/portal-login" className="inline-block bg-orange-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors">
              Go to Payment Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-16">
         <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 flex items-center">
          <FaInfoCircle className="mr-3 text-sky-600" /> Important Notes
        </h2>
        <div className="bg-sky-50 p-6 rounded-lg border border-sky-200 text-sm text-sky-800 space-y-2">
          <p>• Hostel and Mess fees are separate and are not included in the tuition fees table above. Please contact the hostel office for details.</p>
          <p>• The fee structure is subject to revision as per the guidelines of the university/state government.</p>
          <p>• All fees once paid are non-refundable. Please refer to the college&apos;s refund policy for more details.</p>
        </div>
      </section>
    </main>
  );
};

export default FeeStructurePage;