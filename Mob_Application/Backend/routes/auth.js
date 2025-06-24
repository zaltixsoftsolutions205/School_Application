const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  const sql = 'SELECT * FROM students WHERE gmail = ? AND password = ?';
  db.query(sql, [gmail, password], (err, results) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (results.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const student = results[0];
    res.json({ success: true, student });
  });
});

module.exports = router;
