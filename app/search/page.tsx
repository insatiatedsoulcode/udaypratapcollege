// app/search/page.tsx
import React from 'react';
import Link from 'next/link';

// Using minimal, hardcoded data directly inside the component for this test
const programsData = [
  { id: 'bba', name: 'Bachelor of Business Administration', description: 'A test description for BBA.', detailsLink: '/academics/programs/bba' },
];
const facultyData = [
  { department: 'Test Department', members: [
    { name: 'Dr. Test Faculty', designation: 'Professor', profileLink: '/faculty/test-faculty', expertise: ['Testing'] },
  ]},
];

// Explicitly define the props type as expected by Next.js App Router
type SearchPageProps = {
  params: {}; // For dynamic routes like /blog/[slug], not used here
  searchParams: { [key: string]: string | string[] | undefined }; // The official type for searchParams
};

// Use the standard 'async function' definition for a Server Component page
export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Safely access the query parameter
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
  const decodedQuery = decodeURIComponent(query).toLowerCase();

  let programResults = [];
  let facultyResults = [];

  if (decodedQuery) {
    programResults = programsData.filter(p => p.name.toLowerCase().includes(decodedQuery));
    facultyResults = facultyData
      .flatMap(d => d.members.map(m => ({ ...m, department: d.department })))
      .filter(m => m.name.toLowerCase().includes(decodedQuery));
  }

  const hasResults = programResults.length > 0 || facultyResults.length > 0;

  return (
    <main className="container mx-auto px-4 py-12 md:py-16 min-h-[60vh]">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Search Results</h1>
      {query ? (
        <p className="mt-2 text-slate-600">
          Showing results for: <span className="font-semibold text-slate-900">{decodedQuery}</span>
        </p>
      ) : (
        <p className="mt-2 text-slate-600">Please enter a search term in the header to begin.</p>
      )}

      <div className="mt-10">
        {query && !hasResults && (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">No results found for your query.</p>
          </div>
        )}

        {hasResults && (
          <div className="space-y-10">
            {/* Results sections will use the simplified data */}
            {programResults.map(program => (
              <div key={program.id}><Link href={program.detailsLink}>{program.name}</Link></div>
            ))}
            {facultyResults.map(member => (
              <div key={member.name}><Link href={member.profileLink}>{member.name}</Link></div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};