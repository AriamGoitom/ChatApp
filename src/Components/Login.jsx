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
        username: username,
        password: password,
        csrfToken: ''
      });

      if (response.status === 200) {
        const { token } = response.data;

        localStorage.setItem('user', JSON.stringify({
          username,
          token
        }));

        navigate('/chat');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
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
