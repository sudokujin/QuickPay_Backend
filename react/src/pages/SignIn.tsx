import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthService from "../service/AuthService.ts";
import AccountService from "../service/AccountService.ts";
import {isNumber} from "recharts/types/util/DataUtils";

function SignIn() {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        try {
            let user = {
                username: username,
                password: password,
            };
            const response = await AuthService.login(user);
            const { token } = response.data;
            localStorage.setItem('jwtToken', token);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            const userResponse = await AuthService.getUserId();
            const { id } = userResponse.data;
            console.log(userResponse);
            localStorage.setItem('userId', id);
            console.log("Id is number: " + (typeof id === "number"));
            console.log("id: " + id);
            console.log("userId: " + localStorage.getItem('userId'));

            const accountResponse = await AccountService.getAccountByUserID(parseInt(id));
            console.log("accountResponse:", accountResponse);

            const account = {
                accountId: parseInt(accountResponse.data?.accountId),
                balance: parseFloat(accountResponse.data?.balance)
            };

            localStorage.setItem('account', JSON.stringify(account));
            localStorage.setItem('accountId', account.accountId.toString());
            localStorage.setItem('balance', account.balance.toString());
            console.log("account: ", JSON.parse(localStorage.getItem('account') || ''));
            console.log("accountId: " + account.accountId);
            console.log("accountBalance: " + account.balance);

            navigate('/main'); // Redirect to the dashboard page
        } catch (error) {
            // Handle error
            console.log("error", error);
        }
    };

    return (
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Box sx={{ backgroundColor: '#EFD469' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                helperText = "Enter your username"
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                InputProps={{ sx: { backgroundColor: 'white' } }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                helperText = "Enter your password"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                InputProps={{ sx: { backgroundColor: 'white' } }}
                            />
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/" variant="body2">
                                    Take me back to the homepage
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;