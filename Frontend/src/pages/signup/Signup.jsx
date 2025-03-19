import React, { useState } from 'react';
import axios from "axios";
import './Signup.css'; // You would create this file with the CSS below

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/api/user/register", formData);
  
      console.log("Signup successful:", response.data);
  
      // Handle success (e.g., store JWT, redirect user)
      alert("Account created successfully!");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Try again.");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create Your Account</h1>
        </div>
        
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName"
              className="signup-form-control" 
              value={formData.fullName}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="signup-form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="signup-form-control" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <div className="signup-password-container">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                name="password"
                className="signup-form-control" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
              <div className="signup-password-toggle">
                <input 
                  type="checkbox" 
                  id="showPassword" 
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
                <label htmlFor="showPassword">Show password</label>
              </div>
            </div>
            <div className="signup-password-requirements">
              <ul>
                <li>Minimum 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one number</li>
                <li>At least one special character (!@#$%^&*)</li>
              </ul>
            </div>
          </div>
          
          <div className="signup-social">
            <span>Or sign up with</span>
            <div className="signup-social-buttons">
              <button type="button" className="signup-social-button signup-google-button">
                Google
              </button>
            </div>
          </div>
          
          <div className="signup-terms">
            <input 
              type="checkbox" 
              id="agreeToTerms" 
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required 
            />
            <label htmlFor="agreeToTerms">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>
          
          <button type="submit" className="signup-submit-btn">Create Account</button>
          
          <div className="signup-login-link">
            Already have an account? <a href="/en/login">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;