import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import your custom CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/token/', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.access);
        setUsername(''); // Clear username field
        setPassword(''); // Clear password field
        checkUserProfile(); // Check if user has a profile after login
      })
      .catch(error => {
        console.error('Login error:', error);
        setNotificationMessage('Login failed. Please check your credentials.');
        setNotificationVisible(true); // Show notification on error
      });
  };

  const checkUserProfile = () => {
    axios.get('http://127.0.0.1:8000/api/user/profile/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => {
      if (res.data.create_profile) {
        // Redirect to profile creation if no profile exists
        navigate('/user/profile');
      } else {
        // Redirect to homepage if the user has a profile
        navigate('/');
      }
    })
    .catch(err => {
      console.error(err);
      setNotificationMessage('Error retrieving profile information.');
      setNotificationVisible(true); // Show notification on error
    });
  };

  const closeNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="input-field"
        />
        <button type="submit" className="login-button">Login</button>
      </form>

      {notificationVisible && (
        <Notification
          message={notificationMessage} // Show dynamic message
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default Login;
