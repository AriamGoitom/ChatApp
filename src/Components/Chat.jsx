
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  
  const authData = JSON.parse(localStorage.getItem('user'));

  // Hämta CSRF-token vid första renderingen
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

  // Hämta meddelanden när komponenten laddas
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://chatify-api.up.railway.app/messages', {
          headers: { 
            Authorization: `Bearer ${authData.token}`,
            'X-CSRF-Token': csrfToken
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [authData, csrfToken]);

  // Hantera meddelandeskick
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post(
        'https://chatify-api.up.railway.app/messages',
        { content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        }
      );
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <img src={authData.avatar} alt="Avatar" />
      <p>{authData.username}</p>
      <div>
        {messages.map((msg) => (
          <div key={msg.id} className={msg.userId === authData.id ? 'my-message' : 'other-message'}>
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;




















/* import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Importera useAuth från AuthContext


const Chat = () => {
  const { authData } = useAuth();

    if (!authData) {
        return null;
    }

  return (
    <div>
      <h2>Chat</h2>
      <Link to="/profile"></Link>
      <img src={authData.avatar} alt="Avatar" />
      <p>{authData.username}</p>
    </div>
  );
}

export default Chat */





/* 


import React from 'react';
import { useAuth } from './AuthContext'; // Importera useAuth från AuthContext

const Chat = () => {
    const { authData } = useAuth();

    if (!authData) {
        return null;
    }

    return (
        <div>
            <img src={authData.avatar} alt="Avatar" />
            <p>{authData.username}</p>
        </div>
    );
};

export default Chat;
 */