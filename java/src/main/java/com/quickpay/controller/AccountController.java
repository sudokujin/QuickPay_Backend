package com.quickpay.controller;

import com.quickpay.dao.AccountDao;
import com.quickpay.model.Account;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/account")
public class AccountController {

    private AccountDao accountDao;

    public AccountController(AccountDao accountDao) {
        this.accountDao = accountDao;
    }
    @GetMapping
    public Account getAccountByAccountId(Integer accountId) {
        return accountDao.getAccountByAccountId(accountId);
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


