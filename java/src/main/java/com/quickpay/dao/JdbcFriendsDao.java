package com.quickpay.dao;

import com.quickpay.model.Friends;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcFriendsDao implements FriendsDao {

    private JdbcTemplate jdbcTemplate;

    public JdbcFriendsDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void addFriend(int accountId, int friendId) {
        String sql = "INSERT INTO friend (friend_account_id, friend_id) VALUES (?, ?);";
        jdbcTemplate.update(sql, friendId, accountId); // Swap the order of friendId and accountId
    }

    //Need to check SQL
    @Override
    public void removeFriend(int accountId, int friendId) {
        String sql = "DELETE FROM friend WHERE friend_account_id = ? AND friend_id = ?;";
        jdbcTemplate.update(sql, accountId, friendId);
    }

    @Override
    public List<Friends> getFriendsByAccountId(Integer accountId) {
        String sql = "SELECT * FROM friend WHERE friend_account_id = ? OR friend_id = ?;";
        List<Friends> friends = new ArrayList<>();
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, accountId, accountId);
        while (result.next()){
            Friends friend = mapRowToFriends(result);
            friends.add(friend);
        }
        return friends;
    }

    public Friends mapRowToFriends(SqlRowSet row) {
        Friends friend = new Friends();
        friend.setFriendId(row.getInt("friend_id"));
        friend.setAccountId(row.getInt("friend_account_id"));
        return friend;
    }

}