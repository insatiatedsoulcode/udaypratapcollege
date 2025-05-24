// app/page.tsx
'use client'; // This page uses client-side hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js Image component for slideshow

// Adjust these import paths based on where your components directory is.
// If 'components' is at the root (sibling to 'app'):
// ... other code ...
import Modal from '../src/components/Modal';
import InquiryForm from '../src/components/InquiryForm'; // <--- THIS IS THE FIX!
import NotificationTicker from '../src/components/NotificationTicker';
// ... other code ...
// If you decided to put 'components' inside 'src/' and 'app' is at the root:
// import Modal from '../src/components/Modal';
// import InquiryForm from '../src/components/InquiryForm';
// import NotificationTicker from '../src/components/NotificationTicker';


// Social Media Icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// Define image paths relative to the `public` folder
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
    // document.body.classList.add('modal-open-react'); // Handled by Modal.tsx
  };

  const closeInquiryModal = () => {
    setIsModalOpen(false);
    // document.body.classList.remove('modal-open-react'); // Handled by Modal.tsx
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
    const timer = setInterval(goToNextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const modalTimer = setTimeout(() => {
      openInquiryModal();
    }, 2500); // Delay modal pop-up
    return () => clearTimeout(modalTimer);
  }, []);

  return (
    <> {/* Using Fragment as the root layout is in app/layout.tsx */}
      <NotificationTicker />

      <div className="college-branding-section">
        {/* ... content from Canvas ... */}
        <div className="flex justify-center items-baseline flex-wrap mb-2 md:mb-2.5">
          <h1 className="mr-2.5">UDAY PRATAP COLLEGE, VARANASI</h1>
          <h2>उदय प्रताप महाविद्यालय, वाराणसी</h2>
        </div>
        <p className="mb-3 md:mb-4">(Affiliated to Mahatma Gandhi Kashi Vidyapith, Varanasi)</p>
        <div className="college-social-media-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
        </div>
      </div>

      <div
        className="hero-slideshow-full relative bg-cover bg-center"
        style={{ backgroundImage: `url(${slideshowImagePaths[currentImageIndex]})` }}
      >
        <button className="slideshow-arrow prev" onClick={goToPreviousSlide} aria-label="Previous slide">❮</button>
        <button className="slideshow-arrow next" onClick={goToNextSlide} aria-label="Next slide">❯</button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ... Welcome content from Canvas ... */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Uday Pratap College!
        </h2>
        <div className="space-y-4 text-gray-700 text-sm sm:text-base">
          <p>
            Our journey began in 2018, evolving from a small kindergarten into the full-fledged degree college we are today. We are proudly dedicated to serving the higher education needs of the younger generation, empowering them to achieve their academic and professional goals. Our commitment is to provide quality learning experiences that foster growth and prepare students for the future.
          </p>
          <p>
            At Uday Pratap College, explore a diverse range of undergraduate programs designed for today's world. We offer the Bachelor of Business Administration (BBA), Bachelor of Computer Applications (BCA), and a versatile Bachelor of Arts (BA) degree. BA specializations include sought-after fields like English, Political Science, Home Science, Hindi, and Economics. Discover your potential within our supportive academic community. Explore our courses and begin your journey with us!
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