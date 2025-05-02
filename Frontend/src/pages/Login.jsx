import React, { useState } from 'react';
import './login.css';
import logoImage from '../assets/thrifttrail.png';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Login failed');
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log('Login successful:', data);
        // Redirect to home page or dashboard after successful login
        window.location.href = '/';
      })
      .catch((err) => {
        console.error('Login error:', err);
        setError(err.message || 'Invalid credentials. Please try again.');
      });
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <div className="branding">
          <img src={logoImage} alt="money target" className="logo-image" />
        </div>
      </div>

      <div className="right-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <div className="error-message">{error}</div>}
          <input
            id="email"
            type="text"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && (
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeSharp /> : <FaRegEyeSlash />}
              </span>
            )}
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">LOG IN</button>

          <p className="signup-text">
            New User? <a href="/register">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
