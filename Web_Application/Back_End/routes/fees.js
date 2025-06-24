const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  console.log('➡️ /api/fees called');

  const sql = `
    SELECT 
      s.Sid, s.name, s.class, s.section, s.total_fees,
      IFNULL(SUM(f.fee_paid), 0) AS paid_amount
    FROM students s
    LEFT JOIN fees f ON s.Sid = f.Sid
    GROUP BY s.Sid
    ORDER BY s.class, s.section, s.name
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ MySQL Error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('✅ MySQL Results:', results.length);
    console.table(results);

    // Add calculated fields
    const data = results.map(row => {
      const paid = Number(row.paid_amount); // Force numeric
      const total = Number(row.total_fees); // Optional safeguard
      const pending = total - paid;
      const status = pending <= 0 ? 'Paid' : 'Pending';

      return {
        ...row,
        paid_amount: paid,
        total_fees: total,
        pending_amount: pending,
        status
      };
    });

    // Fix incorrect string concatenation by enforcing numbers
    const totalCollection = data.reduce((sum, row) => sum + Number(row.paid_amount), 0);
    const totalPending = data.reduce((sum, row) => sum + Number(row.pending_amount), 0);
    const paidStudents = data.filter(row => row.status === 'Paid').length;
    const unpaidStudents = data.length - paidStudents;

    return res.json({
      data,
      summary: {
        totalCollection,
        totalPending,
        paidStudents,
        unpaidStudents
      }
    });
  });
});

module.exports = router;
