import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import '../styles/Navbar.css';

const Navbar = ({ toggleTheme, isDark }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isDark ? 'dark' : 'light'}`}>
      <div className="nav-brand">
        <Link to="/">Anime Hub</Link>
      </div>
      
      <div className="nav-search">
        <SearchBar />
      </div>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
          Gallery
        </Link>
        {user && (
          <NavLink to="/watchlist" className={({ isActive }) => isActive ? 'active' : ''}>
            Watchlist
          </NavLink>
        )}
        <Link to="/docs" className={location.pathname === '/docs' ? 'active' : ''}>
          Docs
        </Link>
        
        {user ? (
          <>
            <span className="user-greeting">Hello, {user.username}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
