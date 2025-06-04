// src/components/KeyFeatureSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import Image from 'next/image'; // If your graphics are images via next/image

// Define the data for the feature slides (as shown in Step 2 above)
// For brevity, I'm assuming featureSlidesData is defined in this file or imported.
// const featureSlidesData = [ ... ]; // (Make sure this array is defined)

// Placeholder data if not importing
const featureSlidesData = [
  {
    id: 'ethics',
    title: 'Ethics',
    description: 'A focus on ethics to think holistically, is a core graduate attribute and an integral part of our degree. Partnerships for Ethics are also developed for delivery of this component.',
    graphicClass: 'bg-blue-100', // Placeholder for actual graphic
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
];


const KeyFeatureSection = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const nextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % featureSlidesData.length);
  };

  const prevFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex - 1 + featureSlidesData.length) % featureSlidesData.length);
  };

  const activeFeature = featureSlidesData[currentFeatureIndex];

  // Placeholder for the main graphic background if it's common for all slides
  // Or each slide in featureSlidesData can have its own graphicUrl
  const commonGraphicBackgroundClass = "bg-sky-700"; // Replace with your actual graphic/pattern class

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Text Content */}
          <div className="prose lg:prose-lg xl:prose-xl max-w-none animate-fadeInUp">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Interwoven Learning Experience {/* Replace with your title */}
            </h2>
            <p>
              At Uday Pratap College, we believe in a holistic approach to education. Our guiding principles are essential for a transformative and cutting-edge college experience.
            </p>
            <p>
              Every Major will be <strong className="font-semibold">writing intensive, interdisciplinary, and research based</strong>; focus on <strong className="font-semibold">ethics and the historicity</strong> of different ideas, concepts, and practices; provide <strong className="font-semibold">immersive experiences</strong>; develop awareness of <strong className="font-semibold">data analytics</strong> and the impact of rapidly evolving technologies on disciplines and communities; and <strong className="font-semibold">raise questions</strong> about different domains of knowledge and their relationship to the world in which we live.
              {/* Replace with your college's specific text */}
            </p>
            {/* Add more paragraphs or content as needed */}
          </div>

          {/* Right Column: Graphic and Feature Slider */}
          <div className={`relative p-6 md:p-8 rounded-lg shadow-xl min-h-[350px] md:min-h-[400px] flex flex-col justify-center items-center text-center text-white overflow-hidden ${commonGraphicBackgroundClass} animate-fadeInUp [animation-delay:0.2s]`}>
            {/* This div is for the custom graphic. For now, it's a placeholder background.
                You would replace commonGraphicBackgroundClass with your actual image/SVG pattern for the background of this right column.
                If each slide has a different main graphic, you'd set it dynamically.
            */}

            {/* Placeholder for the custom illustration like in Krea's screenshot.
                You would typically use an <Image> component or a div with a background image here.
                For example, if activeFeature.graphicUrl exists:
                <Image src={activeFeature.graphicUrl} layout="fill" objectFit="cover" alt="Feature graphic" className="absolute inset-0 z-0 opacity-30" />
            */}
            <div className={`absolute inset-0 ${activeFeature.graphicClass} opacity-20 z-0`}></div> {/* Example of dynamic bg per slide */}


            {/* Slider Content Area (Text Box) */}
            <div className="relative z-10 max-w-md mx-auto animate-fadeIn [animation-delay:0.4s]" key={activeFeature.id}> {/* key helps re-trigger animation */}
              <h3 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-3"> {/* Krea used an accent color for "Ethics" */}
                {activeFeature.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-100">
                {activeFeature.description}
              </p>
            </div>

            {/* Slider Navigation Arrows */}
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