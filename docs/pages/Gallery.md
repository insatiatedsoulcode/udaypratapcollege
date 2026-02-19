### Gallery (`app/gallery/page.tsx`)

- Uses `yet-another-react-lightbox` with Thumbnails, Zoom, and Video plugins.
- Organize images/videos in `galleryCategories` and it flattens to `slides`.

#### Example: Adding a new category
```ts
{
  title: "Laboratories",
  items: [
    { type: 'image', src: '/images/gallery/lab-1.jpg', alt: 'Chemistry lab' },
  ]
}
```
