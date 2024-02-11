import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../Store/Context/auth-context';
import { useNavigate } from 'react-router-dom';
import Expense from '../Layout/Expense';
import './Welcome.css';

const Welcome = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileComplete, setProfileComplete] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAZcxqgzb2T7zNGyr3Bm4F4KJGFYPqPfYY', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idToken: token,
                    }),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
        
                const data = await response.json();
                const user = data.users[0];
                setProfileComplete(!!user && !!user.displayName);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (!token) {
            navigate('/');
        } else {
            fetchUserProfile();
        }
    }, [token, navigate]);

    return (
        <div className="welcome-container">
            <h2>Welcome to Expense Tracker</h2>
            {profileComplete ? (
                <div className="profile-complete-container">
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
