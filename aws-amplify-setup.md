# AWS Amplify Setup Guide

## Step 1: Prepare Repository
```bash
# Ensure your code is in a Git repository (GitHub/GitLab/Bitbucket)
git add .
git commit -m "Prepare for AWS Amplify deployment"
git push origin main
```

## Step 2: AWS Amplify Console Setup

### 2.1 Access AWS Amplify
1. Go to AWS Console → AWS Amplify
2. Click "New app" → "Host web app"

### 2.2 Connect Repository
1. Choose your Git provider (GitHub/GitLab/Bitbucket)
2. Authorize AWS Amplify
3. Select your repository: `udaypratapcollege`
4. Select branch: `main`

### 2.3 Build Settings
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### 2.4 Environment Variables
Add these in Amplify Console:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-production-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourcollege.com
JWT_SECRET=your-super-secure-jwt-secret
NODE_ENV=production
```

## Step 3: Deploy
1. Review settings
2. Click "Save and deploy"
3. Wait for deployment to complete
4. Access your app via the provided URL

## Step 4: Custom Domain (Optional)
1. Go to "Domain management"
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning
