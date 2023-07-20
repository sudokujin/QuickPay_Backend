package com.quickpay.controller;

import com.quickpay.dao.TransactionDao;
import com.quickpay.model.Account;
import com.quickpay.model.Transaction;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/transaction")
public class TransactionController {
    private TransactionDao transactionDao;

    public TransactionController(TransactionDao transactionDao) {
        this.transactionDao = transactionDao;
    }


    @GetMapping("/{accountId}")
    public List<Transaction> listAllTransactions(@PathVariable Integer accountId) {
        return transactionDao.listAllTransactions(accountId);
    }

    @GetMapping("/pending/{accountId}")
    public List<Transaction> listTransactionsPending(@PathVariable Integer accountId) {
        return transactionDao.listTransactionsPending(accountId);
    }

    @GetMapping("/notpending/{accountId}")
    public List<Transaction> listTransactionsNotPending(@PathVariable Integer accountId) {
        return transactionDao.listTransactionsNotPending(accountId);
    }

    @PostMapping
    public void createTransaction(Transaction transaction) {
        transactionDao.createTransaction(transaction);
    }

    @PutMapping
    public void updateTransaction(Transaction transaction) {
        transactionDao.updateTransaction(transaction);
    }

    @PutMapping("/accept/{transactionId}")
    public void acceptTransaction(@PathVariable Integer transactionId) {
        transactionDao.acceptTransaction(transactionId);
    }

    @PutMapping("/reject/{transactionId}")
    public void rejectTransaction(@PathVariable Integer transactionId) {
        transactionDao.rejectTransaction(transactionId);
    }

}