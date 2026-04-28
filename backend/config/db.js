const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'mysql',
  database: process.env.DB_NAME || 'app_db',
  waitForConnections: true,
  connectionLimit: 10
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed!');
    console.error('Error Code:', err.code);
    console.error('Message:', err.message);
  } else {
    console.log(`✅ Connected! Using ${process.env.DB_USER} on ${process.env.DB_HOST}`);
    connection.release();
  }
});

module.exports = pool.promise();