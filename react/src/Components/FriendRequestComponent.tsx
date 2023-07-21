import React from 'react';
import { Button, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import FriendService from '../service/FriendService.ts';

const FriendRequestComponent = ({ friendRequest, onAccept, onReject }) => {
    const handleAccept = async () => {
        try {
            if (friendRequest && friendRequest.requestId !== undefined) {
                await FriendService.acceptFriendRequest(friendRequest.requestId);
                onAccept(friendRequest.requestId); // Notify the parent component about the accepted request
            }
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleReject = async () => {
        try {
            if (friendRequest && friendRequest.requestId !== undefined) {
                await FriendService.rejectFriendRequest(friendRequest.requestId);
                onReject(friendRequest.requestId); // Notify the parent component about the rejected request
            }
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Sender" src="/static/images/avatar.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <span style={{ color: 'blue' }}>{`Sender ID: ${friendRequest.senderId}`}</span>
                    }
                    secondary={
                        <span style={{ color: 'blue' }}>{`Status: ${friendRequest.status}`}</span>
                    }
                />
            </ListItem>
            {friendRequest.status === 'Pending' && (
                <React.Fragment>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAccept}
                        sx={{
                            marginRight: '10px',
                            width: '100%',
                        }}
                    >
                        Accept
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleReject}
                        sx={{
                            width: '100%',
                        }}
                    >
                        Reject
                    </Button>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default FriendRequestComponent;
