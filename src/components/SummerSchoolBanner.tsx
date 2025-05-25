// src/components/SummerSchoolBanner.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // For the main image on the left
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';

const SummerSchoolBanner = () => {
  // Re-use the same placeholder or your actual pattern class
  const backgroundStyle = "bg-sky-800"; // Placeholder: Dark blue background for the pattern

  return (
    <section className={`relative ${backgroundStyle} text-white py-16 md:py-24 overflow-hidden`}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Side Content - Image with Text Overlays */}
          <div className="relative text-center md:text-left animate-slideInFromLeft">
            {/* Placeholder Image - Replace with your actual summer school image */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/placeholder-students.jpg" // Replace with a relevant image path
                alt="Students participating in Summer School"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105" // Example hover effect
              />
              {/* Top Text Overlay */}
              <div className="absolute top-0 left-0 w-full p-4 md:p-6 bg-gradient-to-b from-black/60 to-transparent">
                <div className="inline-block bg-blue-600 px-3 py-1 rounded mb-1">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight">
                    Krea Summer School
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-gray-100 font-medium">
                  Learning beyond boundaries
                </p>
              </div>
              {/* Bottom Text Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-xs sm:text-sm bg-black bg-opacity-60 text-gray-100 p-2 rounded inline-block">
                  Registration for the 2025 intake open now
                </p>
              </div>
            </div>
            {/* Slideshow Arrows (visual placeholder) */}
            <div className="mt-6 flex justify-center md:justify-start space-x-3">
              <button
                aria-label="Previous event"
                className="bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-colors"
              >
                <FaArrowLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next event"
                className="bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-colors"
              >
                <FaArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Side Content Box */}
          <div className="bg-white text-gray-800 p-6 sm:p-8 md:p-10 shadow-2xl rounded-lg animate-slideInFromRight">
            <h2
              className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-900 animate-fadeInUp [animation-delay:0.2s]"
            >
              Krea Summer School 2025 {/* Replace if year is different */}
            </h2>
            <hr
              className="border-gray-400 w-1/4 mb-4 animate-fadeInUp [animation-delay:0.4s]"
            />
            <p
              className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed animate-fadeInUp [animation-delay:0.6s]"
            >
              Registration for the June batch closing on 1 June 2025.
              {/* Replace with your specific details */}
            </p>
            <div className="animate-fadeInUp [animation-delay:0.8s]">
              <Link href="/summer-school-register" legacyBehavior>
                <a className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-6 rounded-md transition-colors text-sm group">
                  Register Now
                  <FaLongArrowAltRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SummerSchoolBanner;