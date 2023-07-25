import React, { useEffect, useState } from "react";
import { Decimal } from 'decimal.js';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Title from './Title';
import AccountService from '../service/AccountService';

export default function Balance() {
    const [balance, setBalance] = useState(
        new Decimal(localStorage.getItem('balance') || '0.00')
    );

    // Handler to increase balance
    const handleIncreaseClick = () => {
        const newBalance = balance.plus(1);
        updateBalance(newBalance);
    };

    // Handler to decrease balance
    const handleDecreaseClick = () => {
        if (balance.greaterThanOrEqualTo(1)) {  // To ensure balance does not go negative
            const newBalance = balance.minus(1);
            updateBalance(newBalance);
        }
    };

    const updateBalance = async (newBalance: Decimal) => {
        const accountId = localStorage.getItem('accountId');
        if (accountId !== null && !isNaN(Number(accountId))) {
            // Make the API call to update the balance on the server
            try {
                await AccountService.updateBalance(newBalance, Number(accountId));
                console.log("Balance updated successfully.");

                // Update the balance in the state if server update is successful
                setBalance(newBalance);
            } catch (error) {
                console.error("Error updating balance:", error);
            }
        } else {
            console.error("Invalid accountId in localStorage:", accountId);
        }
    };

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const accountResponse = await AccountService.getAccountByAccountID(parseInt(localStorage.getItem('accountId') || '0'));
                console.log("accountResponse:",  accountResponse);

                const account = {
                    accountId: parseInt(accountResponse.data?.accountId),
                    balance: new Decimal(accountResponse.data?.balance)
                };

                localStorage.setItem('balance', account.balance.toString());
                setBalance(account.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        const intervalId = setInterval(fetchBalance, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <React.Fragment>
            <Title>Balance</Title>
            <Typography component="p" variant="h4">
                {balance.toFixed(2)} {/* Display the balance with two decimal places */}
            </Typography>
            <div>
                <Button variant="contained" color="primary" onClick={handleIncreaseClick}>Increase</Button>
                <Button variant="contained" color="secondary" onClick={handleDecreaseClick}>Decrease</Button>
            </div>
        </React.Fragment>
    );
}