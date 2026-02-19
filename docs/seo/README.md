### SEO and Metadata

- `app/sitemap.ts`: Returns `MetadataRoute.Sitemap`. Add dynamic routes and correct `baseUrl`.
- `app/robots.ts`: Returns `MetadataRoute.Robots`. Adjust `rules` and `sitemap` URL.
- `app/layout.tsx`: Sets global `metadata` including Open Graph and icons.

#### Example: Adding a dynamic route to sitemap
```ts
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.udaypratapcollege.com';
  const dynamic = [{ url: `${baseUrl}/academics/programs/bca` }];
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    ...dynamic,
  ];
}
```
