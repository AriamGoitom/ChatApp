import axios from 'axios';
import {v4 as uuidv4} from "uuid";

const API_BASE_URL = 'https://chatify-api.up.railway.app';

export const getUsername = () => {
    const username = JSON.parse(localStorage.getItem('user')).username;
    return username;
};

export const createAuthHeaders = (csrfToken) => ({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken,
});

export async function fetchCsrfToken() {
    try {
        const response = await axios.patch(`${API_BASE_URL}/csrf`);
        return response.data.csrfToken;
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
        return '';
    }
}

export async function fetchUser(csrfToken, userId) {
    try {
        const headers = createAuthHeaders(csrfToken)
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`, { headers });
        return response.data[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return {};
    }
}

export async function fetchConversations(csrfToken) {
    try {
        const headers = createAuthHeaders(csrfToken)
        const response = await axios.get(`${API_BASE_URL}/conversations`, { headers });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch conversations:', error);
        return [];
    }
}

export const invite = async (userId, csrfToken) => {
    try {
        const headers = createAuthHeaders(csrfToken);
        const postData = { conversationId: uuidv4() }; // Generates a new UUID for each invitation
        await axios.post(`${API_BASE_URL}/invite/${userId}`, postData, { headers });

        const response = await axios.post(
            `${API_BASE_URL}/messages/`,
            { text: 'Invitation sent!', conversationId: postData.conversationId },
            { headers }
        );

        return('Invite sent!');
    } catch (error) {
        console.error('Failed to send invite:', error);
        return(error);
    }
};

export const fetchUsers = async (csrfToken) => {
    try {
        const headers = createAuthHeaders(csrfToken);
        const response = await axios.get(`${API_BASE_URL}/users`, { headers });
        const sortedUsers = response.data.sort((a, b) => a.username.localeCompare(b.username));
        return(sortedUsers);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return([]);
    }
};

export const acceptInvitation = async (conversationId, csrfToken) => {
    try {
        const headers = createAuthHeaders(csrfToken);
        const response = await axios.post(
            `${API_BASE_URL}/messages/`,
            { text: 'Invitation accepted!', conversationId },
            { headers }
        );
        return await response.data;
    } catch (error) {
        console.error('Failed to accept invitation:', error);
        return null;
    }
};

export const fetchMessages = async (conversationId, csrfToken) => {
    try {
        const headers = createAuthHeaders(csrfToken);
        const response = await axios.get(`${API_BASE_URL}/messages/?conversationId=${conversationId}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        return [];
    }
};

export const sendMessage = async (conversationId, message, csrfToken) => {
    try {
        const headers = createAuthHeaders(csrfToken);
        const response = await axios.post(
            `${API_BASE_URL}/messages/?conversationId=${conversationId}`,
            { text: message, conversationId },
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('Failed to send message:', error);
        return null;
    }
};

export const deleteMessage = async (conversationId, messageId, csrfToken) => {
    try {
        const headers = createAuthHeaders(csrfToken);
        await axios.delete(`${API_BASE_URL}/messages/${messageId}`, { headers });
        return true;
    } catch (error) {
        console.error('Failed to delete message:', error);
        return false;
    }
};
