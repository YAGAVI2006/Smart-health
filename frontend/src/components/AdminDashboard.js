import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/api/reports/stats');
        setStats(res.data.map(r=>({ name:r._id, count: r.count }))); 
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>Admin Dashboard</h2>
        <button onClick={logout} style={{background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'}}>Logout</button>
      </div>
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <Link to="/profile" style={{display: 'inline-block', padding: '10px 20px', background: '#9b59b6', color: 'white', borderRadius: '8px', textDecoration: 'none'}}>View My Profile</Link>
        <Link to="/map" style={{display: 'inline-block', padding: '10px 20px', background: '#27ae60', color: 'white', borderRadius: '8px', textDecoration: 'none'}}>View Health Reports</Link>
      </div>
      <div className="dashboard-section">
        <h3>Disease Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#e74c3c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;