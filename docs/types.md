# Public Types

## `PageProps`

Defined in `type.ts` for route components that receive query parameters via `searchParams`.

```ts
export interface PageProps {
  searchParams?: {
    q?: string;
  };
}
```

Example usage in a page component:

```tsx
import type { PageProps } from '@/type';

export default function Page({ searchParams }: PageProps) {
  const query = searchParams?.q ?? '';
  // ...
  return <div>Query: {query}</div>;
}
```
