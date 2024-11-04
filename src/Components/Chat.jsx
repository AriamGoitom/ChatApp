import React, { useState, useEffect } from 'react';
import { fetchMessages, sendMessage, deleteMessage } from './api';
import '../App.css';

const Chat = ({ conversationId, userId, csrfToken }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [refreshMessages, setRefreshMessages] = useState(false);
    const [deleting, setDeleting] = useState(false);  // State to manage deleting status

    useEffect(() => {
        const intervalId = setInterval(() => {
            const loadMessages = async () => {
                const msgs = await fetchMessages(conversationId, csrfToken);
                setMessages(msgs);
            };

            loadMessages();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [conversationId, csrfToken]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                await sendMessage(conversationId, newMessage, csrfToken);
                setNewMessage('');
                setRefreshMessages(prev => !prev);
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    const handleDeleteMessage = async (messageId) => {
        setDeleting(true);  // Activate deleting status
        try {
            await deleteMessage(conversationId, messageId, csrfToken);
            setTimeout(() => setDeleting(false), 1000);  // Turn off deleting status after a delay
            setRefreshMessages(prev => !prev);
        } catch (error) {
            console.error('Failed to delete message:', error);
            setDeleting(false);
        }
    };

    return (
        <div>
            {deleting && <div className="deleting-message">Deleting...</div>}
            <div className="chat-messages-container">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.userId === userId ? 'my-message' : 'other-message'}`}>
                        <p>{msg.text}</p>
                        <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button className='send-button' onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
