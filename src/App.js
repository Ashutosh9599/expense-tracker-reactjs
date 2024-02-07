import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header';
import SignupPage from './Auth/SignupPageAuth';
import LoginScreen from './Auth/LoginScreen';
import Welcome from './pages/Welcome';
import ProfileForm from './pages/ProfileForm';
import { AuthProvider } from './Store/auth-context'; 
function App() {
    return (
        <Router>
          <AuthProvider>
            <div>
                <Header />
                <Routes>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/complete-profile" element={<ProfileForm />} />
                    {/* Add other routes as needed */}
                </Routes>
            </div>
          </AuthProvider>
        </Router>
    );
}

export default App;