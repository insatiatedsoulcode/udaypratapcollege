### PageTransition

- **File**: `src/components/PageTransition.tsx`
- **Type**: Client Component
- **Purpose**: Adds fade/slide transitions between routes using `framer-motion` and `usePathname()`.

#### Props
- `children: React.ReactNode`

#### Usage
```tsx
import PageTransition from '@/components/PageTransition';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <PageTransition>{children}</PageTransition>
    </main>
  );
}
```

#### Notes
- Animation variants are tweakable inside the component.
