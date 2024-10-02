// src/Modal.js

import React from 'react';
import './Modal.css'; // Add styles for the modal

const Modal = ({ isOpen, onClose, course, confirmPurchase }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Purchase</h2>
        {course && (
          <div>
            <p>Are you sure you want to buy the course: <strong>{course.title}</strong>?</p>
            <p>Price: <strong>${course.price}</strong></p>
          </div>
        )}
        <div className="modal-actions">
          <button onClick={confirmPurchase}>Yes, Buy Now</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
