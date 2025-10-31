# 🚀 EC2 Deployment Guide - Uday Pratap College

## ✅ Pre-Deployment Status

- ✅ Code committed to Git
- ✅ Build tested locally (successful)
- ⏳ Docker image needs to be built and pushed
- ⏳ EC2 instance needs to be configured

---

## 📋 Deployment Options

### **Option 1: Direct Docker Build on EC2 (Recommended)**

यह सबसे simple और reliable तरीका है।

#### **Step 1: EC2 Instance पर Connect करें**

```bash
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

#### **Step 2: EC2 पर Environment Setup करें**

```bash
# System update
sudo apt update && sudo apt upgrade -y

# Docker install करें
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Docker Compose install करें
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Git install करें
sudo apt install -y git curl

# Logout और फिर से login करें (Docker group के लिए)
exit
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

#### **Step 3: Project Clone करें**

```bash
cd /home/ubuntu
git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
cd udaypratapcollege
```

#### **Step 4: Environment Variables Setup करें**

```bash
# Template से copy करें
cp env.production.template .env.production

# Edit करें
nano .env.production

# निम्नलिखित values fill करें:
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# ADMIN_EMAIL=admin@udaypratapcollege.com
# JWT_SECRET=$(openssl rand -base64 32)

# Save करें: Ctrl+O, Enter, Ctrl+X
```

#### **Step 5: Docker Image Build करें**

```bash
# Build करें
docker build -f Dockerfile.simple -t udaypratapcollege:latest .

# Check करें
docker images | grep udaypratapcollege
```

#### **Step 6: Required Directories Create करें**

```bash
mkdir -p data-com public/uploads-com logs-com ssl-com
```

#### **Step 7: Docker Compose से Deploy करें**

```bash
# Docker Compose start करें
docker-compose up -d

# Status check करें
docker-compose ps

# Logs देखें
docker-compose logs -f
```

#### **Step 8: Deployment Verify करें**

```bash
# Health check
curl http://localhost:3000/api/health

# Container status
docker-compose ps

# Nginx logs
docker-compose logs nginx-com
```

---

### **Option 2: GitHub Container Registry से Deploy**

अगर आप Docker image को GitHub Container Registry में push करना चाहते हैं।

#### **Step 1: Image Build करें (Local Machine या CI/CD)**

```bash
docker build -f Dockerfile.simple -t udaypratapcollege:latest .
```

#### **Step 2: GHCR में Tag करें**

```bash
docker tag udaypratapcollege:latest ghcr.io/insatiatedsoulcode/udaypratapcollege:com-latest
```

#### **Step 3: GitHub में Login करें**

```bash
# GitHub Personal Access Token चाहिए (Fine-grained या Classic)
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

#### **Step 4: Image Push करें**

```bash
docker push ghcr.io/insatiatedsoulcode/udaypratapcollege:com-latest
```

#### **Step 5: EC2 पर Pull करें**

```bash
# EC2 पर connect करें
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

# GHCR से image pull करें
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
docker pull ghcr.io/insatiatedsoulcode/udaypratapcollege:com-latest

# Deploy करें
cd /home/ubuntu/udaypratapcollege
docker-compose up -d
```

---

## 🔒 SSL Certificate Setup

### **Let's Encrypt Certbot Install करें**

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### **SSL Certificate Generate करें**

```bash
# Standalone mode में certificate लें
sudo certbot certonly --standalone -d udaypratapcollege.com -d www.udaypratapcollege.com

# Email provide करें
# Terms accept करें
```

### **Certificates Copy करें**

```bash
# Docker container के लिए certificates copy करें
sudo cp /etc/letsencrypt/live/udaypratapcollege.com/fullchain.pem ssl-com/cert.pem
sudo cp /etc/letsencrypt/live/udaypratapcollege.com/privkey.pem ssl-com/key.pem

# Permissions fix करें
sudo chmod 644 ssl-com/cert.pem
sudo chmod 600 ssl-com/key.pem
sudo chown ubuntu:ubuntu ssl-com/*
```

### **Container Restart करें**

```bash
docker-compose restart nginx-com
```

### **Auto-Renewal Setup**

```bash
# Cron job add करें
echo "0 12 * * * sudo certbot renew --quiet && sudo cp /etc/letsencrypt/live/udaypratapcollege.com/fullchain.pem /home/ubuntu/udaypratapcollege/ssl-com/cert.pem && sudo cp /etc/letsencrypt/live/udaypratapcollege.com/privkey.pem /home/ubuntu/udaypratapcollege/ssl-com/key.pem && cd /home/ubuntu/udaypratapcollege && docker-compose restart nginx-com" | crontab -
```

---

## 🌐 Domain Configuration

### **Route 53 Setup (AWS में)**

1. AWS Console में जाएं → Route 53
2. Hosted Zone create करें या existing use करें
3. A Record add करें:
   - **Name**: udaypratapcollege.com
   - **Type**: A
   - **Value**: Your EC2 Public IP
   - **TTL**: 300

4. www के लिए CNAME Record:
   - **Name**: www.udaypratapcollege.com
   - **Type**: CNAME
   - **Value**: udaypratapcollege.com
   - **TTL**: 300

---

## 📊 Monitoring & Maintenance

### **Health Check Script**

```bash
cat > /home/ubuntu/health-check.sh << 'EOF'
#!/bin/bash
STATUS=$(curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/api/health)
if [ $STATUS -ne 200 ]; then
    echo "Health check failed with status: $STATUS"
    docker-compose restart
    # Add notification logic here
fi
EOF

chmod +x /home/ubuntu/health-check.sh

# Add to cron (every 5 minutes)
echo "*/5 * * * * /home/ubuntu/health-check.sh >> /var/log/health-check.log 2>&1" | crontab -
```

### **Backup Script**

```bash
cat > /home/ubuntu/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cd /home/ubuntu/udaypratapcollege

# Database backup
docker exec udaypratapcollege-com-app sqlite3 /app/data/college-com.db ".backup /app/data/backup_${DATE}.db"

# Keep only last 7 days
find data-com/ -name "backup_*.db" -mtime +7 -delete

echo "Backup completed: backup_${DATE}.db"
EOF

chmod +x /home/ubuntu/backup.sh

# Daily backup at 2 AM
echo "0 2 * * * /home/ubuntu/backup.sh >> /var/log/backup.log 2>&1" | crontab -
```

---

## 🔍 Troubleshooting

### **Container Logs Check करें**

```bash
# All logs
docker-compose logs

# Specific service
docker-compose logs app-com
docker-compose logs nginx-com

# Follow logs in real-time
docker-compose logs -f
```

### **Container Restart करें**

```bash
# Specific service restart
docker-compose restart app-com

# All services restart
docker-compose restart

# Complete restart with rebuild
docker-compose down
docker-compose up -d --force-recreate
```

### **Database Access**

```bash
# Connect to database
docker exec -it udaypratapcollege-com-app sqlite3 /app/data/college-com.db

# Tables list करें
sqlite> .tables

# Quit करें
sqlite> .quit
```

### **Disk Space Check**

```bash
# Disk usage
df -h

# Docker cleanup
docker system prune -a --volumes
docker image prune -a
```

### **Port Conflicts**

```bash
# Check ports
sudo netstat -tlnp | grep 3000
sudo netstat -tlnp | grep 80
sudo netstat -tlnp | grep 443

# Kill process if needed
sudo kill -9 <PID>
```

---

## 🎯 Success Checklist

- [ ] Application accessible at `http://YOUR-EC2-IP:3000`
- [ ] Health endpoint working: `http://YOUR-EC2-IP/api/health`
- [ ] Nginx routing correctly
- [ ] SSL certificate installed (HTTPS working)
- [ ] Domain pointing to EC2
- [ ] Database initialized and working
- [ ] Admin login functional
- [ ] Backup script configured
- [ ] Health monitoring active
- [ ] Logs accessible

---

## 💰 Estimated Costs

| Resource | Cost (Monthly) |
|----------|---------------|
| EC2 t2.micro (Free Tier) | $0 |
| Route 53 Hosted Zone | $0.50 |
| SSL Certificate (Let's Encrypt) | $0 |
| **Total** | **~$0.50** |

---

## 📞 Support

अगर कोई issue हो तो:
1. Logs check करें: `docker-compose logs -f`
2. Health endpoint verify करें: `curl http://localhost:3000/api/health`
3. Container status check करें: `docker-compose ps`
4. GitHub Issues में report करें

**Happy Deploying! 🚀**

