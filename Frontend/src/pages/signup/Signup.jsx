import React, { useState } from 'react';
import axios from "axios";
import { EyeIcon, EyeOffIcon, CheckCircleIcon, XCircleIcon } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeToTerms: false
  });

  // Password validation states
  const [passwordChecks, setPasswordChecks] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Update password validation checks
    if (name === 'password') {
      setPasswordChecks({
        hasMinLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*]/.test(value)
      });
    }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden mt-12">
        <div className="px-6  py-8 sm:px-10">
          <div className="mb-6 text-center">
            <h1 className="text-3xl  font-extrabold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-sm text-gray-600">Join our community and get started today</p>
          </div>
          
          <form id="signup-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" 
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required 
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" 
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required 
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none pr-10" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="text-xs font-medium text-gray-700 mb-1">Password requirements:</div>
                <ul className="grid grid-cols-1 gap-1">
                  <li className="flex items-center text-xs">
                    {passwordChecks.hasMinLength ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-gray-300 mr-1" />
                    )}
                    <span className={passwordChecks.hasMinLength ? "text-green-700" : "text-gray-500"}>
                      Minimum 8 characters
                    </span>
                  </li>
                  <li className="flex items-center text-xs">
                    {passwordChecks.hasUppercase ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-gray-300 mr-1" />
                    )}
                    <span className={passwordChecks.hasUppercase ? "text-green-700" : "text-gray-500"}>
                      At least one uppercase letter
                    </span>
                  </li>
                  <li className="flex items-center text-xs">
                    {passwordChecks.hasNumber ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-gray-300 mr-1" />
                    )}
                    <span className={passwordChecks.hasNumber ? "text-green-700" : "text-gray-500"}>
                      At least one number
                    </span>
                  </li>
                  <li className="flex items-center text-xs">
                    {passwordChecks.hasSpecial ? (
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-gray-300 mr-1" />
                    )}
                    <span className={passwordChecks.hasSpecial ? "text-green-700" : "text-gray-500"}>
                      At least one special character (!@#$%^&*)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>
            
             <div>
              <button 
                type="button" 
                className="w-full flex justify-center items-center gap-3 bg-white text-gray-700 hover:bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg shadow-sm transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 186.69 190.5">
                  <path fill="#4285f4" d="M95.25 77.932v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"/>
                  <path fill="#34a853" d="M41.869 113.38l-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"/>
                  <path fill="#fbbc05" d="M41.869 77.121c-3.295 9.737-5.146 20.118-5.146 30.9 0 10.783 1.851 21.164 5.146 30.9l31.651-24.56c-2.648-7.919-4.022-16.75-4.022-25.339s1.374-17.42 4.022-25.338z"/>
                  <path fill="#ea4335" d="M95.25 37.022c13.994 0 26.516 4.825 36.426 14.241l27.444-27.444C142.963 9.5 121.402 0 95.25 0 57.981 0 25.859 21.408 10.186 52.527l31.651 24.594c7.533-22.514 28.574-40.1 53.413-40.1z"/>
                </svg>
                Continue with Google
              </button>
            </div> 
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="agreeToTerms" 
                  name="agreeToTerms"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeToTerms" className="text-gray-600">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">Privacy Policy</a>
                </label>
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium text-sm transition-all"
              >
                Create Account
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/en/login" className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;