import React, { useState, useEffect } from 'react';
import {fetchConversations, fetchUsers, getUsername, invite} from "./api.js";
import User from "./User.jsx";

const UserList = (csrfToken) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            try {
                const storedUsers = await fetchUsers(csrfToken);
                setUsers(storedUsers);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setUsers([]);
            }
        }
        loadUsers();
    }, []);

    const handleInvite = async (userId) => {
        alert(invite(userId, csrfToken));
    };

    return (
        <>
            <ul className="user-list-container">
                {users.map(user => (
                    <li key={user.userId} className="user-entry">
                        <img src={user.avatar || '/q.jpg'} alt="avatar" className="avatar"/>
                        <span>{user.username}</span>
                        <button onClick={() => handleInvite(user.userId)}>Invite</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default UserList;
