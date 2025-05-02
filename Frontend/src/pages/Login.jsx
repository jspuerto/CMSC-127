import React, { useState } from 'react';
import './login.css';
import logoImage from '../assets/thrifttrail.png';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error('Login error:', err));
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
          <input
            id="username"
            type="text"
            placeholder="Username"
            aria-label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
