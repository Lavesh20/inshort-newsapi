import React, { useState } from 'react';
import axios from 'axios'; // For API calls
import { useNavigate } from 'react-router-dom'; // For navigation
import './ForgotPassword.css'; // Import the CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend forgot password endpoint
      const response = await axios.post('https://inshorts-backend-xce7.onrender.com/api/user/forgot-password', {
        email,
      });

      // Display success message
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      setMessage('');
      console.error('Forgot password error:', err);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Your Password?</h2>
        <p>Enter your email address below, and we'll send you a link to reset your password.</p>
        {message && <p className="success-message">{message}</p>}
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
          <button type="submit" className="submit-button">Send Reset Link</button>
        </form>
        <div className="back-to-login">
          <p>Remember your password? <a href="/en/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;