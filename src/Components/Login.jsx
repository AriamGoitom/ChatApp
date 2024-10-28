import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username,
        password
      });

      console.log('Response data:', response.data); // Log the response to check if a token is returned

      if (response.status === 200) {
        const { token, userId, avatar } = response.data;

         // Check if token exists
        if (token) {
          // Save user data in localStorage
          localStorage.setItem('user', JSON.stringify({
            userId,
            username,
            avatar,
            token
          }));

          // Confirm data was saved correctly
          console.log('Saved to localStorage:', JSON.parse(localStorage.getItem('user')));

          // Navigate to the chat page
          navigate('/chat');
        } else {
          setError('No token received from server');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="auth-form-container">
      <h2>L o g i n</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username👼🏽</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password🔐</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      <button className="link-btn" onClick={() => navigate('/register')}>Don't have an account? Register here.</button>
    </div>
  );
};

export default Login;