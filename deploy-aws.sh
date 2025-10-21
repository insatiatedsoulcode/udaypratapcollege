#!/bin/bash

# AWS Deployment Script for Uday Pratap College
# Usage: ./deploy-aws.sh

set -e

echo "🚀 Starting AWS Deployment for Uday Pratap College..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running on EC2
check_ec2() {
    if [ ! -f /sys/hypervisor/uuid ] || [ `head -c 3 /sys/hypervisor/uuid` != ec2 ]; then
        print_warning "This script is designed for EC2 instances"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Update system
update_system() {
    print_status "Updating system packages..."
    sudo apt update && sudo apt upgrade -y
    print_success "System updated successfully"
}

# Install Docker
install_docker() {
    print_status "Installing Docker..."
    
    if command -v docker &> /dev/null; then
        print_warning "Docker is already installed"
        return
    fi
    
    sudo apt install -y docker.io docker-compose
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    
    print_success "Docker installed successfully"
}

# Install Git
install_git() {
    print_status "Installing Git..."
    
    if command -v git &> /dev/null; then
        print_warning "Git is already installed"
        return
    fi
    
    sudo apt install -y git
    print_success "Git installed successfully"
}

# Clone repository
clone_repo() {
    print_status "Cloning repository..."
    
    if [ -d "udaypratapcollege" ]; then
        print_warning "Repository already exists, pulling latest changes..."
        cd udaypratapcollege
        git pull origin master
        cd ..
    else
        git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
    fi
    
    print_success "Repository cloned/updated successfully"
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    cd udaypratapcollege
    
    if [ ! -f ".env.production" ]; then
        if [ -f "env.production.template" ]; then
            cp env.production.template .env.production
            print_warning "Please edit .env.production with your actual values"
            print_warning "Required variables: SMTP_HOST, SMTP_USER, SMTP_PASS, ADMIN_EMAIL, JWT_SECRET"
        else
            print_error "Environment template not found"
            exit 1
        fi
    fi
    
    print_success "Environment setup completed"
}

# Deploy application
deploy_app() {
    print_status "Deploying application..."
    
    # Stop existing containers
    docker-compose down 2>/dev/null || true
    
    # Build and start containers
    docker-compose build --no-cache
    docker-compose up -d
    
    print_success "Application deployed successfully"
}

# Health check
health_check() {
    print_status "Performing health check..."
    
    # Wait for application to start
    sleep 30
    
    # Check if container is running
    if ! docker-compose ps | grep -q "Up"; then
        print_error "Application failed to start"
        docker-compose logs
        exit 1
    fi
    
    # Check health endpoint
    if curl -f http://localhost/api/health > /dev/null 2>&1; then
        print_success "Health check passed"
    else
        print_warning "Health check failed, but container is running"
    fi
}

# Setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring..."
    
    # Create monitoring script
    cat > /home/$USER/monitor.sh << 'EOF'
#!/bin/bash
# Monitor script for Uday Pratap College

echo "=== System Status ==="
echo "Date: $(date)"
echo "Uptime: $(uptime)"
echo "Disk Usage: $(df -h / | tail -1 | awk '{print $5}')"
echo "Memory Usage: $(free -h | grep Mem | awk '{print $3"/"$2}')"

echo -e "\n=== Docker Status ==="
docker-compose ps

echo -e "\n=== Application Health ==="
curl -s http://localhost/api/health | jq . 2>/dev/null || echo "Health check failed"

echo -e "\n=== Recent Logs ==="
docker-compose logs --tail=10
EOF
    
    chmod +x /home/$USER/monitor.sh
    
    print_success "Monitoring setup completed"
}

# Setup backup
setup_backup() {
    print_status "Setting up backup..."
    
    # Create backup script
    cat > /home/$USER/backup.sh << 'EOF'
#!/bin/bash
# Backup script for Uday Pratap College

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/$USER/backups"
mkdir -p $BACKUP_DIR

# Backup database
docker exec udaypratapcollege_app_1 sqlite3 /app/data/college.db ".backup /app/data/backup_$DATE.db" 2>/dev/null || true

# Copy backup to local directory
docker cp udaypratapcollege_app_1:/app/data/backup_$DATE.db $BACKUP_DIR/ 2>/dev/null || true

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.db" -mtime +7 -delete 2>/dev/null || true

echo "Backup completed: backup_$DATE.db"
EOF
    
    chmod +x /home/$USER/backup.sh
    
    # Add to crontab
    (crontab -l 2>/dev/null; echo "0 2 * * * /home/$USER/backup.sh") | crontab -
    
    print_success "Backup setup completed"
}

# Setup SSL (if domain provided)
setup_ssl() {
    if [ -n "$DOMAIN" ]; then
        print_status "Setting up SSL for domain: $DOMAIN"
        
        # Install certbot
        sudo apt install -y certbot python3-certbot-nginx
        
        # Generate SSL certificate
        sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
        
        print_success "SSL certificate generated"
    else
        print_warning "No domain provided, skipping SSL setup"
        print_warning "To setup SSL later, run: sudo certbot --nginx -d yourdomain.com"
    fi
}

# Main deployment function
main() {
    print_status "Starting deployment process..."
    
    # Check if running as root
    if [ "$EUID" -eq 0 ]; then
        print_error "Please don't run this script as root"
        exit 1
    fi
    
    # Check EC2
    check_ec2
    
    # Update system
    update_system
    
    # Install dependencies
    install_docker
    install_git
    
    # Clone repository
    clone_repo
    
    # Setup environment
    setup_environment
    
    # Deploy application
    deploy_app
    
    # Health check
    health_check
    
    # Setup monitoring and backup
    setup_monitoring
    setup_backup
    
    # Setup SSL if domain provided
    if [ -n "$DOMAIN" ]; then
        setup_ssl
    fi
    
    print_success "🎉 Deployment completed successfully!"
    print_status "Application is running at: http://$(curl -s ifconfig.me)"
    print_status "Domain: https://udaypratapcollege.com"
    print_status "Admin panel: https://udaypratapcollege.com/admin"
    print_status "Health check: https://udaypratapcollege.com/api/health"
    
    echo -e "\n${GREEN}Next steps:${NC}"
    echo "1. Configure your domain DNS to point to this server"
    echo "2. Edit .env.production with your actual values"
    echo "3. Setup SSL certificate: sudo certbot --nginx -d yourdomain.com"
    echo "4. Monitor logs: docker-compose logs -f"
    echo "5. Check status: ./monitor.sh"
}

# Handle command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --domain)
            DOMAIN="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [--domain yourdomain.com]"
            echo "  --domain    Setup SSL for the specified domain"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Run main function
main

