import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
        <h1 className="heading">Expense Tracker</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
          <li className="nav-item"><a className="nav-link" href="/product">Product</a></li>
          <li className="nav-item"><a className="nav-link" href="/aboutus">About Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;