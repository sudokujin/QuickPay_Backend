import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TransactionService from "../service/TransactionService.ts";
import AccountService from "../service/AccountService.ts";

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

export default function Orders() {
    const [rows, setRows] = React.useState<Row[]>([]);

    React.useEffect(() => {
        const accountIdString = localStorage.getItem("accountId");
        if (accountIdString !== null) {
            const accountId: number = parseInt(accountIdString);
            if (!isNaN(accountId)) {
                AccountService.getAccountByAccountID(accountId)
                    .then(accountResponse => {
                        const account = accountResponse.data;
                        console.log("Account:", account); // Log the account data
                        TransactionService.getAllTransactions(account.accountId)
                            .then(response => {
                                console.log("Transactions:", response.data); // Log the transactions data
                                setRows(response.data);
                            })
                            .catch(error => console.error(error));
                    })
                    .catch(error => console.error(error));
            } else {
                console.error("Account ID is not a number: ", accountIdString);
            }
        } else {
            console.error("No account ID found in local storage.");
        }
    }, []);


    return (
        <React.Fragment>
            <Title>Transactions</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Acting ID</TableCell>
                        <TableCell>Target ID</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Comment</TableCell>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more orders
            </Link>
        </React.Fragment>
    );
}