#!/bin/bash

# Deployment script for Uday Pratap College website
# This script should be run on the EC2 instance

set -e

echo "🚀 Starting deployment process..."

# Configuration
APP_NAME="udaypratapcollege"
APP_DIR="/home/ubuntu/$APP_NAME"
BACKUP_DIR="/home/ubuntu/backups"
DOCKER_IMAGE="ghcr.io/insatiatedsoulcode/udaypratapcollege"
LOG_FILE="/var/log/deployment.log"

# Create log directory if it doesn't exist
sudo mkdir -p /var/log
sudo touch $LOG_FILE
sudo chown ubuntu:ubuntu $LOG_FILE

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to setup environment
setup_environment() {
    log "Setting up environment..."
    
    # Update system packages
    sudo apt-get update -y
    
    # Install required packages
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release \
        git \
        unzip
    
    # Install Docker if not present
    if ! command_exists docker; then
        log "Installing Docker..."
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        sudo apt-get update -y
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io
        sudo usermod -aG docker ubuntu
        sudo systemctl enable docker
        sudo systemctl start docker
    fi
    
    # Install Docker Compose if not present
    if ! command_exists docker-compose; then
        log "Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    # Install Nginx if not present
    if ! command_exists nginx; then
        log "Installing Nginx..."
        sudo apt-get install -y nginx
        sudo systemctl enable nginx
    fi
    
    log "Environment setup completed."
}

# Function to backup current deployment
backup_deployment() {
    log "Creating backup..."
    
    if [ -d "$APP_DIR" ]; then
        BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
        sudo mkdir -p $BACKUP_DIR
        sudo cp -r $APP_DIR $BACKUP_DIR/$BACKUP_NAME
        
        # Keep only last 5 backups
        cd $BACKUP_DIR
        ls -t | tail -n +6 | xargs -r sudo rm -rf
        cd -
        
        log "Backup created: $BACKUP_NAME"
    fi
}

# Function to pull latest code
pull_latest_code() {
    log "Pulling latest code..."
    
    if [ -d "$APP_DIR" ]; then
        cd $APP_DIR
        git fetch origin
        git reset --hard origin/master
        git clean -fd
    else
        log "Cloning repository..."
        git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git $APP_DIR
        cd $APP_DIR
    fi
    
    log "Code updated successfully."
}

# Function to setup environment variables
setup_environment_variables() {
    log "Setting up environment variables..."
    
    if [ ! -f "$APP_DIR/.env.production" ]; then
        log "Creating production environment file..."
        cat > $APP_DIR/.env.production << EOF
# Production Environment Variables
NODE_ENV=production
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@udaypratapcollege.com
JWT_SECRET=$(openssl rand -base64 32)
EOF
        log "Please update the .env.production file with your actual values."
    fi
}

# Function to deploy with Docker
deploy_with_docker() {
    log "Deploying with Docker..."
    
    cd $APP_DIR
    
    # Login to GitHub Container Registry
    echo "$GITHUB_TOKEN" | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin
    
    # Pull latest image
    docker pull $DOCKER_IMAGE:latest
    
    # Stop existing containers
    docker-compose down || true
    
    # Remove old images
    docker image prune -f
    
    # Start new containers
    docker-compose up -d
    
    log "Docker deployment completed."
}

# Function to setup SSL certificates
setup_ssl() {
    log "Setting up SSL certificates..."
    
    # Install Certbot
    sudo apt-get install -y certbot python3-certbot-nginx
    
    # Get SSL certificate
    sudo certbot --nginx -d udaypratapcollege.com -d www.udaypratapcollege.com --non-interactive --agree-tos --email admin@udaypratapcollege.com
    
    # Setup auto-renewal
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
    
    log "SSL setup completed."
}

# Function to setup monitoring
setup_monitoring() {
    log "Setting up monitoring..."
    
    # Create systemd service for the application
    sudo tee /etc/systemd/system/udaypratapcollege.service > /dev/null << EOF
[Unit]
Description=Uday Pratap College Website
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF
    
    # Enable and start the service
    sudo systemctl enable udaypratapcollege.service
    sudo systemctl start udaypratapcollege.service
    
    log "Monitoring setup completed."
}

# Function to verify deployment
verify_deployment() {
    log "Verifying deployment..."
    
    # Wait for containers to start
    sleep 30
    
    # Check if containers are running
    if docker-compose ps | grep -q "Up"; then
        log "✅ Containers are running"
    else
        log "❌ Containers failed to start"
        docker-compose logs
        exit 1
    fi
    
    # Check health endpoint
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        log "✅ Health check passed"
    else
        log "❌ Health check failed"
        exit 1
    fi
    
    # Check Nginx
    if sudo systemctl is-active --quiet nginx; then
        log "✅ Nginx is running"
    else
        log "❌ Nginx is not running"
        sudo systemctl start nginx
    fi
    
    log "✅ Deployment verification completed successfully!"
}

# Function to cleanup
cleanup() {
    log "Cleaning up..."
    
    # Remove unused Docker images
    docker image prune -f
    
    # Clean up old logs
    sudo find /var/log -name "*.log" -type f -mtime +7 -delete
    
    log "Cleanup completed."
}

# Main deployment function
main() {
    log "Starting deployment for $APP_NAME"
    
    setup_environment
    backup_deployment
    pull_latest_code
    setup_environment_variables
    deploy_with_docker
    setup_ssl
    setup_monitoring
    verify_deployment
    cleanup
    
    log "🎉 Deployment completed successfully!"
    log "Website is now live at: https://udaypratapcollege.com"
}

# Run main function
main "$@"
