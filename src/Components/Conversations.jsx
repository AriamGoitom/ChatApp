import React, { useState, useEffect } from 'react';
import { fetchConversations } from './api';
import Chat from './Chat';

const Conversations = ({ csrfToken, userId }) => {
    const [conversationIds, setConversationIds] = useState([]);

    useEffect(() => {
        const loadConversations = async () => {
            const ids = await fetchConversations(csrfToken);
            setConversationIds(ids);
        };

        if (userId) {
            loadConversations();
        }
    }, [csrfToken, userId]);

    return (
        <div>
            {conversationIds.length > 0 ?
                conversationIds.map(id => (
                    <div key={id} className="conversation-container">
                        <h3>Conversation {id.substring(0, 8)}</h3>
                        <Chat conversationId={id} userId={userId} csrfToken={csrfToken}/>
                    </div>
                ))
                : <p>No conversations</p>
            }
        </div>

    );
};

export default Conversations;
