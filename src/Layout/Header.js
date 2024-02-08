import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/auth-context';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="left-section">
        <h1 className="heading">Expense Tracker</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/product">Product</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/aboutus">About Us</Link></li>
          {user && (
            <li className="nav-item">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;