import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.patch('https://chatify-api.up.railway.app/csrf');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username: username,
        password: pass,
        csrfToken: csrfToken,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true); // Uppdatera inloggningsstatus
        navigate('/chat'); // Omdirigera till chatkomponenten
        console.log('User logged in', response.data);
      } else {
        console.log('Error with login', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>L o g i n</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username👼🏽</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username" />
        <label htmlFor="password">Password🔐</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*******" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
    </div>
  );
};

export default Login;