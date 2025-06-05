// app/about/mission-vision/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
// Import all necessary icons
import {
  FaBullseye,
  FaEye,
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
  FaBalanceScale,
  FaMicroscope,
  FaGlobe,
  FaHandsHelping,
  FaInfinity,
  FaBrain,
  FaUserTie,
  FaLeaf,
  FaHandshake
} from 'react-icons/fa';

// --- Data for this page (easy to edit) ---
const missionStatement = "To cultivate a rich learning environment that fosters critical thinking, intellectual curiosity, and a commitment to research. We aim to empower students with the knowledge and skills necessary to lead, innovate, and contribute meaningfully to a global society.";
const visionStatement = "To be a distinguished center for higher learning and research, recognized for our academic excellence, ethical standards, and our role in shaping future leaders and innovators who can address the complex challenges of the 21st century.";

// --- UPDATED to 12 Core Values ---
const coreValues = [
  {
    icon: FaLightbulb,
    title: 'Innovation',
    description: 'Fostering a culture of curiosity and forward-thinking to pioneer new ideas and solutions.'
  },
  {
    icon: FaCheckCircle,
    title: 'Excellence',
    description: 'Committing to the highest standards of academic rigor, teaching, and research in all endeavors.'
  },
  {
    icon: FaBalanceScale,
    title: 'Integrity',
    description: 'Upholding principles of honesty, transparency, and ethical conduct in our academic and community life.'
  },
  {
    icon: FaUsers,
    title: 'Community',
    description: 'Building an inclusive, supportive, and collaborative environment where every individual feels valued.'
  },
  {
    icon: FaMicroscope,
    title: 'Research & Discovery',
    description: 'Fostering a spirit of inquiry and contributing to the global body of knowledge through rigorous research.'
  },
  {
    icon: FaBrain,
    title: 'Critical Thinking',
    description: 'Developing the ability to analyze complex problems, question assumptions, and formulate reasoned conclusions.'
  },
  {
    icon: FaGlobe,
    title: 'Global Perspective',
    description: 'Encouraging an understanding of diverse cultures and global issues to prepare students for a connected world.'
  },
  {
    icon: FaHandsHelping,
    title: 'Social Responsibility',
    description: 'Instilling a sense of duty towards society and encouraging impactful contributions to community challenges.'
  },
  {
    icon: FaUserTie,
    title: 'Leadership',
    description: 'Nurturing confident and ethical leaders who are equipped to inspire positive change in their chosen fields.'
  },
  {
    icon: FaHandshake,
    title: 'Collaboration',
    description: 'Promoting teamwork and interdisciplinary partnerships to achieve collective goals and amplify impact.'
  },
  {
    icon: FaLeaf,
    title: 'Sustainability',
    description: 'Committing to environmentally responsible practices and integrating principles of sustainability into our curriculum.'
  },
  {
    icon: FaInfinity,
    title: 'Lifelong Learning',
    description: 'Promoting the continuous pursuit of knowledge and personal development beyond the classroom.'
  },
];
// --- End of Data ---

// Framer Motion animation variants
const fadeInAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Adjusted stagger delay slightly for more items
    },
  },
};

const fadeInUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


const MissionVisionPage = () => {
  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <motion.section
        className="bg-sky-700 text-white text-center py-20 md:py-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Our Mission & Vision
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-sky-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            The guiding principles that define our purpose and shape our future.
          </motion.p>
        </div>
      </motion.section>

      {/* 2. Mission & Vision Sections */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Mission */}
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInAnimation}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center p-6"
          >
            <FaBullseye className="mx-auto h-16 w-16 text-orange-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              {missionStatement}
            </p>
          </motion.div>
          {/* Vision */}
          <motion.div
            initial="initial"
            whileInView="animate"
            variants={fadeInAnimation}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center p-6"
          >
            <FaEye className="mx-auto h-16 w-16 text-orange-500 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              {visionStatement}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            variants={fadeInAnimation}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Core Values</h2>
            <p className="mt-3 text-slate-600">The pillars that uphold our institutional identity and culture.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
                variants={fadeInUpItem}
              >
                <value.icon className="mx-auto h-10 w-10 text-sky-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default MissionVisionPage;