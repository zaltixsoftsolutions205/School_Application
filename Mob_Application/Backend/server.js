const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const attendanceRoutes = require('./routes/attendance');
const feeRoutes = require('./routes/fees'); 
const marksRoutes = require('./routes/marks'); 


const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth')); // auth route
app.use('/api/student', require('./routes/student'));
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feeRoutes); 
app.use('/api/marks',marksRoutes);
app.use('/api/notices', require('./routes/notices'));
app.use('/api/studentInfo', require('./routes/studentInfo'));
app.use('/api', require('./routes/exams')); // handles /api/exam_types



// Default route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
