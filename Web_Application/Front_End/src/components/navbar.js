// File: src/components/Navbar.js
import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally clear any auth tokens/localStorage here
    navigate('/'); // redirect to Login page
  };

  return (
    <div className="navbar">
      <h2 className="portal-title">School Admin Portal</h2>
      <div className="navbar-right">
        <div className="notifications">🔔<span className="badge">3</span></div>
        <div className="profile">👤 Admin</div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
