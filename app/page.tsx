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
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';
import FeatureIcon from '@/components/ui/FeatureIcon';

// SEO Component
import SEO from '@/components/SEO';
import SocialShare from '@/components/SocialShare';
import { organizationSchema, breadcrumbSchema } from '@/utils/structuredData';

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

// Social Media Icons
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

// Define video and image paths for slideshow
const slideshowMedia = [
  { type: 'video', src: '/videos/campus-tour.mp4', poster: '/images/campus-slide-1.JPG' },
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
          breadcrumbSchema(breadcrumbItems),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Uday Pratap College Homepage",
            "description": "Premier educational institution offering BA, BBA, and BCA programs with academic excellence and modern facilities.",
            "url": "https://udaypratapcollege.com",
            "mainEntity": {
              "@type": "EducationalOrganization",
              "name": "Uday Pratap College"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What programs does Uday Pratap College offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Uday Pratap College offers Bachelor of Arts (BA), Bachelor of Business Administration (BBA), and Bachelor of Computer Applications (BCA) programs."
                }
              },
              {
                "@type": "Question", 
                "name": "How can I apply for admission?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can apply for admission through our online application portal or visit the college campus. Contact our admissions office for more information."
                }
              },
              {
                "@type": "Question",
                "name": "What are the admission requirements?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Admission requirements vary by program. Generally, you need to have completed 10+2 or equivalent education. Please check specific requirements for each program."
                }
              }
            ]
          }
        ]}
      />
      
      <main className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        {/* 1. Notification Ticker */}
        <NotificationTicker />

        {/* 2. Video/Photo Slideshow - Below Notification */}
        <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
          {/* Slideshow */}
          <div className="absolute inset-0">
            {slideshowMedia.map((media, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {media.type === 'video' ? (
                  <video
                    src={media.src}
                    poster={media.poster}
                    autoPlay={index === currentSlide}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={() => {
                      // Move to next slide when video ends
                      setCurrentSlide((prev) => (prev + 1) % slideshowMedia.length);
                    }}
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={`Campus View ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                )}
              </div>
            ))}
          </div>


          {/* Slideshow Indicators */}
          {hasMounted && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
              {slideshowMedia.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative group transition-all duration-300 ${
                    index === currentSlide ? 'scale-125' : 'scale-100 hover:scale-110'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {media.type === 'video' ? (
                    <div className={`w-6 h-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center ${
                      index === currentSlide
                        ? 'bg-yellow-500 shadow-yellow-500/50'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}>
                      <svg className={`w-3 h-3 ${index === currentSlide ? 'text-gray-900' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  ) : (
                    <div className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
                      index === currentSlide
                        ? 'bg-gradient-to-r from-blue-300 to-indigo-400 shadow-blue-300/50'
                        : 'bg-white/60 hover:bg-white/80'
                    }`} />
                  )}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* 3. Welcome Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                Welcome to <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">Uday Pratap College</span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl mb-8 text-gray-600 font-medium leading-relaxed">
                A Legacy of Excellence in Education. Shaping Futures.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/admissions"
                className="enterprise-button text-lg px-8 py-4"
              >
                🎓 Admissions Open
              </Link>
        <button
                onClick={() => setIsModalOpen(true)}
                className="enterprise-button-secondary text-lg px-8 py-4"
        >
                💬 Inquire Now
        </button>
            </motion.div>
          </div>
        </section>

        {/* 4. Quick Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card variant="elevated" className="text-center">
                  <CardContent>
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">{stats.students}+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Students Enrolled</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card variant="elevated" className="text-center">
                  <CardContent>
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">{stats.faculty}+</h3>
                    <p className="text-gray-600 dark:text-gray-400">Expert Faculty</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card variant="elevated" className="text-center">
                  <CardContent>
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">{stats.placementRate}%</h3>
                    <p className="text-gray-600 dark:text-gray-400">Placement Rate</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card variant="elevated" className="text-center">
                  <CardContent>
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">{stats.programs}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Programs Offered</p>
                  </CardContent>
                </Card>
              </motion.div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {programs.map((program, index) => {
                const colorClasses = getProgramColorClasses(program.color);
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card variant="elevated" className="h-full">
                      <CardContent className="text-center">
                        <div className={`w-16 h-16 ${colorClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <span className={`text-2xl font-bold ${colorClasses.text}`}>
                            {program.shortName}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                          {program.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {program.description}
                        </p>
                        <div className="mb-6">
                          <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                            Duration: {program.duration}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            Annual Fee: {formatCurrency(program.fees.annual)}
                          </p>
                        </div>
                        <Button
                          variant="primary"
                          size="md"
                          className={`w-full ${colorClasses.hover}`}
                          asChild
                        >
                          <Link href={`/academics/programs/${program.id}`}>
                            Learn More
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
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