import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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
        <label htmlFor="avatar">Avatar (optional)</label>
        <input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://i.pravatar.cc/200"
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p className="success" style={{ color: 'green' }}>{successMessage}</p>}
      <button className="link-btn" onClick={() => navigate('/login')}>Already have an account? Login here.</button>
    </div>
  );
};

export default Register;




















/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = (props ) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [avatar, setAvatar] = useState(''); 
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); // Ny state för bekräftelsemeddelande
  
  const navigate = useNavigate();

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
    setError('');
    setSuccessMessage(''); // Återställ bekräftelsemeddelandet vid nytt försök

    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/register', {
        username,
        email,
        password: pass,
        avatar, 
        csrfToken
      });

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        setSuccessMessage('Registration successful! You can now log in.');
        setTimeout(() => {
          navigate('/login'); // Omdirigera till inloggningssidan efter några sekunder
        }, 3000); // 3 sekunders delay
      } else {
        console.log('Registration failed:', response.data);
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

  return (
    <div className="auth-form-container">
      <h2>R e g i s t e r</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          type="text" 
          placeholder="username" 
          name="username" 
          required
        />
        <label htmlFor="email">Email</label>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          placeholder="youremail@gmail.com" 
          id="email" 
          name="email" 
          required
        />
        <label htmlFor="password">Password</label>
        <input 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
          type="password" 
          placeholder="*******" 
          name="password" 
          required
        />
        <label htmlFor="avatar">Choose Avatar</label>
        <input 
          value={avatar} 
          onChange={(e) => setAvatar(e.target.value)} 
          type="text" 
          placeholder="https://i.pravatar.cc/200" 
          id="avatar" 
          name="avatar" 
        />
        <button type="submit">Register</button>
      </form>
      
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>} {/* Visa felmeddelande om det finns ett */
      /* {successMessage && <p className="success" style={{ color: 'green' }}>{successMessage}</p>} {/* Visa bekräftelsemeddelande om registreringen lyckas */
      
      /* <button className="link-btn" onClick={() => navigate('/login')}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default Register; 
  */





