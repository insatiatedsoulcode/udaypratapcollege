#!/bin/bash
# EC2 Deployment Script
# This script helps you deploy Uday Pratap College to AWS EC2

echo "🚀 Uday Pratap College - EC2 Deployment Script"
echo "==============================================="

# Check if EC2 IP is provided
if [ -z "$1" ]; then
    echo "❌ Error: EC2 IP address required"
    echo "Usage: ./deploy-to-ec2.sh <EC2_IP> [KEY_FILE]"
    echo "Example: ./deploy-to-ec2.sh 54.123.45.67 ~/aws-key.pem"
    exit 1
fi

EC2_IP=$1
KEY_FILE=${2:-"~/.ssh/aws-key.pem"}

echo ""
echo "📋 Configuration:"
echo "  EC2 IP: $EC2_IP"
echo "  Key File: $KEY_FILE"
echo ""

read -p "Continue with deployment? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "📤 Step 1: Pushing code to GitHub..."
git push origin master

echo ""
echo "🔗 Step 2: Connecting to EC2 instance..."
echo "Running setup commands on EC2..."

ssh -i "$KEY_FILE" ubuntu@$EC2_IP << 'ENDSSH'
    echo "🛠️  Setting up environment..."
    
    # Update system
    sudo apt update -y
    
    # Install Docker if not installed
    if ! command -v docker &> /dev/null; then
        echo "📦 Installing Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker ubuntu
    fi
    
    # Install Docker Compose if not installed
    if ! command -v docker-compose &> /dev/null; then
        echo "📦 Installing Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
    
    # Clone or update repository
    if [ -d "/home/ubuntu/udaypratapcollege" ]; then
        echo "📂 Updating repository..."
        cd /home/ubuntu/udaypratapcollege
        git fetch origin
        git reset --hard origin/master
    else
        echo "📂 Cloning repository..."
        cd /home/ubuntu
        git clone https://github.com/insatiatedsoulcode/udaypratapcollege.git
        cd udaypratapcollege
    fi
    
    # Create required directories
    echo "📁 Creating directories..."
    mkdir -p data-com public/uploads-com logs-com ssl-com
    
    # Setup environment if not exists
    if [ ! -f ".env.production" ]; then
        echo "⚙️  Creating environment file..."
        cp env.production.template .env.production
        echo ""
        echo "⚠️  IMPORTANT: Edit .env.production with your actual values!"
        echo "Run: nano .env.production"
    fi
    
    # Build Docker image
    echo "🔨 Building Docker image..."
    docker build -f Dockerfile.simple -t udaypratapcollege:latest .
    
    # Update docker-compose to use local image (temporary)
    sed -i 's|ghcr.io/insatiatedsoulcode/udaypratapcollege:com-latest|udaypratapcollege:latest|g' docker-compose.yml
    
    # Stop existing containers
    echo "🛑 Stopping existing containers..."
    docker-compose down 2>/dev/null || true
    
    # Start containers
    echo "🚀 Starting containers..."
    docker-compose up -d
    
    # Wait for containers to start
    echo "⏳ Waiting for containers to start..."
    sleep 15
    
    # Check status
    echo ""
    echo "📊 Container Status:"
    docker-compose ps
    
    echo ""
    echo "✅ Deployment complete!"
    echo "🌐 Application should be available at: http://$EC2_IP"
ENDSSH

echo ""
echo "✅ Deployment script completed!"
echo "🌐 Your application should be live at: http://$EC2_IP"
echo ""
echo "Next steps:"
echo "1. Check logs: ssh -i $KEY_FILE ubuntu@$EC2_IP 'cd udaypratapcollege && docker-compose logs -f'"
echo "2. Setup domain: Configure Route 53 A record to point to $EC2_IP"
echo "3. Setup SSL: Follow DEPLOYMENT_GUIDE_EC2.md for SSL certificate setup"
