// app/contact-us/page.tsx
import React from 'react';
// import Link from 'next/link'; // Removed as it's not currently used in the JSX

const ContactUsPage = () => {
  // IMPORTANT: You must replace 'YOUR_Maps_EMBED_URL_HERE' with the actual src URL from Google Maps.
  // The 'style' attribute here has been corrected to be a string for HTML.
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

  return (
    <main className="container mx-auto px-4 py-12 md:py-16">
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
              Bhojubeer, Varanasi, <br />
              Uttar Pradesh - 221002, India
            </p>
            <p>
              <strong>Phone:</strong> <a href="tel:+919044774488" className="text-orange-600 hover:underline">+91 9044774488</a>
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:example@udaypratapcollege.ac.in" className="text-orange-600 hover:underline">example@udaypratapcollege.ac.in</a>
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
      </div>
    </main>
  );
};

export default ContactUsPage;