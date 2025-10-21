# Domain Separation Guide - Uday Pratap College

## 🎯 **Current Configuration**

### **✅ .COM Domain (udaypratapcollege.com)**
- **Purpose**: Main college website
- **Features**: Complete college website with all features
- **Database**: `college-com.db`
- **Port**: 3000
- **Container**: `udaypratapcollege-com-app`

### **🚫 .IN Domain (udaypratapcollege.in)**
- **Purpose**: LMS Portal (separate project)
- **Status**: **REMOVED** from this project
- **Note**: Will be hosted separately as LMS Portal

## 🔧 **Configuration Files**

### **Main Configuration Files:**
- `docker-compose.yml` - Docker configuration for .com domain
- `nginx.conf` - Nginx configuration for .com domain only
- `env.production.template` - Environment template for .com domain

### **Backup Files:**
- `docker-compose.backup.yml` - Original docker-compose file
- `nginx.backup.conf` - Original nginx configuration
- `env.production.backup.template` - Original environment template

## 📋 **Deployment Instructions**

### **For .COM Domain (udaypratapcollege.com):**

1. **Setup Environment:**
```bash
cp env.production.template .env.production
# Edit .env.production with your actual values
```

2. **Deploy Application:**
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

3. **Verify Deployment:**
```bash
curl -f https://udaypratapcollege.com/api/health
```

### **For .IN Domain (udaypratapcollege.in):**
- **Action Required**: Host separate LMS Portal project
- **This project**: Only handles .com domain

## 🗂️ **Directory Structure**

```
udaypratapcollege/
├── data-com/                 # Database for .com domain
├── public/uploads-com/       # Uploads for .com domain
├── logs-com/                 # Logs for .com domain
├── ssl-com/                  # SSL certificates for .com domain
├── docker-compose.yml        # Docker config for .com domain
├── nginx.conf                # Nginx config for .com domain
└── env.production.template   # Environment template for .com domain
```

## 🔒 **Security & Isolation**

### **Complete Separation:**
- ✅ Separate Docker containers
- ✅ Separate databases
- ✅ Separate file uploads
- ✅ Separate logs
- ✅ Separate SSL certificates
- ✅ Separate nginx configurations

### **No Cross-Domain Interference:**
- ✅ Changes to .com domain will NOT affect .in domain
- ✅ Each domain has its own data storage
- ✅ Independent deployment cycles

## 🚀 **Deployment Commands**

### **Quick Deploy (.COM Domain):**
```bash
# Pull latest changes
git pull origin master

# Deploy application
docker-compose down
docker-compose up -d

# Check status
docker-compose ps
curl -f https://udaypratapcollege.com/api/health
```

### **Full Rebuild:**
```bash
# Stop containers
docker-compose down

# Remove old images
docker image prune -f

# Rebuild and start
docker-compose build --no-cache
docker-compose up -d
```

## 📊 **Monitoring**

### **Health Checks:**
```bash
# Application health
curl -f https://udaypratapcollege.com/api/health

# Container status
docker-compose ps

# Application logs
docker-compose logs app-com
```

### **Performance Monitoring:**
```bash
# Response time check
curl -o /dev/null -s -w '%{time_total}' https://udaypratapcollege.com/

# Resource usage
docker stats udaypratapcollege-com-app
```

## 🔄 **CI/CD Pipeline**

### **GitHub Actions:**
- ✅ Builds Docker image for .com domain
- ✅ Deploys to EC2 instance
- ✅ Health checks for udaypratapcollege.com
- ✅ Performance monitoring

### **Automatic Deployment:**
- Push to `master` branch triggers deployment
- Only affects .com domain
- No impact on .in domain (separate project)

## 📝 **Important Notes**

### **✅ What This Project Handles:**
- Uday Pratap College main website (.com domain)
- Student dashboard, faculty portal
- Online admissions, events management
- All college-related features

### **❌ What This Project Does NOT Handle:**
- LMS Portal (.in domain)
- Any .in domain related functionality
- Cross-domain data sharing

### **🔧 Maintenance:**
- Regular updates to .com domain only
- Independent from .in domain LMS Portal
- Separate backup and monitoring strategies

## 🎯 **Next Steps**

1. **Deploy .COM Domain**: Use current configuration
2. **Setup .IN Domain**: Create separate LMS Portal project
3. **Monitor Both**: Independent monitoring for each domain
4. **Maintain Separation**: Ensure no cross-domain dependencies

---

**✅ Domain separation completed successfully!**
**🎯 .COM domain is ready for deployment**
**🚫 .IN domain references removed from project**

