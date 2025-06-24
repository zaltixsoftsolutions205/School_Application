import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { FaUsers, FaUserCheck, FaRupeeSign, FaBook } from 'react-icons/fa';

function Dashboard() {
  const [data, setData] = useState({
    totalStudents: 0,
    presentToday: 0,
    pendingFees: 0,
    avgMarks: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/dashboard')
      .then(res => res.json())
      .then(responseData => {
        // Fallbacks to ensure proper values
        setData({
          totalStudents: responseData.totalStudents ?? 0,
          presentToday: responseData.presentToday ?? 0,
          pendingFees: responseData.pendingFees ?? 0,
          avgMarks: responseData.avgMarks ?? 0
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard data:", err);
        setLoading(false);
      });
  }, []);

  const attendancePercentage =
    data.totalStudents > 0
      ? ((data.presentToday / data.totalStudents) * 100).toFixed(1)
      : 0;

  if (loading) return <div className="dashboard"><p>Loading dashboard data...</p></div>;

  return (
    <div className="dashboard">
      <h2 style={{color:'rgba(242, 15, 8, 0.92)'}}>🖥️ Dashboard</h2>
      <p>Welcome back! Here's what's happening at your school today.</p>

      <div className="cards">
        <div className="card">
          <h3>Total Students</h3>
          <p className="count">{data.totalStudents}</p>
          <p className="info">+12 this month</p>
          <FaUsers className="icon blue" />
        </div>

        <div className="card">
          <h3>Present Today</h3>
          <p className="count">{data.presentToday}</p>
          <p className="info green">{attendancePercentage}% attendance</p>
          <FaUserCheck className="icon green" />
        </div>

        <div className="card">
          <h3>Pending Fees</h3>
          <p className="count">₹{Number(data.pendingFees).toLocaleString()}</p>
          <p className="info red">from multiple students</p>
          <FaRupeeSign className="icon red" />
        </div>

        <div className="card">
          <h3>Avg Marks</h3>
          <p className="count">{data.avgMarks}%</p>
          <p className="info purple">+2.3% from last term</p>
          <FaBook className="icon purple" />
        </div>
      </div>

      <div className="lower-section">
        <div className="attendance-trend">
          <h3>Attendance Trend</h3>
          <div className="chart-placeholder">
            Attendance chart would go here<br />
            Weekly attendance: 89.5%
          </div>
        </div>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <ul>
            <li><span className="dot blue" /> New student admission - Rahul Sharma</li>
            <li><span className="dot green" /> Fee payment received - Priya Patel</li>
            <li><span className="dot yellow" /> Attendance marked for Class 10-A</li>
            <li><span className="dot purple" /> Marks updated for Mathematics - Class 9</li>
            <li><span className="dot gray" /> Parent meeting scheduled - Class 8-B</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
