import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

const Welcome = () => {
    return (
        <div className="welcome-container">
            <h2>Welcome to Expense Tracker</h2>
            <div className="profile-incomplete-container">
                <p>Your profile is incomplete.</p>
                <p>
                    <Link to="/complete-profile">Complete it now</Link>
                </p>
            </div>
        </div>
    );
};

export default Welcome;