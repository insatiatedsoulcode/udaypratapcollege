### Pages (App Router)

This app uses Next.js App Router under the `app/` directory. Each `page.tsx` exports a default React component.

- `app/layout.tsx`: Root layout. Applies global fonts and wraps pages with `TopBar`, `Header`, `Breadcrumbs`, `PageTransition`, and `Footer`.
- `app/error.tsx`: Client error boundary UI. Props: `{ error: Error & { digest?: string }, reset: () => void }`.
- `app/loading.tsx`: Global route loading fallback with full-screen spinner.
- `app/not-found.tsx`: 404 page.
- `app/robots.ts`: Exports `MetadataRoute.Robots` object. Controls crawl rules and `sitemap` location.
- `app/sitemap.ts`: Exports `MetadataRoute.Sitemap` array. Update to include dynamic routes.
- `app/page.tsx`: Home page. Uses `Modal`, `InquiryForm`, `NotificationTicker`, `FeaturedEventsCarousel`.

Section pages:
- `app/about/*`: About overview and mission/vision.
- `app/academics/*`: Academics overview, programs, faculty.
- `app/admissions/*`: Admissions overview, how-to-apply, fee-structure.
- `app/contact-us/page.tsx`: Contact page with departments, FAQ, and map.
- `app/gallery/page.tsx`: Image/video gallery using Yet Another React Lightbox.
