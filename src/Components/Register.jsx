import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [avatar, setAvatar] = useState(''); // Ny state för avatar
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.patch('https://chatify-api.up.railway.app/csrf');
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        setError('Failed to fetch CSRF token');
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/register', {
        username,
        email,
        password: pass,
        avatar, // Inkludera avatar i registreringsdata
        csrfToken
      });

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        // Hantera framgångsrik registrering
      } else {
        console.log('Registration failed:', response.data);
        // Hantera registreringsfel
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registration failed');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username" />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***" id="password" name="password" />
        <label htmlFor="avatar">Avatar URL</label>
        <input value={avatar} onChange={(e) => setAvatar(e.target.value)} type="text" placeholder="https://i.pravatar.cc/200" id="avatar" name="avatar" />
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  );
};

export default Register;