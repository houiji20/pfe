import React from 'react';

const Notification = ({ message, onClose }) => {
  return (
    <div style={styles.notification}>
      <span>{message}</span>
      <button onClick={onClose} style={styles.closeButton}>X</button>
    </div>
  );
};

const styles = {
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: '#f8d7da',
    color: '#721c24',
    padding: '10px 20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  closeButton: {
    marginLeft: '10px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Notification;
