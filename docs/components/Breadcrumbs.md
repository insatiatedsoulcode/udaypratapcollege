## Breadcrumbs

Client component that renders hierarchical breadcrumbs computed from the current pathname.

- File: `src/components/Breadcrumbs.tsx`
- Export: default React component

### Props
- None.

### Example
```tsx
import Breadcrumbs from '@/components/Breadcrumbs';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}
```
