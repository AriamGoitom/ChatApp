import React, { useEffect, useState } from 'react';
import { fetchUser, acceptInvitation } from './api';
import UserList from "./UserList.jsx";
import Conversations from "./Conversations.jsx";
import Chat from "./Chat.jsx";

const User = ({ csrfToken, user: initialUser }) => {
    const [user, setUser] = useState(initialUser);
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const fetchedUser = await fetchUser(csrfToken, initialUser.userId);
                setUser(fetchedUser);
                const invites = JSON.parse(fetchedUser.invite || '[]');
                setInvitations(invites);
            } catch (error) {
                console.error('Failed to load user details:', error);
                setUser(null);
            }
        };

        if (initialUser.userId) {
            loadUser();
        }
    }, [initialUser, csrfToken]);

    if (!user) {
        return <h1>Loading...</h1>;
    }

    return (
        <>
            <div className="left-column">
                <div className='user-container'>
                    <h1>ID: {user.id}</h1>
                    <h1>USER: {user.username}</h1>
                    <center>
                    <img src={user.avatar} alt={`${user.username}'s avatar`} className="avatar"/>
                    </center>
                </div>
                <div className='chat-container'>
                    <UserList csrfToken={csrfToken}/>
                </div>
            </div>
            <div className="right-column">
                <Conversations csrfToken={csrfToken} userId={user.id}/>
                {invitations.length > 0 ? invitations.map((invite, index) => (
                    <div key={index} className="invitation-container">
                        <p>Invite from {invite.username}</p>
                        <Chat conversationId={invite.conversationId}  userId={user.id} csrfToken={csrfToken}/>
                    </div>
                )) : <p>No invitations</p>}
            </div>
        </>
    );
}


export default User;
