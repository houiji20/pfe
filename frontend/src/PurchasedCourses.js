import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PurchasedCourses.css'; // Import the CSS file

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/purchased-courses/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setPurchasedCourses(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleOpenCourse = (courseId) => {
    navigate(`/course/${courseId}`);  // Navigate to course page
  };

  return (
    <div className="purchased-courses">
      <h2>Purchased Courses</h2>
      {purchasedCourses.length === 0 ? (
        <div className="no-courses">You have not purchased any courses yet.</div>
      ) : (
        <div className="course-list">
          {purchasedCourses.map(course => (
            <div className="course-card" key={course.id}>
              <div className="course-info">
                <h3>{course.title}</h3>
                <button className="open-button" onClick={() => handleOpenCourse(course.id)}>Open Course</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedCourses;
