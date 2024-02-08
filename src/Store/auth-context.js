import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const login = async (token) => {
        setAuthToken(token);
        localStorage.setItem('authToken', token);

        await fetchUserProfile(token);

        setIsLoggedIn(true);
    };

    const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('idToken');
        setIsLoggedIn(false); 
        navigate('/');
    };

    const fetchUserProfile = async (token) => {
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
            const userProfile = data.users[0]; 
            setUser({
                displayName: userProfile.displayName || '',
                photoUrl: userProfile.photoUrl || '',
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setAuthToken(storedToken);
            setIsLoggedIn(true); 
            fetchUserProfile(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token: authToken, user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
