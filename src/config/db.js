import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodejs_blog',
  password: '',
  port: 5432,
});

export function query(text, params) {
  return pool.query(text, params);
}
