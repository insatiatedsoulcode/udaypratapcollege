# ⚡ Quick Deployment Reference

## 🚀 One-Command Deployment

```bash
./deploy-to-ec2.sh <EC2_IP> <KEY_FILE>
```

---

## 📝 Step-by-Step Manual Deployment

### 1️⃣ **EC2 Instance Setup** (First Time Only)

```bash
# Connect to EC2
ssh -i "key.pem" ubuntu@EC2_IP

# Install Docker & Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

sudo apt install -y git curl
exit

# Re-login
ssh -i "key.pem" ubuntu@EC2_IP
```

### 2️⃣ **Deploy Application**

```bash
# Clone & Setup
cd /home/ubuntu
git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
cd udaypratapcollege

# Environment
cp env.production.template .env.production
nano .env.production  # Fill SMTP_USER, SMTP_PASS, JWT_SECRET

# Build & Deploy
docker build -f Dockerfile.simple -t udaypratapcollege:latest .
mkdir -p data-com public/uploads-com logs-com ssl-com
docker-compose up -d

# Verify
curl http://localhost:3000/api/health
docker-compose ps
```

### 3️⃣ **SSL Certificate** (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get Certificate (Port 80 & 443 should be free)
sudo certbot certonly --standalone -d udaypratapcollege.com -d www.udaypratapcollege.com

# Copy certificates
sudo cp /etc/letsencrypt/live/udaypratapcollege.com/fullchain.pem ssl-com/cert.pem
sudo cp /etc/letsencrypt/live/udaypratapcollege.com/privkey.pem ssl-com/key.pem
sudo chmod 644 ssl-com/cert.pem
sudo chmod 600 ssl-com/key.pem

# Restart
docker-compose restart nginx-com
```

---

## 🔄 Update Existing Deployment

```bash
cd /home/ubuntu/udaypratapcollege
git pull origin master
docker-compose down
docker-compose up -d --build
```

---

## 📊 Quick Commands

| Task | Command |
|------|---------|
| Check logs | `docker-compose logs -f` |
| Restart app | `docker-compose restart app-com` |
| Health check | `curl http://localhost:3000/api/health` |
| Container status | `docker-compose ps` |
| Database access | `docker exec -it udaypratapcollege-com-app sqlite3 /app/data/college-com.db` |
| View logs (specific) | `docker-compose logs app-com` |
| Stop all | `docker-compose down` |
| Clean Docker | `docker system prune -a` |

---

## 🔍 Troubleshooting

### Container not starting?
```bash
docker-compose logs app-com
docker-compose down && docker-compose up -d
```

### Port already in use?
```bash
sudo netstat -tlnp | grep 3000
sudo kill -9 <PID>
docker-compose restart
```

### Database issues?
```bash
docker exec -it udaypratapcollege-com-app bash
sqlite3 /app/data/college-com.db ".tables"
```

### Out of disk space?
```bash
df -h
docker system prune -a --volumes
```

---

## ✅ Success Indicators

- ✅ `curl http://localhost:3000/api/health` returns `200 OK`
- ✅ `docker-compose ps` shows both containers `Up`
- ✅ Can access `http://EC2_IP` in browser
- ✅ Admin login works at `http://EC2_IP/admin`
- ✅ Contact form submits successfully

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Docker orchestration |
| `Dockerfile.simple` | Docker image build |
| `.env.production` | Environment variables |
| `nginx.conf` | Nginx reverse proxy config |
| `deploy-to-ec2.sh` | Automated deployment script |

---

## 🌐 Domain Setup

### Route 53 Configuration:
1. **A Record**: `udaypratapcollege.com` → `EC2_IP`
2. **CNAME**: `www.udaypratapcollege.com` → `udaypratapcollege.com`

**Wait 15-30 minutes for DNS propagation!**

---

## 💰 Cost Breakdown

- EC2 t2.micro: **$0** (Free Tier)
- Route 53: **$0.50/month**
- SSL (Let's Encrypt): **$0**
- **Total: ~$0.50/month**

---

## 📞 Need Help?

1. Check logs: `docker-compose logs -f`
2. View health: `curl http://localhost:3000/api/health`
3. Read full guide: `DEPLOYMENT_GUIDE_EC2.md`
4. Report issues: GitHub Issues

**Happy Deploying! 🚀**
