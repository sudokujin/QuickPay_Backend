package com.quickpay.controller;

import com.quickpay.dao.FriendRequestDao;
import com.quickpay.dao.FriendsDao;
import com.quickpay.model.FriendRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/friendrequest")
public class FriendRequestController {

    private FriendRequestDao friendRequestDao;
    private FriendsDao friendsDao;

    public FriendRequestController(FriendRequestDao friendRequestDao, FriendsDao friendsDao) {
        this.friendRequestDao = friendRequestDao;
        this.friendsDao = friendsDao; // Initialize the friendsDao field
    }

    @PostMapping
    public void createFriendRequest(Integer accountId, Integer friendId, String status) {
        friendRequestDao.sendFriendRequest(accountId, friendId, status);
    }

    @PutMapping("/accept/{requestId}")
    public void acceptFriendRequest(@PathVariable Integer requestId) {
        friendRequestDao.acceptFriendRequest(requestId);
        int senderId = friendRequestDao.getFriendRequest(requestId).getSenderId();
        int receiverId = friendRequestDao.getFriendRequest(requestId).getReceiverId();

        friendsDao.addFriend(senderId, receiverId);
    }

    @PutMapping("/reject/{requestId}")
    public void rejectFriendRequest(@PathVariable Integer requestId) {
        friendRequestDao.rejectFriendRequest(requestId);
    }

    @DeleteMapping
    public void deleteFriendRequest(Integer accountId, Integer friendId) {
        friendRequestDao.deleteFriendRequest(accountId, friendId);
    }

    @GetMapping("/{accountId}")
    public List<FriendRequest> getAllFriendRequests(@PathVariable Integer accountId) {
        return friendRequestDao.getAllFriendRequests(accountId);
    }
}