// app/admin/page.tsx
import React, { Suspense } from 'react';
import Link from 'next/link';
import { FaInbox, FaFileAlt } from 'react-icons/fa';

// --- Define a type for our application data ---
interface Application {
  _id: string;
  fullName: string;
  email: string;
  programApplyingFor: string;
  submittedAt: string;
}

// --- Helper function to fetch data ---
async function getAdminData() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

  try {
    // Corrected API endpoints to match the backend
    const [statsRes, applicationsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/admin/stats`, { cache: 'no-store' }),
      fetch(`${API_BASE_URL}/api/applications`, { cache: 'no-store' }) // Corrected path
    ]);

    // Simple error check for both fetches
    if (!statsRes.ok || !applicationsRes.ok) {
      throw new Error('Failed to fetch admin data');
    }

    const statsData = await statsRes.json();
    const applicationsData = await applicationsRes.json();

    return {
      stats: statsData.data,
      allApplications: applicationsData.data,
    };
  } catch (error) {
    console.error("Admin dashboard fetch error:", error);
    // On error, return null to handle it in the component
    return { stats: null, allApplications: null };
  }
}

// --- Loading Skeleton Components ---
const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow animate-pulse">
    <div className="flex items-center">
      <div className="bg-slate-200 p-3 rounded-full h-12 w-12"></div>
      <div className="ml-4 flex-1">
        <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-slate-300 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

const TableSkeleton = () => (
  <div className="bg-white shadow rounded-lg overflow-hidden">
    <div className="p-4 space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded"></div>
      <div className="h-8 bg-slate-200 rounded"></div>
      <div className="h-8 bg-slate-200 rounded"></div>
    </div>
  </div>
);

// --- Main Data Display Component ---
async function DashboardData() {
  const { stats, allApplications } = await getAdminData();

  if (!stats || !allApplications) {
    return (
      <div className="text-center p-10 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-xl font-semibold text-red-700">Failed to Load Dashboard Data</h3>
        <p className="text-red-600 mt-2">Could not connect to the backend server. Please ensure it is running and accessible.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Stat Cards */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-sky-100 text-sky-600 p-3 rounded-full"><FaInbox className="h-6 w-6" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Inquiries</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inquiries}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full"><FaFileAlt className="h-6 w-6" /></div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{stats.applications}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Table */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Submitted Applications</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Applicant Name</th>
                  <th scope="col" className="px-6 py-3">Program</th>
                  <th scope="col" className="px-6 py-3">Submission Date</th>
                  <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {allApplications.length > 0 ? (
                  allApplications.map((app: Application) => (
                    <tr key={app._id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {app.fullName}
                        <p className="text-xs text-gray-500 font-normal">{app.email}</p>
                      </td>
                      <td className="px-6 py-4">{app.programApplyingFor}</td>
                      <td className="px-6 py-4">
                        {new Date(app.submittedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/applications/${app._id}`} className="font-medium text-sky-600 hover:underline">View</Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">No applications have been submitted yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}


// --- This is the Main Page Component ---
export default function AdminDashboardPage() {
  return (
    <Suspense fallback={
      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Submitted Applications</h2>
          <TableSkeleton />
        </section>
      </div>
    }>
      <DashboardData />
    </Suspense>
  );
}
