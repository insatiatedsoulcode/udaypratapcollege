// app/page.tsx
'use client'; // This page uses client-side hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js Image component for slideshow

// Component Imports
import Modal from '../src/components/Modal';
import InquiryForm from '../src/components/InquiryForm';
import NotificationTicker from '../src/components/NotificationTicker';
//import ConvocationBanner from '@/components/ConvocationBanner'; // Your new banner
//import SummerSchoolBanner from '@/components/SummerSchoolBanner';
import FeaturedEventsCarousel from '@/components/FeaturedEventsCarousel';

// SEO Component
import SEO from '@/components/SEO';
import SocialShare from '@/components/SocialShare';
import { organizationSchema, breadcrumbSchema } from '@/utils/structuredData';

// Social Media Icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// Define image paths relative to the `public` folder for your existing slideshow
const slideshowImages = [
  '/images/campus-slide-1.JPG',
  '/images/campus-slide-2.JPG',
  '/images/campus-slide-3.JPG',
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleInquirySuccess = () => {
    setIsModalOpen(false);
  };

  const breadcrumbItems = [
    { name: 'Home', url: '/' }
  ];

  return (
    <>
      <SEO
        title="Uday Pratap College - Premier Educational Institution"
        description="Join Uday Pratap College for quality education in BA, BBA, and BCA programs. Modern facilities, experienced faculty, and excellent placement opportunities. Apply now!"
        keywords="college admissions, BA program, BBA program, BCA program, higher education, academic excellence, college application, educational institution"
        canonical="/"
        ogImage="/images/og-image-1200x630.jpg"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Uday Pratap College - Premier Educational Institution with modern campus and quality education"
        twitterSite="@udaypratapcollege"
        twitterCreator="@udaypratapcollege"
        structuredData={[
          organizationSchema,
          breadcrumbSchema(breadcrumbItems)
        ]}
      />
      
      <main className="bg-white">
        {/* 1. Hero Section with Slideshow */}
        <section className="relative h-screen overflow-hidden">
          {/* Slideshow */}
          <div className="absolute inset-0">
            {slideshowImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`Campus View ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to <span className="text-yellow-400">Uday Pratap College</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Empowering Minds, Building Futures
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/apply"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                  Apply Now
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Slideshow Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slideshowImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* 2. Notification Ticker */}
        <NotificationTicker />

        {/* 3. Quick Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">500+</h3>
                <p className="text-gray-600">Students Enrolled</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">15+</h3>
                <p className="text-gray-600">Expert Faculty</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">95%</h3>
                <p className="text-gray-600">Placement Rate</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">3</h3>
                <p className="text-gray-600">Programs Offered</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Programs Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Our Programs
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive range of undergraduate programs designed to prepare you for success in today&apos;s competitive world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">BA</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Bachelor of Arts
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Explore diverse subjects and develop critical thinking skills in our comprehensive liberal arts program.
                  </p>
                  <Link
                    href="/academics/programs/ba"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">BBA</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Bachelor of Business Administration
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Develop leadership skills and business acumen to excel in the corporate world.
                  </p>
                  <Link
                    href="/academics/programs/bba"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">BCA</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Bachelor of Computer Applications
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Master cutting-edge technology and programming skills for the digital age.
                  </p>
                  <Link
                    href="/academics/programs/bca"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Featured Events */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Featured Events
              </h2>
              <p className="text-xl text-gray-600">
                Stay updated with our latest events and activities
              </p>
            </div>
            <FeaturedEventsCarousel />
          </div>
        </section>

        {/* 6. Why Choose Us Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Why Choose Uday Pratap College?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide an environment that fosters growth, learning, and success for every student.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Education</h3>
                <p className="text-gray-600">
                  Comprehensive curriculum designed by industry experts and experienced faculty.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Experienced Faculty</h3>
                <p className="text-gray-600">
                  Learn from qualified professors with years of teaching and industry experience.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Facilities</h3>
                <p className="text-gray-600">
                  State-of-the-art infrastructure with modern classrooms, labs, and library.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Placement Support</h3>
                <p className="text-gray-600">
                  Dedicated placement cell to help students secure promising career opportunities.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Support</h3>
                <p className="text-gray-600">
                  Comprehensive support services including counseling, mentoring, and career guidance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">
                  Embracing modern teaching methods and technology-enhanced learning experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of successful graduates who started their careers at Uday Pratap College.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/apply"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Apply Now
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
              >
                Get Information
              </button>
            </div>
          </div>
        </section>

        {/* 8. Social Media Section */}
        <section className="py-12 bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
            <p className="text-gray-300 mb-8">
              Follow us on social media for updates, news, and insights.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedinIn size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </section>

        {/* Social Share Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Share Our College</h2>
              <p className="text-lg text-gray-600">Help others discover Uday Pratap College by sharing this page</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <SocialShare />
            </div>
          </div>
        </section>

        {/* Modal for Inquiry Form */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <InquiryForm onSuccess={handleInquirySuccess} />
        </Modal>
      </main>
    </>
  );
};

export default HomePage;