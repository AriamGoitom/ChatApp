import React, { useState, useEffect, useRef } from "react";
import DOMPurify from "dompurify";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const endOfMessagesRef = useRef(null); // Reference to scroll to the bottom

  const authData = JSON.parse(localStorage.getItem("user"));
  const token = authData?.token;
  const username = authData?.username;
  const avatar = authData?.avatar;
  const userId = authData?.userId;

  // Fetch messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) {
        console.error("No token found in authData");
        return;
      }
      
      setLoading(true); // Start loading

      try {
        const response = await fetch("https://chatify-api.up.railway.app/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          setErrorMessage("Failed to fetch messages.");
          console.error("Failed to fetch messages:", response.statusText);
        }
      } catch (error) {
        setErrorMessage("Error fetching messages.");
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchMessages();
  }, [token]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const sanitizedMessage = DOMPurify.sanitize(newMessage);
    setLoading(true);

    try {
      const response = await fetch("https://chatify-api.up.railway.app/messages", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: sanitizedMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
      } else {
        setErrorMessage("Failed to send message.");
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      setErrorMessage("Error sending message.");
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a message
  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(`https://chatify-api.up.railway.app/messages/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
        console.log("Message deleted:", messageId);
      } else {
        console.error("Failed to delete message:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      {avatar && <img src={avatar} alt="Avatar" />}
      <p>{username}</p>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.userId === userId ? "my-message" : "other-message"}
              style={{ display: "flex", justifyContent: msg.userId === userId ? "flex-end" : "flex-start" }}
            >
              <div>
                {msg.userId !== userId && <img src={msg.avatar || 'https://i.pravatar.cc/100'} alt={msg.username} style={{ width: '30px', borderRadius: '50%' }} />}
                <p>{msg.text}</p>
                {msg.userId === userId && (
                  <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={endOfMessagesRef} /> {/* Scroll to this div */}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage} disabled={loading}>Send</button>
    </div>
  );
};

export default Chat;
