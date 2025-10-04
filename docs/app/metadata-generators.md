## Metadata Generators

### app/sitemap.ts
Generates a static sitemap.

- Export: `default function sitemap(): MetadataRoute.Sitemap`
- Customize: add dynamic URLs by fetching slugs and mapping to `url` objects.

### app/robots.ts
Generates robots.txt.

- Export: `default function robots(): MetadataRoute.Robots`
- Customize: adjust `allow`/`disallow` rules and `sitemap` URL.
