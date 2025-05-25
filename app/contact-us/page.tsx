// app/contact-us/page.tsx
import React from 'react';
import Link from 'next/link'; // <<< ENSURE THIS IMPORT IS PRESENT AND UNCOMMENTED

// ... (useState, Modal, InquiryForm imports if you're using them on this page) ...

const ContactUsPage = () => {
  // ... (googleMapsEmbedCode variable and other component logic) ...

  return (
    <main className="container mx-auto px-4 py-12">
      {/* ... other content ... */}

      <div className="mt-12 text-center border-t pt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Have a Question?</h2>
        <p className="mb-6 text-gray-700">
          For specific inquiries or if you prefer to write to us, please use our inquiry form.
        </p>
        {/* CORRECTED LINK BELOW (around line 75 of your file) */}
        <Link
          href="/#inquiry-form-section-on-homepage-if-any" // Or the correct path to your form
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Go to Inquiry Form
        </Link>
      </div>
    </main>
  );
};

export default ContactUsPage;