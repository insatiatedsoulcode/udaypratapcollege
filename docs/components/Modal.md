## Modal

Accessible modal with overlay click/escape-to-close and scroll lock.

- File: `src/components/Modal.tsx`
- Export: default React component

### Props
- `isOpen: boolean` — controls visibility
- `onClose: () => void` — called to close
- `children: React.ReactNode` — modal content

### Example
```tsx
import { useState } from 'react';
import Modal from '@/components/Modal';

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="p-4">Hello from modal!</div>
      </Modal>
    </>
  );
}
```
