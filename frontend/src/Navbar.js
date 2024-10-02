import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import CSS file for styles

const Navbar = () => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">My Learning Platform</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/purchased-courses">My Courses</Link>
        {token && <Link to="/user/profile">Profile</Link>}
        
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <Link to="#" onClick={handleLogout}>Logout</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
