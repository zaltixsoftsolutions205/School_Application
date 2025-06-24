const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET minimal fee summary by Student ID
router.get('/:Sid', async (req, res) => {
  const { Sid } = req.params;

  const totalFeeQuery = 'SELECT total_fees FROM students WHERE Sid = ?';
  const feePaidQuery = 'SELECT fee_paid FROM fees WHERE Sid = ?';

  try {
    db.query(totalFeeQuery, [Sid], (err, totalResult) => {
      if (err) {
        console.error('Error fetching total fees:', err);
        return res.status(500).json({ error: 'DB error (total)' });
      }

      if (totalResult.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const total_fees = totalResult[0].total_fees;

      db.query(feePaidQuery, [Sid], (err, feeResult) => {
        if (err) {
          console.error('Error fetching fee paid:', err);
          return res.status(500).json({ error: 'DB error (fee)' });
        }

        const fee_paid = feeResult[0]?.fee_paid || 0;
        const due_amount = total_fees - fee_paid;

        return res.json({
          total_fees,
          fee_paid,
          due_amount,
        });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
