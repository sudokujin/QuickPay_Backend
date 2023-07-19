package com.quickpay.controller;

import com.quickpay.dao.FriendsDao;
import com.quickpay.model.Friends;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/friends")
public class FriendsController {

    private FriendsDao friendsDao;

    public FriendsController(FriendsDao friendsDao) {
        this.friendsDao = friendsDao;
    }

    @GetMapping
    public List<Friends> getFriendList(Integer accountId) {
        return friendsDao.getFriendsByAccountId(accountId);
    }

    @DeleteMapping
    public void removeFriend(Integer accountId, Integer friendId) {
        friendsDao.removeFriend(accountId, friendId);
    }

    @PostMapping
    public void addFriend(Integer accountId, Integer friendId) {
        friendsDao.addFriend(accountId, friendId);
    }
}
