import React from 'react';
import PayAndRequest from '../Components/PayAndRequest';
import MainPage from "./MainPage.tsx";

const PayAndRequestPage: React.FC = () => {
    return (
        <MainPage>
        <div style={{ color: 'blue' }}>
            <PayAndRequest />
        </div>
            </MainPage>
    );
};

export default PayAndRequestPage;
