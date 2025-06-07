// app/search/page.tsx

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q ?? '';

  return (
    <main>
      {/* your component JSX */}
    </main>
  );
}
