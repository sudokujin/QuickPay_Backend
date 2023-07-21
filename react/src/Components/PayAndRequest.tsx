import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { Transaction } from '../models/Transaction';
import TransactionService from '../service/TransactionService';
import Decimal from 'decimal.js'; // Import the Decimal class

const PayAndRequest = () => {
    const [selectedOption, setSelectedOption] = useState('pay');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [targetId, setTargetId] = useState(''); // State for the targetId input

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const actingId = parseInt(localStorage.getItem('accountId') || '0', 10);
            const transaction: Transaction = {
                actingId: actingId,
                targetId: parseInt(targetId || '0', 10),
                amount: new Decimal(amount),
                status: selectedOption === 'request' ? 'Pending' : 'Approved', // Set status conditionally
                typeId: selectedOption === 'pay' ? 1 : 2,
                comment: description,
                createdDateTime: new Date().toISOString(),
            };

            // Call the transaction service to create the new transaction
            const createdTransaction = await TransactionService.createTransaction(transaction);
            console.log('Created Transaction:', createdTransaction);

            // Clear the form fields after submitting
            setAmount('');
            setDescription('');
            setTargetId('');
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <h1>Pay & Request</h1>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        name="payOrRequest"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <FormControlLabel value="pay" control={<Radio />} label="Pay" />
                        <FormControlLabel value="request" control={<Radio />} label="Request" />
                    </RadioGroup>
                </FormControl>
                {/* New input field for the targetId */}
                <TextField
                    fullWidth
                    type="number"
                    label="Target ID"
                    variant="outlined"
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    type="number"
                    label="Amount"
                    variant="outlined"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default PayAndRequest;