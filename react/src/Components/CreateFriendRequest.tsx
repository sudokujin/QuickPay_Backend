import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import FriendService from '../service/FriendService.ts';

const CreateFriendRequest = ({ onFriendRequestCreate, accountId }) => {
    const [friendId, setFriendId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const senderId = accountId;
            if (!friendId || friendId === senderId) {
                setError('Invalid friend ID');
                return;
            }

            setError('');
            await FriendService.createFriendRequest(parseInt(senderId), parseInt(friendId), 'Pending');
            onFriendRequestCreate(); // Notify the parent component about the new request
        } catch (error) {
            console.error('Error creating friend request:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Friend ID"
                value={friendId}
                onChange={(e) => setFriendId(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Send Friend Request
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default CreateFriendRequest;

