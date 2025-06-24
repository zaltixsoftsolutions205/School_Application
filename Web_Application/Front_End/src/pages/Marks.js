import React, { useState, useEffect } from 'react';
import './Marks.css';

const Marks = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [marksData, setMarksData] = useState([]);

  // 🔁 Fetch dropdown data on mount
  useEffect(() => {
    fetch('http://localhost:3000/api/marks/classes')
      .then(res => res.json())
      .then(data => setClasses(data));

    fetch('http://localhost:3000/api/marks/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data));

    fetch('http://localhost:3000/api/marks/exams')
      .then(res => res.json())
      .then(data => setExams(data));
  }, []);

  // 📥 Load marks
  const loadMarks = () => {
    if (!selectedClass || !selectedSubject || !selectedExam) {
      alert('Please select class, subject, and exam');
      return;
    }

    fetch(`http://localhost:3000/api/marks?class=${selectedClass}&subject=${selectedSubject}&exam=${selectedExam}`)
      .then(res => res.json())
      .then(data => setMarksData(data));
  };

  return (
    <div className="marks-page">
      <header className="marks-header">
        <div className="header-left">
          <h2 style={{color:'rgba(242, 15, 8, 0.92)'}}>📝 Marks Management</h2>
          <p>Manage and track student marks and grades</p>
        </div>
      </header>

      <div className="marks-controls">
        <div>
          <label>Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Select Class</option>
            {classes.map((cls, idx) => (
              <option key={idx} value={cls.class}>{cls.class}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Subject</label>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj.subject_id} value={subj.subject_id}>{subj.subject_name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Exam Type</label>
          <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.exam_id} value={exam.exam_id}>{exam.exam_name}</option>
            ))}
          </select>
        </div>

        <button className="load-button" style={{ padding: "6px" }} onClick={loadMarks}>Load Marks</button>
      </div>

      <div className="marks-table">
        <h3>Marks List</h3>
        {marksData.length === 0 ? (
          <p>No data found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Marks</th>
                <th>Out of</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {marksData.map((item) => {
                const percentage = item.marks_obtained
                  ? ((item.marks_obtained / item.max_marks) * 100).toFixed(2)
                  : '0.00';
                const grade =
                  percentage >= 90
                    ? 'A+'
                    : percentage >= 75
                    ? 'A'
                    : percentage >= 60
                    ? 'B'
                    : percentage >= 40
                    ? 'C'
                    : 'F';
                return (
                  <tr key={item.Sid}>
                    <td>{item.Sid}</td>
                    <td>{item.name}</td>
                    <td>{item.marks_obtained || '-'}</td>
                    <td>{item.max_marks || '-'}</td>
                    <td>{item.marks_obtained ? `${percentage}%` : '-'}</td>
                    <td className="grade">{item.marks_obtained ? grade : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Marks;
