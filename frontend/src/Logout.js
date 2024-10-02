// Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    alert('You have been logged out');
    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
