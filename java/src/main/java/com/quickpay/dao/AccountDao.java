package com.quickpay.dao;

import com.quickpay.model.Account;

import java.math.BigDecimal;
import java.sql.SQLException;

public interface AccountDao {
  //  Account getAccountByUserId(int userId);
    Account getAccountByUserId(Integer userId);
    BigDecimal getBalance(int userId) throws SQLException;

    Account getAccountByAccountId(Integer accountId);

    void updateBalance(BigDecimal balance, int accountId);

    void createAccount(Account account);

    void deleteAccount(int accountId);
}
