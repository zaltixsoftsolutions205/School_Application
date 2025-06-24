// 📁 backend/routes/marks.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET: Subject-wise marks for a student for a given exam
router.get('/student/:sid/exam/:exam_id', (req, res) => {
  const { sid, exam_id } = req.params;
  console.log('📩 Request for marks:', sid, exam_id); // Debug log

  const sql = `
    SELECT s.subject_name, m.marks_obtained AS marks, m.max_marks
    FROM marks m
    JOIN subjects s ON m.subject_id = s.subject_id
    WHERE m.Sid = ? AND m.exam_id = ?
  `;
  db.query(sql, [sid, exam_id], (err, result) => {
    if (err) {
      console.error('❌ SQL Error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      console.warn('⚠️ No marks found for student:', sid, 'exam:', exam_id);
      return res.status(404).json({ message: 'No marks found for this student' });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
