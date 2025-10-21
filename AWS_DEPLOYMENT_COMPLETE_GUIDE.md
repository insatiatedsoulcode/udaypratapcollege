# AWS Deployment Complete Guide - Uday Pratap College

## 🚀 AWS में Deployment के लिए Steps

### 1. AWS Account Setup
```bash
# AWS CLI install करें
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# AWS configure करें
aws configure
# Access Key ID: YOUR_ACCESS_KEY
# Secret Access Key: YOUR_SECRET_KEY
# Default region: us-east-1
# Default output format: json
```

### 2. EC2 Instance Setup

#### Step 1: EC2 Instance Create करें
```bash
# Ubuntu 22.04 LTS instance launch करें
# Instance Type: t2.micro (Free tier)
# Storage: 8GB gp3
# Security Group: HTTP(80), HTTPS(443), SSH(22)
```

#### Step 2: EC2 Instance Connect करें
```bash
# SSH से connect करें
ssh -i your-key.pem ubuntu@your-ec2-ip

# या EC2 Instance Connect use करें
```

#### Step 3: Server Setup करें
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu

# Install Git
sudo apt install -y git

# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 3. Application Deployment

#### Step 1: Code Clone करें
```bash
# GitHub से code clone करें
git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
cd udaypratapcollege
```

#### Step 2: Environment Variables Setup करें
```bash
# Production environment file create करें
cp env.production.template .env.production

# Edit करें
nano .env.production
```

#### Step 3: Docker Compose Deploy करें
```bash
# Docker Compose start करें
docker-compose up -d

# Check status
docker-compose ps
docker-compose logs -f
```

### 4. Domain & SSL Setup

#### Step 1: Domain Purchase करें
```bash
# Route 53 में domain register करें
# Example: udaypratapcollege.com
```

#### Step 2: SSL Certificate Setup करें
```bash
# Let's Encrypt install करें
sudo apt install -y certbot python3-certbot-nginx

# SSL certificate generate करें
sudo certbot --nginx -d udaypratapcollege.com -d www.udaypratapcollege.com
```

### 5. Database Setup (Optional)

#### Option A: SQLite (Default)
```bash
# Already configured in Docker
# Data persists in volume
```

#### Option B: AWS RDS PostgreSQL
```bash
# RDS instance create करें
aws rds create-db-instance \
    --db-instance-identifier udaypratapcollege-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username admin \
    --master-user-password your-password \
    --allocated-storage 20
```

### 6. Monitoring & Backup

#### Step 1: CloudWatch Setup करें
```bash
# CloudWatch agent install करें
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i amazon-cloudwatch-agent.deb
```

#### Step 2: Backup Setup करें
```bash
# Daily backup script create करें
cat > /home/ubuntu/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
docker exec udaypratapcollege_app_1 sqlite3 /app/data/college.db ".backup /app/data/backup_$DATE.db"
aws s3 cp /app/data/backup_$DATE.db s3://your-backup-bucket/
EOF

chmod +x /home/ubuntu/backup.sh

# Cron job add करें
echo "0 2 * * * /home/ubuntu/backup.sh" | crontab -
```

### 7. Cost Optimization

#### Free Tier Resources:
- **EC2**: t2.micro (750 hours/month)
- **RDS**: db.t2.micro (750 hours/month)
- **S3**: 5GB storage
- **Route 53**: Hosted zone

#### Estimated Monthly Cost (150 daily hits):
```
EC2 t2.micro: $0 (Free tier)
RDS db.t2.micro: $0 (Free tier)
S3 Storage: $0.23
Route 53: $0.50
Total: ~$0.73/month
```

### 8. Security Best Practices

#### Step 1: Security Groups Configure करें
```bash
# Only necessary ports open करें
# HTTP: 80 (Public)
# HTTPS: 443 (Public)
# SSH: 22 (Your IP only)
```

#### Step 2: Firewall Setup करें
```bash
# UFW enable करें
sudo ufw enable
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
```

### 9. Performance Optimization

#### Step 1: Nginx Configuration
```bash
# Nginx config optimize करें
# Gzip compression enable करें
# Static files cache करें
```

#### Step 2: CDN Setup (Optional)
```bash
# CloudFront distribution create करें
# Static assets के लिए CDN use करें
```

### 10. Deployment Commands

#### Quick Deploy Script:
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin master

# Build and deploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Health check
sleep 30
curl -f http://localhost/api/health || exit 1

echo "✅ Deployment successful!"
```

### 11. Troubleshooting

#### Common Issues:
```bash
# Container logs check करें
docker-compose logs -f

# Container status check करें
docker-compose ps

# Database connection check करें
docker exec -it udaypratapcollege_app_1 sqlite3 /app/data/college.db ".tables"

# Disk space check करें
df -h

# Memory usage check करें
free -h
```

### 12. Monitoring Dashboard

#### Health Check Endpoints:
- `http://your-domain.com/api/health` - Application health
- `http://your-domain.com/api/visits` - Visitor statistics
- `http://your-domain.com/admin` - Admin dashboard

### 13. Scaling (Future)

#### Auto Scaling Group Setup:
```bash
# Launch template create करें
# Auto Scaling Group configure करें
# Load balancer setup करें
```

## 🎯 Next Steps

1. **AWS Account Setup** करें
2. **EC2 Instance Launch** करें
3. **Domain Purchase** करें
4. **SSL Certificate** setup करें
5. **Deploy Application** करें
6. **Monitor & Backup** setup करें

## 💰 Cost Breakdown

| Service | Free Tier | Paid (150 hits/day) |
|---------|-----------|---------------------|
| EC2 | $0 | $0 |
| RDS | $0 | $0 |
| S3 | $0 | $0.23 |
| Route 53 | $0 | $0.50 |
| **Total** | **$0** | **$0.73** |

## 🏆 Success Metrics

- ✅ Application deployed successfully
- ✅ SSL certificate active
- ✅ Database connected
- ✅ Health checks passing
- ✅ Backup system working
- ✅ Monitoring active

**Ready for production! 🚀**

