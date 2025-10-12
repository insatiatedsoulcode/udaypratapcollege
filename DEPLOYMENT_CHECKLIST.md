# 🚀 AWS Deployment Checklist

## Pre-Deployment ✅

### Code Preparation
- [ ] All code committed to Git repository
- [ ] Environment variables configured
- [ ] Production build tested locally
- [ ] Email SMTP credentials configured
- [ ] JWT secret key set
- [ ] Database backup created (if migrating)

### AWS Account Setup
- [ ] AWS Account created
- [ ] IAM user with appropriate permissions
- [ ] Domain name registered (optional)
- [ ] SSL certificate plan (Let's Encrypt recommended)

## Deployment Options

### Option 1: EC2 (Recommended) ✅
- [ ] EC2 instance launched (Ubuntu 22.04)
- [ ] Security groups configured
- [ ] Key pair downloaded
- [ ] Node.js 18.x installed
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Application deployed
- [ ] PM2 process started
- [ ] Nginx configured
- [ ] SSL certificate installed

### Option 2: Amplify (Easiest) ✅
- [ ] Repository connected to Amplify
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Custom domain configured (optional)

### Option 3: ECS + Docker (Advanced) ✅
- [ ] Dockerfile created
- [ ] ECS cluster created
- [ ] Task definition configured
- [ ] Service created
- [ ] Load balancer configured

## Post-Deployment Testing ✅

### Application Testing
- [ ] Homepage loads correctly
- [ ] Contact form submits successfully
- [ ] Application form submits successfully
- [ ] Admin panel accessible
- [ ] Admin login works
- [ ] Email notifications sent
- [ ] Database operations working
- [ ] File uploads working (if applicable)

### Performance Testing
- [ ] Page load times acceptable
- [ ] Mobile responsiveness verified
- [ ] SSL certificate working
- [ ] HTTPS redirect configured

### Monitoring Setup
- [ ] PM2 monitoring configured
- [ ] Nginx logs accessible
- [ ] Database backup automated
- [ ] Error tracking setup (optional)

## Security Checklist ✅

### Server Security
- [ ] Firewall configured
- [ ] SSH key authentication only
- [ ] Regular security updates scheduled
- [ ] Strong passwords for all services
- [ ] Database access restricted

### Application Security
- [ ] Environment variables secured
- [ ] JWT secrets strong and unique
- [ ] HTTPS enforced
- [ ] Input validation implemented
- [ ] SQL injection protection

## Backup & Recovery ✅

### Data Backup
- [ ] Database backup automated
- [ ] Application files backed up
- [ ] Environment configuration backed up
- [ ] Backup retention policy set

### Recovery Plan
- [ ] Recovery procedures documented
- [ ] Backup restoration tested
- [ ] Disaster recovery plan ready

## Maintenance ✅

### Regular Tasks
- [ ] Security updates scheduled
- [ ] Database backup verified
- [ ] Log rotation configured
- [ ] Performance monitoring setup
- [ ] SSL certificate auto-renewal

### Monitoring
- [ ] Uptime monitoring configured
- [ ] Error alerting setup
- [ ] Performance metrics tracked
- [ ] Resource usage monitored

## Cost Optimization ✅

### Free Tier Usage
- [ ] EC2 t2.micro utilized
- [ ] RDS db.t3.micro utilized
- [ ] EBS storage optimized
- [ ] Data transfer monitored

### Production Scaling
- [ ] Auto-scaling groups configured
- [ ] Load balancer health checks
- [ ] Database read replicas (if needed)
- [ ] CDN setup (if needed)

## Documentation ✅

### Technical Documentation
- [ ] Deployment guide updated
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Database schema documented

### User Documentation
- [ ] Admin panel user guide
- [ ] Form submission process documented
- [ ] Troubleshooting guide created

---

## 🎯 Quick Start Commands

### For EC2 Deployment:
```bash
# 1. Connect to server
ssh -i "your-key.pem" ubuntu@your-ec2-ip

# 2. Install dependencies
sudo apt update && sudo apt install -y nodejs npm nginx git

# 3. Deploy application
git clone https://github.com/yourusername/udaypratapcollege.git
cd udaypratapcollege
npm install
npm run build

# 4. Start application
sudo npm install -g pm2
pm2 start npm --name "college-website" -- start
pm2 save
pm2 startup

# 5. Configure Nginx (see nginx config above)
# 6. Setup SSL (optional)
sudo certbot --nginx -d your-domain.com
```

### For Amplify Deployment:
1. Go to AWS Amplify Console
2. Connect your GitHub repository
3. Configure build settings
4. Add environment variables
5. Deploy!

---

## 🆘 Troubleshooting

### Common Issues:
1. **Build fails**: Check Node.js version (18.x required)
2. **Database errors**: Verify SQLite file permissions
3. **Email not sending**: Check SMTP credentials
4. **Admin login fails**: Verify JWT secret
5. **SSL issues**: Check domain DNS settings

### Support Resources:
- AWS Documentation
- Next.js Deployment Guide
- PM2 Documentation
- Nginx Configuration Guide
