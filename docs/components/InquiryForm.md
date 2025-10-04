## InquiryForm

Controlled inquiry form with validation and API submission.

- File: `src/components/InquiryForm.tsx`
- Export: default React component

### Props
- `onSuccess?: () => void` — optional callback invoked after a successful submission (useful to close a surrounding `Modal`).

### Behavior
- Validates name, email, optional phone, subject, and message.
- Submits to `POST ${NEXT_PUBLIC_API_BASE_URL}/api/send-enquiry`.
- Shows inline errors and a submission status banner.
- Uses Next.js `Image` for logo.

### Environment
- `NEXT_PUBLIC_API_BASE_URL` — defaults to `http://localhost:3001` if unset.

### Example
```tsx
import { useState } from 'react';
import Modal from '@/components/Modal';
import InquiryForm from '@/components/InquiryForm';

export default function ContactCTA() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Contact Admissions</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <InquiryForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
```
