# 🔧 Troubleshooting Guide - EC2 Deployment

## ❓ Why can't I see UI in EC2 Console?

**EC2 Console = SSH Terminal (text only!)**  
**Browser = Your Website UI**

You **CANNOT** see the website UI in SSH terminal. You **MUST** open it in a browser!

---

## ✅ Correct Way to Access Your Website

### **From Your Computer:**

```bash
# Open browser and go to:
http://3.108.58.108:3000

# OR via Nginx (port 80):
http://3.108.58.108
```

### **From EC2 Terminal (for testing only):**

```bash
# This shows TEXT output only!
curl http://localhost:3000

# This checks if app is working
curl http://localhost:3000/api/health
```

---

## 🔍 Diagnostic Steps

### **Step 1: Check if Containers are Running**

On EC2:
```bash
docker-compose ps
```

**Expected Output:**
```
NAME                           COMMAND             SERVICE    STATUS
udaypratapcollege-com-app      "node server.js"    app-com    Up
udaypratapcollege-com-nginx    "/docker-entrypoint.sh" nginx-com Up
```

**If Down or Exited:**
```bash
docker-compose logs app-com
docker-compose restart app-com
```

---

### **Step 2: Check Application Logs**

On EC2:
```bash
# View all logs
docker-compose logs app-com

# Follow logs in real-time
docker-compose logs -f app-com

# Last 100 lines
docker-compose logs --tail=100 app-com
```

**Common Issues:**
- Database initialization failed
- Port already in use
- Missing environment variables

---

### **Step 3: Test Health Endpoint**

On EC2:
```bash
curl http://localhost:3000/api/health
```

**Expected Output:**
```json
{"status":"healthy","timestamp":"2025-10-31T..."}
```

**If Error:**
```bash
# Check if port is in use
sudo netstat -tlnp | grep 3000

# Check container logs
docker-compose logs app-com

# Restart container
docker-compose restart app-com
```

---

### **Step 4: Check Security Group**

**In AWS Console:**
1. Go to **EC2** → **Instances**
2. Click your instance
3. Open **Security** tab
4. Click Security Group

**Required Inbound Rules:**

| Type | Protocol | Port | Source | Description |
|------|----------|------|--------|-------------|
| SSH | TCP | 22 | Your IP | SSH access |
| HTTP | TCP | 80 | 0.0.0.0/0 | Web access |
| HTTPS | TCP | 443 | 0.0.0.0/0 | HTTPS access |
| Custom | TCP | 3000 | 0.0.0.0/0 | Direct app access |

**If missing:**
1. Click **Edit inbound rules**
2. Click **Add rule**
3. Fill the details
4. Click **Save rules**

---

### **Step 5: Test from Your Computer**

On your local machine:
```bash
# Test direct access
curl http://3.108.58.108:3000

# Test health endpoint
curl http://3.108.58.108:3000/api/health

# Test via Nginx
curl http://3.108.58.108
```

**If Connection Refused:**
- Security Group not configured
- Port not open
- Firewall blocking

**If Timeout:**
- Container not running
- Port conflict
- Wrong IP address

---

## 🚨 Common Issues & Solutions

### **Issue 1: "Container keeps restarting"**

```bash
# View logs
docker-compose logs app-com

# Common causes:
# - Database not accessible
# - Missing environment variables
# - Port conflict

# Fix:
docker-compose down
docker-compose up -d
```

### **Issue 2: "Cannot connect to database"**

```bash
# Check database file
docker exec -it udaypratapcollege-com-app ls -la /app/data/

# Reinitialize database
docker exec -it udaypratapcollege-com-app sqlite3 /app/data/college-com.db ".tables"

# Fix permissions
docker-compose down
sudo chown -R ec2-user:ec2-user data-com/
docker-compose up -d
```

### **Issue 3: "Port 3000 already in use"**

```bash
# Find what's using port 3000
sudo netstat -tlnp | grep 3000

# Kill the process
sudo kill -9 <PID>

# Or restart containers
docker-compose down
docker-compose up -d
```

### **Issue 4: "Environment variables missing"**

```bash
# Check .env.production file
cat .env.production

# Must have:
# SMTP_USER=...
# SMTP_PASS=...
# JWT_SECRET=...
# ADMIN_EMAIL=...

# If missing, create it
cp env.production.template .env.production
nano .env.production
```

### **Issue 5: "Out of disk space"**

```bash
# Check disk usage
df -h

# Clean Docker
docker system prune -a --volumes
docker image prune -a

# Clean old logs
find . -name "*.log" -mtime +7 -delete
```

### **Issue 6: "Can't pull Docker image"**

If using GitHub Container Registry:
```bash
# Login to GHCR
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Pull image
docker pull ghcr.io/insatiatedsoulcode/udaypratapcollege:com-latest
```

**Better: Build locally**
```bash
# Build on EC2
docker build -f Dockerfile.simple -t udaypratapcollege:latest .
```

---

## 🔄 Quick Fix Commands

### **Complete Reset**

```bash
cd /home/ec2-user/udaypratapcollege

# Stop everything
docker-compose down
docker system prune -a

# Rebuild
docker build -f Dockerfile.simple -t udaypratapcollege:latest .

# Restart
docker-compose up -d

# Check
docker-compose ps
curl http://localhost:3000/api/health
```

### **Reinstall Dependencies**

```bash
# If build fails
sudo dnf clean all
sudo dnf update -y
sudo dnf install -y docker git curl unzip
sudo systemctl restart docker
```

### **Fix Permissions**

```bash
cd /home/ec2-user/udaypratapcollege

# Fix ownership
sudo chown -R ec2-user:ec2-user .

# Fix Docker permissions
sudo usermod -aG docker ec2-user
newgrp docker

# Verify
docker ps
```

---

## 🧪 Step-by-Step Diagnostic

Run these commands **in order** on your EC2:

```bash
# 1. Check Docker is running
sudo systemctl status docker

# 2. Check you're in docker group
groups

# 3. Navigate to project
cd /home/ec2-user/udaypratapcollege

# 4. Check if files exist
ls -la
cat docker-compose.yml

# 5. Check containers
docker-compose ps

# 6. If not running, start them
docker-compose up -d

# 7. Wait 30 seconds
sleep 30

# 8. Check again
docker-compose ps

# 9. Check health
curl http://localhost:3000/api/health

# 10. Check logs
docker-compose logs --tail=50 app-com

# 11. Test from inside container
docker exec udaypratapcollege-com-app curl http://localhost:3000/api/health
```

---

## ✅ Success Indicators

You know everything is working when:

1. ✅ `docker-compose ps` shows both containers **Up**
2. ✅ `curl http://localhost:3000/api/health` returns JSON
3. ✅ Browser `http://3.108.58.108:3000` shows your website
4. ✅ No errors in `docker-compose logs`
5. ✅ Admin login works: `http://3.108.58.108/admin`

---

## 📞 Still Not Working?

### **Get Detailed Error Information:**

```bash
# Full diagnostic
docker-compose logs app-com nginx-com
docker-compose ps -a
docker images
docker network ls
docker volume ls

# System info
df -h
free -h
docker stats
```

### **Start Fresh:**

```bash
# Complete rebuild
docker-compose down -v
docker rmi udaypratapcollege:latest
docker build -f Dockerfile.simple -t udaypratapcollege:latest .
docker-compose up -d
```

---

## 🎯 Quick Reference

| Problem | Solution |
|---------|----------|
| Can't see UI | Open browser, not SSH |
| Container not starting | Check logs, restart |
| Port in use | Kill process, restart |
| No database | Fix permissions |
| Can't access from browser | Check Security Group |
| Out of space | Clean Docker |
| Wrong IP | Use Public IP |

---

**Remember: SSH terminal shows TEXT, browser shows UI!** 🖥️🌐

