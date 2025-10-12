// scripts/generate-og-image.js
const fs = require('fs');
const path = require('path');

// Simple OG Image Generator using Canvas (if available) or create HTML template
const generateOGImage = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Uday Pratap College - OG Image</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
        }
        
        .og-container {
            width: 1200px;
            height: 630px;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .content {
            text-align: center;
            color: white;
            z-index: 2;
            padding: 40px;
        }
        
        .logo {
            width: 120px;
            height: 120px;
            background: white;
            border-radius: 20px;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            font-weight: bold;
            color: #2563eb;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        
        .title {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            line-height: 1.2;
        }
        
        .subtitle {
            font-size: 28px;
            margin-bottom: 30px;
            opacity: 0.9;
            font-weight: 300;
        }
        
        .programs {
            font-size: 24px;
            background: rgba(255,255,255,0.2);
            padding: 15px 30px;
            border-radius: 50px;
            display: inline-block;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255,255,255,0.3);
        }
        
        .decoration {
            position: absolute;
            top: -50px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            z-index: 1;
        }
        
        .decoration2 {
            position: absolute;
            bottom: -100px;
            left: -100px;
            width: 300px;
            height: 300px;
            background: rgba(255,255,255,0.05);
            border-radius: 50%;
            z-index: 1;
        }
        
        .decoration3 {
            position: absolute;
            top: 50%;
            left: 10%;
            width: 100px;
            height: 100px;
            background: rgba(255,255,255,0.08);
            border-radius: 50%;
            z-index: 1;
        }
    </style>
</head>
<body>
    <div class="og-container">
        <div class="decoration"></div>
        <div class="decoration2"></div>
        <div class="decoration3"></div>
        
        <div class="content">
            <div class="logo">UPC</div>
            <h1 class="title">Uday Pratap College</h1>
            <p class="subtitle">Premier Educational Institution</p>
            <div class="programs">BA • BBA • BCA Programs</div>
        </div>
    </div>
</body>
</html>`;

  // Save HTML template
  const htmlPath = path.join(__dirname, 'generate-og-image.html');
  fs.writeFileSync(htmlPath, htmlContent);
  
  console.log('✅ OG Image HTML template generated successfully!');
  console.log('📁 File saved at:', htmlPath);
  console.log('🌐 Open this file in browser and take a screenshot (1200x630) to create the OG image');
  console.log('📸 Or use online tools like:');
  console.log('   - https://htmlcsstoimage.com/');
  console.log('   - https://www.screenshotapi.net/');
  console.log('   - https://html-to-image.com/');
};

// Run the generator
generateOGImage();
