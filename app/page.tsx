// app/page.tsx
'use client'; // This page uses client-side hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using Next.js Image component for slideshow
import { motion } from 'framer-motion';

// Component Imports
import Modal from '../src/components/Modal';
import InquiryForm from '../src/components/InquiryForm';
import NotificationTicker from '../src/components/NotificationTicker';
import FeaturedEventsCarousel from '@/components/FeaturedEventsCarousel';
import AnimatedCounter from '@/components/AnimatedCounter';

import Card, { CardContent } from '@/components/ui/Card';
import FeatureIcon from '@/components/ui/FeatureIcon';




// Content and Theme
import {
  getCollegeInfo,
  getCollegeStats,
  getPrograms,
  getFeatures,
  getProgramColorClasses,
  getFeatureIconClasses,
  formatCurrency
} from '@/lib/content';

// Social Media Icons removed from this page (now handled exclusively by Footer)

// Define image paths for slideshow
const slideshowMedia = [
  { type: 'image', src: '/images/campus-slide-1.JPG' },
  { type: 'image', src: '/images/campus-slide-2.JPG' },
  { type: 'image', src: '/images/campus-slide-3.JPG' },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Load dynamic content
  const collegeInfo = getCollegeInfo();
  const stats = getCollegeStats();
  const programs = getPrograms();
  const features = getFeatures();

  // Auto-advance slideshow (pause on video)
  useEffect(() => {
    setHasMounted(true);
    const currentMedia = slideshowMedia[currentSlide];

    // If current slide is a video, don't auto-advance
    if (currentMedia.type === 'video') {
      return;
    }

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideshowMedia.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleInquirySuccess = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        {/* 1. Notification Ticker */}
        <NotificationTicker />

        {/* 2. Glassmorphism Hero Section */}
        <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[90vh]">
          {/* Background Slideshow */}
          <div className="absolute inset-0 z-0">
            {slideshowMedia.map((media, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay to make text pop */}
                <Image
                  src={media.src}
                  alt={`Campus View ${index + 1}`}
                  fill
                  className="object-cover scale-105 animate-[slow-pan_20s_ease-in-out_infinite_alternate]"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Slideshow Indicators */}
          {hasMounted && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
              {slideshowMedia.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group p-2"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ease-out ${index === currentSlide
                    ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                    : 'w-4 bg-white/40 group-hover:bg-white/60'
                    }`} />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 4. Quick Stats Section */}
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <AnimatedCounter
                value={stats.students}
                suffix="+"
                label="Students Enrolled"
                duration={2.5}
                colorTheme="indigo"
              />
              <AnimatedCounter
                value={stats.faculty}
                suffix="+"
                label="Expert Faculty"
                duration={2.0}
                colorTheme="emerald"
              />
              <AnimatedCounter
                value={stats.placementRate}
                suffix="%"
                label="Placement Rate"
                duration={2.2}
                colorTheme="rose"
              />
              <AnimatedCounter
                value={stats.programs}
                label="Programs Offered"
                duration={1.8}
                colorTheme="amber"
              />
            </div>
          </div>
        </section>

        {/* 5. Programs Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Our Programs
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose from our comprehensive range of undergraduate programs designed to prepare you for success in today&apos;s competitive world.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {programs.map((program, index) => {
                const colorClasses = getProgramColorClasses(program.color);

                // Set up custom vibrant background gradients based on the theme color
                let bgGradient = 'from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100';
                if (program.color === 'emerald') bgGradient = 'from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100';
                if (program.color === 'purple') bgGradient = 'from-purple-50 to-fuchsia-50 hover:from-purple-100 hover:to-fuchsia-100';
                if (program.color === 'rose') bgGradient = 'from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100';

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className={`group relative bg-gradient-to-br ${bgGradient} rounded-[2rem] overflow-hidden shadow-lg border border-white/60 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 flex flex-col h-full cursor-pointer`}>
                      {/* Vibrant Decorative Top Glow */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 ${colorClasses.bg} opacity-80 group-hover:opacity-100 transition-opacity blur-[1px]`} />

                      <div className="p-8 sm:p-10 flex-grow flex flex-col relative z-10">
                        <div className="flex items-center justify-between mb-8">
                          <div className={`w-20 h-20 ${colorClasses.bg} text-white shadow-xl rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out`}>
                            <span className="text-3xl font-extrabold tracking-tight">
                              {program.shortName}
                            </span>
                          </div>
                          <span className={`text-sm font-bold ${colorClasses.text} bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm`}>
                            {program.duration}
                          </span>
                        </div>

                        <h3 className="text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors leading-tight">
                          {program.name}
                        </h3>

                        <p className="text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium">
                          {program.description}
                        </p>

                        <div className="pt-6 border-t border-gray-900/10 mt-auto">
                          <div className="flex justify-between items-center mb-8">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Annual Fee</span>
                            <span className="text-2xl font-black text-gray-900">{formatCurrency(program.fees.annual)}</span>
                          </div>

                          <Link
                            href={`/academics/programs/${program.id}`}
                            className={`flex items-center justify-center w-full font-bold text-lg transition-all duration-300 ${colorClasses.bg} text-white px-6 py-4 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] hover:opacity-95 active:scale-95 group-hover:-translate-y-1 group-hover:scale-[1.02]`}
                          >
                            Explore Program
                            <svg className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>

                      {/* Background Floating Blob Effect for extreme premium feel */}
                      <div className={`absolute -bottom-24 -right-24 w-64 h-64 ${colorClasses.bg} rounded-full mix-blend-multiply filter blur-3xl opacity-5 group-hover:opacity-20 transition-opacity duration-700`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Featured Events */}
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

        {/* 7. Why Choose Us Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                Why Choose {collegeInfo.name}?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                We provide an environment that fosters growth, learning, and success for every student.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const iconClasses = getFeatureIconClasses(feature.color);
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Card variant="glass" className="h-full">
                      <CardContent>
                        <div className={`w-16 h-16 ${iconClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <FeatureIcon icon={feature.icon} className={`w-8 h-8 ${iconClasses.text}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. CTA Section */}
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



        {/* Modal for Inquiry Form */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <InquiryForm onSuccess={handleInquirySuccess} />
        </Modal>
      </main>
    </>
  );
};

export default HomePage;