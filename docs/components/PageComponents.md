### Other Components

- `src/components/VisitorCounter.tsx`: Client component that fetches and displays total visits; uses `sessionStorage` to avoid double counting. Endpoints: `/` (track) and `/api/visits` (read). Controlled via `NEXT_PUBLIC_API_BASE_URL`.
- `src/components/ConvocationBanner.tsx`: Static banner content for Convocation; use on landing pages.
- `src/components/SummerSchoolBanner.tsx`: Static banner with left image and right CTA; replace placeholder assets.
