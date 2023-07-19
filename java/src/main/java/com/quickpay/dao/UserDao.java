package com.quickpay.dao;

import com.quickpay.model.User;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {
    List<User> findAll() throws SQLException;

    User getUserById(int id) throws SQLException;
    User findByUsername(String username) throws SQLException;

    int findIdByUsername(String username);
    boolean create(String username, String password, String role);

    boolean create(User user);
}
