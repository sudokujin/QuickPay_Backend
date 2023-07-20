package com.quickpay.dao;

import com.quickpay.model.FriendRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcFriendRequestDao implements FriendRequestDao{

    private JdbcTemplate jdbcTemplate;

    public JdbcFriendRequestDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void sendFriendRequest(int senderId, int receiverId, String status) {
        String sql = "INSERT INTO friend_request (sender_id, receiver_id, status) VALUES (?, ?, ?);";
        jdbcTemplate.update(sql, senderId, receiverId, status);
    }
    @Override
    public void acceptFriendRequest(Integer requestId) {
        String sql = "UPDATE friend_request SET status = 'Accepted' WHERE request_id = ?;";
        jdbcTemplate.update(sql, requestId);
    }
    @Override
    public void rejectFriendRequest(Integer requestId) {
        String sql = "UPDATE friend_request SET status = 'Rejected' WHERE request_id = ?;";
        jdbcTemplate.update(sql, requestId);
    }
    @Override
    public void deleteFriendRequest(int senderId, int receiverId) {
        String sql = "DELETE FROM friend_request WHERE sender_id = ? AND receiver_id = ?;";
        jdbcTemplate.update(sql, senderId, receiverId);
    }

    @Override
    public String getFriendRequestStatus(Integer accountId, Integer friendId) {
        String sql = "SELECT status FROM friend_request WHERE sender_id = ? AND receiver_id = ?;";
        return jdbcTemplate.queryForObject(sql, String.class, accountId, friendId);
    }

    @Override
    public List<FriendRequest> getFriendRequestsByAccountId(Integer accountId) {
        String sql = "SELECT * FROM friend_request WHERE receiver_id = ? OR sender_id = ?;";
        List<FriendRequest> friendRequests = new ArrayList<>();
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, accountId, accountId);
        while (result.next()){
            FriendRequest friendRequest = mapRowToFriendRequest(result);
            friendRequests.add(friendRequest);
        }
        return friendRequests;
    }

    @Override
    public List<FriendRequest> getAllFriendRequests(Integer accountId) {
        String sql = "SELECT * FROM friend_request WHERE receiver_id = ? OR sender_id = ?;";
        List<FriendRequest> friendRequests = new ArrayList<>();
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, accountId, accountId);
        while (result.next()){
            FriendRequest friendRequest = mapRowToFriendRequest(result);
            friendRequests.add(friendRequest);
        }
        return friendRequests;
    }

    @Override
    public FriendRequest getFriendRequest(Integer requestId) {
        String sql = "SELECT * FROM friend_request WHERE request_id = ?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, requestId);
        if (result.next()){
            return mapRowToFriendRequest(result);
        }
        return null;
    }


    private FriendRequest mapRowToFriendRequest(SqlRowSet row) {
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setRequestId(row.getInt("request_id"));
        friendRequest.setSenderId(row.getInt("sender_id"));
        friendRequest.setReceiverId(row.getInt("receiver_id"));
        friendRequest.setStatus(row.getString("status"));
        return friendRequest;
    }
}

