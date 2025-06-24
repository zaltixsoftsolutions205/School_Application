const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admin WHERE gmail = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login DB error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: "Login successful", token: "dummy-token" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  });
});

module.exports = router;
