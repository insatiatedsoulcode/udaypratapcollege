// app/about/page.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
// Import necessary icons
import { FaBook, FaUsers, FaLightbulb, FaIndustry, FaBullseye, FaEye } from 'react-icons/fa';

// --- Data for this page (easy for you to edit) ---
const pageData = {
  hero: {
    title: "Our Story of Excellence and Vision",
    subtitle: "Rooted in tradition, committed to the future of education since 2018.",
    imageUrl: "/images/about/about-banner.jpg",
  },
  stats: [
    { value: 1200, label: "Students Enrolled", suffix: "+" },
    { value: 8, label: "UG & PG Programs", suffix: "" },
    { value: 95, label: "Placement Rate", suffix: "%" },
    { value: 50, label: "Expert Faculty", suffix: "+" },
  ],
  principalsMessage: {
    name: "Dr. Anjana Singh",
    title: "Principal, Uday Pratap College",
    message: "Welcome to Uday Pratap College! Our journey began with a commitment to providing accessible, high-quality education that empowers the next generation. We focus on a blend of academic rigor, research-driven learning, and holistic development to prepare our students not just for a career, but for life.",
    imageUrl: "/images/dranjana.png",
  },
  foundersMessage: { // NEW SECTION DATA
    name: "Shri Rajendra Prasad Singh",
    title: "Founder & Chairman",
    message: "From day one, our vision was to create an institution that would not only impart knowledge but also build character. We believe in nurturing talent from every corner of society and providing them with the platform to achieve greatness. Our commitment to research and innovation is unwavering, as we strive to contribute to the nation's progress.",
    imageUrl: "/images/about/founder.jpg", // Replace with a photo of the Founder
  },
  historyMilestones: [
    { year: "2018", event: "Foundation of Uday Pratap College with a vision to provide quality higher education." },
    { year: "2020", event: "Introduced Bachelor of Computer Applications (BCA) to meet growing tech demands." },
    { year: "2022", event: "First batch graduates with a record placement rate, establishing our academic excellence." },
    { year: "2024", event: "Inaugurated the new R&D lab to foster a culture of innovation and research among students." },
  ],
  whyChooseUs: [
    { icon: FaBook, title: "Modern Curriculum", description: "Our courses are updated with a focus on R&D and industry relevance." },
    { icon: FaUsers, title: "Expert Faculty", description: "Benefit from our partnerships for internships and placements." },
    { icon: FaLightbulb, title: "Innovation Focus", description: "We encourage a culture of research, discovery, and entrepreneurship." },
    { icon: FaIndustry, title: "Strong Industry Links", description: "Learn from experienced academics and researchers dedicated to mentorship." },
  ]
};
// --- End of Data ---

// --- Helper component for the animated counter ---
const AnimatedCounter = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
        onComplete() {
          if (ref.current) {
             ref.current.textContent += suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, to, suffix]);

  return <span ref={ref}>0</span>;
};

// Animation Variants for Framer Motion
const fadeInFromLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }};
const fadeInFromRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }};
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 }}};
const fadeInUpItem = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" }}};


const AboutUsPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Creates a parallax effect where the background image moves slower than the scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main>
      {/* 1. Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-80 md:h-96 bg-slate-800 text-white overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <Image
            src={pageData.hero.imageUrl}
            alt="Uday Pratap College Campus"
            fill
            className="object-cover opacity-30"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            {pageData.hero.title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-4 text-lg md:text-xl max-w-3xl text-slate-200"
          >
            {pageData.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Animated Stats Section */}
      <section className="bg-white -mt-16 relative z-10">
        <div className="container mx-auto px-4">
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-white p-6 rounded-lg shadow-xl"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {pageData.stats.map((stat, index) => (
                    <div key={index} className="p-4">
                        <p className="text-3xl md:text-4xl font-bold text-sky-600">
                            <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="text-sm md:text-base text-slate-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* 3. Principal's Message Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <motion.div
              className="md:col-span-1"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInFromLeft}
            >
              <div className="relative w-48 h-48 md:w-60 md:h-60 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white ring-offset-4 ring-offset-sky-100">
                <Image src={pageData.principalsMessage.imageUrl} alt={`Photo of ${pageData.principalsMessage.name}`} fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div
              className="md:col-span-2 prose prose-lg max-w-none text-center md:text-left"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInFromRight}
            >
              <h2 className="text-3xl font-bold text-gray-800">A Message From The Principal</h2>
              <p className="text-gray-600 italic">
                &quot;{pageData.principalsMessage.message}&quot;
              </p>
              <p className="font-semibold text-sky-700 mt-4 not-prose">
                {pageData.principalsMessage.name}<br/>
                <span className="text-sm font-normal text-gray-500">{pageData.principalsMessage.title}</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. NEW: Founder's Message Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            <motion.div
              className="md:col-span-2 prose prose-lg max-w-none text-center md:text-left order-2 md:order-1"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInFromLeft}
            >
              <h2 className="text-3xl font-bold text-gray-800">Vision of Our Founder</h2>
              <p className="text-gray-600 italic">
                &quot;{pageData.foundersMessage.message}&quot;
              </p>
              <p className="font-semibold text-sky-700 mt-4 not-prose">
                {pageData.foundersMessage.name}<br/>
                <span className="text-sm font-normal text-gray-500">{pageData.foundersMessage.title}</span>
              </p>
            </motion.div>
            <motion.div
              className="md:col-span-1 order-1 md:order-2"
              initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeInFromRight}
            >
              <div className="relative w-48 h-48 md:w-60 md:h-60 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white ring-offset-4 ring-offset-orange-100">
                <Image src={pageData.foundersMessage.imageUrl} alt={`Photo of ${pageData.foundersMessage.name}`} fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. History Timeline Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Our Journey</h2>
          <div className="relative before:absolute before:left-1/2 before:w-0.5 before:h-full before:bg-slate-300 before:-translate-x-1/2">
            {pageData.historyMilestones.map((milestone, index) => (
              <motion.div key={index} className="relative mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1 }}>
                <motion.div className="absolute left-1/2 w-4 h-4 bg-orange-500 rounded-full -translate-x-1/2 border-4 border-white" initial={{scale:0}} whileInView={{scale:1}} transition={{duration:0.5, delay:0.2}} viewport={{once:true}}></motion.div>
                <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-2'}`}>
                    <p className="font-bold text-lg text-sky-600">{milestone.year}</p>
                    <p className="text-gray-600 text-sm">{milestone.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us Section with Enhanced Hover */}
      <section className="bg-slate-50 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">Why Choose Uday Pratap College?</h2>
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto px-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {pageData.whyChooseUs.map((feature, index) => (
            <motion.div key={index} className="bg-white p-6 text-center rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group" variants={fadeInUpItem}>
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                 <feature.icon className="mx-auto h-12 w-12 text-sky-600 mb-4 transition-colors duration-300 group-hover:text-orange-500" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 7. Call to Action Section */}
      <section className="bg-sky-700">
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
            <p className="text-sky-200 mt-2 mb-6 max-w-xl mx-auto">Join a community of innovators and leaders. Explore our programs or apply now to become a part of our story.</p>
            <div className="flex justify-center space-x-4">
                <Link href="/academics/programs" className="bg-white text-sky-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
                    Explore Programs
                </Link>
                <Link href="/apply" className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                    Apply Now
                </Link>
            </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
