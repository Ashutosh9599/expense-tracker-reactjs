import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header';
import SignupPage from './Auth/SignupPageAuth';
import LoginScreen from './Auth/LoginScreen';
import Welcome from './pages/Welcome';
import ProfileForm from './pages/ProfileForm';
import { AuthProvider, useAuth } from './Store/auth-context';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <AuthProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={isLoggedIn ? <Welcome /> : <LoginScreen />} />
            <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />} />
            <Route path="/welcome" element={isLoggedIn ? <Welcome /> : <Navigate to="/" />} />
            <Route path="/complete-profile" element={isLoggedIn ? <ProfileForm /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;