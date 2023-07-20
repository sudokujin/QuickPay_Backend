package com.quickpay.dao;

import com.quickpay.model.FriendRequest;

import java.util.List;

public interface FriendRequestDao {
    void sendFriendRequest(int senderId, int receiverId, String status);

    void acceptFriendRequest(Integer requestId);

    void rejectFriendRequest(Integer requestId);

    void deleteFriendRequest(int senderId, int receiverId);

    String getFriendRequestStatus(Integer accountId, Integer friendId);

    List<FriendRequest> getFriendRequestsByAccountId(Integer accountId);

    List<FriendRequest> getAllFriendRequests(Integer accountId);

    FriendRequest getFriendRequest(Integer requestId);
}
