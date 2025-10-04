### NotificationTicker

- **File**: `src/components/NotificationTicker.tsx`
- **Type**: Server Component
- **Purpose**: Thin marquee-like ticker that loops important announcements.

#### Props
- None

#### Customization
- Edit the `announcements` array inside the component.

#### Usage
```tsx
import NotificationTicker from '@/components/NotificationTicker';

export default function Home() {
  return <NotificationTicker />;
}
```
