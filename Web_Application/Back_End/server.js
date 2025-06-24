const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const studentRoutes1 = require('./routes/student1');
const attendanceRoutes = require('./routes/attendance');
const marksRoutes = require('./routes/marks');
const feesRoutes = require('./routes/fees');
const studentRoutes2 = require('./routes/registerStudent');
const receiptRoute = require('./routes/receipt');
// const noticesRoute = require('./routes/notices');

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', studentRoutes1);
app.use('/api/attendance', attendanceRoutes); 
app.use('/api/marks', marksRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/students', studentRoutes2);
app.use('/api/receipt', receiptRoute);
// app.use('/api/notices', noticesRoute);
const noticeRoutes = require('./routes/notices');
app.use('/api/notices', noticeRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});