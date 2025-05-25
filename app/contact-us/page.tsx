// app/contact-us/page.tsx
import React from 'react';
// import Link from 'next/link'; // Uncomment if you add Next.js <Link> components elsewhere
// You might want to import your InquiryForm component here if you plan to embed it or use a modal
// import InquiryForm from '@/components/InquiryForm';
// import Modal from '@/components/Modal';
// import { useState } from 'react';

const ContactUsPage = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openInquiryModal = () => setIsModalOpen(true);
  // const closeInquiryModal = () => setIsModalOpen(false);

  // !!! IMPORTANT: REPLACE 'YOUR_Maps_EMBED_URL_HERE' WITH THE ACTUAL SRC URL FROM GOOGLE MAPS !!!
  const googleMapsEmbedCode = `
    <iframe
      src="YOUR_Maps_EMBED_URL_HERE"
      width="100%"
      height="350"
      style="border:0;"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Uday Pratap College Location Map"
    ></iframe>
  `;

  return ( // This should be around line 30
    <main className="container mx-auto px-4 py-12"> {/* This should be line 31 */}
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Contact Us
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
        <p className="text-lg text-center text-gray-700 mb-10">
          We&apos;d love to hear from you! Whether you have questions about admissions, programs, or campus life, please feel free to reach out using the information below.
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Column 1: Contact Information */}
          <div className="prose">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <p>
              <strong>Uday Pratap College</strong><br />
              Mirzamurad, 23 KM, Varanasi - Allahabad Rd. (NH-2),<br />
              Varanasi, Uttar Pradesh 221307, India
              {/* Verify and update with your exact official address */}
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:+919044774488" className="text-orange-600 hover:underline">+91 9044774488</a> {/* Replace */}
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:example@udaypratapcollege.ac.in" className="text-orange-600 hover:underline">example@udaypratapcollege.ac.in</a> {/* Replace */}
            </p>
            <p>
              <strong>Office Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM IST
            </p>
          </div>

          {/* Column 2: Our Location (Map) */}
          <div className="prose">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
            <div
              className="map-container overflow-hidden rounded-md shadow-md h-[350px]"
              dangerouslySetInnerHTML={{ __html: googleMapsEmbedCode }}
            />
          </div>
        </div>

        <div className="mt-12 text-center border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Have a Question?</h2>
          <p className="mb-6 text-gray-700">
            For specific inquiries or if you prefer to write to us, please use our inquiry form.
          </p>
           <a href="/#inquiry-form-section-on-homepage-if-any" // Or link to where your form is
             className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
           >
            Go to Inquiry Form
           </a>
        </div>
      </div>
    </main>
  );
};

export default ContactUsPage;