
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './Login.css'; 

function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });

      localStorage.setItem('JWT', res.token);
      navigate('/'); 
    } catch (err) {
      setError('Invalid credentials'); 
    }
  };

  return (
    <div className='login-form-page-container'>
      <div className='login-form-container'>
        <h2 className='login-logo'>Logo</h2>
        {error && <p>{error}</p>} {/* Display error message */}
        <h2 className='login-input-label login-heading'>Welcome to Login Dashboard</h2>
        <form className='login-form-container-item' onSubmit={handleSubmit}>
          <label className='login-input-label'>Email Address</label>
          <input
            className='login-input'
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email Address"
            required
          />
          <label className='login-input-label'>Password</label>
          <input
            className='login-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className='login-input-button' type="submit">Login</button>
        </form>
      </div>

      <div className='login-form-right-container'>
        <img
          className='login-form-right-img'
          src="https://img.freepik.com/free-photo/business-chart-visual-graphics-report-concept_53876-167093.jpg?t=st=1734513878~exp=1734517478~hmac=49b6bafc26156d77f312f3d009b6dabce2a197dab7eb3a8d005785c73b14914b&w=1380"
          alt="Login"
        />
        <div className='login-form-right-heading'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </div>
        <p className='login-form-right-ds'>
          Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}

export default Login;
