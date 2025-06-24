import React, { useEffect, useState } from 'react';
import './Attendance.css';

const Attendance = () => {
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [classSection, setClassSection] = useState('10-A');
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState({ total: 0, present: 0, absent: 0 });

  const loadAttendance = () => {
  const [cls, section] = classSection.split('-');
  const url = `http://localhost:3000/api/attendance?date=${date}&class=${cls}&section=${section}`;
  console.log('📤 Fetching from URL:', url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log('✅ Received from backend:', data);

      const total = data.length;
      const present = data.filter((s) => s.status === 'Present').length;
      const absent = total - present;

      setStudents(data); // ✅ This was missing
      setSummary({ total, present, absent }); // ✅ This was also missing
    })
    .catch((err) => console.error('❌ Fetch error:', err));
};



  const updateAttendance = (Sid, newStatus) => {
    const [cls, section] = classSection.split('-');

    fetch('http://localhost:3000/api/attendance/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Sid,
        date,
        status: newStatus,
        className: cls,
        section: section,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setStudents((prev) =>
          prev.map((s) => (s.Sid === Sid ? { ...s, status: newStatus } : s))
        );
        const newSummary = {
          total: students.length,
          present: students.filter((s) =>
            s.Sid === Sid ? newStatus === 'Present' : s.status === 'Present'
          ).length,
          absent: students.filter((s) =>
            s.Sid === Sid ? newStatus !== 'Present' : s.status !== 'Present'
          ).length,
        };
        setSummary(newSummary);
      });
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  return (
    <div className="attendance-page">
      <header className="attendance-header">
        <div className="header-left">
          <h2 style={{color:'rgba(242, 15, 8, 0.92)'}}>📅 Attendance Management</h2>
          <p>Track and manage student attendance</p>
        </div>
      </header>

      <div className="attendance-controls">
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Class</label>
          <select
            value={classSection}
            onChange={(e) => setClassSection(e.target.value)}
          >
            <option value="10-A">10-A</option>
            <option value="10-B">10-B</option>
            <option value="9-A">9-A</option>
            <option value="9-B">9-B</option>
          </select>
        </div>
        <button className="load-button" style={{padding:"6px"}} onClick={loadAttendance}>
          Load Attendance
        </button>
      </div>

      <div className="attendance-summary">
        <div className="summary-box">
          Total Students<br /><strong>{summary.total}</strong>
        </div>
        <div className="summary-box present">
          Present<br /><strong>{summary.present}</strong>
        </div>
        <div className="summary-box absent">
          Absent<br /><strong>{summary.absent}</strong>
        </div>
        <div className="summary-box rate">
          Attendance Rate<br />
          <strong>
            {summary.total ? ((summary.present / summary.total) * 100).toFixed(1) : 0}%
          </strong>
        </div>
      </div>

      <div className="attendance-table">
        <h3>
          Attendance for Class {classSection} - {new Date(date).toLocaleDateString()}
        </h3>
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.Sid}>
                <td>{student.Sid}</td>
                <td>{student.name}</td>
                <td className={`status ${student.status?.toLowerCase() || ''}`}>
                  {student.status}
                </td>
                <td>
                  <select
                    value={student.status}
                    onChange={(e) => updateAttendance(student.Sid, e.target.value)}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
