# 🚀 EC2 Deployment Guide - Amazon Linux 2023

## ✅ Your EC2 Instance Details

- **Instance**: ec2-3-108-58-108.ap-south-1.compute.amazonaws.com
- **IP**: 3.108.58.108
- **OS**: Amazon Linux 2023
- **Region**: ap-south-1 (Mumbai)

---

## 📋 Deployment Steps for Amazon Linux 2023

### **Step 1: Connect to EC2**

```bash
ssh -i "your-key.pem" ec2-user@3.108.58.108
```

### **Step 2: Install Required Software**

```bash
# Update system
sudo dnf update -y

# Install Docker
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git and other utilities
sudo dnf install -y git curl unzip

# Logout and re-login for docker group
exit
ssh -i "your-key.pem" ec2-user@3.108.58.108
```

### **Step 3: Clone Repository**

```bash
cd /home/ec2-user
git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
cd udaypratapcollege
```

### **Step 4: Setup Environment Variables**

```bash
# Copy environment template
cp env.production.template .env.production

# Edit environment file
nano .env.production

# Fill in these values:
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# ADMIN_EMAIL=admin@udaypratapcollege.com
# JWT_SECRET=$(openssl rand -base64 32)

# Save: Ctrl+O, Enter, Ctrl+X
```

### **Step 5: Build Docker Image**

```bash
# Build Docker image
docker build -f Dockerfile.simple -t udaypratapcollege:latest .

# Verify image
docker images | grep udaypratapcollege
```

### **Step 6: Create Required Directories**

```bash
mkdir -p data-com public/uploads-com logs-com ssl-com
```

### **Step 7: Update Docker Compose for Local Image**

```bash
# Temporarily modify docker-compose.yml to use local image
sed -i 's|ghcr.io/insatiatedsoulcode/udaypratapcollege:com-latest|udaypratapcollege:latest|g' docker-compose.yml
```

### **Step 8: Configure Nginx for Amazon Linux**

```bash
# Install Nginx for standalone mode (if needed for SSL)
sudo dnf install -y nginx certbot python3-certbot-nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### **Step 9: Deploy with Docker Compose**

```bash
# Start containers
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### **Step 10: Configure Firewall (Security Group)**

Make sure your EC2 Security Group has these inbound rules:

| Type | Protocol | Port | Source |
|------|----------|------|--------|
| SSH | TCP | 22 | Your IP |
| HTTP | TCP | 80 | 0.0.0.0/0 |
| HTTPS | TCP | 443 | 0.0.0.0/0 |
| Custom | TCP | 3000 | 0.0.0.0/0 |

To configure in AWS Console:
```bash
# View current security group
aws ec2 describe-instances --instance-ids i-xxxxxxxxx --query 'Reservations[0].Instances[0].SecurityGroups'

# Or configure via AWS Console → EC2 → Security Groups
```

### **Step 11: Verify Deployment**

```bash
# Health check
curl http://localhost:3000/api/health

# Check from browser
curl http://3.108.58.108:3000

# Container logs
docker-compose logs app-com
```

### **Step 12: Setup SSL Certificate (Optional)**

```bash
# Stop Docker containers temporarily
docker-compose down

# Get SSL certificate
sudo certbot certonly --standalone \
  -d udaypratapcollege.com \
  -d www.udaypratapcollege.com \
  --non-interactive \
  --agree-tos \
  --email admin@udaypratapcollege.com

# Copy certificates
sudo cp /etc/letsencrypt/live/udaypratapcollege.com/fullchain.pem ssl-com/cert.pem
sudo cp /etc/letsencrypt/live/udaypratapcollege.com/privkey.pem ssl-com/key.pem
sudo chmod 644 ssl-com/cert.pem
sudo chmod 600 ssl-com/key.pem
sudo chown ec2-user:ec2-user ssl-com/*

# Restart containers
docker-compose up -d
```

---

## 🔄 Update Deployment

```bash
cd /home/ec2-user/udaypratapcollege

# Pull latest code
git fetch origin
git reset --hard origin/master

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Verify
curl http://localhost:3000/api/health
```

---

## 📊 Useful Commands

### Docker Management

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f              # All services
docker-compose logs app-com         # App only
docker-compose logs nginx-com       # Nginx only

# Restart services
docker-compose restart app-com      # Restart app
docker-compose restart nginx-com    # Restart nginx
docker-compose restart              # Restart all

# Stop/Start
docker-compose stop                 # Stop containers
docker-compose start                # Start containers
docker-compose down                 # Stop and remove
docker-compose up -d                # Start with detached mode
```

### System Monitoring

```bash
# System resources
htop
df -h                               # Disk usage
free -h                             # Memory usage
docker stats                        # Container stats

# Docker cleanup
docker system prune -a --volumes    # Remove unused
docker image prune -a               # Remove unused images
```

### Database Access

```bash
# Connect to database
docker exec -it udaypratapcollege-com-app bash
sqlite3 /app/data/college-com.db

# Query database
sqlite> .tables
sqlite> SELECT * FROM enquiries LIMIT 10;
sqlite> .quit
```

---

## 🔍 Troubleshooting

### Issue: Container not starting

```bash
# Check logs
docker-compose logs app-com

# Check if port is in use
sudo netstat -tlnp | grep 3000

# Restart containers
docker-compose down
docker-compose up -d
```

### Issue: Permission denied

```bash
# Fix file permissions
sudo chown -R ec2-user:ec2-user /home/ec2-user/udaypratapcollege
sudo chmod -R 755 /home/ec2-user/udaypratapcollege
```

### Issue: Out of disk space

```bash
# Check disk usage
df -h

# Clean Docker
docker system prune -a --volumes

# Clean old logs
sudo find /var/log -name "*.log" -mtime +30 -delete
```

### Issue: Can't access from browser

```bash
# Check Security Group settings
# Make sure ports 80, 443, and 3000 are open

# Check firewall (if using)
sudo firewall-cmd --list-all
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload

# Test locally first
curl http://localhost:3000/api/health
curl http://3.108.58.108:3000/api/health
```

---

## 🌐 Domain Setup

### Point Domain to EC2

1. **Go to your Domain Provider** (or Route 53)
2. **Add A Record**:
   - **Name**: @ (or blank for root domain)
   - **Type**: A
   - **Value**: 3.108.58.108
   - **TTL**: 300

3. **Add CNAME for www**:
   - **Name**: www
   - **Type**: CNAME
   - **Value**: udaypratapcollege.com
   - **TTL**: 300

**Wait 15-30 minutes for DNS propagation!**

---

## 📝 Automated Deployment Script

Create a simple script for easier updates:

```bash
cat > /home/ec2-user/deploy.sh << 'EOF'
#!/bin/bash
set -e

cd /home/ec2-user/udaypratapcollege

echo "Updating code..."
git fetch origin
git reset --hard origin/master

echo "Stopping containers..."
docker-compose down

echo "Starting containers..."
docker-compose up -d

echo "Waiting for app to start..."
sleep 15

echo "Checking health..."
curl -f http://localhost:3000/api/health || echo "Health check failed!"

echo "✅ Deployment complete!"
docker-compose ps
EOF

chmod +x /home/ec2-user/deploy.sh
```

Use it with:
```bash
/home/ec2-user/deploy.sh
```

---

## 🔐 Security Best Practices

### 1. Regular Updates

```bash
# Update system packages
sudo dnf update -y

# Update containers
docker-compose pull
docker-compose up -d
```

### 2. Backup Database

```bash
# Create backup script
cat > /home/ec2-user/backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cd /home/ec2-user/udaypratapcollege
docker exec udaypratapcollege-com-app sqlite3 /app/data/college-com.db \
  ".backup /app/data/backup_${DATE}.db"
find data-com/ -name "backup_*.db" -mtime +7 -delete
echo "Backup completed: backup_${DATE}.db"
EOF

chmod +x /home/ec2-user/backup-db.sh

# Add to cron (daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/ec2-user/backup-db.sh >> /var/log/backup.log 2>&1") | crontab -
```

### 3. Monitor Logs

```bash
# Setup log rotation
sudo logrotate -f /etc/logrotate.conf
```

---

## ✅ Success Checklist

- [ ] Docker installed and running
- [ ] Docker Compose installed
- [ ] Application builds successfully
- [ ] Containers running (`docker-compose ps`)
- [ ] Health endpoint working (`curl http://localhost:3000/api/health`)
- [ ] Accessible from browser (`http://3.108.58.108:3000`)
- [ ] Admin login works
- [ ] Domain pointing to EC2 (if configured)
- [ ] SSL certificate installed (if needed)
- [ ] Backups configured
- [ ] Monitoring active

---

## 💰 Cost Optimization

Your current setup (on t2.micro free tier):
- **EC2**: $0 (Free Tier)
- **Data Transfer**: ~$0.09/GB
- **Storage**: Included in instance
- **Total**: **~$0-10/month** depending on traffic

---

## 📞 Support

If you encounter issues:

1. **Check logs**: `docker-compose logs -f`
2. **Check health**: `curl http://localhost:3000/api/health`
3. **Check status**: `docker-compose ps`
4. **Review security groups**: AWS Console
5. **Check domain**: `dig udaypratapcollege.com`

**Happy Deploying! 🚀**

