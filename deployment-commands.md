# Deployment Commands Reference

## Pre-Deployment Checklist

### 1. Build and Test Locally
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test production build locally
npm start

# Verify all features work
curl http://localhost:3000/api/visits
```

### 2. Environment Variables Setup
```bash
# Copy environment template
cp env.production.example .env.production

# Edit with your actual values
nano .env.production
```

### 3. Git Commit
```bash
git add .
git commit -m "Prepare for AWS deployment"
git push origin main
```

## EC2 Deployment Commands

### 1. Connect to EC2
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-ip
```

### 2. Setup Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### 3. Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/udaypratapcollege.git
cd udaypratapcollege

# Install dependencies
npm install

# Setup environment
cp env.production.example .env.production
nano .env.production

# Build application
npm run build

# Start with PM2
pm2 start npm --name "college-website" -- start
pm2 save
pm2 startup
```

### 4. Configure Nginx
```bash
# Create site configuration
sudo nano /etc/nginx/sites-available/college-website

# Enable site
sudo ln -s /etc/nginx/sites-available/college-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Monitoring Commands

### PM2 Management
```bash
# View running processes
pm2 list

# View logs
pm2 logs college-website

# Restart application
pm2 restart college-website

# Monitor resources
pm2 monit
```

### Nginx Management
```bash
# Check status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Reload configuration
sudo nginx -s reload
```

### Database Backup
```bash
# Run backup script
./database-backup.sh

# Manual backup
cp data/college.db backups/college_db_$(date +%Y%m%d_%H%M%S).sqlite
```

## SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Troubleshooting

### Check Application Status
```bash
# PM2 status
pm2 status

# Application logs
pm2 logs college-website --lines 50

# System resources
htop
df -h
free -m
```

### Check Nginx Status
```bash
# Test configuration
sudo nginx -t

# Check if running
sudo systemctl is-active nginx

# View error logs
sudo journalctl -u nginx -f
```

### Database Issues
```bash
# Check database file
ls -la data/
sqlite3 data/college.db ".tables"

# Test database connection
sqlite3 data/college.db "SELECT COUNT(*) FROM enquiries;"
```
