#!/bin/bash
# EC2 User Data Script - Bootstrap application server
# This script runs when the EC2 instance first boots

set -e

# Variables from Terraform
ENVIRONMENT="${environment}"
S3_BUCKET="${s3_bucket}"
DB_HOST="${db_host}"
DB_NAME="${db_name}"
DB_USER="${db_user}"
DB_PASS="${db_pass}"
GITHUB_REPO="${github_repo}"
GITHUB_BRANCH="${github_branch}"

# Update system
apt-get update -y
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Git, AWS CLI
apt-get install -y git awscli

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 (Process Manager)
npm install -g pm2

# Create app directory
mkdir -p /home/ubuntu/app
cd /home/ubuntu/app

# Clone repository
git clone ${GITHUB_REPO} .
git checkout ${GITHUB_BRANCH}

# Setup environment variables
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/${DB_NAME}
S3_BUCKET=${S3_BUCKET}
EOF

# Install dependencies
npm install

# Build application
npm run build

# Start application with PM2
pm2 start npm --name "college-website" -- start
pm2 save
pm2 startup

# Install and configure CloudWatch Agent
wget https://s3.amazonaws.com/amazon-cloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
dpkg -i amazon-cloudwatch-agent.deb

# Create CloudWatch config
cat > /opt/aws/amazon-cloudwatch-agent/etc/config.json << 'CW_EOF'
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/home/ubuntu/.pm2/logs/*.log",
            "log_group_name": "/aws/ec2/{{environment}}-udaypratapcollege",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
CW_EOF

# Start CloudWatch Agent
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json -s

echo "✅ Server setup complete!"

