// app/page.tsx
'use client'; // This page uses client-side hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
//import Image from 'next/image'; // Using Next.js Image component for slideshow

// Component Imports
import Modal from '../src/components/Modal';
import InquiryForm from '../src/components/InquiryForm';
import NotificationTicker from '../src/components/NotificationTicker';
//import ConvocationBanner from '@/components/ConvocationBanner'; // Your new banner
//import SummerSchoolBanner from '@/components/SummerSchoolBanner';
import FeaturedEventsCarousel from '@/components/FeaturedEventsCarousel';


// Social Media Icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// Define image paths relative to the `public` folder for your existing slideshow
const slideshowImagePaths = [
  '/images/campus-slide-1.JPG', // Assuming images are in public/images/
  '/images/campus-slide-2.JPG',
  '/images/campus-slide-3.JPG',
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openInquiryModal = () => {
    setIsModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsModalOpen(false);
  };

  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? slideshowImagePaths.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === slideshowImagePaths.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(goToNextSlide, 5000); // Slideshow timer
    return () => clearInterval(timer);
  }, []); // Empty dependency array to run only on mount and unmount

  useEffect(() => {
    const modalTimer = setTimeout(() => {
      // Only open modal if it's not already open, to prevent re-opening on hot reloads etc.
      if (!isModalOpen) {
        openInquiryModal();
      }
    }, 25000); // Increased delay for modal pop-up to 25 seconds
    return () => clearTimeout(modalTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Added isModalOpen to dependency array if you want it to re-evaluate, or keep empty for one-time attempt

  return (
    <> {/* Using Fragment as the root layout is in app/layout.tsx */}
      <NotificationTicker />

      <div className="college-branding-section text-center py-4 bg-gray-100"> {/* Added basic styling */}
        <div className="flex justify-center items-baseline flex-wrap mb-2 md:mb-2.5">
          {/* Added font styling for better appearance */}
          <h1 className="mr-2.5 text-2xl md:text-3xl font-bold text-gray-800">UDAY PRATAP COLLEGE, VARANASI</h1>
          <h2 className="text-xl md:text-2xl text-gray-700">उदय प्रताप महाविद्यालय, वाराणसी</h2>
        </div>
        <p className="mb-3 md:mb-4 text-sm text-gray-600">(Affiliated to Mahatma Gandhi Kashi Vidyapith, Varanasi)</p>
        <div className="college-social-media-links flex justify-center space-x-4 text-gray-600"> {/* Added flex for spacing */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-500"><FaFacebookF size="1.2em"/></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-500"><FaTwitter size="1.2em"/></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-500"><FaInstagram size="1.2em"/></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-500"><FaLinkedinIn size="1.2em"/></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-orange-500"><FaYoutube size="1.2em"/></a>
        </div>
      </div>

      {/* Your existing hero slideshow */}
      <div
        className="hero-slideshow-full relative h-64 md:h-96 lg:h-[500px] bg-cover bg-center group" // Added height and group for better arrow visibility
        style={{ backgroundImage: `url(${slideshowImagePaths[currentImageIndex]})` }}
      >
        {/* Styled slideshow arrows */}
        <button
          className="slideshow-arrow prev absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 md:p-3 rounded-full hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none"
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          className="slideshow-arrow next absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 md:p-3 rounded-full hover:bg-opacity-50 transition-opacity opacity-0 group-hover:opacity-100 focus:outline-none"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>

      {/* ADDED THE CONVOCATION BANNER HERE */}

      <FeaturedEventsCarousel />

      {/* Your existing welcome content section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Uday Pratap College!
        </h2>
        <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed"> {/* Added leading-relaxed */}
          <p>
            Our journey began in 2018, evolving from a small kindergarten into the full-fledged degree college we are today. We are proudly dedicated to serving the higher education needs of the younger generation, empowering them to achieve their academic and professional goals. Our commitment is to provide quality learning experiences that foster growth and prepare students for the future.
          </p>
          <p>
            At Uday Pratap College, explore a diverse range of undergraduate programs designed for today&apos;s world. We offer the Bachelor of Business Administration (BBA), Bachelor of Computer Applications (BCA), and a versatile Bachelor of Arts (BA) degree. BA specializations include sought-after fields like English, Political Science, Home Science, Hindi, and Economics. Discover your potential within our supportive academic community. Explore our courses and begin your journey with us!
          </p>
        </div>
        <div className="text-center my-8">
          <button
              onClick={openInquiryModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-150 text-base"
          >
              Have Questions? Open Inquiry Form
          </button>
        </div>
        <hr className="my-8 border-gray-300" />
        <p className="text-center text-gray-600 text-sm sm:text-base">
          <Link href="/academics" className="text-indigo-600 hover:underline mx-2">Explore Academics</Link> |
          <Link href="/admissions" className="text-indigo-600 hover:underline mx-2">Admission Info</Link> |
          <Link href="/student-life" className="text-indigo-600 hover:underline mx-2">Student Life</Link>
        </p>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeInquiryModal}>
          <InquiryForm onSuccess={closeInquiryModal} />
      </Modal>
    </>
  );
}