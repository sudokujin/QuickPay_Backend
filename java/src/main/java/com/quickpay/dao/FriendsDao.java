package com.quickpay.dao;

import com.quickpay.model.Friends;

import java.util.List;

public interface FriendsDao {
    void addFriend(int userId, int friendId);

    void removeFriend(int userId, int friendId);

    List<Friends> getFriendsByAccountId(Integer accountId);
}
