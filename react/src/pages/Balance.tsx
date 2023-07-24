import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import AccountService from '../service/AccountService.ts';
import React from "react";

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export default function Balance() {
    const [balance, setBalance] = React.useState(
        parseFloat(localStorage.getItem('balance') || '0.00')
    );
    const [isEditing, setIsEditing] = React.useState(false);

    const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = parseFloat(event.target.value);
        setBalance(isNaN(inputValue) ? 0.00 : inputValue);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        const updatedBalance = balance.toFixed(2); // Convert the balance value to a string with two decimal places

        const accountId = localStorage.getItem('accountId');
        if (accountId !== null && !isNaN(Number(accountId))) {
            localStorage.setItem('balance', updatedBalance);
            AccountService.updateBalance(updatedBalance, Number(accountId))
                .then(response => {
                    console.log("Balance updated successfully:", response.data);
                    // Handle success
                })
                .catch(error => {
                    console.error("Error updating balance:", error);
                    // Handle error
                });
        } else {
            console.error("Invalid accountId in localStorage:", accountId);
            // Handle the case when accountId is invalid or not found
        }
    };

    return (
        <React.Fragment>
            <Title>Balance</Title>
            {isEditing ? (
                <input
                    type="number"
                    step="0.01" // Allow decimals with two decimal places
                    value={balance}
                    onChange={handleBalanceChange}
                    onBlur={handleSaveClick}
                    autoFocus
                />
            ) : (
                <Typography component="p" variant="h4" onClick={handleEditClick}>
                    {balance.toFixed(2)} {/* Display the balance with two decimal places */}
                </Typography>
            )}
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}