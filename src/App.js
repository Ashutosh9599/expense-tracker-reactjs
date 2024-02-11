import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header';
import SignupPage from './Auth/SignupPageAuth';
import LoginScreen from './Auth/LoginScreen';
import Welcome from './pages/Welcome';
import ProfileForm from './pages/ProfileForm';
import ForgotPassword from './Auth/ForgotPassword';
import { AuthProvider } from './Store/Context/auth-context';
import { ExpenseProvider } from './Store/Context/ExpenseContext';

function App() {

  return (
    <Router>
      <AuthProvider>
        <ExpenseProvider>
          <Header />
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/complete-profile" element={<ProfileForm />} />
            <Route path="/" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </ExpenseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;