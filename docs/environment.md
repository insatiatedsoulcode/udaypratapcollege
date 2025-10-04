# Environment and Backend API

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:3001`)

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Expected Backend Endpoints

These endpoints are consumed by UI components/pages in this app.

### 1) Visitor tracking
- `GET /` — increments and returns total visits
- `GET /api/visits` — returns total visits

Example response:
```json
{ "visits": 1234 }
```

Used by: `src/components/VisitorCounter.tsx`

### 2) Enquiry submission
- `POST /api/send-enquiry`

Request body:
```json
{ "name": "Jane Doe", "email": "jane@example.com", "subject": "Admissions", "message": "I have a question." }
```

Success response:
```json
{ "success": true, "message": "Inquiry submitted successfully!" }
```

Error response (example):
```json
{ "success": false, "message": "Validation failed.", "errors": { "email": "Invalid email" } }
```

Used by: `src/components/InquiryForm.tsx`

### 3) Application submission
- `POST /api/applications`

Request body (subset shown; see `ApplicationData` in `app/apply/page.tsx`):
```json
{
  "fullName": "Jane Applicant",
  "dob": "2006-03-15",
  "gender": "Female",
  "parentName": "John Applicant",
  "email": "jane@example.com",
  "phone": "+91 90000 00000",
  "fullAddress": "123 Street, City",
  "tenthBoard": "CBSE",
  "tenthPercentage": "92",
  "twelfthBoard": "CBSE",
  "twelfthPercentage": "90",
  "programApplyingFor": "BCA"
}
```

Success response:
```json
{ "success": true, "message": "Application submitted successfully!" }
```

Used by: `app/apply/page.tsx`
