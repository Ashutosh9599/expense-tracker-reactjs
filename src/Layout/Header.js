import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../Reducers/authReducer';
import './Header.css';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); 

    const handleLogout = () => {
        dispatch(logout());
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
                    {isLoggedIn && (
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