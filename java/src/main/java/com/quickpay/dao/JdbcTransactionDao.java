package com.quickpay.dao;

import com.quickpay.model.Transaction;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcTransactionDao implements TransactionDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcTransactionDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Transaction> listTransactionByUserId(Integer accountId) {
        List<Transaction> transactions = new ArrayList<>();
        String sql = "SELECT * FROM transactions WHERE type_id = 2 AND (acting_id = ? OR target_id = ?);";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql, accountId, accountId);
        while (result.next()){
            Transaction transaction = mapRowToTransaction(result);
            transactions.add(transaction);
        }
        return transactions;
    }

    @Override
    public List<Transaction> listAllTransactions() {
        List<Transaction> transactions = new ArrayList<>();
        String sql = "SELECT * FROM transactions;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql);
        while(result.next()) {
            transactions.add(mapRowToTransaction(result));
        }
        return transactions;
    }

    @Override
    public Transaction getTransactionByTransactionId(Integer transactionId) {
        Transaction transaction = new Transaction();
        String sql = "SELECT * FROM transactions WHERE transaction_id = ?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, transactionId);
        if (results.next()) {
            transaction = mapRowToTransaction(results);
        } else {
            System.out.println("Invalid transfer_id");
        }
        return transaction;
    }

    @Override
    public void createTransaction(Transaction transaction) {
        String sql = "INSERT INTO transactions(type_id, status, acting_id, target_id, amount, date_time) VALUES (?,?,?,?,?)";
        jdbcTemplate.update(sql, transaction.getTypeId(), transaction.getStatus(), transaction.getActingId(),
                transaction.getTargetId(), transaction.getAmount(), transaction.getCreatedDateTime());
    }
    @Override
    public void updateTransactionStatus(int transactionId, String status) {
        String updateStatus = "UPDATE transactions "
                + "SET status = ? "
                + "WHERE transaction_id = ? ";
        jdbcTemplate.update(updateStatus, status, transactionId);

    }

    @Override
    public void updateTransaction(Transaction transaction) {
        String updateStatus = "UPDATE transactions "
                + "SET type_id = ?, status = ?, acting_id = ?, target_id = ?, amount = ?, date_time = ?, comment = ? "
                + "WHERE transaction_id = ? ";
        jdbcTemplate.update(updateStatus, transaction.getTypeId(), transaction.getStatus(), transaction.getActingId(),
                transaction.getTargetId(), transaction.getAmount(), transaction.getCreatedDateTime(), transaction.getComment(), transaction.getTransactionId());
    }


    private Transaction mapRowToTransaction(SqlRowSet rowSet) {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(rowSet.getInt("transfer_id"));
        transaction.setTypeId(rowSet.getInt("transfer_type_id"));
        transaction.setStatus(rowSet.getString("transfer_status"));
        transaction.setActingId(rowSet.getInt("account_from"));
        transaction.setTargetId(rowSet.getInt("account_to"));
        transaction.setAmount(rowSet.getBigDecimal("amount"));
        Timestamp timestamp = rowSet.getTimestamp("date_time");
        OffsetDateTime offsetDateTime = OffsetDateTime.ofInstant(timestamp.toInstant(), ZoneOffset.UTC);
        transaction.setCreatedDateTime(offsetDateTime);
        transaction.setComment(rowSet.getString("comment"));

        return transaction;
    }
}
