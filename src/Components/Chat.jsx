import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify'; // För att sanera meddelandeinnehåll
import chatData from './chat.json';



/* const fakeChat = [
  "text": "Tja tja, hur mår du?",
  "avatar": "https://i.pravatar.cc/100?img=14",
  "username": "Johnny",
  "conversationId": null
},
{
  "text": "Hallå!! Svara då!!",
  "avatar": "https://i.pravatar.cc/100?img=14",
  "username": "Johnny",
  "conversationId": null
},
{
  "text": "Sover du eller?! 😴",
  "avatar": "https://i.pravatar.cc/100?img=14",
  "username": "Johnny",
  "conversationId": null
}
]; */

const Chat = () => {
  // State för att hålla alla meddelanden
  const [messages, setMessages] = useState([]);
  // State för att hålla innehållet i ett nytt meddelande
  const [newMessage, setNewMessage] = useState('');
  // State för att hålla CSRF-token
  const [csrfToken, setCsrfToken] = useState('');
  
  // Hämtar användarens autentiseringsdata från localStorage
  const authData = JSON.parse(localStorage.getItem('user'));

  // useEffect som körs vid första renderingen för att hämta CSRF-token
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        // Gör en begäran för att hämta CSRF-token från servern
        const response = await axios.patch('https://chatify-api.up.railway.app/csrf');
        // Sätter CSRF-token i state
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        // Loggar fel om hämtningen av CSRF-token misslyckas
        console.error('Failed to fetch CSRF token:', error);
      }
    };
    
    // Anropar funktionen för att hämta CSRF-token
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
        // Uppdaterar state med de hämtade meddelandena
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    
    // Anropar funktionen för att hämta meddelanden
    fetchMessages();
  }, [authData, csrfToken]);

  // Funktion för att skicka ett nytt meddelande
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    // Sanitering av meddelandet med DOMPurify
    const sanitizedMessage = DOMPurify.sanitize(newMessage);

    try {
      // Skickar en POST-begäran för att skapa ett nytt meddelande
      const response = await axios.post(
        'https://chatify-api.up.railway.app/messages',
        { content: sanitizedMessage }, // Skickar sanerat meddelandeinnehåll
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        }
      );
      // Uppdaterar meddelandelistan med det nya meddelandet
      setMessages((prevMessages) => [...prevMessages, response.data]);
      // Tömmer inputfältet för nya meddelanden
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Funktion för att radera ett meddelande
  const handleDeleteMessage = async (messageId) => {
    try {
      // Skickar en DELETE-begäran till API:t för att ta bort ett meddelande
      await axios.delete(`https://chatify-api.up.railway.app/messages/${messageId}`, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
          'X-CSRF-Token': csrfToken,
        },
      });
      // Filtrerar bort det raderade meddelandet från state
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <img src={authData.avatar} alt="Avatar" />
      <p>{authData.username}</p>
      <div>
        {/* Visa alla meddelanden */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.userId === authData.id ? 'my-message' : 'other-message'}
            style={{
              display: 'flex',
              justifyContent: msg.userId === authData.id ? 'flex-end' : 'flex-start',
            }}
          >
            <div>
              <p>{msg.text}</p>
              {/* Visa en "Radera"-knapp endast för användarens egna meddelanden */}
              {msg.userId === authData.id && (
                <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
              )}
            </div>
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

