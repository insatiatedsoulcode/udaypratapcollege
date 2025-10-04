## VisitorCounter

Client-only visitor counter that fetches and displays total visits.

- File: `src/components/VisitorCounter.tsx`
- Export: default React component

### Props
- None.

### Behavior
- Uses `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:3001`).
- First load hits `/` to increment; subsequent loads fetch `/api/visits`.
- Uses sessionStorage to avoid double-counting in a session.

### Example
```tsx
import VisitorCounter from '@/components/VisitorCounter';

export default function FooterLike() {
  return (
    <footer>
      <VisitorCounter />
    </footer>
  );
}
```
