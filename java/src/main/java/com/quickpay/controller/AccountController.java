package com.quickpay.controller;

import com.quickpay.dao.AccountDao;
import com.quickpay.model.Account;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;

@PermitAll
@CrossOrigin
@RestController
@RequestMapping("/account")
public class AccountController {

    private AccountDao accountDao;

    public AccountController(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    @PermitAll
    @GetMapping("/{accountId}")
    public Account getAccountByAccountId(@PathVariable Integer accountId) {
        return accountDao.getAccountByAccountId(accountId);
    }

    @PermitAll
    @GetMapping("/user/{userId}")
    public Account getAccountByUserId(@PathVariable Integer userId) {
        return accountDao.getAccountByUserId(userId);
    }

    @PostMapping
    public void createAccount(Account account) {
        accountDao.createAccount(account);
    }

    @PutMapping
    public void updateBalance(@RequestBody Account account) {
        accountDao.updateBalance(account.getBalance(), account.getAccountId());
    }

    @DeleteMapping
    public void deleteAccount(@RequestBody Account account) {
        accountDao.deleteAccount(account.getAccountId());
    }
}


