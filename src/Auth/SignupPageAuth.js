import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            setError("All fields are mandatory");
            return;
        }

        // Check if password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Register user using Firebase Authentication REST API
            const response = await fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZcxqgzb2T7zNGyr3Bm4F4KJGFYPqPfYY',
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
                console.log('User has successfully signed up');
                setError(null); // Clear any previous errors
                setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            } else {
                setError(data.error.message);
            }
        } catch (error) {
            setError('An error occurred during signup');
        }
    };
    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="signup-form">
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
                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default SignupPage;
