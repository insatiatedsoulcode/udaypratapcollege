### Header

- **File**: `src/components/Header.tsx`
- **Type**: Client Component
- **Purpose**: Main site header with rotating quotes, desktop and mobile navigation, and a toggleable search bar.

#### Props
- None

#### Key behaviors
- Highlights active route using `usePathname()`.
- Mobile menu with collapsible submenus.
- Search submit navigates to `/search?q=...`.

#### Usage
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

#### Accessibility
- Buttons have `aria-label` and `aria-expanded` when appropriate.
