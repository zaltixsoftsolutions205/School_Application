const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Uday@123',         // your MySQL password
  database: 'schoolapplication' // change this to your DB name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;
