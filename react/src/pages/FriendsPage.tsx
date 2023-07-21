import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import FriendsList from '../Components/FriendsList.tsx';
import FriendRequestComponent from '../Components/FriendRequestComponent.tsx';
import CreateFriendRequestComponent from '../Components/CreateFriendRequest.tsx';
import FriendService from "../service/FriendService";

interface FriendRequest {
    requestId: number;
    senderId: number;
    receiverId: number;
    status: string;
}

interface Friend {
    id: number;
    accountId: number;
    friendId: number;
}

const FriendsPage = () => {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        fetchFriendRequestsAndFriends();
    }, []);

    const fetchFriendRequestsAndFriends = async () => {
        try {
            if (accountId) {
                const responseFriendRequests = await FriendService.getFriendRequests(parseInt(accountId));
                setFriendRequests(responseFriendRequests.data);

                const responseFriends = await FriendService.getFriendsByAccountId(parseInt(accountId));
                setFriends(responseFriends.data);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleAccept = async (requestId: number) => {
        try {
            await FriendService.acceptFriendRequest(requestId);
            fetchFriendRequestsAndFriends(); // Refresh the friend requests and friends list after accepting the request
        } catch (error) {
            console.log('Error accepting friend request:', error);
        }
    };

    const handleReject = async (requestId: number) => {
        try {
            await FriendService.rejectFriendRequest(requestId);
            fetchFriendRequestsAndFriends(); // Refresh the friend requests and friends list after rejecting the request
        } catch (error) {
            console.log('Error rejecting friend request:', error);
        }
    };

    const handleFriendRequestCreate = () => {
        fetchFriendRequestsAndFriends();
    };

    // Filter receiver's friend requests
    const receiverFriendRequests = friendRequests.filter(request => request.receiverId === parseInt(accountId));

    // Filter unique friend IDs to avoid duplication
    const uniqueFriendIds = new Set<number>();
    const uniqueFriends = friends.filter(friend => {
        if (!uniqueFriendIds.has(friend.accountId) && !uniqueFriendIds.has(friend.friendId)) {
            uniqueFriendIds.add(friend.accountId);
            uniqueFriendIds.add(friend.friendId);
            return true;
        }
        return false;
    });

    return (
        <MainPage>
            <CreateFriendRequestComponent onFriendRequestCreate={handleFriendRequestCreate} />
            <FriendsList friends={uniqueFriends} />
            <div>
                <h2>Friend Requests</h2>
                {receiverFriendRequests.map((request) => (
                    <FriendRequestComponent
                        key={request.requestId}
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
