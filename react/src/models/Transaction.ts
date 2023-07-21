// src/models/Transaction.ts

import { Decimal } from 'decimal.js';

export interface Transaction {
    transactionId?: number;
    actingId: number;
    targetId: number;
    amount: Decimal; // Change this to string
    status: string;
    typeId: number;
    comment?: string;
    createdDateTime: string; // Change this to string
}