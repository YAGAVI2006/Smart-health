import React from 'react';
import SymptomForm from './SymptomForm';
import { Link } from 'react-router-dom';

function Dashboard() {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h2>Welcome to Your Health Dashboard</h2>
        <button onClick={logout} style={{background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer'}}>Logout</button>
      </div>
      <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
        <Link to="/profile" style={{display: 'inline-block', padding: '10px 20px', background: '#9b59b6', color: 'white', borderRadius: '8px', textDecoration: 'none'}}>View My Profile</Link>
        <Link to="/map" style={{display: 'inline-block', padding: '10px 20px', background: '#27ae60', color: 'white', borderRadius: '8px', textDecoration: 'none'}}>View Health Reports</Link>
      </div>
      <div className="dashboard-section">
        <h3>Report Your Symptoms</h3>
        <SymptomForm />
      </div>
    </div>
  );
}

export default Dashboard;