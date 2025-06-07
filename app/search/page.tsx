// app/search/page.tsx
'use client';

import React, { useMemo } from 'react';
import Fuse from 'fuse.js';
import Link from 'next/link';

// Sample data
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

// 🔍 Highlight matched text
function highlight(text: string, matches: readonly Fuse.RangeTuple[] | undefined): React.ReactNode {
  if (!matches || matches.length === 0) return text;

  const chunks: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach(([start, end], index) => {
    if (lastIndex < start) {
      chunks.push(text.slice(lastIndex, start));
    }
    chunks.push(<mark key={index}>{text.slice(start, end + 1)}</mark>);
    lastIndex = end + 1;
  });

  if (lastIndex < text.length) {
    chunks.push(text.slice(lastIndex));
  }

  return chunks;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q?.trim().toLowerCase() ?? '';

  const programFuse = useMemo(
    () =>
      new Fuse(programsData, {
        keys: ['name', 'description'],
        includeMatches: true,
        threshold: 0.4,
      }),
    []
  );

  const facultyFlatList = useMemo(
    () =>
      facultyData.flatMap((dept) =>
        dept.members.map((member) => ({
          ...member,
          department: dept.department,
        }))
      ),
    []
  );

  const facultyFuse = useMemo(
    () =>
      new Fuse(facultyFlatList, {
        keys: ['name', 'designation', 'department', 'expertise'],
        includeMatches: true,
        threshold: 0.4,
      }),
    [facultyFlatList]
  );

  const programResults = query ? programFuse.search(query) : [];
  const facultyResults = query ? facultyFuse.search(query) : [];

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
              {programResults.map(({ item, matches }) => (
                <li key={item.id}>
                  <Link href={item.detailsLink}>
                    <span className="text-blue-600 hover:underline font-medium">
                      {highlight(item.name, matches?.find((m) => m.key === 'name')?.indices)}
                    </span>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {highlight(item.description, matches?.find((m) => m.key === 'description')?.indices)}
                  </p>
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
              {facultyResults.map(({ item, matches }, idx) => (
                <li key={idx}>
                  <Link href={item.profileLink}>
                    <span className="text-blue-600 hover:underline font-medium">
                      {highlight(item.name, matches?.find((m) => m.key === 'name')?.indices)}
                    </span>
                  </Link>
                  <p className="text-sm text-gray-600">
                    {highlight(
                      `${item.designation} • ${item.department} • ${item.expertise.join(', ')}`,
                      matches?.find((m) => ['designation', 'department', 'expertise'].includes(m.key as string))?.indices
                    )}
                  </p>
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
