import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Store/auth-context';
import Expense from '../Layout/Expense';
import './Welcome.css';

const Welcome = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="welcome-container">
            <h2>Welcome to Expense Tracker</h2>
            {user ? (
                <div className="profile-incomplete-container">
                    <p>
                        <Link to="/complete-profile">Your Profile</Link>
                    </p>
                </div>
            ) : (
                <div className="profile-incomplete-container">
                    <p>Your profile is incomplete.</p>
                    <p>
                        <Link to="/complete-profile">Complete it now</Link>
                    </p>
                </div>
            )}
            <Expense />
        </div>
    );
};

export default Welcome;