// src/components/KeyFeatureSection.tsx
'use client';

import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import Image from 'next/image'; // Uncomment if your graphics are actual images via next/image

// Define the data for the feature slides
// (Make sure this array is defined with your actual content and graphicClasses/graphicUrls)
const featureSlidesData = [
  {
    id: 'ethics',
    title: 'Ethics',
    description: 'A focus on ethics to think holistically, is a core graduate attribute and an integral part of our degree. Partnerships for Ethics are also developed for delivery of this component.',
    graphicClass: 'bg-blue-100', // Placeholder for actual graphic styling/image
  },
  {
    id: 'interdisciplinary',
    title: 'Interdisciplinary Approach',
    description: 'Our curriculum emphasizes interdisciplinary learning, connecting diverse fields of study to foster innovative thinking and problem-solving skills.',
    graphicClass: 'bg-green-100', // Placeholder
  },
  {
    id: 'research',
    title: 'Research Based Learning',
    description: 'Students engage in research-based projects, developing critical analytical skills and contributing to knowledge creation.',
    graphicClass: 'bg-yellow-100', // Placeholder
  },
  // Add more features as needed
];


const KeyFeatureSection = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const nextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % featureSlidesData.length);
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex - 1 + featureSlidesData.length) % featureSlidesData.length);
  };

  // --- useEffect for Auto-Play ---
  useEffect(() => {
    // Set up the interval
    const autoPlayTimer = setInterval(() => {
      nextFeature(); // Call the function to go to the next slide
    }, 8000); // Change slide every 8000 milliseconds (8 seconds). Adjust as you like.

    // Clean up function: This runs when the component unmounts
    // or before the effect runs again if its dependencies were to change.
    return () => {
      clearInterval(autoPlayTimer); // Stop the timer to prevent memory leaks
    };
  }, []); // The empty dependency array [] means this effect runs only once after the initial render (on mount)
          // and the cleanup function runs when the component unmounts.
  // --- End of useEffect for Auto-Play ---

  const activeFeature = featureSlidesData[currentFeatureIndex];
  const commonGraphicBackgroundClass = "bg-sky-700"; // Replace with your actual graphic/pattern class

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          <div className="prose lg:prose-lg xl:prose-xl max-w-none animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Interwoven Learning Experience {/* Replace with your title */}
            </h2>
            <p>
              At Uday Pratap College, we believe in a holistic approach to education. Our guiding principles are essential for a transformative and cutting-edge college experience.
            </p>
            <p>
              Every Major will be <strong className="font-semibold">writing intensive, interdisciplinary, and research based</strong>; focus on <strong className="font-semibold">ethics and the historicity</strong> of different ideas, concepts, and practices; provide <strong className="font-semibold">immersive experiences</strong>; develop awareness of <strong className="font-semibold">data analytics</strong> and the impact of rapidly evolving technologies on disciplines and communities; and <strong className="font-semibold">raise questions</strong> about different domains of knowledge and their relationship to the world in which we live.
            </p>
          </div>

          <div className={`relative p-6 md:p-8 rounded-lg shadow-xl min-h-[350px] md:min-h-[400px] flex flex-col justify-center items-center text-center text-white overflow-hidden ${commonGraphicBackgroundClass} animate-fadeInUp [animation-delay:0.2s]`}>
            <div className={`absolute inset-0 ${activeFeature.graphicClass} opacity-20 z-0`}></div>

            <div className="relative z-10 max-w-md mx-auto animate-fadeIn [animation-delay:0.4s]" key={activeFeature.id}>
              <h3 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-3">
                {activeFeature.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-100">
                {activeFeature.description}
              </p>
            </div>

            <button
              onClick={prevFeature}
              aria-label="Previous feature"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextFeature}
              aria-label="Next feature"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatureSection;