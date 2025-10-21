'use client';

import React, { useState } from 'react';
import { FaUser, FaGraduationCap, FaChalkboardTeacher, FaBook, FaCalendarAlt, FaRupeeSign, FaUsers, FaBell, FaFileAlt, FaChartLine, FaDownload, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import SEO from '@/components/SEO';

interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  category: 'student' | 'faculty' | 'admin' | 'general';
}

interface RecentActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Dashboard: React.FC = () => {
  const [userRole, setUserRole] = useState<'student' | 'faculty' | 'admin' | 'guest'>('guest');

  const quickAccessItems: QuickAccessItem[] = [
    // Student Access
    {
      id: '1',
      title: 'Student Dashboard',
      description: 'View grades, attendance, and course information',
      icon: <FaUser />,
      href: '/student/dashboard',
      color: 'bg-blue-600',
      category: 'student'
    },
    {
      id: '2',
      title: 'Academic Calendar',
      description: 'Check exam schedules and important dates',
      icon: <FaCalendarAlt />,
      href: '/academics/calendar',
      color: 'bg-green-600',
      category: 'student'
    },
    {
      id: '3',
      title: 'Library System',
      description: 'Search books, check borrowings, and reservations',
      icon: <FaBook />,
      href: '/library',
      color: 'bg-purple-600',
      category: 'student'
    },
    {
      id: '4',
      title: 'Fee Payment',
      description: 'Pay semester fees and view payment history',
      icon: <FaRupeeSign />,
      href: '/fees/payment',
      color: 'bg-green-600',
      category: 'student'
    },
    {
      id: '5',
      title: 'Online Application',
      description: 'Apply for admission online',
      icon: <FaFileAlt />,
      href: '/admissions/online',
      color: 'bg-orange-600',
      category: 'general'
    },
    // Faculty Access
    {
      id: '6',
      title: 'Faculty Dashboard',
      description: 'Manage courses, students, and academic activities',
      icon: <FaChalkboardTeacher />,
      href: '/faculty/dashboard',
      color: 'bg-indigo-600',
      category: 'faculty'
    },
    {
      id: '7',
      title: 'Student Records',
      description: 'View and manage student academic records',
      icon: <FaGraduationCap />,
      href: '/faculty/students',
      color: 'bg-teal-600',
      category: 'faculty'
    },
    // Admin Access
    {
      id: '8',
      title: 'Admin Panel',
      description: 'Manage college operations and data',
      icon: <FaCog />,
      href: '/admin',
      color: 'bg-red-600',
      category: 'admin'
    },
    {
      id: '9',
      title: 'Analytics Dashboard',
      description: 'View college statistics and reports',
      icon: <FaChartLine />,
      href: '/admin/analytics',
      color: 'bg-pink-600',
      category: 'admin'
    },
    // General Access
    {
      id: '10',
      title: 'Events & News',
      description: 'Stay updated with college events and announcements',
      icon: <FaBell />,
      href: '/events',
      color: 'bg-yellow-600',
      category: 'general'
    },
    {
      id: '11',
      title: 'Alumni Portal',
      description: 'Connect with fellow alumni and network',
      icon: <FaUsers />,
      href: '/alumni/portal',
      color: 'bg-cyan-600',
      category: 'general'
    },
    {
      id: '12',
      title: 'Download Center',
      description: 'Download forms, documents, and resources',
      icon: <FaDownload />,
      href: '/downloads',
      color: 'bg-gray-600',
      category: 'general'
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      title: 'New Admission Applications',
      description: '5 new applications received today',
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: '2',
      title: 'Exam Schedule Updated',
      description: 'Mid-term exam schedule has been published',
      time: '4 hours ago',
      type: 'success'
    },
    {
      id: '3',
      title: 'Library Maintenance',
      description: 'Library will be closed for maintenance tomorrow',
      time: '6 hours ago',
      type: 'warning'
    },
    {
      id: '4',
      title: 'Fee Payment Deadline',
      description: 'Last date for fee payment is approaching',
      time: '1 day ago',
      type: 'warning'
    }
  ];

  const getFilteredItems = () => {
    if (userRole === 'guest') {
      return quickAccessItems.filter(item => item.category === 'general');
    }
    if (userRole === 'student') {
      return quickAccessItems.filter(item => 
        item.category === 'student' || item.category === 'general'
      );
    }
    if (userRole === 'faculty') {
      return quickAccessItems.filter(item => 
        item.category === 'faculty' || item.category === 'general'
      );
    }
    if (userRole === 'admin') {
      return quickAccessItems;
    }
    return quickAccessItems;
  };

  const getActivityTypeColor = (type: string) => {
    const colors = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <SEO
        title="Quick Access Dashboard"
        description="Access all college services and information from one place"
        canonical="/dashboard"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quick Access Dashboard</h1>
                <p className="text-gray-600 mt-1">Access all college services and information from one place</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="guest">Guest</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Access Grid */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFilteredItems().map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${item.color} group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Announcements */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Announcements</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'info' ? 'bg-blue-500' :
                          activity.type === 'success' ? 'bg-green-500' :
                          activity.type === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActivityTypeColor(activity.type)}`}>
                          {activity.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Students</span>
                    <span className="font-semibold text-gray-900">1,250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Faculty Members</span>
                    <span className="font-semibold text-gray-900">85</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Programs</span>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Library Books</span>
                    <span className="font-semibold text-gray-900">15,000</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link href="/about" className="block text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    About the College
                  </Link>
                  <Link href="/academics/programs" className="block text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Academic Programs
                  </Link>
                  <Link href="/admissions/how-to-apply" className="block text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    How to Apply
                  </Link>
                  <Link href="/contact-us" className="block text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Contact Information
                  </Link>
                  <Link href="/events" className="block text-sm text-blue-600 hover:text-blue-800 transition-colors">
                    Upcoming Events
                  </Link>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Principal Office</span>
                    <p className="text-gray-600">+91 12345 67890</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Admin Office</span>
                    <p className="text-gray-600">+91 12345 67891</p>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Emergency</span>
                    <p className="text-gray-600">+91 12345 67892</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
