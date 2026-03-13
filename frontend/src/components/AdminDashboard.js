import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/reports/stats');
        setStats(res.data.map(r=>({ name:r._id, count: r.count }))); 
      } catch (err) { console.error(err); }
    };
    fetch();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={stats}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <Link to="/map">View outbreak map</Link>
    </div>
  );
}

export default AdminDashboard;