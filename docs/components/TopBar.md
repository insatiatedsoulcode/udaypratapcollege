## TopBar

Client navigation strip with quick links and social icons.

- File: `src/components/TopBar.tsx`
- Export: default React component

### Props
- None.

### Example
```tsx
import TopBar from '@/components/TopBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
}
```
