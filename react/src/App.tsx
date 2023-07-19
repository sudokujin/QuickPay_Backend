// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import './App.css';
import SignIn from "./pages/SignIn.tsx";
// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
// @ts-ignore
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/login"} element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                </Routes>
        </BrowserRouter>

    )


}

export default App
