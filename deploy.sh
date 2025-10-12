#!/bin/bash

# AWS Deployment Script for Uday Pratap College Website
echo "🚀 Starting AWS Deployment..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Create deployment package
echo "📁 Creating deployment package..."
tar -czf college-website.tar.gz \
    .next \
    public \
    lib \
    data \
    package.json \
    package-lock.json \
    next.config.ts \
    .env.production

echo "✅ Deployment package created: college-website.tar.gz"
echo ""
echo "📋 Next steps:"
echo "1. Upload college-website.tar.gz to your AWS EC2 instance"
echo "2. Extract the package"
echo "3. Run: npm install --production"
echo "4. Start the application: npm start"
