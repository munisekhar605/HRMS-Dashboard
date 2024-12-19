
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api'; 
import './Signup.css'; 

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await signup({ email, password, fullName });
      if (response.token) {
        console.log('Signed up successfully. Token:', response.token);
        
        navigate('/login'); 
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="signup-form-page-container">
      <div className="signup-form-container">
        <h2 className="signup-logo">Logo</h2>
        <h2 className="signup-input-label signup-heading">Welcome to Signup Dashboard</h2>
        <form className="signup-form-container-item" onSubmit={handleSubmit}>
          <label className="signup-input-label">Full Name</label>
          <input
            className="signup-input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
          />
          
          <label className="signup-input-label">Email Address</label>
          <input
            className="signup-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
          
          <label className="signup-input-label">Password</label>
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          
          <label className="signup-input-label">Confirm Password</label>
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          
          <button className="signup-input-button" type="submit">Signup</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="signup-form-right-container">
        <img
          className="signup-form-right-img"
          src="https://img.freepik.com/free-photo/business-chart-visual-graphics-report-concept_53876-167093.jpg?t=st=1734513878~exp=1734517478~hmac=49b6bafc26156d77f312f3d009b6dabce2a197dab7eb3a8d005785c73b14914b&w=1380"
          alt="Signup"
        />
        <div className="signup-form-right-heading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </div>
        <p className="signup-form-right-ds">
          Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
}

export default Signup;
