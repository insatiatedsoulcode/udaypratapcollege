// src/components/FeaturedEventsCarousel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';

// Define the structure for each slide's data
type SlideData = {
  id: string;
  leftContent: {
    type: 'textBanner' | 'imageWithOverlays';
    // For 'textBanner' (like Convocation)
    bannerMainText?: string;
    bannerAccentText?: string;
    bannerAccentColor?: string; // Tailwind text color class e.g., 'text-orange-500'
    date?: string;
    venue?: string;
    // For 'imageWithOverlays' (like Summer School)
    imageUrl?: string;
    imageAlt?: string;
    topOverlay?: {
      title: string;
      titleHighlightBg?: string; // e.g., 'bg-blue-600'
      subtitle?: string;
    };
    bottomOverlay?: {
      text: string;
      textHighlightBg?: string; // e.g., 'bg-black bg-opacity-60'
    };
  };
  rightBox: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
};

// Data for your slides
const slides: SlideData[] = [
  {
    id: 'convocation',
    leftContent: {
      type: 'textBanner',
      bannerMainText: "Convocation",
      bannerAccentText: "'25",
      bannerAccentColor: "text-orange-500",
      date: "14, June 2025",
      venue: "The Music Academy, Chennai" // Replace with your details
    },
    rightBox: {
      title: "Save the date",
      description: "Join us for the most anticipated event of the year on 14 June 2025 at The Music Academy, Chennai.", // Replace
      buttonText: "Know more",
      buttonLink: "/convocation-details" // Replace
    }
  },
  {
    id: 'summerSchool',
    leftContent: {
      type: 'imageWithOverlays',
      imageUrl: "/images/placeholder-students.jpg", // IMPORTANT: Replace with your actual image
      imageAlt: "Students enjoying Summer School",
      topOverlay: {
        title: "UP College Summer School", // Customize
        titleHighlightBg: "bg-blue-600", // Example color
        subtitle: "Learning beyond boundaries"
      },
      bottomOverlay: {
        text: "Registration for the 2025 intake open now",
        textHighlightBg: "bg-black bg-opacity-60" // Example color
      }
    },
    rightBox: {
      title: "Summer School 2025", // Customize
      description: "Registration for the June batch closing on 1 June 2025. Explore exciting courses!", // Customize
      buttonText: "Register Now",
      buttonLink: "/summer-school-register" // Customize
    }
  },
  // Add more slides here if needed
];

const FeaturedEventsCarousel = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Optional: Auto-play
  useEffect(() => {
    const timer = setInterval(goToNextSlide, 8000); // Change slide every 8 seconds
    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[currentSlideIndex];
  const backgroundStyle = "bg-sky-800"; // Your patterned background class or style

  return (
    <section className={`relative ${backgroundStyle} text-white py-16 md:py-24 overflow-hidden`}>
      <div className="container mx-auto px-4 relative z-10">
        {/* Using a key on this div will help re-trigger animations when slide changes */}
        <div key={currentSlide.id} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Side Content - Dynamic based on slide type */}
          <div className="text-center md:text-left animate-slideInFromLeft">
            {currentSlide.leftContent.type === 'textBanner' && (
              <>
                <div className="inline-block bg-white text-sky-800 px-6 py-3 md:px-10 md:py-5 mb-4 shadow-lg">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                    {currentSlide.leftContent.bannerMainText}
                    {currentSlide.leftContent.bannerAccentText && (
                      <span className={currentSlide.leftContent.bannerAccentColor || 'text-orange-500'}>
                        {currentSlide.leftContent.bannerAccentText}
                      </span>
                    )}
                  </h1>
                </div>
                <p className="text-base sm:text-lg lg:text-xl mt-3 animate-fadeInUp [animation-delay:0.3s]">
                  {currentSlide.leftContent.date} <br />
                  {currentSlide.leftContent.venue}
                </p>
              </>
            )}

            {currentSlide.leftContent.type === 'imageWithOverlays' && currentSlide.leftContent.imageUrl && (
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={currentSlide.leftContent.imageUrl}
                  alt={currentSlide.leftContent.imageAlt || 'Event image'}
                  layout="fill"
                  objectFit="cover"
                />
                {currentSlide.leftContent.topOverlay && (
                  <div className="absolute top-0 left-0 w-full p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent">
                    <div className={`inline-block ${currentSlide.leftContent.topOverlay.titleHighlightBg || ''} px-3 py-1 rounded mb-1`}>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight">
                        {currentSlide.leftContent.topOverlay.title}
                      </h2>
                    </div>
                    {currentSlide.leftContent.topOverlay.subtitle && (
                      <p className="text-sm sm:text-base text-gray-100 font-medium">
                        {currentSlide.leftContent.topOverlay.subtitle}
                      </p>
                    )}
                  </div>
                )}
                {currentSlide.leftContent.bottomOverlay && (
                   <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className={`text-xs sm:text-sm text-gray-100 p-2 rounded inline-block ${currentSlide.leftContent.bottomOverlay.textHighlightBg || ''}`}>
                      {currentSlide.leftContent.bottomOverlay.text}
                    </p>
                  </div>
                )}
              </div>
            )}
             {/* Navigation Arrows - Common for all slides */}
            <div className="mt-6 flex justify-center md:justify-start space-x-3 animate-fadeInUp [animation-delay:0.5s]">
              <button
                onClick={goToPreviousSlide}
                aria-label="Previous Feature"
                className="bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-colors"
              >
                <FaArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={goToNextSlide}
                aria-label="Next Feature"
                className="bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-colors"
              >
                <FaArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Side Content Box - Common structure, dynamic content */}
          <div className="bg-white text-gray-800 p-6 sm:p-8 md:p-10 shadow-2xl rounded-lg animate-slideInFromRight">
            <h2
              className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900 animate-fadeInUp [animation-delay:0.2s]"
            >
              {currentSlide.rightBox.title}
            </h2>
            <hr
              className="border-gray-400 w-1/4 mb-4 animate-fadeInUp [animation-delay:0.4s]"
            />
            <p
              className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed animate-fadeInUp [animation-delay:0.6s]"
            >
              {currentSlide.rightBox.description}
            </p>
            <div className="animate-fadeInUp [animation-delay:0.8s]">
              <Link href={currentSlide.rightBox.buttonLink} legacyBehavior>
                <a className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-6 rounded-md transition-colors text-sm group">
                  {currentSlide.rightBox.buttonText}
                  <FaLongArrowAltRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Optional: Dot indicators for slides */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlideIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlideIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedEventsCarousel;