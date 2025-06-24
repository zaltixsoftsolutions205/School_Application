// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashboardLayout';
import Students from './pages/StudentsLayout';
import Attendance from './pages/AttendanceLayout'; // ⬅️ Import Students
import Marks from './pages/MarksLayout';
import Fees from './pages/FeesLayout';
import Login from './pages/Login';
import Notices  from './pages/NoticesLayout';

import './App.css';
import RegisterStudent from './pages/RegisterStudentLayout';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/marks" element={<Marks />} />
          <Route path="/fees" element={<Fees/>}/>
            <Route path="/RegisterStudent" element={<RegisterStudent />} />
            <Route path="/notices" element={<Notices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
