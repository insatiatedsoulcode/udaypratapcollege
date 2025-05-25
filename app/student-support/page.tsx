// app/student-support/page.tsx
import React from 'react';
//import Link from 'next/link'; // Optional: if you add more links

const StudentSupportPage = () => {
  const supportServices = [
    {
      title: "Academic Advising",
      description: "Our advisors help students plan their academic path, select courses, and stay on track for graduation."
    },
    {
      title: "Career Counseling & Placement",
      description: "We provide guidance on career choices, resume building, interview skills, and connect students with potential employers."
    },
    {
      title: "Library & Learning Resources",
      description: "Access a vast collection of books, journals, and digital resources to support your studies and research."
    },
    {
      title: "Counseling & Wellness Services",
      description: "Confidential counseling services are available to support students' mental and emotional well-being."
    },
    {
      title: "Hostel Facilities",
      description: "Comfortable and secure on-campus accommodation for outstation students."
    },
    {
      title: "Clubs & Societies",
      description: "Engage in a variety of extracurricular activities, from cultural clubs to technical societies, to enrich your college experience."
    },
    // Add more services as needed
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Student Support Services
      </h1>

      <div className="prose lg:prose-xl mx-auto mb-10 text-center">
        <p>
          At Uday Pratap College, we are committed to providing a supportive and enriching environment for all our students.
          We offer a comprehensive range of services designed to assist you throughout your academic journey and personal development.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {supportServices.map((service, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-orange-600 mb-3">{service.title}</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{service.description}</p>
            {/* You could add a "Learn More" link for each service if they have dedicated pages */}
            {/* <Link href={`/student-support/${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-indigo-600 hover:underline mt-3 inline-block">
              Learn More &rarr;
            </Link> */}
          </div>
        ))}
      </div>
    </main>
  );
};

export default StudentSupportPage;