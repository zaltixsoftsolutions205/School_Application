import React, { useEffect, useState } from 'react';
import './Fees.css';
import axios from 'axios';

const Fees = () => {
  const [feesData, setFeesData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 2;
 // Limit to 5 records per page

  useEffect(() => {
    axios.get('http://localhost:3000/api/fees')
      .then(response => {
        setFeesData(response.data.data || []);
        setSummary(response.data.summary || {});
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching fee data:", error);
        setLoading(false);
      });
  }, []);

  const filteredFees = feesData.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.Sid.toString().includes(searchQuery) ||
      item.class.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredFees.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredFees.length / recordsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <div className="loading">Loading fee data...</div>;

  return (
    <div className="fees-container">
      <h2 style={{ color: 'rgba(242, 15, 8, 0.92)' }}>📊 Fee Management</h2>
      <p className="subtitle">Track and manage student fee payments efficiently</p>

      <div className="summary">
        <div className="card green">
          <h4>Total Collection</h4>
          <p>₹{summary?.totalCollection?.toLocaleString() || 0}</p>
        </div>
        <div className="card yellow">
          <h4>Pending Amount</h4>
          <p>₹{summary?.totalPending?.toLocaleString() || 0}</p>
        </div>
        <div className="card blue">
          <h4>Paid Students</h4>
          <p>{summary?.paidStudents || 0}</p>
        </div>
        <div className="card red">
          <h4>Unpaid Students</h4>
          <p>{summary?.unpaidStudents || 0}</p>
        </div>
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="🔍 Search by name, roll no, or class..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset page on search
          }}
        />
        {/* <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1); // Reset page on filter
          }}
        >
          <option value="All">All Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select> */}
        {/* <button className="add">+ Add Payment</button> */}
        {/* <button className="export">📤 Export</button> */}
      </div>

      <table className="fees-table">
        <thead>
          <tr>
            <th>Student Details</th>
            <th>Total Fee</th>
            <th>Paid</th>
            <th>Pending</th>
            <th>Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="student-info">
                    <div className="avatar">{item.name.charAt(0)}</div>
                    <div className="details">
                      <strong>{item.name}</strong>
                      <p>Class {item.class}-{item.section} • Roll: {item.Sid}</p>
                    </div>
                  </div>
                </td>
                <td>₹{item.total_fees.toLocaleString()}</td>
                <td className="green">₹{item.paid_amount.toLocaleString()}</td>
                <td className="red">₹{item.pending_amount.toLocaleString()}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() =>
                      window.open(`http://localhost:3000/api/receipt/${item.Sid}`, '_blank', 'noopener,noreferrer')
                    }
                    className="receipt-button"
                    style={{
                      padding: '6px 6px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No matching records</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          ⬅ Prev
        </button>
        {[...Array(totalPages).keys()].map(num => (
          <button
            key={num}
            onClick={() => goToPage(num + 1)}
            className={currentPage === num + 1 ? 'active' : ''}
          >
            {num + 1}
          </button>
        ))}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Fees;
