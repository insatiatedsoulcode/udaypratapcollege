### Breadcrumbs

- **File**: `src/components/Breadcrumbs.tsx`
- **Type**: Client Component
- **Purpose**: Renders breadcrumb trail derived from the current pathname.

#### Props
- None

#### Behavior
- Hidden on `/`.
- Converts slugs like `contact-us` to `Contact Us`.

#### Usage
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
