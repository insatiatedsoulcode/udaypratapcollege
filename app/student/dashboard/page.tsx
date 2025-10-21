'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaBook, FaCalendarAlt, FaGraduationCap, FaBell, FaFileAlt, FaChartLine, FaDownload } from 'react-icons/fa';
import SEO from '@/components/SEO';

interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  program: string;
  semester: number;
  cgpa: number;
  attendance: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  instructor: string;
  grade: string;
  attendance: number;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

const StudentDashboard: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setStudent({
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@student.upc.edu',
        rollNumber: 'UPC2024001',
        program: 'Bachelor of Computer Applications (BCA)',
        semester: 6,
        cgpa: 8.5,
        attendance: 85
      });

      setCourses([
        {
          id: '1',
          name: 'Data Structures and Algorithms',
          code: 'BCA301',
          credits: 4,
          instructor: 'Dr. Priya Sharma',
          grade: 'A',
          attendance: 90
        },
        {
          id: '2',
          name: 'Database Management Systems',
          code: 'BCA302',
          credits: 4,
          instructor: 'Prof. Amit Singh',
          grade: 'B+',
          attendance: 88
        },
        {
          id: '3',
          name: 'Web Development',
          code: 'BCA303',
          credits: 3,
          instructor: 'Dr. Neha Gupta',
          grade: 'A+',
          attendance: 95
        }
      ]);

      setAnnouncements([
        {
          id: '1',
          title: 'Mid-term Examination Schedule',
          message: 'Mid-term examinations will be conducted from March 15-25, 2024. Please check your timetable.',
          date: '2024-03-01',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Library Hours Extended',
          message: 'Library will remain open till 10 PM during examination period.',
          date: '2024-02-28',
          priority: 'medium'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Student Dashboard"
        description="Access your academic records, courses, announcements, and more"
        canonical="/student/dashboard"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome, {student?.name}</h1>
                  <p className="text-gray-600">{student?.program} - Semester {student?.semester}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaBell className="inline mr-2" />
                  Notifications
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <FaDownload className="inline mr-2" />
                  Download ID Card
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaGraduationCap className="text-green-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">CGPA</p>
                  <p className="text-2xl font-bold text-gray-900">{student?.cgpa}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-blue-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">{student?.attendance}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaBook className="text-purple-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaBell className="text-orange-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Notifications</p>
                  <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Courses */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaBook className="mr-2 text-blue-600" />
                  Current Courses
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{course.name}</h3>
                          <p className="text-sm text-gray-600">{course.code} • {course.credits} Credits</p>
                          <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Grade: {course.grade}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">Attendance: {course.attendance}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View All Courses
                </button>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaBell className="mr-2 text-blue-600" />
                  Recent Announcements
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{announcement.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{new Date(announcement.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                          announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {announcement.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  View All Announcements
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaFileAlt className="text-blue-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Academic Records</span>
              </button>
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaCalendarAlt className="text-green-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Exam Schedule</span>
              </button>
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaBook className="text-purple-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Library</span>
              </button>
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaUser className="text-orange-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
