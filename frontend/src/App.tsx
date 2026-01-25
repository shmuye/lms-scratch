import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/index.js";
import { Login, Signup,Home, LibrarianDashboard, ReaderDashboard } from "./pages/index.js";

const App = () => {
    return (
        <Router>

            <Routes>
                <Route path="/" element={
                    <>
                        <NavBar/>
                        <Home />
                    </>
                } />
                <Route path="/Login" element={
                    <>
                        <NavBar/>
                        <Login/>
                    </>
                } />
                <Route path="/signup" element={
                    <>
                        <NavBar/>
                        <Signup/>
                    </>
                } />
                <Route path="/dashboard" element={<LibrarianDashboard />} />
                <Route path="/user-dashboard" element={<ReaderDashboard />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </Router>
    )
}
export default App
