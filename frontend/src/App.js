import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import OutbreakMap from './components/Map';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {token && <Route path="/dashboard" element={<Dashboard />} />}
      {token && role === 'admin' && <Route path="/admin" element={<AdminDashboard />} />}
      {token && <Route path="/map" element={<OutbreakMap />} />}
    </Routes>
  );
}

export default App;