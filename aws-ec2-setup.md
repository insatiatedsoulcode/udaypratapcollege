# AWS EC2 Setup Guide

## Step 1: Launch EC2 Instance

### Instance Configuration:
- **AMI**: Ubuntu Server 22.04 LTS (Free Tier Eligible)
- **Instance Type**: t2.micro (Free Tier)
- **Storage**: 8 GB gp3 (Free Tier)
- **Security Group**: Create new with these rules:
  - SSH (22) - Your IP
  - HTTP (80) - 0.0.0.0/0
  - HTTPS (443) - 0.0.0.0/0
  - Custom TCP (3000) - 0.0.0.0/0 (for testing)

### Key Pair:
- Create new key pair (.pem file)
- Download and save securely

## Step 2: Connect to Instance
```bash
# Replace with your key file and instance IP
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

## Step 3: Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx (Reverse Proxy)
sudo apt install nginx -y

# Install Git
sudo apt install git -y
```

## Step 4: Setup Application
```bash
# Clone your repository
git clone https://github.com/yourusername/udaypratapcollege.git
cd udaypratapcollege

# Install dependencies
npm install

# Create production environment file
cp env.production.example .env.production
# Edit .env.production with your actual values

# Build the application
npm run build

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'college-website',
    script: 'npm',
    args: 'start',
    cwd: '/home/ubuntu/udaypratapcollege',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 5: Configure Nginx
```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/college-website

# Add this configuration:
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/college-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## Step 6: SSL Certificate (Optional but Recommended)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```
