// app/search/page.tsx

import React from 'react';
import Link from 'next/link';

// 🔧 Sample data
const programsData = [
  {
    id: 'bca',
    name: 'Bachelor of Computer Applications',
    description: 'Covers computing and software skills.',
    detailsLink: '/programs/bca',
  },
  {
    id: 'bba',
    name: 'Bachelor of Business Administration',
    description: 'Focus on management and leadership.',
    detailsLink: '/programs/bba',
  },
];

const facultyData = [
  {
    department: 'Computer Applications',
    members: [
      {
        name: 'Dr. Rakesh Sharma',
        designation: 'Professor',
        expertise: ['AI', 'Machine Learning'],
        profileLink: '/faculty/rakesh-sharma',
      },
    ],
  },
];

// 🔍 Utility to highlight matched text
function highlightText(text: string, keyword: string): string {
  if (!keyword) return text;
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// ✅ Component
export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q?.trim().toLowerCase() ?? '';

  const programResults = programsData.filter((program) =>
    program.name.toLowerCase().includes(query) ||
    program.description.toLowerCase().includes(query)
  );

  const facultyResults = facultyData
    .flatMap((dept) =>
      dept.members.map((member) => ({
        ...member,
        department: dept.department,
      }))
    )
    .filter((member) =>
      member.name.toLowerCase().includes(query) ||
      member.designation.toLowerCase().includes(query) ||
      member.expertise.some((skill) => skill.toLowerCase().includes(query))
    );

  const hasResults = programResults.length > 0 || facultyResults.length > 0;

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-800">Search Results</h1>

      {query ? (
        <p className="mt-2 text-slate-600">
          Showing results for: <strong>{query}</strong>
        </p>
      ) : (
        <p className="mt-2 text-slate-600">
          Please enter a search query using <code>?q=your+search</code>.
        </p>
      )}

      <div className="mt-10 space-y-12">
        {programResults.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Matching Programs
            </h2>
            <ul className="space-y-4">
              {programResults.map((program) => (
                <li key={program.id}>
                  <Link href={program.detailsLink}>
                    <span
                      className="text-blue-600 hover:underline font-medium"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(program.name, query),
                      }}
                    ></span>
                  </Link>
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(program.description, query),
                    }}
                  ></p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {facultyResults.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Matching Faculty
            </h2>
            <ul className="space-y-4">
              {facultyResults.map((faculty, idx) => (
                <li key={idx}>
                  <Link href={faculty.profileLink}>
                    <span
                      className="text-blue-600 hover:underline font-medium"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(faculty.name, query),
                      }}
                    ></span>
                  </Link>
                  <p
                    className="text-sm text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: highlightText(
                        `${faculty.designation} • ${faculty.department} • ${faculty.expertise.join(', ')}`,
                        query
                      ),
                    }}
                  ></p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!hasResults && query && (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-semibold">
              No results found for <mark>{query}</mark>.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Please try a different search term.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
