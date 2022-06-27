const { Pool } = require('pg');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT | 5432
};
if (process.env.NODE_ENV === 'development') {
  config.ssl = {
    rejectUnauthorized: false
  };
}
if (process.env.NODE_ENV === 'production') {
  config.ssl = {
    rejectUnauthorized: true
  };
}

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    console.log(err.message);
    process.exit(1);
  }
  console.log('Database connected successfully.');
});

module.exports = db;
