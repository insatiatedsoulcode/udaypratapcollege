import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

// Database file path
const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'college.db');

// Ensure data directory exists
if (!existsSync(DB_DIR)) {
  mkdirSync(DB_DIR, { recursive: true });
}

// Create database connection
export const db = new Database(DB_PATH);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize tables
export const initDatabase = () => {
  try {
    // Enquiries table
    db.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending'
      )
    `);

    // Applications table
    db.exec(`
      CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        program TEXT NOT NULL,
        qualification TEXT NOT NULL,
        address TEXT,
        dob TEXT,
        gender TEXT,
        father_name TEXT,
        mother_name TEXT,
        guardian_phone TEXT,
        submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'pending'
      )
    `);

    // Users table for admin authentication
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        email TEXT UNIQUE,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )
    `);

    // Visitor count table
    db.exec(`
      CREATE TABLE IF NOT EXISTS visitor_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE UNIQUE NOT NULL,
        count INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert default admin user if not exists
    const adminExists = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?').get('admin');
    
    if (adminExists.count === 0) {
      // Default password: admin123 (hashed)
      const bcrypt = require('bcrypt');
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      
      db.prepare(`
        INSERT INTO users (username, password_hash, email, role)
        VALUES (?, ?, ?, ?)
      `).run('admin', hashedPassword, 'admin@college.com', 'admin');
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

// Helper functions
export const getEnquiries = () => {
  return db.prepare('SELECT * FROM enquiries ORDER BY submitted_at DESC').all();
};

export const addEnquiry = (enquiry: any) => {
  return db.prepare(`
    INSERT INTO enquiries (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `).run(enquiry.name, enquiry.email, enquiry.subject, enquiry.message);
};

export const getApplications = () => {
  return db.prepare('SELECT * FROM applications ORDER BY submitted_at DESC').all();
};

export const addApplication = (application: any) => {
  return db.prepare(`
    INSERT INTO applications (name, email, phone, program, qualification, address, dob, gender, father_name, mother_name, guardian_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    application.name, application.email, application.phone, application.program,
    application.qualification, application.address, application.dob, application.gender,
    application.father_name, application.mother_name, application.guardian_phone
  );
};

export const getVisitorCount = () => {
  const today = new Date().toISOString().split('T')[0];
  const result = db.prepare('SELECT SUM(count) as total FROM visitor_stats').get();
  return result.total || 0;
};

export const incrementVisitorCount = () => {
  const today = new Date().toISOString().split('T')[0];
  
  try {
    db.prepare('INSERT INTO visitor_stats (date, count) VALUES (?, 1)').run(today);
  } catch (error) {
    // If date already exists, increment count
    db.prepare('UPDATE visitor_stats SET count = count + 1 WHERE date = ?').run(today);
  }
  
  return getVisitorCount();
};

export const authenticateUser = (username: string, password: string) => {
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (!user) return null;
  
  const bcrypt = require('bcrypt');
  if (bcrypt.compareSync(password, user.password_hash)) {
    // Update last login
    db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
    return user;
  }
  
  return null;
};

// Initialize database on import
initDatabase();
