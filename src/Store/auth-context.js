import React, { createContext, useContext, useEffect, useReducer } from 'react';
import authReducer from '../Reducers/authReducer';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); 

    const [authState, authDispatch] = useReducer(authReducer, {
        token: storedToken || '',
        user: storedUser ? JSON.parse(storedUser) : null,
        isLoggedIn: !!storedToken,
    });

    const logoutHandler = () => {
        authDispatch({ type: 'logout' });
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        navigate('/');
    };

    const loginHandler = async (token) => {
        authDispatch({ type: 'login', payload: { token } });
        localStorage.setItem('token', token);

        try {
            const response = await fetchUserProfile(token);
            if (response.ok) {
                const data = await response.json();
                const userProfile = data.users[0];
                const newUser = {
                    displayName: userProfile.displayName || '',
                    photoUrl: userProfile.photoUrl || '',
                };
                authDispatch({ type: 'setUser', payload: newUser });
                localStorage.setItem('user', JSON.stringify(newUser)); 
            } else {
                throw new Error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        if (!storedToken) {
            authDispatch({ type: 'logout' });
        }
    }, [storedToken]);

    const fetchUserProfile = async (token) => {
        return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAZcxqgzb2T7zNGyr3Bm4F4KJGFYPqPfYY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idToken: token,
            }),
        });
    };

    const contextValue = {
        authState,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);