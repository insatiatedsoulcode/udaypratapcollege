# AWS Quick Setup Commands

## 🚀 One-Click AWS Deployment

### Step 1: EC2 Instance Launch करें
```bash
# AWS Console में जाकर:
# 1. EC2 Dashboard → Launch Instance
# 2. Ubuntu 22.04 LTS select करें
# 3. t2.micro (Free tier) select करें
# 4. Security Group में add करें:
#    - HTTP (80) from anywhere
#    - HTTPS (443) from anywhere  
#    - SSH (22) from your IP
# 5. Launch करें और key pair download करें
```

### Step 2: EC2 Instance Connect करें
```bash
# EC2 Instance Connect use करें (Browser में)
# या SSH से connect करें:
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### Step 3: Deployment Script Run करें
```bash
# Script download करें
wget https://raw.githubusercontent.com/insatiatedsoulcode/udaypratapcollege/master/deploy-aws.sh

# Execute permissions दें
chmod +x deploy-aws.sh

# Run करें (Domain के साथ)
./deploy-aws.sh --domain udaypratapcollege.com

# या Domain के बिना
./deploy-aws.sh
```

## 🎯 Manual Setup (Step by Step)

### 1. System Update
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Docker Install
```bash
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

### 3. Git Install
```bash
sudo apt install -y git
```

### 4. Code Clone
```bash
git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
cd udaypratapcollege
```

### 5. Environment Setup
```bash
cp env.production.template .env.production
nano .env.production
```

### 6. Deploy
```bash
docker-compose up -d
```

### 7. Health Check
```bash
curl http://localhost/api/health
```

## 🌐 Domain Setup

### 1. Domain Purchase
```bash
# Route 53 में domain register करें
# Example: udaypratapcollege.com
```

### 2. DNS Configuration
```bash
# A record add करें:
# Name: @
# Type: A
# Value: your-ec2-ip

# CNAME record add करें:
# Name: www
# Type: CNAME
# Value: udaypratapcollege.com
```

### 3. SSL Certificate
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d udaypratapcollege.com -d www.udaypratapcollege.com
```

## 📊 Monitoring Commands

### Check Status
```bash
# Container status
docker-compose ps

# Application logs
docker-compose logs -f

# System resources
htop
df -h
free -h
```

### Health Check
```bash
# Application health
curl http://localhost/api/health

# Database status
docker exec udaypratapcollege_app_1 sqlite3 /app/data/college.db ".tables"
```

## 💰 Cost Optimization

### Free Tier Resources
```bash
# EC2: t2.micro (750 hours/month) - FREE
# RDS: db.t2.micro (750 hours/month) - FREE  
# S3: 5GB storage - FREE
# Route 53: Hosted zone - $0.50/month
```

### Estimated Monthly Cost (150 hits/day)
```
EC2 t2.micro: $0 (Free tier)
S3 Storage: $0.23
Route 53: $0.50
Total: $0.73/month
```

## 🔧 Troubleshooting

### Common Issues
```bash
# Container not starting
docker-compose logs

# Port already in use
sudo netstat -tlnp | grep :80
sudo fuser -k 80/tcp

# Permission issues
sudo chown -R ubuntu:ubuntu /home/ubuntu/udaypratapcollege

# Database issues
docker exec -it udaypratapcollege_app_1 bash
sqlite3 /app/data/college.db
```

### Reset Everything
```bash
# Stop and remove containers
docker-compose down -v

# Remove images
docker rmi $(docker images -q)

# Clean system
docker system prune -a

# Start fresh
docker-compose up -d --build
```

## 🚀 Production Checklist

- [ ] EC2 instance running
- [ ] Docker containers healthy
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Database connected
- [ ] Health checks passing
- [ ] Monitoring active
- [ ] Backup configured
- [ ] Security groups configured

## 📱 Quick Access URLs

```
Homepage: http://your-ec2-ip
Admin: http://your-ec2-ip/admin
Health: http://your-ec2-ip/api/health
Apply: http://your-ec2-ip/apply
Contact: http://your-ec2-ip/contact-us
```

## 🎉 Success!

आपका Uday Pratap College website अब AWS पर live है!

**Next Steps:**
1. Domain DNS configure करें
2. SSL certificate setup करें
3. Email configuration complete करें
4. Monitor logs और performance
5. Regular backups check करें

**Ready for production! 🚀**

