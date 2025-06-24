const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET: Students with logically calculated Fee Status
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      s.Sid, 
      s.name, 
      s.class, 
      s.section,
      s.gmail, 
      s.mobile_number, 
      s.total_fees,
      IFNULL(SUM(f.fee_paid), 0) AS fee_paid,
      s.total_fees - IFNULL(SUM(f.fee_paid), 0) AS due_amount,
      CASE 
        WHEN s.total_fees - IFNULL(SUM(f.fee_paid), 0) = 0 THEN 'paid'
        ELSE 'unpaid'
      END AS feeStatus
    FROM students s
    LEFT JOIN fees f ON s.Sid = f.Sid
    GROUP BY s.Sid, s.name, s.class, s.section, s.gmail, s.mobile_number, s.total_fees;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

module.exports = router;

// ✅ DELETE: Remove Student by ID
router.delete('/:id', (req, res) => {
  const studentId = req.params.id;

  const deleteSql = 'DELETE FROM students WHERE Sid = ?';

  db.query(deleteSql, [studentId], (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
      return res.status(500).json({ error: 'Failed to delete student' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  });
});

module.exports = router;
