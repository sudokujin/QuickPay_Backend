package com.quickpay.controller;

import com.quickpay.dao.FriendRequestDao;
import com.quickpay.model.FriendRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/friendrequest")
public class FriendRequestController {

    private FriendRequestDao friendRequestDao;

    public FriendRequestController(FriendRequestDao friendRequestDao) {
        this.friendRequestDao = friendRequestDao;
    }

    @PostMapping
    public void createFriendRequest(Integer accountId, Integer friendId, String status) {
        friendRequestDao.sendFriendRequest(accountId, friendId, status);
    }

    @PutMapping("/accept")
    public void acceptFriendRequest(Integer accountId, Integer friendId) {
        friendRequestDao.acceptFriendRequest(accountId, friendId);
    }

    @PutMapping("/reject")
    public void rejectFriendRequest(Integer accountId, Integer friendId) {
        friendRequestDao.rejectFriendRequest(accountId, friendId);
    }

    @DeleteMapping
    public void deleteFriendRequest(Integer accountId, Integer friendId) {
        friendRequestDao.deleteFriendRequest(accountId, friendId);
    }

    @GetMapping
    public String getFriendRequestStatus(Integer accountId, Integer friendId) {
        return friendRequestDao.getFriendRequestStatus(accountId, friendId);
    }

    @GetMapping("/{accountId}")
    public List<FriendRequest> getAllFriendRequests(@PathVariable Integer accountId) {
        return friendRequestDao.getAllFriendRequests(accountId);
    }
}