import React from 'react';
import { Button } from '@mui/material';
import FriendService from "../service/FriendService";

const FriendRequestComponent = ({ friendRequest }) => {
    const handleAccept = async () => {
        console.log("friendRequest.requestId: " + friendRequest.requestId);
        try {
            if (friendRequest && friendRequest.requestId !== undefined) {
                const response = await FriendService.acceptFriendRequest(friendRequest.requestId);
                console.log(response);
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async () => {
        console.log("friendRequest.requestId: " + friendRequest.requestId);
        try {
            if (friendRequest && friendRequest.requestId !== undefined) {
                const response = await FriendService.rejectFriendRequest(friendRequest.requestId);
                console.log(response);
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    return (
        <div>
            <h3>Friend Request</h3>
            <p>Sender ID: {friendRequest.senderId}</p>
            <p>Status: {friendRequest.status}</p>
            {friendRequest.status === 'Pending' && (
                <>
                    <Button variant="contained" onClick={handleAccept}>
                        Accept
                    </Button>
                    <Button variant="contained" onClick={handleReject}>
                        Reject
                    </Button>
                </>
            )}
        </div>
    );
};

export default FriendRequestComponent;
