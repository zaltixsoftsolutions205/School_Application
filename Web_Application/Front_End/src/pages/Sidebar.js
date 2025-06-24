// File: src/components/Sidebar.js
import React from 'react';
import { FaUsers, FaUserCheck, FaRupeeSign, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">School Admin</h2>
      <nav>
        <ul style={{marginTop: "-20px"}}>
          <li>
            <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaUsers /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/students" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaUserCheck /> Students
            </Link>
          </li>
          <li>
            <Link to="/attendance" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaUserCheck /> Attendance
            </Link>
          </li>
           <li>
            <Link to="/marks" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaBook /> Marks
            </Link>
          </li>
          <li>
            <Link to="/fees" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaRupeeSign /> Fees
            </Link>
          </li>
          <li>
            <Link to="/notices" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaBook /> Notices
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
