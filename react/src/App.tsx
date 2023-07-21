import React from 'react';
import './App.css';
import SignIn from './pages/SignIn.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Remove the BrowserRouter import from here
import SignUp from './pages/SignUp.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import FriendsPage from './pages/FriendsPage.tsx';
import MainPage from './pages/MainPage.tsx';
import PendingTransactionTable from './pages/PendingTransactionTable.tsx';
import TransactionTable from './pages/TransactionTable.tsx';
import Balance from './pages/Balance.tsx';
import PayAndRequestPage from './pages/PayAndRequestPage'; // Add this import for PayAndRequestPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/main"
          element={
            <MainPage>
              <PendingTransactionTable />
              <Balance />
              <TransactionTable />
            </MainPage>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/pay-and-request" element={<PayAndRequestPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
