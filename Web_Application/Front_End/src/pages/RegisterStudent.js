import React, { useState } from 'react';
import './RegisterStudent.css';
import axios from 'axios';

const RegisterStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    gender: '',
    class: '',
    section: '',
    phone: '',
    email: '',
    password: '',
    totalFee: '',
    address: '',
    parent_name: ''  // ➕ Added
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: student.name,
      gender: student.gender,
      class: student.class,
      section: student.section,
      mobile_number: student.phone,
      gmail: student.email,
      password: student.password,
      total_fees: parseFloat(student.totalFee),
      address: student.address,
      parent_name: student.parent_name  // ➕ Added
    };

    try {
      const res = await axios.post("http://localhost:3000/api/students", payload);
      console.log("✅ Response from backend:", res.data);
      alert("✅ Student Registered Successfully!");
      setStudent({
        name: '',
        gender: '',
        class: '',
        section: '',
        phone: '',
        email: '',
        password: '',
        totalFee: '',
        address: '',
        parent_name: ''
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      console.error("❌ Error registering student:", errorMsg);
      alert(`❌ Registration failed: ${errorMsg}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Register New Student</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={student.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <input type="text" name="class" value={student.class} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Section</label>
          <input type="text" name="section" value={student.section} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Total Fee (₹)</label>
          <input type="number" name="totalFee" value={student.totalFee} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" value={student.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={student.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={student.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={student.address} onChange={handleChange} required rows="3"></textarea>
        </div>

        <div className="form-group">
          <label>Parent Name</label> {/* ➕ Added */}
          <input type="text" name="parent_name" value={student.parent_name} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Register Student</button>
      </form>
    </div>
  );
};

export default RegisterStudent;
