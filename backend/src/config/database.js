const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  host: process.env.DB_HOST || undefined,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
  user: process.env.DB_USER || undefined,
  password: process.env.DB_PASS || undefined,
  database: process.env.DB_NAME || undefined,
  max: 10,
  idleTimeoutMillis: 30000,
});

module.exports = pool;