### Shared Types

- `type.ts` exports `PageProps` used for App Router pages that accept `searchParams`.

```ts
export interface PageProps {
  searchParams?: { q?: string };
}
```
