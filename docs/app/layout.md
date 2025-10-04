## RootLayout (app/layout.tsx)

Provides global UI shell and metadata.

### Exports
- `metadata: Metadata` — site-wide metadata (title, description, Open Graph, icons)
- `default function RootLayout({ children })` — wraps pages with TopBar, Header, Breadcrumbs, PageTransition, and Footer

### Example
```tsx
// app/layout.tsx
export const metadata = { /* ... */ };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="antialiased flex flex-col min-h-full">
        {/* shared UI */}
        {children}
      </body>
    </html>
  );
}
```
