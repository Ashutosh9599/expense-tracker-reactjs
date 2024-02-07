import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));

    const login = (token) => {
        setAuthToken(token);
        localStorage.setItem('authToken', token);
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('authToken');
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setAuthToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token: authToken, login, logout }}>
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