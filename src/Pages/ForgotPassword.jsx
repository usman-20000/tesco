import React, { useState } from 'react';
import '../styles/SignUp.css';
import { BaseUrl } from '../Assets/Data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    retypepassword: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed!');
      }
      localStorage.setItem('id', data.id); // Store the user ID in local storage
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendOtp = async () => {
    if (!formData.email) {
      alert('Enter your email');
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const json = await response.json();
      console.log('Response JSON:', json); // Log the response from the server
    } catch (error) {
      console.error('Error during OTP request:', error);
      alert('An error occurred while sending the OTP. Please try again later.');
    }
  };

  const renderPasswordInput = (name, placeholder) => (
    <div className="form-group">
      <label htmlFor={name}>{placeholder}</label>
      <div className="flex flex-row items-center w-full border rounded-md bg-white">
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          required
          className="p-[8px] w-[90%] border-none rounded-md bg-white outline-none bg-transparent"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="w-[10%] flex flex-col items-center"
        >
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="text-black text-[14px]"
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="signin-container mt-4">
      <h2>
        Forgot <span style={{ color: '#5D8736' }}>Tesco Account</span>
      </h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="button"
          onClick={sendOtp}
          className="text-xs text-[#347928] underline text-left w-[100px] mb-2"
        >
          Send Otp
        </button>
      </form>
      <div className="form-group">
        <label htmlFor="otp">Enter Otp</label>
        <input
          type="text"
          id="otp"
          name="otp"
          placeholder="Enter your Otp"
          value={formData.otp}
          onChange={handleChange}
          required
        />
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        {formData.otp && (
          <>
            {renderPasswordInput('password', 'Enter your password')}
            {renderPasswordInput('retypepassword', 'Retype your password')}
          </>
        )}
        <button type="submit" className="signup-button">
          Verify
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;