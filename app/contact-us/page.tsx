// app/contact-us/page.tsx
import React from 'react';
import Link from 'next/link'; // Optional: if you add more links
// You might want to import your InquiryForm component here if you plan to embed it
// import InquiryForm from '@/components/InquiryForm';
// import Modal from '@/components/Modal'; // If you want to use the modal for the form
// import { useState } from 'react'; // If managing modal state here

const ContactUsPage = () => {
  // Example state for modal if you use it directly on this page
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openInquiryModal = () => setIsModalOpen(true);
  // const closeInquiryModal = () => setIsModalOpen(false);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Contact Us
      </h1>

      <div className="prose lg:prose-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <p className="text-lg text-center mb-8">
          We&apos;re here to help and answer any question you might have. We look forward to hearing from you!
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Get in Touch</h2>
            <p className="mb-2">
              <strong>Uday Pratap College, Varanasi</strong>
            </p>
            <p className="mb-2">
              Bhojubeer, Varanasi, <br />
              Uttar Pradesh - 221002, India {/* Replace with actual address if different */}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> <a href="tel:+91XXXXXXXXXX" className="text-orange-600 hover:underline">+91 XXXXXXXXXX</a> {/* Replace */}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> <a href="mailto:info@udaypratapcollege.ac.in" className="text-orange-600 hover:underline">info@udaypratapcollege.ac.in</a> {/* Replace */}
            </p>
            {/* You might add a map embed here later */}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Send us a Message</h2>
            <p className="mb-4">
              Have questions about admissions, courses, or anything else? Feel free to reach out using the form below or our contact details.
            </p>
            {/* Option 1: Embed InquiryForm directly (if you style it for direct embedding)
              <InquiryForm />
            */}
            {/* Option 2: Button to open InquiryForm in a Modal
              <button
                onClick={openInquiryModal}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
              >
                Open Inquiry Form
              </button>
            */}
            <p className="mt-4 p-4 bg-sky-50 border border-sky-200 rounded-md text-sm text-sky-700">
              For specific inquiries, please use our Inquiry Form for a quicker response. You can typically find a button for this on our homepage or use the link in the site&apos;s main navigation if available.
            </p>
          </div>
        </div>

        {/* If using the modal option for the form:
          <Modal isOpen={isModalOpen} onClose={closeInquiryModal}>
            <InquiryForm onSuccess={closeInquiryModal} />
          </Modal>
        */}

        <p className="text-center mt-8 text-gray-600">
          Follow us on our social media channels to stay updated!
          {/* Add social media links/icons here if desired, similar to other pages */}
        </p>
      </div>
    </main>
  );
};

export default ContactUsPage;