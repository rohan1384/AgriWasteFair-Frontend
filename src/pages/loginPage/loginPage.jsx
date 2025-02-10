import React, { useState } from 'react';
import './loginForm.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(['user']);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8081/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(res);
      if (res.status === 200) {
        const { id } = res.data; // Assuming response contains an `id`
        const expires = new Date();
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
        setCookies('id', id, { path: '/', expires });
        setCookies('mail', email, { path: '/', expires });
        navigate(`/dashboard/${id}`);
      } else {
        alert('Either email/password is wrong');
      }
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        console.error('Error Response:', error.response);
        alert(`Error: ${error.response.status} - ${error.response.data.message || 'Login failed. Please try again.'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server. Please check if the server is running and try again.');
      } else {
        console.error('Error:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="loginForm">
      <div className="header-text">Login Form</div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your Email Address"
          type="email"
          required
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your Password"
          type="password"
          required
        />
        <Button type="submit" id="button" variant="contained">
          Login
        </Button>
        <span>
          Or Click here to <a href="/register">Register</a>
        </span>
      </form>
    </div>
  );
}

export default LoginForm;
