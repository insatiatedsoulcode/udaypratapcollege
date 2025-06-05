// app/academics/faculty/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// --- CORRECTED IMPORT LINE ---
// FaGraduationCap and FaMicroscope have been removed as they were not used in the component.
//import { FaUserTie, FaChevronRight, FaUsers, FaBook, FaFlask, FaLaptopCode, FaLightbulb, FaBalanceScale, FaHandshake, FaLeaf, FaInfinity, FaBrain, FaChartLine } from 'react-icons/fa';
//import { FaUserTie, FaChevronRight, FaUsers } from 'react-icons/fa';

// --- Updated Faculty Data with 4 Members per Department ---
// Using faculty1.png for all images as requested.
const facultyData = [
  {
    department: 'Department of Computer Applications',
    members: [
      {
        name: 'Dr. Rakesh Sharma',
        designation: 'Professor & Head of Department',
        qualifications: 'Ph.D. (Computer Science), M.Tech (CSE)',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Mining'],
        profileLink: '/faculty/rakesh-sharma',
        hoverInfo: {
          researchFocus: 'Developing novel algorithms for predictive modeling in large-scale datasets.',
          recentPublication: '"A Framework for Unsupervised Anomaly Detection", IEEE Transactions, 2023.',
        }
      },
      {
        name: 'Prof. Sunita Singh',
        designation: 'Associate Professor',
        qualifications: 'M.Tech (IT), B.E.',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Web Technologies', 'Database Management', 'Cloud Computing'],
        profileLink: '/faculty/sunita-singh',
        hoverInfo: {
          researchFocus: 'Architecting scalable cloud-native applications and microservice security.',
          recentPublication: '"Security Protocols for Distributed Systems", ACM Communications, 2024.',
        }
      },
      {
        name: 'Mr. Vivek Kumar',
        designation: 'Assistant Professor',
        qualifications: 'MCA, B.Sc. (Computer Science)',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Mobile App Development', 'Data Structures', 'Algorithms'],
        profileLink: '/faculty/vivek-kumar',
        hoverInfo: {
          researchFocus: 'Performance optimization for native Android and iOS applications.',
          recentPublication: '"Efficient State Management in Mobile Applications", Tech Conference, 2023.',
        }
      },
      {
        name: 'Ms. Aarti Gupta',
        designation: 'Assistant Professor',
        qualifications: 'M.Sc. (Data Science)',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Data Visualization', 'Python Programming', 'Big Data Technologies'],
        profileLink: '/faculty/aarti-gupta',
        hoverInfo: {
          researchFocus: 'Interactive data visualization techniques for complex social networks.',
          recentPublication: '"Visualizing Big Data: Challenges and Opportunities", Data Journal, 2024.',
        }
      },
    ],
  },
  {
    department: 'Department of Business Administration',
    members: [
      {
        name: 'Dr. Alok Mishra',
        designation: 'Professor & Head of Department',
        qualifications: 'Ph.D. (Management), MBA (Finance)',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Financial Modeling', 'Corporate Strategy', 'Market Analytics'],
        profileLink: '/faculty/alok-mishra',
        hoverInfo: {
          researchFocus: 'Analysis of market volatility and its impact on emerging economies.',
          recentPublication: '"Behavioral Finance in the Post-Pandemic Era", Journal of Finance, 2023.',
        }
      },
      {
        name: 'Dr. Neha Jaiswal',
        designation: 'Associate Professor',
        qualifications: 'Ph.D. (Marketing), MBA',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Digital Marketing', 'Consumer Behavior', 'Brand Management'],
        profileLink: '/faculty/neha-jaiswal',
        hoverInfo: {
          researchFocus: 'The impact of social media influencers on consumer purchasing decisions.',
          recentPublication: '"The Authenticity Paradox in Influencer Marketing", Journal of Marketing, 2024.',
        }
      },
      {
        name: 'Mr. Rohan Desai',
        designation: 'Assistant Professor',
        qualifications: 'MBA (HRM), BBA',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Human Resource Management', 'Organizational Behavior', 'Talent Acquisition'],
        profileLink: '/faculty/rohan-desai',
        hoverInfo: {
          researchFocus: 'Modern trends in employee engagement and retention strategies.',
          recentPublication: '"Gamification in the Workplace", HR Review, 2023.',
        }
      },
      {
        name: 'Ms. Fatima Khan',
        designation: 'Assistant Professor',
        qualifications: 'M.Com, B.Com (Hons)',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['International Business', 'Supply Chain Management', 'Operations'],
        profileLink: '/faculty/fatima-khan',
        hoverInfo: {
          researchFocus: 'Resilience and sustainability in global supply chains.',
          recentPublication: '"A Study on Post-Pandemic Supply Chain Models", Int. Journal of Logistics, 2024.',
        }
      },
    ],
  },
  {
    department: 'Department of Arts',
    members: [
       {
        name: 'Dr. Priya Mehta',
        designation: 'Professor & Head of Department (English)',
        qualifications: 'Ph.D. (English Literature)',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Postcolonial Literature', 'Critical Theory', 'Digital Humanities'],
        profileLink: '/faculty/priya-mehta',
        hoverInfo: {
          researchFocus: 'Exploring post-human narratives in contemporary South Asian literature.',
          recentPublication: '"Narratives Beyond the Human", Literary Review, 2023.',
        }
      },
      {
        name: 'Dr. Sameer Ahmed',
        designation: 'Associate Professor (Political Science)',
        qualifications: 'Ph.D. (Political Science)',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['International Relations', 'Public Policy', 'South Asian Politics'],
        profileLink: '/faculty/sameer-ahmed',
        hoverInfo: {
          researchFocus: 'Analyzing foreign policy shifts in a multipolar world order.',
          recentPublication: '"India\'s Foreign Policy: A New Trajectory?", World Affairs Journal, 2024.',
        }
      },
      {
        name: 'Prof. Anusha Reddy',
        designation: 'Assistant Professor (Economics)',
        qualifications: 'M.Phil (Economics), M.A.',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Development Economics', 'Econometrics', 'Labor Economics'],
        profileLink: '/faculty/anusha-reddy',
        hoverInfo: {
          researchFocus: 'The impact of microfinance on rural development and women empowerment.',
          recentPublication: '"Microfinance and Social Change: A Case Study", Journal of Development, 2023.',
        }
      },
      {
        name: 'Mr. Harish Tiwari',
        designation: 'Assistant Professor (Hindi)',
        qualifications: 'M.A. (Hindi Literature), B.Ed.',
        imageUrl: '/images/faculty/faculty1.png',
        expertise: ['Modern Hindi Poetry', 'Linguistics', 'Folk Literature'],
        profileLink: '/faculty/harish-tiwari',
        hoverInfo: {
          researchFocus: 'The evolution of language and identity in contemporary Hindi poetry.',
          recentPublication: '"Voices of the Vernacular", Sahitya Journal, 2024.',
        }
      },
    ],
  },
];


const FacultyPage = () => {
  return (
    <main>
      <section className="bg-slate-100 border-b border-slate-200">
        <div className="container mx-auto px-4 py-12 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Meet Our Esteemed Faculty
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Our faculty members are a distinguished group of scholars, researchers, and mentors committed to providing a transformative educational experience.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        {facultyData.map((department, deptIndex) => (
          <section key={deptIndex} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 border-b-2 border-orange-500 pb-2 mb-8">
              {department.department}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {department.members.map((member, memberIndex) => (
                <Link
                  href={member.profileLink}
                  key={memberIndex}
                  className="group relative block overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="transition-transform duration-500 group-hover:scale-105">
                    <div className="relative w-full h-56">
                      <Image
                        src={member.imageUrl}
                        alt={`Photo of ${member.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-5 text-center bg-white">
                      <h3 className="text-lg font-bold text-sky-700">{member.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{member.designation}</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-sky-800/95 p-6 flex flex-col justify-center items-center text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm rounded-lg">
                    <div>
                      <h3 className="text-md font-semibold text-white mb-1">{member.name}</h3>
                      <p className="text-xs text-sky-200 mb-2 italic">{member.qualifications}</p>

                      <h4 className="text-sm font-bold uppercase tracking-wider text-sky-300 mt-3">Research Focus</h4>
                      <p className="mt-1 text-xs font-light leading-snug">
                        {member.hoverInfo.researchFocus}
                      </p>

                      {member.hoverInfo.recentPublication && (
                        <>
                          <div className="w-12 h-px bg-sky-400 my-3 mx-auto"></div>
                          <h4 className="text-sm font-bold uppercase tracking-wider text-sky-300">Recent Publication</h4>
                          <p className="mt-1 text-xs italic opacity-80">
                            &quot;{member.hoverInfo.recentPublication}&quot;
                          </p>
                        </>
                      )}
                       <div className="mt-4 text-xs text-orange-300 group-hover:text-orange-200">
                          View Full Profile &rarr;
                        </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default FacultyPage;