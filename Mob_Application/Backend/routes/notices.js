const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Get all notices
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM notices ORDER BY created_at DESC';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
});

module.exports = router;
 