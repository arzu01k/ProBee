import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./LoginPage.css";
import logo from '../logoprobee.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const loginInfo = localStorage.getItem("username")

  if(loginInfo){
    window.location.href = `/MyProjects`;
  }

  const handleSubmit = async (e)=> {
    e.preventDefault()
    console.log('Form submitted.')

    const payload = {
      username,
      password,
    };
    
    try {
      const response = await axios.post('http://localhost:8000/users/login', payload);

      console.log('Login successful:', response.data.userData);
      localStorage.setItem("username", username);
      localStorage.setItem("role", response.data.userData.role);
      window.location.href = `/MyProjects`;

    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

    return (
        <div className="login-container">
        <div className="login-logo">
          <img
            src={logo}
            alt="PROBee Logo"
            className="logo-image"
          />
          <h1>PROBee</h1>
        </div>
  
        <form className="input-container" 
            onSubmit={handleSubmit}
            >
            
          <div className="input-wrapper">
            <span className="icon">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Log in</button>
        </form>
      </div>
    );
};

export default LoginPage;