import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      localStorage.setItem('role', payload.user.role);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h2>Login to Smart Health</h2>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Enter your password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p style={{textAlign: 'center', marginTop: '20px'}}>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;