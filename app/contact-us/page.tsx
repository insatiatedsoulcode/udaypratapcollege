// app/contact-us/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
// Import icons
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaInfoCircle,
  FaChevronDown
} from 'react-icons/fa';

// --- Data for this page ---
const contactData = {
  banner: {
    title: "Connect With Us",
    subtitle: "We're here to assist you. Find the right contact for your query or explore our frequently asked questions.",
    imageUrl: "/images/contact/contact-banner.jpg", // Replace with a relevant, high-quality image
  },
  departments: [
    {
      icon: FaGraduationCap,
      name: "Admissions Office",
      description: "For new applications, eligibility, and the admission process.",
      email: "collegeudaypratap@gmail.com", // Replace with actual email
      phone: "+91 9208596868", // Replace with actual phone
    },
    {
      icon: FaInfoCircle,
      name: "General Inquiries",
      description: "For all other questions, media requests, or information about the college.",
      email: "collegeudaypratap@gmail.com", // Replace
      phone: "+91 9208596868", // Replace
    },
    {
      icon: FaPhoneAlt,
      name: "Student Support",
      description: "For existing students requiring academic or administrative support.",
      email: "collegeudaypratap@gmail.com", // Replace
      phone: "+91 9208596868", // Replace
    },
    // Add more departments if needed
  ],
  location: {
    addressLine1: "Bhojubeer, Varanasi",
    addressLine2: "Uttar Pradesh - 221002, India",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6562.389832051445!2d82.78555191331353!3d25.274870713977712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39854b28a50b87e7%3A0x9e7beb7bf99a2777!2sKashi%20Institute%20Of%20Technology!5e0!3m2!1sen!2sin!4v1750523878984!5m2!1sen!2sin",
  },
  faqs: [
    {
      question: "What are the application deadlines?",
      answer: "The application deadlines vary by program. Please visit our 'Important Dates' page under the Admissions section for the full academic calendar."
    },
    {
      question: "How can I apply for a scholarship?",
      answer: "We offer a variety of merit-based and need-based scholarships. You can find detailed information and application forms on our 'Fees & Scholarships' page."
    },
    {
      question: "Can I schedule a campus tour?",
      answer: "Yes! We encourage prospective students to visit our campus. Please contact the Admissions Office via phone or email to schedule your tour."
    },
    {
      question: "Are hostel facilities available?",
      answer: "We provide secure and well-maintained on-campus hostel facilities for both boys and girls. You can find more details on our 'Facilities' page under the Student Life section."
    }
  ]
};
// --- End of Data ---

type Faq = {
  question: string;
  answer: string;
};

const FaqItem = ({ faq, isOpen, onClick }: { faq: Faq, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-800">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="h-4 w-4 text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


const ContactUsPage = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const mapHtml = `<iframe src="${contactData.location.googleMapsEmbedUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="College Location Map"></iframe>`;

  return (
    <main>
      {/* 1. Hero Section */}
      <section className="relative h-64 md:h-72 bg-slate-800 text-white">
        <Image
          src={contactData.banner.imageUrl}
          alt="Contact Uday Pratap College"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            {contactData.banner.title}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-2xl text-slate-200"
          >
            {contactData.banner.subtitle}
          </motion.p>
        </div>
      </section>

      {/* 2. Horizontal Scrolling Contact Cards Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Department Contacts</h2>
                <p className="mt-3 text-slate-600">Find the right office for your specific inquiry.</p>
            </div>
            <div className="flex space-x-8 overflow-x-auto pb-8 -mb-8 snap-x snap-mandatory">
                {contactData.departments.map((dept, index) => (
                    <motion.div
                        key={dept.name}
                        className="flex-shrink-0 w-80 md:w-96 snap-center bg-white p-6 rounded-lg shadow-lg border-t-4 border-sky-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <dept.icon className="h-10 w-10 text-sky-600 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{dept.name}</h2>
                        <p className="text-gray-600 text-sm mb-4 h-12">{dept.description}</p>
                        <div className="space-y-2 text-sm border-t pt-4">
                            <a href={`mailto:${dept.email}`} className="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
                                <FaEnvelope className="mr-2.5 h-4 w-4" /> {dept.email}
                            </a>
                            <a href={`tel:${dept.phone.replace(/\s/g, '')}`} className="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
                                <FaPhoneAlt className="mr-2.5 h-4 w-4" /> {dept.phone}
                            </a>
                        </div>
                    </motion.div>
                ))}
                 {/* This empty div can help with spacing at the end of the scroll */}
                <div className="flex-shrink-0 w-1 snap-center"></div>
            </div>
        </div>
      </section>

      {/* 3. FAQ and Map Section */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* FAQ Accordion */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {contactData.faqs.map((faq, index) => (
                  <FaqItem
                    key={index}
                    faq={faq}
                    isOpen={openFaqIndex === index}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  />
                ))}
              </div>
            </div>
            {/* Map & Address */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Visit Us</h2>
              <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg">
                   <div
                     className="w-full h-full"
                     dangerouslySetInnerHTML={{ __html: mapHtml }}
                   />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-orange-500" /> Our Campus
                </h3>
                <p className="mt-2 text-gray-600">
                  {contactData.location.addressLine1}, <br/>
                  {contactData.location.addressLine2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
