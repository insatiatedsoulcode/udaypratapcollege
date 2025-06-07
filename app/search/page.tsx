// app/search/page.tsx
//import { PageProps } from '@/types'; // Adjust the import path if your types file is elsewhere

export default function SearchPage({ searchParams }: PageProps) {
  const query = searchParams?.q ?? '';

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Search Results</h1>
      {query ? (
        <p>Showing results for: <strong>{query}</strong></p>
      ) : (
        <p>No search query provided.</p>
      )}
    </div>
  );
}
