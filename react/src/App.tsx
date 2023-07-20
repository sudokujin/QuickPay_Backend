// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import './App.css';
import SignIn from "./pages/SignIn.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
// @ts-ignore
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import FriendsPage from "./pages/FriendsPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import PendingTransactionTable from "./pages/PendingTransactionTable.tsx";
import TransactionTable from "./pages/TransactionTable.tsx";
import Balance from "./pages/Balance.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<MainPage> <PendingTransactionTable /> <Balance /> <TransactionTable /></MainPage>} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/login"} element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/friends" element={<FriendsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
