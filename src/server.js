require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const mysql = require('mysql2');

const PORT = process.env.SERVER_PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
};

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const conn = mysql.createConnection(dbConfig);
  // conn.query('CREATE DATABASE employeesDBtype1', (err, result) => {
  //   if (err) return console.log('err', err);
  //   console.log('result', result);
  // });
  res.send('connected');
  conn.end();
});

app.get('/create-table', (req, res) => {
  const conn = mysql.createConnection(dbConfig);
  const sql = `
  CREATE TABLE employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(20) NOT NULL,
      salary DECIMAL(6, 2) NOT NULL,
      age INT UNSIGNED NOT NULL,
      experience INT UNSIGNED NOT NULL,
      sex ENUM('male', 'female')
  )
  `;
  conn.query(sql, (err, result) => {
    if (err) return console.log('err', err);
    console.log('Table created', result);
  });
  res.send('connected');
  conn.end();
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
