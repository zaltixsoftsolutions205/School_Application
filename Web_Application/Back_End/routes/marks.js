const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1️⃣ Get distinct classes
router.get('/classes', (req, res) => {
  db.query('SELECT DISTINCT class FROM students ORDER BY class', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch classes' });
    res.json(results);
  });
});

// 2️⃣ Get subjects
router.get('/subjects', (req, res) => {
  db.query('SELECT subject_id, subject_name FROM subjects', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch subjects' });
    res.json(results);
  });
});

// 3️⃣ Get exam types
router.get('/exams', (req, res) => {
  db.query('SELECT exam_id, exam_name FROM exam_types', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch exams' });
    res.json(results);
  });
});

// 4️⃣ Get marks based on filters
router.get('/', (req, res) => {
  const { class: className, subject, exam } = req.query;

  if (!className || !subject || !exam) {
    return res.status(400).json({ error: 'Missing class, subject, or exam' });
  }

  const sql = `
    SELECT s.Sid, s.name, m.marks_obtained, m.max_marks
    FROM students s
    LEFT JOIN marks m ON s.Sid = m.Sid 
      AND m.subject_id = ? AND m.exam_id = ?
    WHERE s.class = ?
    ORDER BY s.name
  `;

  db.query(sql, [subject, exam, className], (err, results) => {
    if (err) {
      console.error('❌ Marks Fetch Error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

module.exports = router;
