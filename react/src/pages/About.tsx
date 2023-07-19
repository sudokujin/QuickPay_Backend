import * as React from 'react';
import { Box, Container, Typography } from '@mui/material';

const About: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom color="primary">
                    About QuickPay
                </Typography>
                <Typography variant="body1" gutterBottom color="primary">
                    QuickPay is a revolutionary social payment website that makes transferring money quick, simple, and secure.
                </Typography>
                <Typography variant="body1" gutterBottom color="primary">
                    Whether you're splitting a dinner bill, pitching in for a group gift, or sending money across the country or even across the world, QuickPay is your go-to solution.
                </Typography>
                <Typography variant="body1" gutterBottom color="primary">
                    We believe in making financial interactions as social and as enjoyable as possible. QuickPay is not just about transactions, but about relationships.
                </Typography>
            </Box>
        </Container>
    );
}

export default About;