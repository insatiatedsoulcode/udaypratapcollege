// app/academics/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { FaGraduationCap, FaUsers, FaBook, FaLaptop } from 'react-icons/fa';

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
            <div className="group relative bg-blue-50/50 rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 border-t-[6px] border-t-blue-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative z-10 flex-grow flex flex-col">

                {/* Header Row: Badge & Duration */}
                <div className="flex justify-between items-start mb-10 text-center">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-[1.25rem] flex items-center justify-center shadow-md transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                    <span className="text-[1.75rem] font-black tracking-tight">BA</span>
                  </div>
                  <span className="text-[13px] font-bold text-blue-600 bg-white border border-blue-100 px-4 py-1.5 rounded-full shadow-sm">
                    3 Years
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight leading-tight pr-4">
                  Bachelor of Arts
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-[1.05rem] mb-auto">
                  Explore diverse subjects and develop critical thinking skills in our comprehensive liberal arts program.
                </p>

                {/* Pricing Block & Button */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none pb-1">Annual Fee</span>
                    <span className="text-[2rem] font-black text-gray-900 leading-none">₹5,000</span>
                  </div>

                  <Link
                    href="/academics/programs/ba"
                    className="flex justify-center items-center w-full bg-blue-600 hover:bg-blue-700 text-white text-[1.05rem] font-bold py-4 rounded-xl transition-colors duration-200 shadow-md group-hover:shadow-lg"
                  >
                    Explore Program
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>

              </div>
            </div>

            {/* BBA Program */}
            <div className="group relative bg-emerald-50/50 rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 border-t-[6px] border-t-emerald-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative z-10 flex-grow flex flex-col">

                {/* Header Row: Badge & Duration */}
                <div className="flex justify-between items-start mb-10 text-center">
                  <div className="w-20 h-20 bg-emerald-600 text-white rounded-[1.25rem] flex items-center justify-center shadow-md transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                    <span className="text-[1.75rem] font-black tracking-tight">BBA</span>
                  </div>
                  <span className="text-[13px] font-bold text-emerald-600 bg-white border border-emerald-100 px-4 py-1.5 rounded-full shadow-sm">
                    3 Years
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight leading-tight pr-4">
                  Bachelor of Business Administration
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-[1.05rem] mb-auto">
                  Develop leadership skills and business acumen to excel in the corporate world.
                </p>

                {/* Pricing Block & Button */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none pb-1">Annual Fee</span>
                    <span className="text-[2rem] font-black text-gray-900 leading-none">₹25,000</span>
                  </div>

                  <Link
                    href="/academics/programs/bba"
                    className="flex justify-center items-center w-full bg-emerald-600 hover:bg-emerald-700 text-white text-[1.05rem] font-bold py-4 rounded-xl transition-colors duration-200 shadow-md group-hover:shadow-lg"
                  >
                    Explore Program
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>

              </div>
            </div>

            {/* BCA Program */}
            <div className="group relative bg-purple-50/50 rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 border-t-[6px] border-t-purple-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative z-10 flex-grow flex flex-col">

                {/* Header Row: Badge & Duration */}
                <div className="flex justify-between items-start mb-10 text-center">
                  <div className="w-20 h-20 bg-purple-600 text-white rounded-[1.25rem] flex items-center justify-center shadow-md transform group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                    <span className="text-[1.75rem] font-black tracking-tight">BCA</span>
                  </div>
                  <span className="text-[13px] font-bold text-purple-600 bg-white border border-purple-100 px-4 py-1.5 rounded-full shadow-sm">
                    3 Years
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight leading-tight pr-4">
                  Bachelor of Computer Applications
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-[1.05rem] mb-auto">
                  Master cutting-edge technology and programming skills for the digital age.
                </p>

                {/* Pricing Block & Button */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none pb-1">Annual Fee</span>
                    <span className="text-[2rem] font-black text-gray-900 leading-none">₹25,000</span>
                  </div>

                  <Link
                    href="/academics/programs/bca"
                    className="flex justify-center items-center w-full bg-purple-600 hover:bg-purple-700 text-white text-[1.05rem] font-bold py-4 rounded-xl transition-colors duration-200 shadow-md group-hover:shadow-lg"
                  >
                    Explore Program
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                </div>

              </div>
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
            <div className="group bg-white p-8 rounded-[2rem] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FaUsers className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Expert Faculty</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Our faculty members hold advanced degrees and bring real-world experience to the classroom.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-[2rem] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <FaGraduationCap className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Student-Centered Learning</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                We focus on interactive learning methods that encourage critical thinking and practical application.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-[2rem] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <FaLaptop className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">Modern Teaching Methods</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
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
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100 flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaBook className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Program Details</h3>
              <p className="text-gray-500 text-sm font-medium">
                Detailed information about each program&apos;s curriculum and requirements.
              </p>
            </Link>

            <Link
              href="/admissions"
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100 flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaGraduationCap className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">Admissions</h3>
              <p className="text-gray-500 text-sm font-medium">
                Learn about admission requirements, deadlines, and application process.
              </p>
            </Link>

            <Link
              href="/student-life/facilities"
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100 flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaLaptop className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Campus Facilities</h3>
              <p className="text-gray-500 text-sm font-medium">
                Explore our modern classrooms, labs, and learning resources.
              </p>
            </Link>

            <Link
              href="/contact-us"
              className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center border border-gray-100 flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">Academic Support</h3>
              <p className="text-gray-500 text-sm font-medium">
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