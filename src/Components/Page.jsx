import React, { useEffect, useState } from 'react';
import Conversations from './Conversations';
import UserList from './UserList';
import '../App.css';
import { fetchCsrfToken, fetchUsers, getUsername } from "./api.js";
import User from "./User.jsx";

const Page = () => {
    const [user, setUser] = useState({});
    const [csrfToken, setCsrfToken] = useState(''); // State for csrfToken

    useEffect(() => {
        const fetchTokenAndUser = async () => {
            try {
                const token = await fetchCsrfToken(); // Fetch token asynchronously
                setCsrfToken(token);

                const storedUser = await getUsername();
                const storedUsers = await fetchUsers(token); // Use the fetched token
                const userFound = storedUsers.find(u => u.username === storedUser);

                if (userFound) {
                    setUser({
                        userId: userFound.userId,
                        username: userFound.username,
                        avatar: userFound.avatar
                    });
                } else {
                    console.log("No user found matching the stored username");
                    setUser(null);
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setUser(null);
            }
        };

        fetchTokenAndUser(); // Call the async function to fetch token and user
    }, []); // Empty dependency array means this effect runs only once after the component mounts

    return (
        <div className="page-container">
            {user ? (<User csrfToken={csrfToken} user={user} />) : (<h1>Missing User</h1>)}
        </div>
    );
};

export default Page;
