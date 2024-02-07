import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header';
import SignupPage from './Auth/SignupPageAuth';
import LoginScreen from './Auth/LoginScreen';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/" element={<LoginScreen />} />
                    {/* Add other routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;