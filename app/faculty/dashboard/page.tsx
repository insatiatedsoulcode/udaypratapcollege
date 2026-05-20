'use client';

import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaUsers, FaBookOpen, FaChartBar, FaCalendarAlt, FaFileAlt, FaBell, FaPlus } from 'react-icons/fa';

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  employeeId: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: number;
  enrolledStudents: number;
  attendance: number;
  averageGrade: string;
}

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  attendance: number;
  grade: string;
  email: string;
}

const FacultyDashboard: React.FC = () => {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setFaculty({
        id: '1',
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@faculty.upc.edu',
        department: 'Computer Science',
        designation: 'Associate Professor',
        employeeId: 'UPC-F001'
      });

      setCourses([
        {
          id: '1',
          name: 'Data Structures and Algorithms',
          code: 'BCA301',
          credits: 4,
          semester: 3,
          enrolledStudents: 45,
          attendance: 87,
          averageGrade: 'B+'
        },
        {
          id: '2',
          name: 'Advanced Programming',
          code: 'BCA302',
          credits: 3,
          semester: 4,
          enrolledStudents: 38,
          attendance: 92,
          averageGrade: 'A-'
        }
      ]);

      setStudents([
        {
          id: '1',
          name: 'Rajesh Kumar',
          rollNumber: 'UPC2024001',
          attendance: 90,
          grade: 'A',
          email: 'rajesh.kumar@student.upc.edu'
        },
        {
          id: '2',
          name: 'Priya Singh',
          rollNumber: 'UPC2024002',
          attendance: 85,
          grade: 'B+',
          email: 'priya.singh@student.upc.edu'
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
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaChalkboardTeacher className="text-green-600 text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome, {faculty?.name}</h1>
                  <p className="text-gray-600">{faculty?.designation} • {faculty?.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <FaBell className="inline mr-2" />
                  Notifications
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <FaPlus className="inline mr-2" />
                  Add Course
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
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaBookOpen className="text-blue-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-green-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {courses.reduce((total, course) => total + course.enrolledStudents, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaChartBar className="text-purple-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(courses.reduce((total, course) => total + course.attendance, 0) / courses.length)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FaFileAlt className="text-orange-600 text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* My Courses */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaBookOpen className="mr-2 text-blue-600" />
                  My Courses
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{course.name}</h3>
                          <p className="text-sm text-gray-600">{course.code} • {course.credits} Credits • Semester {course.semester}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.enrolledStudents} Students
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                          <span className="text-sm text-gray-600">
                            Attendance: <span className="font-medium">{course.attendance}%</span>
                          </span>
                          <span className="text-sm text-gray-600">
                            Avg Grade: <span className="font-medium">{course.averageGrade}</span>
                          </span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Manage →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View All Courses
                </button>
              </div>
            </div>

            {/* Recent Students */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaUsers className="mr-2 text-blue-600" />
                  Recent Students
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.rollNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {student.grade}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">{student.attendance}% Attendance</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  View All Students
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaUsers className="text-blue-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Take Attendance</span>
              </button>
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaFileAlt className="text-green-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Upload Grades</span>
              </button>
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaCalendarAlt className="text-purple-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Schedule Class</span>
              </button>
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaBookOpen className="text-orange-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Course Material</span>
              </button>
              <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <FaChartBar className="text-red-600 text-2xl mb-2" />
                <span className="text-sm font-medium">Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyDashboard;
