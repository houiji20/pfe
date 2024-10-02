import React from 'react';
import './CourseDetailModal.css';

const CourseDetailModal = ({ course, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{course.title}</h2>
        <p>{course.description}</p>
        <p>Duration: {course.duration}</p>
        <p>Instructor: {course.instructor}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CourseDetailModal;
