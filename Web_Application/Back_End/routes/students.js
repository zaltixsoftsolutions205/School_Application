const express = require('express');
const router = express.Router();
const mysql = require('mysql');
require('dotenv').config();

// MySQL connection using .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD.replace(/"/g, ''),
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL connected inside students route');
  }
});

// ✅ GET all students
router.get('/students', (req, res) => {
  connection.query('SELECT * FROM students', (err, results) => {
    if (err) {
      console.error('❌ SQL ERROR:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// ✅ Dashboard route
router.get('/dashboard', (req, res) => {
  const today = new Date().toISOString().split('T')[0];

  const results = {
    totalStudents: 0,
    presentToday: 0,
    pendingFees: 0,
    avgMarks: 0
  };

  const totalQuery = 'SELECT COUNT(*) AS total FROM students';
  const attendanceQuery = `SELECT COUNT(*) AS present FROM attendance WHERE date = ? AND status = 'Present'`;
  const feesQuery = 'SELECT SUM(due_amount) AS total_due FROM fees';
  const marksQuery = 'SELECT ROUND(AVG(marks_obtained), 1) AS avg_marks FROM marks';

  connection.query(totalQuery, (err1, totalRes) => {
    if (err1) return res.status(500).json({ error: 'Error fetching total students' });
    results.totalStudents = totalRes[0].total;

    connection.query(attendanceQuery, [today], (err2, attRes) => {
      if (err2) return res.status(500).json({ error: 'Error fetching attendance' });
      results.presentToday = attRes[0].present;

      connection.query(feesQuery, (err3, feeRes) => {
        if (err3) return res.status(500).json({ error: 'Error fetching fees' });
        results.pendingFees = feeRes[0].total_due || 0;

        connection.query(marksQuery, (err4, marksRes) => {
          if (err4) return res.status(500).json({ error: 'Error fetching marks' });
          results.avgMarks = marksRes[0].avg_marks || 0;

          res.json(results);
        });
      });
    });
  });
});

module.exports = router;
