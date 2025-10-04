## PageTransition

A client component that animates page transitions using Framer Motion and Next.js `usePathname`.

- File: `src/components/PageTransition.tsx`
- Export: default React component

### Props
- `children: React.ReactNode` — required. Rendered inside the animated container.

### Behavior
- Fades and slides content on route changes.
- Uses `AnimatePresence` and keyed `motion.div`.

### Example
```tsx
import PageTransition from '@/components/PageTransition';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
```
