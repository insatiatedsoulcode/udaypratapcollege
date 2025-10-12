# AWS RDS Setup Guide

## Step 1: Create RDS Instance

### Database Configuration:
- **Engine**: PostgreSQL 15.x (or MySQL 8.0)
- **Instance Class**: db.t3.micro (Free Tier)
- **Storage**: 20 GB gp2 (Free Tier)
- **Database Name**: college_db
- **Master Username**: admin
- **Master Password**: [Generate secure password]

### Security Group:
- Create new security group
- Add rule: PostgreSQL (5432) - EC2 Security Group

## Step 2: Update Database Configuration

### Create database migration script:
```bash
# Install PostgreSQL client
npm install pg

# Create migration script
cat > lib/migrate-to-postgres.js << EOF
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create tables
const createTables = async () => {
  await pool.query(\`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending'
    )
  \`);

  await pool.query(\`
    CREATE TABLE IF NOT EXISTS applications (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      program VARCHAR(100) NOT NULL,
      qualification TEXT NOT NULL,
      address TEXT,
      dob DATE,
      gender VARCHAR(20),
      father_name VARCHAR(255),
      mother_name VARCHAR(255),
      guardian_phone VARCHAR(20),
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending'
    )
  \`);

  await pool.query(\`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  await pool.query(\`
    CREATE TABLE IF NOT EXISTS visitor_stats (
      id SERIAL PRIMARY KEY,
      date DATE UNIQUE NOT NULL,
      count INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  \`);
};

createTables().then(() => {
  console.log('✅ Database tables created successfully');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error creating tables:', err);
  process.exit(1);
});
EOF
```

## Step 3: Environment Variables
Add to your .env.production:
```
DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
DB_PORT=5432
DB_NAME=college_db
DB_USER=admin
DB_PASSWORD=your-secure-password
```
