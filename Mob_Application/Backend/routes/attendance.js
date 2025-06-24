const express = require('express');
const router = express.Router();
const db = require('../config/db'); // your MySQL connection

// GET attendance by student ID
router.get('/:Sid', async (req, res) => {
  const { Sid } = req.params;

  const sql = `
    SELECT date, status
    FROM attendance
    WHERE Sid = ?
    ORDER BY date DESC
  `;

  try {
    db.query(sql, [Sid], (err, results) => {
      if (err) {
        console.error('Error fetching attendance:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      // ✅ Format date to YYYY-MM-DD safely
      const formattedResults = results.map((record) => {
        const dateObj = new Date(record.date);
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${yyyy}-${mm}-${dd}`;

        return {
          date: formattedDate,
          status: record.status,
        };
      });

      res.json(formattedResults);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
