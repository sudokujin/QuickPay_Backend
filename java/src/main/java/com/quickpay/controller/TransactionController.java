package com.quickpay.controller;

import com.quickpay.dao.AccountDao;
import com.quickpay.dao.TransactionDao;
import com.quickpay.model.Account;
import com.quickpay.model.Transaction;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/transaction")
public class TransactionController {
    private TransactionDao transactionDao;
    private AccountDao accountDao;

    public TransactionController(TransactionDao transactionDao, AccountDao accountDao) {
        this.transactionDao = transactionDao;
        this.accountDao = accountDao;
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
    public void createTransaction(@RequestBody Transaction transaction) throws SQLException {

        if (transaction.getTypeId() == 1 &&
                (accountDao.getBalance(transaction.getActingId()).compareTo(transaction.getAmount()) >= 0 )) {
            BigDecimal updatedBalanceMinus = accountDao.getBalance(transaction.getActingId()).subtract(transaction.getAmount());
            accountDao.updateBalance(updatedBalanceMinus, transaction.getActingId());

            BigDecimal updatedBalanceGain = accountDao.getBalance(transaction.getTargetId()).add(transaction.getAmount());
            accountDao.updateBalance(updatedBalanceGain, transaction.getTargetId());
            transactionDao.createTransaction(transaction);
        } else  if (transaction.getTypeId() == 2 && transaction.getStatus().equalsIgnoreCase("Approved")) {
            BigDecimal updatedBalanceMinus = accountDao.getBalance(transaction.getTargetId()).subtract(transaction.getAmount());
            accountDao.updateBalance(updatedBalanceMinus, transaction.getTargetId());

            BigDecimal updatedBalanceGain = accountDao.getBalance(transaction.getActingId()).add(transaction.getAmount());
            accountDao.updateBalance(updatedBalanceGain, transaction.getActingId());
            transactionDao.createTransaction(transaction);
        } else if (transaction.getTypeId() == 1 &&
                (accountDao.getBalance(transaction.getActingId()).compareTo(transaction.getAmount()) < 0 )){
            transaction.setStatus("Rejected");
            transaction.setComment("Not enough balance");
            transactionDao.createTransaction(transaction);
        }
    }

    @PutMapping
    public void updateTransaction(@RequestBody Transaction transaction) {
        transactionDao.updateTransaction(transaction);
    }

    @PutMapping("/accept/{transactionId}")
    public void acceptTransaction(@PathVariable Integer transactionId) throws SQLException {


        Transaction transaction = transactionDao.getTransactionByTransactionId(transactionId);
        if (transaction.getTypeId() == 2 &&
                (accountDao.getBalance(transaction.getTargetId()).compareTo(transaction.getAmount()) >= 0 )) {
            transactionDao.acceptTransaction(transactionId);
            BigDecimal updatedBalanceMinus = accountDao.getBalance(transaction.getTargetId()).subtract(transaction.getAmount());
            accountDao.updateBalance(updatedBalanceMinus, transaction.getTargetId());

            BigDecimal updatedBalanceGain = accountDao.getBalance(transaction.getActingId()).add(transaction.getAmount());
            accountDao.updateBalance(updatedBalanceGain, transaction.getActingId());
        } else {
            //TODO: Handle not enough balance instead of auto rejecting (notification system?)
            transaction.setStatus("Rejected");
            transaction.setComment("Not enough balance");
            transactionDao.updateTransaction(transaction);
        }
    }

    @PutMapping("/reject/{transactionId}")
    public void rejectTransaction(@PathVariable Integer transactionId) {
        transactionDao.rejectTransaction(transactionId);
    }

}