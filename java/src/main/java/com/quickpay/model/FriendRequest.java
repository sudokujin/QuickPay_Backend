package com.quickpay.model;

public class FriendRequest {
    private int id;
    private int senderId;
    private int receiverId;
    private String status;

    public FriendRequest() {
    }

    public FriendRequest(int senderId, int receiverId, String status) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
