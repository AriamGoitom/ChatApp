import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [showAvatarSelection, setShowAvatarSelection] = useState(false); // Nytt tillstånd
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Exempel på avatar-URL:er
  const avatars = [
    'https://i.pravatar.cc/200?img=7',
    'https://i.pravatar.cc/200?img=16',
    'https://i.pravatar.cc/200?img=49',
    'https://i.pravatar.cc/200?img=51',
    'https://i.pravatar.cc/200?img=64',
  ];

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.patch('https://chatify-api.up.railway.app/csrf');
        console.log('Fetched CSRF Token:', response.data.csrfToken); // Debug logg
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
    setError('');
    setSuccessMessage('');

    console.log('Sending CSRF Token:', csrfToken); // Debug logg
    console.log('Sending Registration Data:', { username, email, password, avatar });

    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/register', {
        username,
        email,
        password,
        avatar,
        csrfToken,
      });

      console.log('Registration Response:', response.data); // Debug logg

      if (response.status === 200) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 409) {
        setError('Username or email already exists');
      } else {
        setError('Registration failed');
      }
    }
  };

  // Funktion för att hantera avatarval
  const handleAvatarSelect = (selectedAvatar) => {
    setAvatar(selectedAvatar);
    setShowAvatarSelection(false); // Dölj avatarvalet när en avatar är vald
  };

  return (
    <div className="auth-form-container">
      <h2>R e g i s t e r</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <label htmlFor="avatar">Avatar (optional)</label>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://i.pravatar.cc/200"
        /> */}
        
        
        <button type="button" onClick={() => setShowAvatarSelection(!showAvatarSelection)}>
          {showAvatarSelection ? 'Close Avatars' : 'Choose Avatar'}
        </button>

        {/* Visa avatarval om användaren klickat på knappen */}
        {showAvatarSelection && (
          <div className="avatar-selection">
            {avatars.map((avatarUrl, index) => (
              <img
                key={index}
                src={avatarUrl}
                alt={`Avatar ${index + 1}`}
                style={{ width: '50px', height: '50px', cursor: 'pointer', margin: '5px' }}
                onClick={() => handleAvatarSelect(avatarUrl)}
              />
            ))}
          </div>
        )}

        <button type="submit">Register</button>
      </form>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p className="success" style={{ color: 'green' }}>{successMessage}</p>}
      <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
    </div>
  );
};

export default Register;

