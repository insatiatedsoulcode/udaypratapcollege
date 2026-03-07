// app/about/mission-vision/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
  transition: { duration: 0.7 }
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
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
};

// Helper function to assign vibrant colors based on the index in the bento grid
const getBentoColor = (index: number) => {
  const colors = [
    'from-blue-500 to-indigo-600', // 0
    'from-emerald-400 to-teal-500', // 1
    'from-purple-500 to-fuchsia-600', // 2
    'from-rose-400 to-rose-600', // 3
    'from-amber-400 to-orange-500', // 4
    'from-sky-400 to-blue-500', // 5
  ];
  return colors[index % colors.length];
};


const MissionVisionPage = () => {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[70vh]">
        <div className="absolute inset-0 z-0 bg-black">
          {/* Subtle cinematic slow-pan background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/80 to-purple-900/90 z-10" />
          <Image
            src="/images/campus-slide-1.JPG"
            alt="Uday Pratap College Campus"
            fill
            className="object-cover scale-105 animate-[slow-pan_20s_ease-in-out_infinite_alternate] opacity-40 mix-blend-overlay"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">&</span> Vision
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-3xl mx-auto text-indigo-100 font-medium leading-relaxed drop-shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            The guiding principles that define our purpose and shape the future leaders of tomorrow.
          </motion.p>
        </div>
      </section>

      {/* 2. Mission & Vision Distinct Cards */}
      <section className="container mx-auto px-4 -mt-20 md:-mt-32 relative z-30 pb-20 md:pb-32">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="group relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <FaBullseye className="h-10 w-10" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Mission</h2>
              <p className="text-gray-600 text-lg md:text-xl leading-loose font-medium">
                {missionStatement}
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 group-hover:opacity-70 transition-opacity translate-x-1/3 -translate-y-1/3" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <FaEye className="h-10 w-10" />
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Vision</h2>
              <p className="text-gray-600 text-lg md:text-xl leading-loose font-medium">
                {visionStatement}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Core Values Vibrant Bento Grid */}
      <section className="bg-white py-24 md:py-32 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial="initial"
            whileInView="animate"
            variants={fadeInAnimation}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">Our Core Values</h2>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed">
              The fundamental pillars that uphold our institutional identity and forge our distinct culture of excellence.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 auto-rows-[minmax(280px,auto)] text-white"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {coreValues.map((value, index) => {
              // Creating a Bento Grid feel by making the first two and some middle items span two columns on large screens
              const isLargeCard = index === 0 || index === 1 || index === 6 || index === 7;
              const spanClass = isLargeCard ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';

              const bgGradient = getBentoColor(index);

              return (
                <motion.div
                  key={index}
                  className={`group relative rounded-[2rem] p-8 md:p-10 shadow-lg border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col justify-end bg-gradient-to-br ${bgGradient} ${spanClass}`}
                  variants={fadeInUpItem}
                >
                  {/* Deep glowing background blobs for bento cards */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full h-min-full h-max-full">
                    <div className="mb-auto pb-8">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm border border-white/10">
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-sm tracking-tight">{value.title}</h3>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium drop-shadow-md">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default MissionVisionPage;