### FeaturedEventsCarousel

- **File**: `src/components/FeaturedEventsCarousel.tsx`
- **Type**: Client Component
- **Purpose**: Displays a two-column hero carousel for featured events with timed auto-advance.

#### Props
- None

#### Data model
```ts
// internal type
 type SlideData = {
  id: string;
  leftContent: { /* textBanner | imageWithOverlays */ };
  rightBox: { title: string; description: string; buttonText: string; buttonLink: string };
 };
```

#### Usage
```tsx
import FeaturedEventsCarousel from '@/components/FeaturedEventsCarousel';

export default function Page() {
  return <FeaturedEventsCarousel />;
}
```

#### Notes
- Customize slides by editing the `slides` array.
- Uses `next/image` for images.
