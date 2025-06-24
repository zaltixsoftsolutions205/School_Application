import React, { useEffect, useState } from 'react';
import './Students.css';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:3000/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Error fetching students:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      fetch(`http://localhost:3000/api/students/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setStudents(students.filter((s) => s.Sid !== id));
          } else {
            return res.text().then((msg) => alert(`Failed to delete: ${msg}`));
          }
        })
        .catch((err) => console.error('Error deleting student:', err));
    }
  };

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.name?.toLowerCase().includes(term) ||
      s.Sid?.toString().includes(term) ||
      s.gmail?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="students-container">
      <h2 style={{color:'rgba(242, 15, 8, 0.92)'}}>👥 Student Management</h2>

      <div className="header-bar">
        <h2>Students</h2>
        <div className="admin-controls">
          <button
            className="add-btn"
            onClick={() => navigate('/RegisterStudent')}
          >
            + Add Student
          </button>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search students by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <select>
          <option>All Classes</option>
          <option>10-A</option>
          <option>10-B</option>
          <option>9-A</option>
          <option>9-B</option>
        </select> */}
        {/* <button className="filter-btn">Filter</button> */}
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Class</th>
            <th>Roll No</th>
            <th>Contact</th>
            <th>Fee Status</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s, index) => (
            <tr key={index}>
              <td>
                <div className="student-info">
                  <span className="avatar">{s.name?.charAt(0)}</span>
                  <div>
                    <strong>{s.name}</strong>
                    <div className="email">{s.gmail}</div>
                  </div>
                </div>
              </td>
              <td>{`${s.class}-${s.section}`}</td>
              <td>{s.Sid}</td>
              <td>{s.mobile_number}</td>
              <td>{s.feeStatus || "unpaid"}</td>
              {/* <td className="actions">
                <span title="View">👁️</span>
                <span title="Edit">✏️</span>
                <span title="Delete" onClick={() => handleDelete(s.Sid)}>🗑️</span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
