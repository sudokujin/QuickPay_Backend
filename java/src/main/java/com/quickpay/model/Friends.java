package com.quickpay.model;

public class Friends {
    private int id;
    private int accountId;
    private int friendId;

    public Friends() {
    }

    public Friends(int accountId, int friendId) {
        this.accountId = accountId;
        this.friendId = friendId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFriendId() {
        return friendId;
    }

    public void setFriendId(int friendId) {
        this.friendId = friendId;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }
}