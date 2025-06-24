const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const db = require('../config/db');

// GET /api/receipt/:Sid
router.get('/:Sid', (req, res) => {
  const { Sid } = req.params;

  const sql = `
    SELECT s.Sid, s.name, s.mobile_number, s.gmail, s.total_fees,
           IFNULL(SUM(f.fee_paid), 0) AS paid_amount
    FROM students s
    LEFT JOIN fees f ON s.Sid = f.Sid
    WHERE s.Sid = ?
    GROUP BY s.Sid
  `;

  db.query(sql, [Sid], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ error: 'Failed to generate receipt or no student found' });
    }

    const student = results[0];
    const pending = student.total_fees - student.paid_amount;

    // Create PDF
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=receipt_${Sid}.pdf`);
    doc.pipe(res);

    doc.fontSize(18).text('📄 Fee Receipt', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Student Name: ${student.name}`);
    doc.text(`Student ID (Sid): ${student.Sid}`);
    doc.text(`Mobile Number: ${student.mobile_number}`);
    doc.text(`Gmail: ${student.gmail}`);
    doc.moveDown();
    doc.text(`Total Fee: ₹${student.total_fees}`);
    doc.text(`Paid Amount: ₹${student.paid_amount}`);
    doc.text(`Pending Amount: ₹${pending}`);
    doc.end();
  });
});

module.exports = router;
