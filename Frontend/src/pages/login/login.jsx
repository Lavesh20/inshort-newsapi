import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // For navigation
import './login.css'; // Import the CSS file

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // For handling login errors
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend login endpoint
      const response = await axios.post('http://localhost:5000/api/user/signin', {
        email,
        password,
      });

      // If login is successful, store the JWT token in localStorage
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);

      // Navigate to the /en/general section
      navigate('/en/general');
    } catch (err) {
      // Handle login errors
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back to [Name of the Platform]</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="show-password">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
          </div>
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
        <div className="social-login">
          <button className="google-login">Log in with Google</button>
        </div>
        <div className="forgot-password">
          <a href="/en/forgot-password">Forgot your password?</a>
        </div>
        <div className="sign-up">
          <p>Don't have an account? <a href="/en/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;