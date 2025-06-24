const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection

// Route: GET /student/:email
router.get('/:email', (req, res) => {
  const { email } = req.params;

  const query = 'SELECT * FROM students WHERE gmail = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(results); // ✅ return all students with that Gmail
  });
});

module.exports = router;
