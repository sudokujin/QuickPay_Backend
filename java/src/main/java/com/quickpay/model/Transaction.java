package com.quickpay.model;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

public class Transaction {
    private int transactionId;
    @NotNull
    private int actingId;
    @NotNull
    private int targetId;
    @NotNull
    private BigDecimal amount;
    @NotNull
    private String status;
    @NotNull
    private int typeId;
    private String comment;

    @NotNull
    private OffsetDateTime createdDateTime;

//constructor

    public Transaction(){}

    public Transaction(int actingId, int targetId, BigDecimal amount, String status, int typeId) {
        this.actingId = actingId;
        this.targetId = targetId;
        this.amount = amount;
        this.status = status;
        this.typeId = typeId;
    }
    //getters and setters
    public int getActingId() {
        return actingId;
    }

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public void setActingId(int actingId) {
        this.actingId = actingId;
    }

    public int getTargetId() {
        return targetId;
    }

    public void setTargetId(int targetId) {
        this.targetId = targetId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }
    @Override
    public String toString() {
        return "Transfer Details: \n\t" +
                "transfer id: " + getTransactionId() +
                "\n\ttransfer amount: " + getAmount() +
                "\n\ttransfer status: " + getStatus() +
                "\n\ttransfer type: " + getTypeId() +
                "\n\ttransfer from: " + getActingId() +
                "\n\ttransfer to: " + getTargetId();
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public OffsetDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(OffsetDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
