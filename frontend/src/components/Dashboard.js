import React from 'react';
import SymptomForm from './SymptomForm';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container">
      <h2>Patient Dashboard</h2>
      <SymptomForm />
      <Link to="/map">View outbreak map</Link>
    </div>
  );
}

export default Dashboard;