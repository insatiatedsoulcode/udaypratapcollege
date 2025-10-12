# Email Configuration Guide

## Gmail App Password Setup

### Step 1: Enable 2-Factor Authentication
1. Go to Google Account settings
2. Security → 2-Step Verification
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to Google Account → Security
2. App passwords
3. Select app: "Mail"
4. Select device: "Other (Custom name)"
5. Enter: "College Website"
6. Copy the 16-character password

### Step 3: Update Environment Variables
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-character-app-password
ADMIN_EMAIL=admin@yourcollege.com
```

## Alternative Email Providers

### AWS SES (Recommended for Production)
```bash
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASS=your-ses-smtp-password
```

### SendGrid
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your-mailgun-smtp-username
SMTP_PASS=your-mailgun-smtp-password
```
