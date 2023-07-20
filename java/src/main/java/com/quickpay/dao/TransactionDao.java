package com.quickpay.dao;

import com.quickpay.model.Account;
import com.quickpay.model.Transaction;

import java.util.List;

public interface TransactionDao {

    List<Transaction> listTransactionByUserId(Integer accountId);

    List<Transaction> listAllTransactions(Integer accountId);

    List<Transaction> listTransactionsPending(Integer accountId);

    List<Transaction> listTransactionsNotPending(Integer accountId);

    Transaction getTransactionByTransactionId(Integer transactionId);
    void createTransaction(Transaction transaction);
    void updateTransactionStatus(int transactionId, String status);

    void updateTransaction(Transaction transaction);

    void acceptTransaction(Integer transactionId);

    void rejectTransaction(Integer transactionId);
}