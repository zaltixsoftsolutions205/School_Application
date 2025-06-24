const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ Fetch attendance by class and section
router.get('/', (req, res) => {
  const { date, class: cls, section } = req.query;
  if (!date || !cls || !section) {
    return res.status(400).json({ error: 'Missing date, class, or section' });
  }

  const sql = `
    SELECT s.Sid, s.name, COALESCE(a.status, 'Absent') as status
    FROM students s
    LEFT JOIN attendance a ON s.Sid = a.Sid AND a.date = ?
    WHERE s.class = ? AND s.section = ?
  `;

  db.query(sql, [date, cls, section], (err, result) => {
    if (err) {
      console.error('❌ DB Error:', err);
      return res.status(500).json({ error: 'DB Error' });
    }
    res.json(result);
  });
});

router.post('/update', (req, res) => {
  const { Sid, date, status, className, section } = req.body;

  const sql = `
    INSERT INTO attendance (Sid, date, status, class, section)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE status = VALUES(status)
  `;

  db.query(sql, [Sid, date, status, className, section], (err, result) => {
    if (err) {
      console.error('❌ Update failed:', err);
      return res.status(500).json({ error: 'Update failed' });
    }
    res.json({ message: 'Attendance updated' });
  });
});

module.exports = router;
