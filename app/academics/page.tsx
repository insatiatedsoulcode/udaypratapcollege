// app/academics/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaGraduationCap, FaUsers, FaBook, FaLaptop, FaChartLine } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Academic Programs - BA, BBA, BCA Courses',
  description: 'Explore our comprehensive academic programs including Bachelor of Arts (BA), Bachelor of Business Administration (BBA), and Bachelor of Computer Applications (BCA). Quality education with experienced faculty.',
  keywords: 'academic programs, BA course, BBA course, BCA course, undergraduate programs, college courses, higher education',
  openGraph: {
    title: 'Academic Programs - Uday Pratap College',
    description: 'Comprehensive undergraduate programs in Arts, Business, and Computer Applications',
    images: ['/images/og-image.jpg'],
  },
};

export default function AcademicsPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Academic Excellence
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover our comprehensive range of undergraduate programs designed to prepare you for success in today&apos;s competitive world.
          </p>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our three flagship undergraduate programs, each designed to provide you with the knowledge and skills needed for your chosen career path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* BA Program */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBook className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Bachelor of Arts (BA)
                </h3>
                <p className="text-gray-600">
                  Duration: 3 Years | Full-time
                </p>
              </div>
              <p className="text-gray-700 mb-6">
                A comprehensive liberal arts program that provides a broad foundation in humanities, social sciences, and languages, fostering critical thinking and analytical skills.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Literature and Language Studies</li>
                <li>• History and Political Science</li>
                <li>• Psychology and Sociology</li>
                <li>• Economics and Philosophy</li>
              </ul>
              <Link
                href="/academics/programs/ba"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            {/* BBA Program */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChartLine className="text-3xl text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Bachelor of Business Administration (BBA)
                </h3>
                <p className="text-gray-600">
                  Duration: 3 Years | Full-time
                </p>
              </div>
              <p className="text-gray-700 mb-6">
                A professional program designed to develop business acumen, leadership skills, and management expertise for the corporate world.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Business Management</li>
                <li>• Marketing and Sales</li>
                <li>• Finance and Accounting</li>
                <li>• Human Resources</li>
              </ul>
              <Link
                href="/academics/programs/bba"
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            {/* BCA Program */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaLaptop className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <p className="text-gray-600">
                  Duration: 3 Years | Full-time
                </p>
              </div>
              <p className="text-gray-700 mb-6">
                A technology-focused program that provides comprehensive knowledge of computer applications, programming, and software development.
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                <li>• Programming Languages</li>
                <li>• Database Management</li>
                <li>• Web Development</li>
                <li>• Software Engineering</li>
              </ul>
              <Link
                href="/academics/programs/bca"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Experienced Faculty
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from qualified professors with years of teaching and industry experience who are dedicated to your academic success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaUsers className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Faculty</h3>
              <p className="text-gray-600">
                Our faculty members hold advanced degrees and bring real-world experience to the classroom.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaGraduationCap className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Student-Centered Learning</h3>
              <p className="text-gray-600">
                We focus on interactive learning methods that encourage critical thinking and practical application.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaLaptop className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Modern Teaching Methods</h3>
              <p className="text-gray-600">
                We use the latest technology and teaching methodologies to enhance the learning experience.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/academics/faculty"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Meet Our Faculty
            </Link>
          </div>
        </div>
      </section>

      {/* Academic Calendar & Resources */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Academic Resources
            </h2>
            <p className="text-xl text-gray-600">
              Access comprehensive academic resources to support your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/academics/programs"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <FaBook className="text-3xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Program Details</h3>
              <p className="text-gray-600 text-sm">
                Detailed information about each program&apos;s curriculum and requirements.
              </p>
            </Link>

            <Link
              href="/admissions"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <FaGraduationCap className="text-3xl text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Admissions</h3>
              <p className="text-gray-600 text-sm">
                Learn about admission requirements, deadlines, and application process.
              </p>
            </Link>

            <Link
              href="/student-life/facilities"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <FaLaptop className="text-3xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Campus Facilities</h3>
              <p className="text-gray-600 text-sm">
                Explore our modern classrooms, labs, and learning resources.
              </p>
            </Link>

            <Link
              href="/contact-us"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <FaUsers className="text-3xl text-indigo-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Academic Support</h3>
              <p className="text-gray-600 text-sm">
                Get academic guidance and support from our dedicated team.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Academic Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of students who have chosen Uday Pratap College for their higher education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/apply"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Apply Now
            </Link>
            <Link
              href="/contact-us"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}