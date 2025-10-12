'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaDownload, FaRedo } from 'react-icons/fa';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
  status: string;
}

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  program: string;
  qualification: string;
  address?: string;
  dob?: string;
  gender?: string;
  father_name?: string;
  mother_name?: string;
  guardian_phone?: string;
  submitted_at: string;
  status: string;
}

const AdminPage = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'applications'>('enquiries');
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Simple authentication (in production, use proper auth)
  const ADMIN_PASSWORD = 'admin123'; // Change this in production

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Invalid password');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enquiriesRes, applicationsRes] = await Promise.all([
        fetch('/api/enquiries'),
        fetch('/api/applications')
      ]);

      if (enquiriesRes.ok) {
        const enquiriesData = await enquiriesRes.json();
        setEnquiries(enquiriesData.data || []);
      }

      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const exportToCSV = (data: (Enquiry | Application)[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(value => 
        typeof value === 'string' && value.includes(',') ? `"${value}"` : value
      ).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex space-x-2">
              <button
                onClick={fetchData}
                className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FaRedo className="mr-2" />
                Refresh
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('enquiries')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'enquiries'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Enquiries ({enquiries.length})
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Applications ({applications.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Export Button */}
        <div className="mb-4">
          <button
            onClick={() => exportToCSV(
              activeTab === 'enquiries' ? enquiries : applications,
              activeTab
            )}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <FaDownload className="mr-2" />
            Export {activeTab === 'enquiries' ? 'Enquiries' : 'Applications'} as CSV
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {activeTab === 'enquiries' ? (
              enquiries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No enquiries found.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {enquiries.map((enquiry) => (
                    <li key={enquiry.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                              {enquiry.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(enquiry.submitted_at)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {enquiry.email}
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            Subject: {enquiry.subject}
                          </p>
                          <p className="text-sm text-gray-700 mt-2">
                            {enquiry.message}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            ) : (
              applications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No applications found.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <li key={application.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                              {application.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatDate(application.submitted_at)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {application.email} • {application.phone}
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            Program: {application.program}
                          </p>
                          <p className="text-sm text-gray-700 mt-1">
                            Qualification: {application.qualification}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
