package com.quickpay.dao;

import com.quickpay.model.Account;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.SQLException;

@Component
public class JdbcAccountDao implements AccountDao {
    private JdbcTemplate jdbcTemplate;


    public JdbcAccountDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public BigDecimal getBalance(int accountId) throws SQLException {
        BigDecimal balance = null;
        String sql = "SELECT balance FROM account WHERE account_id = ?";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, accountId);
        while (result.next()) {
            balance = result.getBigDecimal("balance");
        }

        return balance;
    }

//    @Override
//    public Account getAccountByUserId(int userId) {
//        Account account = null;
//
//        String sql = "SELECT * FROM account WHERE user_id = ?";
//        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, userId);
//        while (result.next()) {
//            account = mapRowToAccount(result);
//        }
//        return account;
//    }

    @Override
    public Account getAccountByAccountId(int accountId) {
        Account account = null;

        String sql = "SELECT * FROM account WHERE account_id = ?";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, accountId);
        while (result.next()) {
            account = mapRowToAccount(result);
        }
        return account;
    }

    @Override
    public void updateBalance(BigDecimal balance, int accountId){
        String sql = "UPDATE account SET balance = ? WHERE account_id = ?;";
        jdbcTemplate.update(sql, balance, accountId);
    }

    @Override
    public void createAccount(Account account) {
        String sql = "INSERT INTO account(account_id, balance) VALUES (?, ?);";
        jdbcTemplate.update(sql, account.getAccountId(), account.getBalance());
    }

    @Override
    public void deleteAccount(int accountId) {
        String sql = "DELETE FROM account WHERE account_id = ?;";
        jdbcTemplate.update(sql, accountId);
    }

    private Account mapRowToAccount(SqlRowSet rowSet) {
        Account account = new Account();
        account.setAccountId(rowSet.getInt("account_id"));
        account.setBalance(rowSet.getBigDecimal("balance"));

        return account;
    }
}
