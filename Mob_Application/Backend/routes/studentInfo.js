const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET student info by Gmail
router.get('/:gmail', (req, res) => {
  const gmail = req.params.gmail;
  const sql = 'SELECT Sid, name, father_name, class, section, photo FROM students WHERE gmail = ?';
  db.query(sql, [gmail], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
});

module.exports = router;
