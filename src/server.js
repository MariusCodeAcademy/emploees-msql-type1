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

app.get('/employees/add', (req, res) => {
  const body = {
    name: 'James Delete',
    salary: 2500,
    age: 40,
    experience: 7,
    sex: 'male',
  };
  // conn
  const conn = mysql.createConnection(dbConfig);
  // query
  const sql = `
  INSERT INTO employees(name, salary, age, experience, sex)
  VALUES (?, ?, ?, ?, ?)
  `;
  // console.log('ob', Object.values(body));
  // execute - prepared statment
  conn.execute(sql, Object.values(body), (err, result) => {
    if (err) return console.log('err', err);
    console.log('result', result);
  });
  // close
  conn.end();
  res.send('trying to add a row');
});

app.get('/employees/single/:id', (req, res) => {
  const id = req.params.id;
  const conn = mysql.createConnection(dbConfig);
  const sql = 'SELECT * FROM employees WHERE id = ?';
  conn.execute(sql, [id], (err, result) => {
    if (err) {
      console.log('err', err);
      res.send({ msg: 'Klaida', err });
      return;
    }
    console.log('result', result);
    res.send({ msg: 'Gauti duomenys', result });
  });

  conn.end();
});

app.get('/employees/edit/:id', (req, res) => {
  const id = req.params.id;
  const body = {
    name: 'James Bond',
    salary: 3000,
    age: 44,
    experience: 7,
    sex: 'male',
  };
  const conn = mysql.createConnection(dbConfig);
  const sql = `
  UPDATE employees SET 
    name = ?,
    salary = ?,
    age = ?,
    experience = ?,
    sex = ? 
  WHERE id = ?`;
  // console.log('values', [...Object.values(body), id]);
  conn.execute(sql, [...Object.values(body), id], (err, result) => {
    if (err) {
      console.log('err', err);
      res.send({ msg: 'Klaida', err });
      return;
    }
    console.log('result', result);
    res.send({ msg: 'Atnaujinti duomenys', result });
  });

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

app.get('/employees/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM employees WHERE id = ?';
  const conn = mysql.createConnection(dbConfig);
  conn.query(sql, [id], (err, result) => {
    if (err) {
      res.send({ msg: 'Klaida', err });
      return console.log('err', err);
    }
    console.log('result', result);
    res.send({ msg: 'Deleted row with id: ' + id });
  });
  conn.end();
});

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
