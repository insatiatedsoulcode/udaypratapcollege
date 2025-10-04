## App Router Overview

This project uses the Next.js App Router under the `app/` directory.

- **`app/layout.tsx`**: Root layout applied to all routes. Provides shared UI (TopBar, Header, Breadcrumbs, Footer) and wraps pages in `PageTransition`.
- **`app/page.tsx`**: Home page. Demonstrates usage of `Modal`, `InquiryForm`, `NotificationTicker`, and `FeaturedEventsCarousel`.
- **`app/loading.tsx`**: Route-level loading UI shown while pages load. Returns a fullscreen spinner overlay.
- **`app/not-found.tsx`**: Custom 404 page with a link back to home.
- **`app/error.tsx`**: Client error boundary for route segments. Shows a friendly error with "Try Again" and a Home link.
- **`app/sitemap.ts`**: Static sitemap generator using `MetadataRoute.Sitemap`.
- **`app/robots.ts`**: Robots.txt generator using `MetadataRoute.Robots`.

### Conventions
- Client components use `'use client'` and can use state/effects.
- Shared navigation and layout live in `app/layout.tsx`.
- Static assets are in `public/` and referenced via absolute paths like `/images/...`.
