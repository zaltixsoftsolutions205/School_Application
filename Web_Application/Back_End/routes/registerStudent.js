const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ✅ POST /api/students - Register student
router.post('/', (req, res) => {
  const {
    name,
    gender,
    address,
    mobile_number,
    total_fees,
    class: cls,
    section,
    gmail,
    password,
    parent_name // ✅ make sure this is in your frontend and DB too
  } = req.body;

  if (
    !name || !gender || !address || !mobile_number ||
    !total_fees || !cls || !section || !gmail || !password || !parent_name
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ✅ Generate new Sid like S101, S102...
  const getMaxSidQuery = `
    SELECT Sid FROM students 
    WHERE Sid REGEXP '^S[0-9]+'
    ORDER BY CAST(SUBSTRING(Sid, 2) AS UNSIGNED) DESC
    LIMIT 1
  `;

  db.query(getMaxSidQuery, (err, result) => {
    if (err) {
      console.error("❌ Error fetching max Sid:", err);
      return res.status(500).json({ error: 'Error fetching max Sid' });
    }

    let newSid = 'S101';
    if (result.length > 0) {
      const lastSid = result[0].Sid;
      const lastNum = parseInt(lastSid.substring(1));
      newSid = 'S' + (lastNum + 1);
    }

    const insertQuery = `
      INSERT INTO students 
      (Sid, name, gender, address, mobile_number, total_fees, class, section, gmail, password, parent_name)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      newSid,
      name,
      gender,
      address,
      mobile_number,
      total_fees,
      cls,
      section,
      gmail,
      password,
      parent_name
    ];

    db.query(insertQuery, values, (err2, result2) => {
      if (err2) {
        console.error("❌ DB INSERT ERROR:", err2.sqlMessage);
        return res.status(500).json({
          error: 'Failed to register student',
          message: err2.sqlMessage
        });
      }

      return res.status(200).json({
        message: '✅ Student registered successfully',
        Sid: newSid
      });
    });
  });
});

module.exports = router;
