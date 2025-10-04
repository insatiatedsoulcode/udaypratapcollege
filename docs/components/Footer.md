## Footer

Site footer with social icons and includes `VisitorCounter`.

- File: `src/components/Footer.tsx`
- Export: default React component

### Props
- None.

### Example
```tsx
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
```
