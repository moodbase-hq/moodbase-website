import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the root directory
dotenv.config({ path: join(__dirname, '..', '.env') });

// Create database connection pool using connection string
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL not found in environment variables');
  process.exit(1);
}

const pool = new Pool({
  connectionString: connectionString.replace('?sslmode=require', ''),
  ssl: {
    rejectUnauthorized: false,
    require: true
  }
});

// Test database connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        console.error('Database query error:', err.stack);
      } else {
        console.log('Database connected successfully');
      }
    });
  }
});

// Query helper function with improved logging
const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', {
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      duration,
      rows: res.rowCount
    });
    return res;
  } catch (error) {
    console.error('Query error:', error.message);
    console.error('Query text:', text.substring(0, 200) + (text.length > 200 ? '...' : ''));
    console.error('Query params:', params);
    throw error;
  }
};

export { pool, query };