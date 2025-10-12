# 🚀 Vercel Deployment Guide (FREE Option)

## Why Vercel for Your College Website?

### ✅ Perfect for Your Traffic Level:
- **150 daily hits** = Very low traffic
- **4,500 monthly hits** = Well within free limits
- **Next.js optimized** = Built for Next.js apps
- **Zero configuration** = Deploy in minutes

### ✅ Free Tier Includes:
- 100GB bandwidth/month (you'll use ~2GB)
- 100 builds/month (you'll use ~10)
- Unlimited static hosting
- Custom domain support
- SSL certificates
- Global CDN
- Serverless functions

## Step 1: Prepare for Vercel

### 1.1 Update package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 1.2 Create vercel.json (Optional)
```json
{
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  },
  "env": {
    "SMTP_HOST": "@smtp_host",
    "SMTP_PORT": "@smtp_port",
    "SMTP_USER": "@smtp_user",
    "SMTP_PASS": "@smtp_pass",
    "ADMIN_EMAIL": "@admin_email",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

## Step 2: Deploy to Vercel

### 2.1 Sign up at Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub/GitLab/Bitbucket
3. Import your repository

### 2.2 Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourcollege.com
JWT_SECRET=your-secure-secret
NODE_ENV=production
```

### 2.3 Deploy
1. Connect repository
2. Vercel auto-detects Next.js
3. Click "Deploy"
4. Wait 2-3 minutes
5. Get live URL: `https://your-app.vercel.app`

## Step 3: Custom Domain (Optional)

### 3.1 Add Domain
1. Go to Project → Settings → Domains
2. Add your domain: `yourcollege.com`
3. Update DNS records as shown

### 3.2 DNS Configuration
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

## Step 4: Database Considerations

### Option A: Keep SQLite (Simplest)
- ✅ Works on Vercel
- ✅ No additional cost
- ⚠️ Data resets on deployments
- ✅ Perfect for testing

### Option B: External Database (Recommended)
- **PlanetScale** (MySQL): FREE tier
- **Supabase** (PostgreSQL): FREE tier  
- **MongoDB Atlas**: FREE tier

## Step 5: Email Configuration

### Gmail App Password Setup:
1. Enable 2FA on Gmail
2. Generate App Password
3. Use in environment variables

### Alternative: Resend (Better for Production)
```
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=your-resend-api-key
```

## Cost Summary

### Vercel Free Tier:
- **Hosting**: $0/month
- **Bandwidth**: $0/month (100GB included)
- **Builds**: $0/month (100 builds included)
- **Custom Domain**: $0/month
- **SSL**: $0/month

### Additional Costs (Optional):
- **Domain Name**: $10-15/year
- **External Database**: $0/month (free tiers)
- **Email Service**: $0-5/month

### **TOTAL: $0-2/month** 🎉

## Advantages for Your Use Case:

1. **Zero Setup**: Just connect GitHub and deploy
2. **Automatic Deployments**: Push to GitHub = auto deploy
3. **Global CDN**: Fast loading worldwide
4. **SSL Included**: HTTPS by default
5. **Analytics**: Built-in traffic insights
6. **Scalable**: Can handle traffic growth
7. **Backup**: Automatic deployments = automatic backups

## Migration Steps:

1. **Push code to GitHub**
2. **Connect to Vercel**
3. **Add environment variables**
4. **Deploy**
5. **Test all functionality**
6. **Add custom domain (optional)**

Your college website will be live in under 10 minutes! 🚀
