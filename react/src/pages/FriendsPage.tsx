import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import FriendsList from './FriendsList';
import FriendRequestComponent from './FriendRequestComponent';
import FriendService from "../service/FriendService";

interface FriendRequest {
    requestId: number;
    senderId: number;
    receiverId: number;
    status: string;
}

const FriendsPage = () => {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [friends, setFriends] = useState<FriendRequest[]>([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const accountId = localStorage.getItem('accountId');
                const response = await FriendService.getFriendRequests(accountId);
                const requests: FriendRequest[] = response.data; // Assuming the response data is an array of FriendRequest objects
                setFriendRequests(requests);
            } catch (error) {
                console.log('Error fetching friend requests:', error);
            }
        };

        const fetchFriends = async () => {
            try {
                const accountId = localStorage.getItem('accountId');
                const response = await FriendService.getFriendsByAccountId(accountId);
                const friends: FriendRequest[] = response.data; // Assuming the response data is an array of FriendRequest objects
                setFriends(friends);
            } catch (error) {
                console.log('Error fetching friends:', error);
            }
        };

        fetchFriendRequests();
        fetchFriends();
    }, []);

    const handleAccept = async (requestId: number) => {
        try {
            console.log('Accepting friend request with requestId:', requestId);
            await FriendService.acceptFriendRequest(requestId);
            // Update the friendRequests state to reflect the accepted request
            setFriendRequests((prevState) => {
                return prevState.map((request) => {
                    if (request.requestId === requestId) {
                        return { ...request, status: 'Accepted' };
                    }
                    return request;
                });
            });
            // Fetch updated friends list
            fetchFriends();
        } catch (error) {
            console.log('Error accepting friend request:', error);
        }
    };

    const handleReject = async (requestId: number) => {
        try {
            console.log('Rejecting friend request with requestId:', requestId);
            await FriendService.rejectFriendRequest(requestId);
            // Update the friendRequests state to reflect the rejected request
            setFriendRequests((prevState) => {
                return prevState.filter((request) => request.requestId !== requestId);
            });
        } catch (error) {
            console.log('Error rejecting friend request:', error);
        }
    };

    return (
        <MainPage>
            <FriendsList friends={friends} />
            <div>
                <h2>Friend Requests</h2>
                {friendRequests.map((request) => (
                    <FriendRequestComponent
                        key={`${request.requestId}-${request.senderId}`}
                        friendRequest={request}
                        onAccept={handleAccept}
                        onReject={handleReject}
                    />
                ))}
            </div>
        </MainPage>
    );
};

export default FriendsPage;