# CI/CD Deployment Guide - Uday Pratap College

## 🚀 Overview
This guide provides comprehensive instructions for setting up and managing CI/CD pipeline for the Uday Pratap College website deployed on AWS EC2.

## 📋 Prerequisites

### AWS EC2 Setup
- Ubuntu 20.04+ EC2 instance
- Security groups configured for HTTP (80), HTTPS (443), and SSH (22)
- Domain name pointing to EC2 instance
- GitHub repository with admin access

### Required Tools on EC2
- Docker & Docker Compose
- Git
- Nginx
- Certbot (for SSL)
- curl, bc, mailutils

## 🔧 GitHub Secrets Configuration

Add these secrets to your GitHub repository settings:

### Required Secrets
```
EC2_HOST=your-ec2-public-ip-or-domain
EC2_USER=ubuntu
EC2_SSH_KEY=your-private-ssh-key-content
GITHUB_TOKEN=your-github-personal-access-token
GITHUB_USERNAME=your-github-username
DOMAIN_NAME=udaypratapcollege.com
```

### Optional Secrets
```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@udaypratapcollege.com
JWT_SECRET=your-super-secret-jwt-key
```

## 🏗️ CI/CD Pipeline Architecture

### 1. **Build & Test Stage**
```yaml
- Code checkout
- Node.js setup
- Dependencies installation
- Linting & type checking
- Build process
- Docker image creation
- Push to GitHub Container Registry
```

### 2. **Deploy Stage**
```yaml
- SSH connection to EC2
- Code pull from repository
- Docker image pull
- Container restart
- Health check verification
```

### 3. **Monitoring Stage**
```yaml
- Application health check
- Performance monitoring
- SSL certificate verification
- Alert notifications
```

## 📁 File Structure

```
udaypratapcollege/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── scripts/
│   ├── deploy.sh               # Deployment script
│   └── monitor.sh              # Monitoring script
├── docker-compose.yml          # Production Docker setup
├── Dockerfile                  # Optimized Docker image
├── nginx.conf                  # Nginx configuration
├── env.production.template     # Environment variables template
└── CI_CD_DEPLOYMENT_GUIDE.md  # This guide
```

## 🔄 Deployment Process

### Automatic Deployment (Recommended)
1. **Push to master branch**
2. **GitHub Actions triggers**
3. **Build & test process**
4. **Deploy to EC2**
5. **Health check verification**

### Manual Deployment
```bash
# On EC2 instance
cd /home/ubuntu/udaypratapcollege
./scripts/deploy.sh
```

## 🐳 Docker Configuration

### Production Dockerfile Features
- Multi-stage build for optimization
- Security hardening (non-root user)
- Health checks
- Proper file permissions
- Volume mounts for data persistence

### Docker Compose Services
- **app**: Next.js application
- **nginx**: Reverse proxy with SSL termination
- **networks**: Isolated network for services

## 🌐 Nginx Configuration

### Features
- SSL/TLS termination
- Security headers
- Rate limiting
- Static file caching
- Gzip compression
- Health check routing

### SSL Setup
- Automatic Let's Encrypt certificates
- Auto-renewal with cron
- HTTP to HTTPS redirect

## 📊 Monitoring & Logging

### Health Checks
- Application health endpoint: `/api/health`
- Container health checks
- SSL certificate monitoring
- Disk space monitoring
- Memory usage tracking

### Logging
- Application logs: `/app/logs/`
- Nginx logs: `/var/log/nginx/`
- System logs: `/var/log/`
- Deployment logs: `/var/log/deployment.log`

### Alerts
- Email notifications for critical issues
- Container restart alerts
- High resource usage alerts
- SSL certificate expiry warnings

## 🔒 Security Features

### Application Security
- JWT authentication
- Password hashing with bcrypt
- Input validation
- SQL injection prevention
- XSS protection

### Infrastructure Security
- Non-root Docker containers
- Security headers
- Rate limiting
- SSL/TLS encryption
- Firewall configuration

### Data Protection
- Database backups
- Encrypted data transmission
- Secure file uploads
- Environment variable protection

## 📈 Performance Optimization

### Frontend
- Next.js optimization
- Image optimization
- Code splitting
- Static generation
- CDN ready

### Backend
- Database indexing
- Connection pooling
- Caching strategies
- API optimization
- Resource monitoring

## 🔧 Environment Configuration

### Production Environment Variables
```bash
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@udaypratapcollege.com
JWT_SECRET=your-super-secret-jwt-key
```

### Database Configuration
- SQLite for simplicity
- Automatic backups
- Data persistence with Docker volumes

## 🚨 Troubleshooting

### Common Issues

#### 1. **Deployment Fails**
```bash
# Check logs
docker-compose logs -f

# Restart services
docker-compose down && docker-compose up -d
```

#### 2. **Health Check Fails**
```bash
# Check application logs
docker logs udaypratapcollege-app

# Verify database connection
curl http://localhost:3000/api/health
```

#### 3. **SSL Certificate Issues**
```bash
# Renew certificate
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

#### 4. **High Resource Usage**
```bash
# Check system resources
htop
df -h
free -h

# Restart containers
docker-compose restart
```

### Monitoring Commands
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f app

# Monitor resources
./scripts/monitor.sh

# Check health
curl -f http://localhost:3000/api/health
```

## 📝 Maintenance Tasks

### Daily
- Monitor application health
- Check error logs
- Verify backups

### Weekly
- Update dependencies
- Review security logs
- Performance analysis

### Monthly
- SSL certificate renewal check
- Database optimization
- Security updates

## 🔄 Backup & Recovery

### Automated Backups
- Database backups every 6 hours
- Keep last 7 backups
- Automatic cleanup

### Manual Backup
```bash
# Create database backup
cp ./data/college.db ./backups/backup_$(date +%Y%m%d_%H%M%S).db

# Create full backup
tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz .
```

### Recovery Process
```bash
# Restore database
cp ./backups/latest_backup.db ./data/college.db

# Restart application
docker-compose restart
```

## 📞 Support & Maintenance

### Monitoring Dashboard
- Health status: `https://udaypratapcollege.com/api/health`
- Application metrics
- System resource usage

### Alert Contacts
- Email: admin@udaypratapcollege.com
- GitHub Issues: Repository issues
- Documentation: This guide

### Update Process
1. Test changes locally
2. Create pull request
3. Review and merge
4. Automatic deployment
5. Monitor deployment

## 🎯 Best Practices

### Development
- Use feature branches
- Write meaningful commit messages
- Test before deployment
- Document changes

### Deployment
- Monitor deployment process
- Verify health checks
- Check logs after deployment
- Test critical functionality

### Security
- Keep dependencies updated
- Use strong passwords
- Monitor access logs
- Regular security audits

---

## 🚀 Quick Start Commands

### Initial Setup
```bash
# Clone repository
git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
cd udaypratapcollege

# Run deployment script
./scripts/deploy.sh
```

### Daily Operations
```bash
# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Monitor health
./scripts/monitor.sh
```

### Emergency Procedures
```bash
# Restart everything
docker-compose down && docker-compose up -d

# Check system health
curl -f http://localhost:3000/api/health

# View recent logs
docker-compose logs --tail=100
```

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Status**: Production Ready ✅
