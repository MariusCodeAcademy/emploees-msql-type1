const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const mysql = require('mysql2');

// routes
const employeesRoutes = require('./API/employees');

const PORT = process.env.SERVER_PORT || 3000;

const dbConfig = require('./dbConfig');

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
  // surasti kaip patikrinti ar prisijungiam prie db ar ne
  // grazinti ar esam prisijunge ar ne prie db
  res.send({ msg: 'connected' });
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

app.get('/sql-inject', (req, res) => {
  const conn = mysql.createConnection(dbConfig);
  const goodInput = 2;
  const badInput = '2; DROP TABLE secretData';
  // clean input
  const cleanInput = conn.escape(badInput);
  const sql = `SELECT * FROM employees WHERE id = ?`;
  conn.execute(sql, [badInput], (err, result) => {
    if (err) {
      res.send({ msg: 'Klaida', err });
      return console.log('err', err);
    }
    console.log('result', result);
    res.json({ result });
  });
  conn.end();
});

app.use('/employees', employeesRoutes);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
