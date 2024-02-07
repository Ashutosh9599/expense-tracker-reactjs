import React, { useState } from 'react';
import './LoginScreen.css';
import { Link } from 'react-router-dom';

const LoginScreen = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        // Check if all fields are filled
        if (!formData.email || !formData.password) {
            setError('All fields are mandatory');
            return;
        }
    
        try {
            // Login user using Firebase Authentication REST API
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZcxqgzb2T7zNGyr3Bm4F4KJGFYPqPfYY',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        returnSecureToken: true,
                    }),
                }
            );
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('User has successfully logged in');
                setError(null); // Clear any previous errors
                onLoginSuccess(data.idToken); // Pass the token to the parent component
    
                // Reset the login form after successful login
                setFormData({
                    email: '',
                    password: '',
                });
            } else {
                // Check if the error message is available in the response
                const errorMessage = data.error?.message || 'Invalid credentials';
                setError(errorMessage);
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
            setError('An unexpected error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p className="signup-message">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default LoginScreen;
