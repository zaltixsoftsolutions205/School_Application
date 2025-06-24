// routes/exams.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all exam types
router.get('/exam_types', (req, res) => {
  const sql = 'SELECT * FROM exam_types ORDER BY exam_id';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
});

module.exports = router;
