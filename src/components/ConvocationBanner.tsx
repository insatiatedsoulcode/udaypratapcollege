// src/components/ConvocationBanner.tsx
import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';

const ConvocationBanner = () => {
  const backgroundStyle = "bg-sky-800"; // Placeholder: Dark blue background

  // Utility for animation delay classes if you want to apply them programmatically
  // const getDelayClass = (delay: number) => `animation-delay-${delay}`;
  // For Tailwind, you often define specific delay utilities or use inline styles for animation-delay
  // if not using a plugin. Simpler for now to add classes directly if a few.
  // Or, define custom delay utilities in tailwind.config.js if you use them a lot.
  // For simplicity, I'll use example direct classes like 'animate-[fadeInUp_0.7s_ease-out_0.3s_forwards]'
  // which allows setting delay directly in the class if your Tailwind setup supports arbitrary values for animation.
  // Otherwise, you'd create animation-delay utilities or use inline style.

  // Let's assume you have basic delay utilities or will add them, e.g.,
  // in tailwind.config.js -> theme.extend.animationDelay = { '100': '100ms', '200': '200ms', ... }
  // Then you can use: `animate-fadeInUp delay-200`
  // For this example, I will use a common Tailwind JIT mode feature for arbitrary animation properties.
  // If this doesn't work, you'll need to define specific animation delay utilities in your config.

  return (
    <section className={`relative ${backgroundStyle} text-white py-16 md:py-24 overflow-hidden`}> {/* Added overflow-hidden */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Side Content */}
          <div className="text-center md:text-left">
            <div
              className="inline-block bg-white text-sky-800 px-6 py-3 md:px-10 md:py-5 mb-4 shadow-lg animate-slideInFromLeft"
              // style={{animationDelay: '0.1s'}} // Alternative for delay
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight">
                Convocation <span className="text-orange-500">'25</span>
              </h1>
            </div>
            <p
              className="text-base sm:text-lg lg:text-xl mt-3 animate-fadeInUp [animation-delay:0.3s]" // Using JIT mode for delay
            >
              14, June 2025 <br />
              The Music Academy, Chennai
            </p>
            <div
              className="mt-8 flex justify-center md:justify-start space-x-3 animate-fadeInUp [animation-delay:0.5s]"
            >
              <button
                aria-label="Previous slide"
                className="bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-colors"
              >
                <FaArrowLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next slide"
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
              Save the date
            </h2>
            <hr
              className="border-gray-400 w-1/4 mb-4 animate-fadeInUp [animation-delay:0.4s]"
            />
            <p
              className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed animate-fadeInUp [animation-delay:0.6s]"
            >
              Join us for the most anticipated event of the year on 14 June 2025 at The Music Academy, Chennai.
            </p>
            <div className="animate-fadeInUp [animation-delay:0.8s]"> {/* Wrapper for button animation */}
              <Link href="/event-details" legacyBehavior>
                <a className="inline-flex items-center bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2.5 px-6 rounded-md transition-colors text-sm group">
                  Know more
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

export default ConvocationBanner;