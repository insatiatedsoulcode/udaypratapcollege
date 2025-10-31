// app/academics/faculty/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  hoverInfo: {
    researchFocus: string;
    recentPublication: string;
  };
};

type Department = {
  department: string;
  members: FacultyMember[];
};

const facultyData: Department[] = [
  {
    department: 'Department of Computer Applications',
    members: [
      {
        name: 'Mr. Rahul Maurya',
        designation: 'Assistant Professor (B.C.A)',
        qualifications: 'MCA, B.Sc. (Computer Science)',
        expertise: ['Computer Applications', 'Programming', 'Database Management'],
        profileLink: '/faculty/rahul-maurya',
        hoverInfo: {
          researchFocus: 'Modern computer applications and software development methodologies.',
          recentPublication: '"Efficient Database Design for Educational Institutions", Tech Journal, 2023.',
        }
      },
    ],
  },
  {
    department: 'Department of Business Administration',
    members: [
      {
        name: 'Mr. Anil Kumar Patel',
        designation: 'Assistant Professor (Economics)',
        qualifications: 'M.A. (Economics), B.Com',
        expertise: ['Economics', 'Business Analysis', 'Financial Management'],
        profileLink: '/faculty/anil-kumar-patel',
        hoverInfo: {
          researchFocus: 'Economic policies and their impact on business development.',
          recentPublication: '"Economic Growth and Business Sustainability", Business Review, 2023.',
        }
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
        hoverInfo: {
          researchFocus: 'Modern Hindi literature and language development.',
          recentPublication: '"Contemporary Hindi Poetry: A Study", Sahitya Journal, 2023.',
        }
      },
      {
        name: 'Mrs. Sushma Charel',
        designation: 'Assistant Professor (Home Science)',
        qualifications: 'M.Sc. (Home Science), B.Sc.',
        expertise: ['Home Science', 'Nutrition', 'Family Studies'],
        profileLink: '/faculty/sushma-charel',
        hoverInfo: {
          researchFocus: 'Nutrition and family welfare in modern society.',
          recentPublication: '"Nutritional Education for Rural Families", Home Science Journal, 2023.',
        }
      },
      {
        name: 'Mr. G. Apoorva Shankar Lipani',
        designation: 'Assistant Professor (English)',
        qualifications: 'M.A. (English Literature), B.Ed.',
        expertise: ['English Literature', 'Language Skills', 'Communication'],
        profileLink: '/faculty/apoorva-shankar-lipani',
        hoverInfo: {
          researchFocus: 'English language teaching methodologies and literature analysis.',
          recentPublication: '"Effective English Communication Skills", Language Journal, 2023.',
        }
      },
      {
        name: 'Dr. Shashiwala Gupta',
        designation: 'Assistant Professor (Ancient History)',
        qualifications: 'Ph.D. (Ancient History), M.A.',
        expertise: ['Ancient History', 'Archaeology', 'Indian History'],
        profileLink: '/faculty/shashiwala-gupta',
        hoverInfo: {
          researchFocus: 'Ancient Indian history and archaeological studies.',
          recentPublication: '"Ancient Civilizations of India", History Journal, 2023.',
        }
      },
      {
        name: 'Mr. Kanhaiya Lal',
        designation: 'Assistant Professor (Political Science)',
        qualifications: 'M.A. (Political Science), B.A.',
        expertise: ['Political Science', 'Public Administration', 'Indian Politics'],
        profileLink: '/faculty/kanhaiya-lal',
        hoverInfo: {
          researchFocus: 'Indian political system and democratic governance.',
          recentPublication: '"Democracy and Development in India", Political Science Review, 2023.',
        }
      },
    ],
  },
];


// Modal Component
const FacultyModal = ({ member, isOpen, onClose }: { member: FacultyMember | null; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {member.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-sky-700">{member.name}</h2>
                <p className="text-gray-500">{member.designation}</p>
                <p className="text-sm text-gray-400 italic">{member.qualifications}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Expertise Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {member.expertise.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Research Focus */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Research Focus</h3>
            <p className="text-gray-600 leading-relaxed">{member.hoverInfo.researchFocus}</p>
          </div>

          {/* Recent Publication */}
          {member.hoverInfo.recentPublication && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Publication</h3>
              <p className="text-gray-600 italic leading-relaxed">
                &quot;{member.hoverInfo.recentPublication}&quot;
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <Link
              href={member.profileLink}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Full Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FacultyPage = () => {
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (member: FacultyMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

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
                  className="group cursor-pointer"
                  onClick={() => openModal(member)}
                >
                  <div className="p-4 text-center bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-blue-300 h-64 flex flex-col">
                    <div className="mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-sm">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-sky-700 mb-1 leading-tight line-clamp-1">{member.name}</h3>
                        <p className="text-xs text-gray-500 mb-1 line-clamp-1">{member.designation}</p>
                        <p className="text-xs text-gray-400 italic mb-3 line-clamp-2">{member.qualifications}</p>
                        
                        <div className="flex flex-wrap justify-center gap-1 mb-3">
                          {member.expertise.slice(0, 2).map((skill, index) => (
                            <span key={index} className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {skill.length > 10 ? skill.substring(0, 10) + '...' : skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                        <div className="border-t border-gray-200 pt-3">
                          <div className="text-xs text-blue-600 font-medium">
                            Click to View Details →
                          </div>
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
      
      {/* Modal */}
      <FacultyModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </main>
  );
};

export default FacultyPage;