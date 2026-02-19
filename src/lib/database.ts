import { Pool } from 'pg';
import bcrypt from 'bcrypt';

// Type definitions
interface EnquiryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApplicationData {
  name: string;
  email: string;
  phone: string;
  program: string;
  qualification: string;
  address?: string;
  dob?: string;
  gender?: string;
  father_name?: string;
  mother_name?: string;
  guardian_phone?: string;
}

// Database configuration
// Prioritize DATABASE_URL (for Render), fall back to local Docker defaults
const connectionString = process.env.DATABASE_URL || 'postgresql://admin:password123@localhost:5432/college';

export const db = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

// Initialize tables
export const initDatabase = async () => {
  try {
    const client = await db.connect();
    try {
      // Enquiries table
      await client.query(`
        CREATE TABLE IF NOT EXISTS enquiries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'pending'
        )
      `);

      // Applications table
      await client.query(`
        CREATE TABLE IF NOT EXISTS applications (
          id SERIAL PRIMARY KEY,
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
          submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'pending'
        )
      `);

      // Users table for admin authentication
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          email TEXT UNIQUE,
          role TEXT DEFAULT 'admin',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP
        )
      `);

      // Visitor count table
      await client.query(`
        CREATE TABLE IF NOT EXISTS visitor_stats (
          id SERIAL PRIMARY KEY,
          date DATE UNIQUE NOT NULL,
          count INTEGER DEFAULT 1,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Insert default admin user if not exists
      const adminCheck = await client.query('SELECT COUNT(*) as count FROM users WHERE username = $1', ['admin']);
      const adminExists = parseInt(adminCheck.rows[0].count) > 0;

      if (!adminExists) {
        // Default password: admin123 (hashed)
        // bcrypt is already imported at the top
        const hashedPassword = bcrypt.hashSync('admin123', 10);

        await client.query(`
          INSERT INTO users (username, password_hash, email, role)
          VALUES ($1, $2, $3, $4)
        `, ['admin', hashedPassword, 'admin@college.com', 'admin']);
      }

      console.log('✅ Database initialized successfully');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    // throw error; // Optional: throw error to fail hard
  }
};

// Helper functions (Promisified for Postgres)

export const getEnquiries = async () => {
  const result = await db.query('SELECT * FROM enquiries ORDER BY submitted_at DESC');
  return result.rows;
};

export const addEnquiry = async (enquiry: EnquiryData) => {
  const result = await db.query(`
    INSERT INTO enquiries (name, email, subject, message)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `, [enquiry.name, enquiry.email, enquiry.subject, enquiry.message]);
  return { lastInsertRowid: result.rows[0].id };
};

export const getApplications = async () => {
  const result = await db.query('SELECT * FROM applications ORDER BY submitted_at DESC');
  return result.rows;
};

export const addApplication = async (application: ApplicationData) => {
  const result = await db.query(`
    INSERT INTO applications (name, email, phone, program, qualification, address, dob, gender, father_name, mother_name, guardian_phone)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id
  `, [
    application.name, application.email, application.phone, application.program,
    application.qualification, application.address, application.dob, application.gender,
    application.father_name, application.mother_name, application.guardian_phone
  ]);
  return { lastInsertRowid: result.rows[0].id };
};

export const getVisitorCount = async () => {
  const result = await db.query('SELECT SUM(count) as total FROM visitor_stats');
  return parseInt(result.rows[0].total || '0');
};

export const incrementVisitorCount = async () => {
  const today = new Date().toISOString().split('T')[0];

  try {
    await db.query('INSERT INTO visitor_stats (date, count) VALUES ($1, 1)', [today]);
  } catch {
    // If date already exists, increment count (ON CONFLICT in Postgres)
    // Using simple update here as retry logic for simplicity
    await db.query('UPDATE visitor_stats SET count = count + 1 WHERE date = $1', [today]);
  }

  return getVisitorCount();
};

export const authenticateUser = async (username: string, password: string): Promise<{ id: number; username: string; email: string; role: string; password_hash: string } | null> => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0] as { id: number; username: string; email: string; role: string; password_hash: string } | undefined;

  if (!user) return null;

  if (bcrypt.compareSync(password, user.password_hash)) {
    // Update last login
    await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
    return user;
  }

  return null;
};

// Initialize database on import is tricky with async, usually better to call it explicitly in app setup
// But to keep API consistent for now:
initDatabase().catch(err => console.error('Init failed', err));
