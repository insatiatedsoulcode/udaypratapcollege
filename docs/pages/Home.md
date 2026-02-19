### Home (`app/page.tsx`)

- Uses: `NotificationTicker`, hero slideshow, `FeaturedEventsCarousel`, an Inquiry `Modal` with `InquiryForm`.

#### Example: Opening the Inquiry modal
```tsx
// Inside Home component
const [isModalOpen, setIsModalOpen] = useState(false);
return (
  <>
    <button onClick={() => setIsModalOpen(true)}>Open Inquiry</button>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <InquiryForm onSuccess={() => setIsModalOpen(false)} />
    </Modal>
  </>
);
```
