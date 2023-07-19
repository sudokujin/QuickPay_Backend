package com.quickpay.dao;

import com.quickpay.model.Transaction;

import java.util.List;

public interface TransactionDao {
    List<Transaction> listAllTransactions();
    List<Transaction> listTransactionByUserId(Integer accountId);
    Transaction getTransactionByTransactionId(Integer transactionId);
    void createTransaction(Transaction transaction);
    void updateTransactionStatus(int transactionId, String status);

    void updateTransaction(Transaction transaction);
}
