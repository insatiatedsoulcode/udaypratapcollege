### Modal

- **File**: `src/components/Modal.tsx`
- **Type**: Client Component
- **Purpose**: Simple overlay modal with escape-to-close and scroll-lock.

#### Props
- **`isOpen: boolean`**: Controls visibility
- **`onClose: () => void`**: Called on overlay click, Escape, or close button
- **`children: React.ReactNode`**: Modal body

#### Usage
```tsx
import Modal from '@/components/Modal';

function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div>Content</div>
      </Modal>
    </>
  );
}
```

#### Styles
- Uses `src/components/Modal.css` for overlay/content styling and body scroll lock class.
