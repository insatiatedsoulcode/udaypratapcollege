// app/student-life/facilities/page.tsx
'use client'; // Using client component for potential future interactive elements

import React from 'react';
import Image from 'next/image';
import { FaBook, FaBus, FaUtensils, FaBuilding, FaCheckCircle } from 'react-icons/fa';

// --- Data for Facilities ---
// Replace with your actual information and image paths
const facilitiesData = [
  {
    id: 'hostel',
    name: 'Hostel Accommodation',
    icon: FaBuilding,
    description: 'Our on-campus hostels provide a secure, comfortable, and conducive living environment, helping students feel at home. We offer separate, well-maintained blocks for boys and girls.',
    imageUrl: '/images/facilities/hostel.png', // Replace with your image
    features: ['24/7 Security & CCTV Surveillance', 'Wi-Fi Connectivity', 'Recreational Common Rooms', 'Hygienic Mess Facilities'],
  },
  {
    id: 'library',
    name: 'Library & Information Center',
    icon: FaBook,
    description: 'The central library is a hub of knowledge with a vast collection of books, journals, and digital resources to support academic and research activities across all disciplines.',
    imageUrl: '/images/facilities/library.png', // Replace with your image
    features: ['Vast collection of textbooks and reference materials', 'Subscriptions to national & international journals', 'Access to e-resources like J-Gate, N-LIST', 'Spacious and quiet reading halls'],
  },
  {
    id: 'canteen',
    name: 'Canteen & Mess',
    icon: FaUtensils,
    description: 'Our canteen and mess serve a variety of nutritious and hygienic food options to cater to diverse tastes. It\'s a vibrant space for students to relax and socialize.',
    imageUrl: '/images/facilities/canteen.png', // Replace with your image
    features: ['Multi-cuisine menu', 'Strict hygiene and quality standards', 'Affordable pricing', 'Comfortable seating arrangement'],
  },
  // Add more facilities like Labs, Sports Complex, Auditorium, etc.
];

const busRoutesData = [
  { route: 'Route 1', areas: 'Lanka, Assi Ghat, Nagwa, Bhelupur' },
  { route: 'Route 2', areas: 'Varanasi Cantt. Station, Sigra, Maldahiya' },
  { route: 'Route 3', areas: 'Pandeypur, Paharia, Sarnath' },
  { route: 'Route 4', areas: 'DLW, Manduadih, Kakarmatta' },
  { route: 'Route 5', areas: 'Chaukaghat, Nadesar, Andhrapul' },
  { route: 'Route 6', areas: 'Shivpur, Tarna, Gilat Bazar' },
  { route: 'Route 7', areas: 'Ramnagar, Padao, Mughalsarai Area' },
  { route: 'Route 8', areas: 'Babatpur Airport Area, Harahua' },
  // Add or modify routes as needed
];

const FacilitiesPage = () => {
  return (
    <main className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-56 md:h-72 bg-sky-800">
        <Image
          src="/images/facilities/campus-overview.jpg" // Replace with a generic, wide campus shot
          alt="Campus overview"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our Campus Facilities
          </h1>
          <p className="mt-3 text-lg md:text-xl max-w-2xl">
            Providing a world-class environment for learning, living, and growth.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitiesData.map((facility) => (
            <div key={facility.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
              <div className="relative w-full h-56">
                <Image
                  src={facility.imageUrl}
                  alt={`Image of ${facility.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <facility.icon className="h-6 w-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-semibold text-gray-800">{facility.name}</h2>
                </div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{facility.description}</p>
                <ul className="space-y-2">
                  {facility.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-700">
                      <FaCheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transportation Section */}
      <section className="bg-white py-12 md:py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 flex items-center justify-center">
              <FaBus className="mr-4 text-sky-600" /> Transportation Services
            </h2>
            <p className="mt-2 text-md text-slate-600 max-w-2xl mx-auto">
              We provide safe and reliable bus services covering major routes across Varanasi and nearby areas for the convenience of our students and staff.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">Route Number</th>
                  <th scope="col" className="px-6 py-3">Areas Covered</th>
                </tr>
              </thead>
              <tbody>
                {busRoutesData.map((route, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {route.route}
                    </th>
                    <td className="px-6 py-4">
                      {route.areas}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FacilitiesPage;