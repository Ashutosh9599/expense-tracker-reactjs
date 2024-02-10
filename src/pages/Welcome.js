import React, { useContext,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Store/auth-context';
import { useNavigate } from 'react-router-dom';
import Expense from '../Layout/Expense';
import './Welcome.css';

const Welcome = () => {
    const { authState } = useContext(AuthContext); 
    const { user, token } = authState;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

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