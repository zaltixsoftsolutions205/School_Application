// routes/notices.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ✅ Import DB connection

// 🔹 Fetch all notices
router.get('/', (req, res) => {
  db.query('SELECT * FROM notices ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch notices' });
    res.json(results);
  });
});

// 🔹 Add a new notice
router.post('/', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Notice text is required' });
  }

  db.query('INSERT INTO notices (text) VALUES (?)', [text], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });

    db.query('SELECT * FROM notices WHERE id = ?', [result.insertId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: 'Failed to fetch inserted notice' });
      res.json(rows[0]);
    });
  });
});

// 🔹 Delete a notice
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notices WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ success: true });
  });
});

module.exports = router;
