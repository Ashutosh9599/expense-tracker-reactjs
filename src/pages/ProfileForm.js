import React, { useState } from 'react';
import { useAuth } from '../Store/auth-context';
import './ProfileForm.css';

const ProfileForm = () => {
    const { token } = useAuth();
    const [fullName, setFullName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [error, setError] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (!fullName.trim() || !photoUrl.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const requestBody = {
                idToken: token,
                displayName: fullName,
                photoUrl: photoUrl,
            };

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZcxqgzb2T7zNGyr3Bm4F4KJGFYPqPfYY', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error.message || 'Failed to update profile');
            }

            console.log('Profile updated successfully:', data);
        } catch (error) {
            setError(error.message);
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="profile-form-container">
            <h2>Profile Form</h2>
            {formSubmitted && error && <p className="error-message">{error}</p>}
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo URL</label>
                    <input
                        type="text"
                        id="photo"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfileForm;