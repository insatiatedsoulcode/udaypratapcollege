### VisitorCounter

- **File**: `src/components/VisitorCounter.tsx`
- **Type**: Client Component
- **Purpose**: Displays total visitor count; tracks first view in the current session and fetches counts from an external API.

#### Props
- None

#### Environment & Endpoints
- `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:3001`)
- On first render without session flag: `GET /` (increments + returns `{ visits }`)
- Otherwise: `GET /api/visits` (returns `{ visits }`)

#### Usage
```tsx
import VisitorCounter from '@/components/VisitorCounter';

export default function FooterRight() {
  return <VisitorCounter />;
}
```

#### Notes
- Skips SSR rendering until mounted to avoid mismatches.
- Shows loading and error states.
