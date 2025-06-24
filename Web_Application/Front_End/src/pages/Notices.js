import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notices.css";

const Notices = () => {
  const [notice, setNotice] = useState("");
  const [notices, setNotices] = useState([]);

  // Fetch notices on load
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notices");
      setNotices(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch notices", err.message);
    }
  };

  const handleAddNotice = async () => {
    if (!notice.trim()) return;

    try {
      const res = await axios.post("http://localhost:3000/api/notices", { text: notice });
      setNotices([res.data, ...notices]);
      setNotice("");
    } catch (err) {
      console.error("❌ Failed to add notice", err.message);
      alert("Upload failed. Please check backend.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/notices/${id}`);
      setNotices(notices.filter((n) => n.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete notice", err.message);
    }
  };

  return (
    <div className="notice-container">
      <h2>📢 Notice Board</h2>

      <div className="notice-input-section">
        <textarea
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          placeholder="Write a new notice..."
          rows="3"
          className="notice-textarea"
        />
        <button onClick={handleAddNotice} className="notice-upload-btn" style={{padding:'6px 6px'}}>
          Upload
        </button>
      </div>

      <div className="notice-grid">
        {notices.map((n) => (
          <div key={n.id} className="notice-card">
            <p className="notice-content">{n.text}</p>
            <p className="notice-date">📅 {new Date(n.created_at).toLocaleString()}</p>
            <button className="notice-delete-btn" onClick={() => handleDelete(n.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
