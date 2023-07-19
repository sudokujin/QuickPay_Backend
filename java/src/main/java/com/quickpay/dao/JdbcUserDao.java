package com.quickpay.dao;

import com.quickpay.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class JdbcUserDao implements UserDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcUserDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int findIdByUsername(String username) {
        if (username == null) throw new IllegalArgumentException("Username cannot be null");

        int userId;
        try {
            userId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE username = ?", int.class, username);
        } catch (NullPointerException | EmptyResultDataAccessException e) {
            throw new UsernameNotFoundException("User " + username + " was not found.");
        }

        return userId;
    }

    @Override
    public boolean create(String username, String password, String role) {
        String insertUserSql = "insert into users (username,password_hash,role) values (?,?,?)";
        String password_hash = new BCryptPasswordEncoder().encode(password);
        String ssRole = role.toUpperCase().startsWith("ROLE_") ? role.toUpperCase() : "ROLE_" + role.toUpperCase();

        return jdbcTemplate.update(insertUserSql, username, password_hash, ssRole) == 1;
    }

    @Override
    public User getUserById(int userId) throws SQLException {
        String sql = "SELECT user_id, username, password_hash FROM users WHERE user_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
        if (results.next()) {
            return mapRowToUser(results);
        } else {
            return null;
        }
    }

    @Override
    public List<User> findAll() throws SQLException {
        List<User> users = new ArrayList<>();
        String sql = "SELECT user_id, username, password_hash FROM users";

        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()) {
            User user = mapRowToUser(results);
            users.add(user);
        }

        return users;
    }

    @Override
    public User findByUsername(String username) throws SQLException {
        if (username == null) throw new IllegalArgumentException("Username cannot be null");

        String sql = "SELECT * FROM users WHERE username = ?;";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, username);
        if (rowSet.next()) {
            return mapRowToUser(rowSet);
        }
        throw new UsernameNotFoundException("User " + username + " was not found.");
    }

    @Override
    public boolean create(User user) {

        // create user
        String sql = "INSERT INTO users (username, password_hash, role, account_id, email, birth_date, first_name," +
                " last_name, phone_number, address, city, state, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) " +
                "RETURNING user_id";
        String password_hash = new BCryptPasswordEncoder().encode(user.getPassword());



        String updateAccountSql = "UPDATE users SET account_id = ? WHERE user_id = ?;";

        Integer newUserId = jdbcTemplate.queryForObject(sql, Integer.class, user.getUsername(),
                password_hash, "ROLE_USER", 1, user.getEmail(), user.getBirthdate(),
                user.getFirstName(), user.getLastName(), user.getPhoneNumber(), user.getAddress(), user.getCity(),
                user.getState(), user.getZipCode());

        if (newUserId == null) return false;

        // create account
        sql = "INSERT INTO account (account_id, balance) values(?, ?)";
        try {
            jdbcTemplate.update(sql, newUserId, 0);
            jdbcTemplate.update(updateAccountSql, newUserId, newUserId);
        } catch (DataAccessException e) {
            return false;
        }

        return true;
    }



    private User mapRowToUser(SqlRowSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("user_id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password_hash"));
        user.setActivated(true);
        user.setAuthorities("USER");

        // Check if the columns exist in the result set before accessing them
        if (rs.getMetaData().getColumnCount() >= 5) {
            user.setAccountId(rs.getInt("account_id"));
            user.setAddress(rs.getString("address"));
            user.setCity(rs.getString("city"));
            user.setState(rs.getString("state"));
            user.setZipCode(rs.getString("zipcode"));
            user.setPhoneNumber(rs.getString("phone_number"));

            Date birthDate = rs.getDate("birth_date");
            if (birthDate != null) {
                user.setBirthdate(birthDate.toLocalDate());
            }

            user.setFirstName(rs.getString("first_name"));
            user.setLastName(rs.getString("last_name"));
            user.setEmail(rs.getString("email"));
            user.setLastName(rs.getString("last_name"));
        }

        return user;
    }

}
