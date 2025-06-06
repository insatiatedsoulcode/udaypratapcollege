// app/search/page.tsx
import React from 'react';
import Link from 'next/link';

// --- IMPORTANT: Copy your data arrays here ---
const programsData = [
  // Example:
  { id: 'bba', name: 'Bachelor of Business Administration', description: 'Equips students with essential business management skills.', detailsLink: '/academics/programs/bba' },
  { id: 'bca', name: 'Bachelor of Computer Applications', description: 'Focuses on computer fundamentals and application design.', detailsLink: '/academics/programs/bca' },
  { id: 'ba', name: 'Bachelor of Arts (BA)', description: 'A versatile degree offering a broad understanding of humanities and social sciences.', detailsLink: '/academics/programs/ba' },
  // ... Paste your full programsData array here
];

const facultyData = [
  // Example:
  {
    department: 'Department of Computer Applications',
    members: [
      { name: 'Dr. Rakesh Sharma', designation: 'Professor', profileLink: '/faculty/rakesh-sharma', expertise: ['AI'] },
    ]
  },
  // ... Paste your full facultyData array here
];
// --- END OF DATA SECTION ---


// --- VVV TYPE DEFINITIONS TO FIX THE ERROR VVV ---

// A helper type for a single faculty member
type FacultyMember = {
  name: string;
  designation: string;
  profileLink: string;
  expertise: string[];
};

// This type represents a faculty member in the search results, now with a department property
type FacultySearchResult = FacultyMember & {
  department: string;
};

// The main props type for the page
type SearchPageProps = {
  searchParams: {
    q?: string;
  }
};
// --- ^^^ END OF TYPE DEFINITIONS ^^^ ---


export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const decodedQuery = decodeURIComponent(query).toLowerCase();

  let programResults = [];
  let facultyResults: FacultySearchResult[] = []; // <<< Use the new, specific type instead of any[]

  if (decodedQuery) {
    programResults = programsData.filter(program =>
      program.name.toLowerCase().includes(decodedQuery) ||
      (program.description && program.description.toLowerCase().includes(decodedQuery))
    );

    facultyResults = facultyData
      .flatMap(department => department.members.map(member => ({ ...member, department: department.department })))
      .filter(member =>
        member.name.toLowerCase().includes(decodedQuery) ||
        (member.designation && member.designation.toLowerCase().includes(decodedQuery)) ||
        (member.expertise && member.expertise.some(e => e.toLowerCase().includes(decodedQuery)))
      );
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
            <p className="text-gray-500 text-sm mt-2">Please try a different search term.</p>
          </div>
        )}

        {hasResults && (
          <div className="space-y-10">
            {/* Program Results Section */}
            {programResults.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Matching Programs ({programResults.length})
                </h2>
                <div className="space-y-4">
                  {programResults.map(program => (
                    <div key={program.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <Link href={program.detailsLink || '#'} className="font-semibold text-sky-600 hover:underline">
                        {program.name}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Faculty Results Section */}
            {facultyResults.length > 0 && (
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
                  Matching Faculty ({facultyResults.length})
                </h2>
                 <div className="space-y-4">
                  {facultyResults.map(member => (
                    <div key={member.name} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                       <Link href={member.profileLink || '#'} className="font-semibold text-sky-600 hover:underline">
                        {member.name}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">{member.designation}, {member.department}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
};