import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', res.data.token);
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      localStorage.setItem('role', payload.user.role);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Join Smart Health</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Full Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Enter your full name" />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Create a password" />
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p style={{textAlign: 'center', marginTop: '20px'}}>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;