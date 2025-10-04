## Header

Responsive site header with rotating quotes, search, desktop and mobile navigation.

- File: `src/components/Header.tsx`
- Export: default React component

### Props
- None.

### Usage Notes
- Uses Next.js `usePathname` and client routing to highlight active links.
- Mobile menu includes collapsible submenus.

### Example
```tsx
import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
```
