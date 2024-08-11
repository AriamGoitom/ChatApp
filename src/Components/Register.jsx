import React, { useState } from 'react';

const Register = (props) => {
  const [name, setName] = useState(''); // Lade till state för fullständigt namn
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Skapa ett objekt för att hålla data som ska skickas till API:et
    const userData = {
      name: name,
      username: username,
      email: email,
      password: pass
    };

    try {
      const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Hantera framgångsrik registrering, t.ex. vidarebefordra användaren till en annan sida eller visa ett meddelande.
      } else {
        const errorData = await response.json();
        console.log('Registration failed:', errorData);
        // Hantera fel vid registreringen, t.ex. visa ett felmeddelande.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" placeholder="full name" />
        <label htmlFor="username">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" id="username" name="username" />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
  );
}

export default Register;
