package com.quickpay.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Account {

    private BigDecimal balance;
    private int accountId;


    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public Account(BigDecimal balance, int accountId) {
        this.balance = balance;
        this.accountId = accountId;
    }

    public Account(int accountId) {
        this.accountId = accountId;
    }

    public Account() {
    };


}