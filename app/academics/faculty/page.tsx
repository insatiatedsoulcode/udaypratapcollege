// app/academics/faculty/page.tsx
'use client';

import React from 'react';
// --- CORRECTED IMPORT LINE ---
// FaGraduationCap and FaMicroscope have been removed as they were not used in the component.
//import { FaUserTie, FaChevronRight, FaUsers, FaBook, FaFlask, FaLaptopCode, FaLightbulb, FaBalanceScale, FaHandshake, FaLeaf, FaInfinity, FaBrain, FaChartLine } from 'react-icons/fa';
//import { FaUserTie, FaChevronRight, FaUsers } from 'react-icons/fa';

// --- Updated Faculty Data with Real Faculty Names (1-7) ---
// Clean design without images - using initials avatars

// Type definitions
type FacultyMember = {
  name: string;
  designation: string;
  qualifications: string;
  expertise: string[];
  profileLink: string;
};

type Department = {
  department: string;
  members: FacultyMember[];
};

const facultyData: Department[] = [
  {
    department: 'Administration',
    members: [
      {
        name: 'Dr. Dilawar Singh',
        designation: 'Principal',
        qualifications: 'Ph.D.',
        expertise: ['Administration', 'Leadership', 'Academics'],
        profileLink: '/faculty/dilawar-singh',
      },
    ],
  },
  {
    department: 'Department of Arts',
    members: [
      {
        name: 'Ms. Saroja Devi',
        designation: 'Assistant Professor (Hindi)',
        qualifications: 'M.A. (Hindi Literature), B.Ed.',
        expertise: ['Hindi Literature', 'Language Teaching', 'Indian Literature'],
        profileLink: '/faculty/saroja-devi',
      },
      {
        name: 'Mrs. Sushma Charel',
        designation: 'Assistant Professor (Home Science)',
        qualifications: 'M.Sc. (Home Science), B.Sc.',
        expertise: ['Home Science', 'Nutrition', 'Family Studies'],
        profileLink: '/faculty/sushma-charel',
      },
      {
        name: 'Mr. G. Apoorva Shankar Lipani',
        designation: 'Assistant Professor (English)',
        qualifications: 'M.A. (English Literature), B.Ed.',
        expertise: ['English Literature', 'Language Skills', 'Communication'],
        profileLink: '/faculty/apoorva-shankar-lipani',
      },
      {
        name: 'Mr. Kanhaiya Lal',
        designation: 'Assistant Professor (Political Science)',
        qualifications: 'M.A. (Political Science), B.A.',
        expertise: ['Political Science', 'Public Administration', 'Indian Politics'],
        profileLink: '/faculty/kanhaiya-lal',
      },
      {
        name: 'Mr. Surya Kumar',
        designation: 'Lecturer (Economics)',
        qualifications: 'NET',
        expertise: ['Economics', 'Microeconomics', 'Macroeconomics'],
        profileLink: '/faculty/surya-kumar',
      },
      {
        name: 'Mr. Apoorva Shankar Tiwari',
        designation: 'Lecturer (English)',
        qualifications: 'NET',
        expertise: ['English Literature', 'Language Skills', 'Communication'],
        profileLink: '/faculty/apoorva-shankar-tiwari',
      },
      {
        name: 'Dr. Saroja Devi Vinod Kumar Yadav',
        designation: 'Lecturer (Hindi)',
        qualifications: 'Ph.D.',
        expertise: ['Hindi Literature', 'Language Teaching', 'Indian Literature'],
        profileLink: '/faculty/saroja-devi-yadav',
      },
      {
        name: 'Dr. Priyanka Vaishnav',
        designation: 'Lecturer (Political Science)',
        qualifications: 'Ph.D.',
        expertise: ['Political Science', 'Public Administration', 'Indian Politics'],
        profileLink: '/faculty/priyanka-vaishnav',
      },
      {
        name: 'Dr. Neha Singh',
        designation: 'Lecturer (Sociology)',
        qualifications: 'Ph.D.',
        expertise: ['Sociology', 'Social Issues', 'Indian Society'],
        profileLink: '/faculty/neha-singh',
      },
      {
        name: 'Dr. Shashibala Gupta',
        designation: 'Lecturer (Ancient History)',
        qualifications: 'Ph.D.',
        expertise: ['Ancient History', 'Archaeology', 'Indian History'],
        profileLink: '/faculty/shashibala-gupta',
      },
      {
        name: 'Dr. Jyoti Singh',
        designation: 'Lecturer (Home Science)',
        qualifications: 'Ph.D.',
        expertise: ['Home Science', 'Nutrition', 'Family Studies'],
        profileLink: '/faculty/jyoti-singh',
      },
    ],
  },
  {
    department: 'Department of Business Administration',
    members: [
      {
        name: 'Mr. Anil Kumar Patel',
        designation: 'Assistant Professor (Economics)',
        qualifications: 'M.A. (Economics), B.Com, M.Com',
        expertise: ['Economics', 'Business Analysis', 'Financial Management'],
        profileLink: '/faculty/anil-kumar-patel',
      },
      {
        name: 'Dr. Saurabh Vajpayee',
        designation: 'Lecturer (B.B.A.)',
        qualifications: 'Ph.D.',
        expertise: ['Business Administration', 'Management Studies', 'Organizational Behavior'],
        profileLink: '/faculty/saurabh-vajpayee',
      },
      {
        name: 'Mr. Shankar Singh Bhakuni',
        designation: 'Lecturer (B.B.A.)',
        qualifications: 'NET',
        expertise: ['Business Administration', 'Marketing', 'Business Analysis'],
        profileLink: '/faculty/shankar-singh-bhakuni',
      },
      {
        name: 'Mr. Ritesh Krishna Srivastava',
        designation: 'Lecturer (B.B.A.)',
        qualifications: 'NET',
        expertise: ['Business Administration', 'Finance', 'Accounting'],
        profileLink: '/faculty/ritesh-krishna-srivastava',
      },
    ],
  },
  {
    department: 'Department of Computer Applications',
    members: [
      {
        name: 'Mr. Rahul Maurya',
        designation: 'Assistant Professor',
        qualifications: 'BCA,MCA',
        expertise: ['Computer Applications', 'Programming', 'Database Management'],
        profileLink: '/faculty/rahul-maurya',
      },
      {
        name: 'Mr. Kamlesh Kumar Yadav',
        designation: 'Lecturer (B.C.A.)',
        qualifications: 'M.C.A.',
        expertise: ['Computer Science', 'Software Engineering', 'Web Development'],
        profileLink: '/faculty/kamlesh-kumar-yadav',
      },
      {
        name: 'Mr. Saurabh Maurya',
        designation: 'Lecturer (B.C.A.)',
        qualifications: 'M.C.A.',
        expertise: ['Information Technology', 'Networking', 'Operating Systems'],
        profileLink: '/faculty/saurabh-maurya',
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {department.members.map((member, memberIndex) => (
                <div
                  key={memberIndex}
                  className="group"
                >
                  <div className="p-4 text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-blue-300 h-full flex flex-col">
                    <div className="mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-sky-700 mb-1 leading-tight">{member.name}</h3>
                        <p className="text-xs text-gray-500 mb-1">{member.designation}</p>
                        <p className="text-xs text-gray-400 italic mb-3">{member.qualifications}</p>

                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {member.expertise.map((skill, index) => (
                            <span key={index} className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

    </main>
  );
};

export default FacultyPage;