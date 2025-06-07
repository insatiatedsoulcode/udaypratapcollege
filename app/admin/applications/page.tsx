// app/admin/applications/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

// Define the type for an application record from your database
type Application = {
  _id: string;
  fullName: string;
  email: string;
  programApplyingFor: string;
  submittedAt: string;
};

// This is a helper function to format dates nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Application; direction: 'ascending' | 'descending' } | null>({ key: 'submittedAt', direction: 'descending' });

  // Fetch data when the component first loads
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      try {
        const response = await fetch(`${API_BASE_URL}/api/applications`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch applications from the server.');
        }
        const data = await response.json();
        setApplications(data.data || []);
      } catch (err: unknown) { // Changed 'any' to 'unknown' for better type safety
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Filtering logic based on the search term
  const filteredApplications = applications.filter(app =>
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.programApplyingFor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting logic based on the current sort configuration
  const sortedApplications = React.useMemo(() => {
    const sortableItems = [...filteredApplications]; // Changed 'let' to 'const'
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredApplications, sortConfig]);

  // Handler for when a table header is clicked to change sorting
  const requestSort = (key: keyof Application) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Helper to show the correct sort icon in the table header
  const getSortIcon = (key: keyof Application) => {
      if (!sortConfig || sortConfig.key !== key) {
          return <FaSort className="inline ml-1 opacity-20" />;
      }
      return sortConfig.direction === 'ascending' ? <FaSortUp className="inline ml-1" /> : <FaSortDown className="inline ml-1" />;
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
            Loading applications...
          </td>
        </tr>
      );
    }

    if (error) {
       return (
        <tr>
          <td colSpan={4} className="px-6 py-12 text-center text-red-600 bg-red-50">
            <strong>Error:</strong> {error}
          </td>
        </tr>
      );
    }

    if (sortedApplications.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
            {searchTerm ? "No applications found matching your criteria." : "No applications have been submitted yet."}
          </td>
        </tr>
      );
    }

    return sortedApplications.map((app) => (
      <tr key={app._id} className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4 font-medium text-gray-900">
          {app.fullName}
          <p className="text-xs text-gray-500 font-normal">{app.email}</p>
        </td>
        <td className="px-6 py-4">{app.programApplyingFor}</td>
        <td className="px-6 py-4">{formatDate(app.submittedAt)}</td>
        <td className="px-6 py-4 text-right">
          <Link href={`/admin/applications/${app._id}`} className="font-medium text-sky-600 hover:underline">
            View Details
          </Link>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Submitted Applications</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or program..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('fullName')}>
                  Applicant Name {getSortIcon('fullName')}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('programApplyingFor')}>
                  Program {getSortIcon('programApplyingFor')}
                </th>
                <th scope="col" className="px-6 py-3 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('submittedAt')}>
                  Date {getSortIcon('submittedAt')}
                </th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {renderContent()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationsPage;
