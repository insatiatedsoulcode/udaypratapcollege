// src/components/KeyFeatureSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const featureSlidesData = [
  {
    id: 'ethics',
    title: 'Ethics',
    description:
      'A focus on ethics to think holistically, is a core graduate attribute and an integral part of our degree. Partnerships for Ethics are also developed for delivery of this component.',
    imageUrl: '/images/programs/ethicsv.png',
  },
  {
    id: 'interdisciplinary',
    title: 'Interdisciplinary Approach',
    description:
      'Our curriculum emphasizes interdisciplinary learning, connecting diverse fields of study to foster innovative thinking and problem-solving skills.',
    imageUrl: '/images/programs/interdisciplinary.png',
  },
  {
    id: 'research',
    title: 'Research Based Learning',
    description:
      'Students engage in research-based projects, developing critical analytical skills and contributing to knowledge creation.',
    imageUrl: '/images/programs/research.png',
  },
  {
    id: 'library',
    title: 'Library',
    description:
      'Students can study 24x7 in the library and can borrow books for themselves.',
    imageUrl: '/images/programs/library.png',
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

  useEffect(() => {
    const autoPlayTimer = setInterval(() => {
      nextFeature();
    }, 8000);
    return () => clearInterval(autoPlayTimer);
  }, []);

  const activeFeature = featureSlidesData[currentFeatureIndex];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 place-items-center">
          <div className="relative p-6 md:p-8 rounded-lg shadow-xl min-h-[600px] w-full max-w-5xl flex flex-col justify-center items-center text-center text-white overflow-hidden bg-gray-800 animate-fadeInUp mb-8">
            <div className="absolute inset-0 z-0">
              {activeFeature.imageUrl && (
                <Image
                  src={activeFeature.imageUrl}
                  alt={activeFeature.title}
                  fill
                  className="object-cover"
                  quality={75}
                  placeholder="empty"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 z-10"></div>
            </div>

            <button
              onClick={prevFeature}
              aria-label="Previous feature"
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextFeature}
              aria-label="Next feature"
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 w-full max-w-5xl"
            >
              <h3 className="text-xl font-semibold text-blue-700">{activeFeature.title}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">{activeFeature.description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="prose lg:prose-lg xl:prose-xl max-w-none animate-fadeInUp text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Integrated Learning Experience
            </h2>
            <p>
              At Uday Pratap College, we believe in a holistic approach to education. Our guiding principles are essential for a transformative and cutting-edge college experience.
            </p>
            <p className="mt-4">
              Every Major will be <strong className="font-semibold">writing intensive, interdisciplinary, and research based</strong>; focus on <strong className="font-semibold">ethics and the historicity</strong> of different ideas, concepts, and practices; provide <strong className="font-semibold">immersive experiences</strong>; develop awareness of <strong className="font-semibold">data analytics</strong> and the impact of rapidly evolving technologies on disciplines and communities; and <strong className="font-semibold">raise questions</strong> about different domains of knowledge and their relationship to the world in which we live.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatureSection;
