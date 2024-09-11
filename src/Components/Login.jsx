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
        const { token, userId, avatar } = response.data;

        localStorage.setItem('user', JSON.stringify({
          userId,
          username: response.data.username,
          avatar,
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


















/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.patch('https://chatify-api.up.railway.app/csrf');
        console.log('Fetched CSRF Token:', response.data.csrfToken); // Debug logg
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Sending CSRF Token:', csrfToken); // Debug logg
    console.log('Sending Credentials:', { username, password });

    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username,
        password,
        csrfToken,
      });

      console.log('Login Response:', response.data); // Debug logg

      if (response.status === 200) {
        login(response.data); 
        navigate('/chat'); 
      }
    } catch (error) {
      console.error('Error:', error);
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

export default Login; */



















/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState(''); // Ny state för att hantera felmeddelanden
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
    setError(''); // Återställ felmeddelande vid nytt försök

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
        setError('Login failed');
        console.log('Error with login', response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 401) {
        // 401 Unauthorized betyder att användaren angav fel inloggningsuppgifter
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
        <label htmlFor="username">Username</label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          type="text" 
          placeholder="username"
          name="username" 
        />
        <label htmlFor="password">Password</label>
        <input 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          type="password" 
          placeholder="*******" 
          name="password" 
        />
        <button type="submit">Login</button>
      </form>
      
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>} {/* Visa felmeddelande om det finns ett */

      /* <button className="link-btn" onClick={() => navigate('/register')}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};

export default Login;  */