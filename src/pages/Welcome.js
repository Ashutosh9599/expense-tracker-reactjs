import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/auth-context';
import './Welcome.css';

const Welcome = () => {
    const { user } = useAuth();

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
        </div>
    );
};

export default Welcome;