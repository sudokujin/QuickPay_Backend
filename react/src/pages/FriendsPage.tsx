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

  const fetchFriendRequestsAndFriends = async () => {
    try {
      if (accountId) {
        // Fetch both sender and receiver friend requests
        const responseFriendRequests = await FriendService.getFriendRequests(parseInt(accountId));
        setFriendRequests(responseFriendRequests.data);

        // Fetch friends for the logged-in user
        const responseFriends = await FriendService.getFriendsByAccountId(parseInt(accountId));
        setFriends(responseFriends.data);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFriendRequestsAndFriends();
    const intervalId = setInterval(fetchFriendRequestsAndFriends, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval on component unmount
    };
  }, [accountId]); // Use accountId as a dependency to re-fetch on account change

  const handleAccept = async (requestId: number) => {
    try {
      await FriendService.acceptFriendRequest(requestId);
      fetchFriendRequestsAndFriends(); // Refresh friend requests and friends list after accepting the request
    } catch (error) {
      console.log('Error accepting friend request:', error);
    }
  };

  const handleReject = async (requestId: number) => {
    try {
      await FriendService.rejectFriendRequest(requestId);
      fetchFriendRequestsAndFriends(); // Refresh friend requests and friends list after rejecting the request
    } catch (error) {
      console.log('Error rejecting friend request:', error);
    }
  };

  const handleFriendRequestCreate = () => {
    fetchFriendRequestsAndFriends();
  };

  return (
    <MainPage>
      <CreateFriendRequestComponent onFriendRequestCreate={handleFriendRequestCreate} accountId={accountId} />
      <FriendsList friends={friends} />
      <div>
        <h2>Friend Requests</h2>
        {friendRequests
          .filter((request) => request.receiverId === parseInt(accountId))
          .map((request) => (
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

