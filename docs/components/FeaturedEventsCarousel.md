## FeaturedEventsCarousel

Client carousel showcasing featured events with a split layout.

- File: `src/components/FeaturedEventsCarousel.tsx`
- Export: default React component

### Props
- None.

### Behavior
- Auto-plays every 8 seconds; left/right arrows navigate.
- Slide data is embedded in the file; customize `slides`.

### Example
```tsx
import FeaturedEventsCarousel from '@/components/FeaturedEventsCarousel';

export default function Page() {
  return <FeaturedEventsCarousel />;
}
```
