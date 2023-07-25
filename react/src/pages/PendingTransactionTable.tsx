import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TransactionService from '../service/TransactionService.ts';
import AccountService from '../service/AccountService.ts';
import {useCallback, useEffect, useState} from 'react';
function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

interface Row {
    transactionId: number;
    actingId: number;
    targetId: number;
    amount: number;
    status: string;
    comment: string;
}

export default function PendingTransactionTable() {
    const [rows, setRows] = useState<Row[]>([]);
    const [accountBalance, setAccountBalance] = useState<number>(0);

    const fetchTransactions = useCallback(() => {
        const accountIdString = localStorage.getItem('accountId');
        if (accountIdString !== null) {
            const accountId: number = parseInt(accountIdString);
            if (!isNaN(accountId)) {
                // Fetch user's account balance
                AccountService.getAccountByAccountID(accountId)
                    .then(accountResponse => {
                        const account = accountResponse.data;
                        console.log('Account:', account); // Log the account data
                        setAccountBalance(account.balance);

                        // Fetch pending transactions
                        TransactionService.getPendingTransactions(account.accountId)
                            .then(response => {
                                console.log('Transactions:', response.data); // Log the transactions data
                                setRows(response.data);
                            })
                            .catch(error => console.error(error));
                    })
                    .catch(error => console.error(error));
            } else {
                console.error('Account ID is not a number: ', accountIdString);
            }
        } else {
            console.error('No account ID found in local storage.');
        }
    }, []);

    useEffect(() => {
        fetchTransactions();
        const intervalId = setInterval(fetchTransactions, 5000); // Fetch transactions every 5 seconds
        return () => {
            clearInterval(intervalId); // Clear the interval on component unmount
        };
    }, [fetchTransactions]);
    const handleAcceptClick = (transactionId: number, amount: number) => {
        // Call the acceptTransaction API endpoint and handle success/failure
        TransactionService.acceptTransaction(transactionId)
            .then(response => {
                console.log('Transaction accepted:', response.data);
                // Handle success: Update balance and fetch updated transactions
                const newBalance = accountBalance - amount;
                const accountIdString = localStorage.getItem('accountId');
                const accountId = parseInt(accountIdString!);
                AccountService.updateBalance(newBalance, accountId)
                    .then(() => {
                        fetchTransactions(); // Fetch updated transactions and balance
                    })
                    .catch(error => {
                        console.error('Error updating balance:', error);
                    });
            })
            .catch(error => {
                console.error('Error accepting transaction:', error);
                // Handle error
            });
    };

    const handleRejectClick = (transactionId: number) => {
        // Call the rejectTransaction API endpoint and handle success/failure
        TransactionService.rejectTransaction(transactionId)
            .then(response => {
                console.log('Transaction rejected:', response.data);
                // Handle success
            })
            .catch(error => {
                console.error('Error rejecting transaction:', error);
                // Handle error
            });
    };

    return (
        <React.Fragment>
            <Title>Transaction Requests</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Acting ID</TableCell>
                        <TableCell>Target ID</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Action</TableCell> {/* New column for buttons */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.transactionId}>
                            <TableCell>{row.transactionId}</TableCell>
                            <TableCell>{row.actingId}</TableCell>
                            <TableCell>{row.targetId}</TableCell>
                            <TableCell align="right">{`$${row.amount}`}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>{row.comment}</TableCell>
                            <TableCell>
                                {row.status === 'Pending' && ( // Show buttons only for pending transactions
                                    <>
                                        <button onClick={() => handleAcceptClick(row.transactionId)}>Accept</button>
                                        <button onClick={() => handleRejectClick(row.transactionId)}>Reject</button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
