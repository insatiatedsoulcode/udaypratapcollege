### TopBar

- **File**: `src/components/TopBar.tsx`
- **Type**: Client Component
- **Purpose**: Renders the blue top strip with utility links and social icons. Includes an "Apply Now" button.

#### Props
- None

#### Usage
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

#### Notes
- Uses Next.js `Link` for internal navigation.
- Social icons from `react-icons`.
