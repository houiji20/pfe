import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Purchased Courses</h2>
      <ul>
        {purchasedCourses.map(course => (
          <li key={course.id}>
            {course.title}
            <button onClick={() => handleOpenCourse(course.id)}>Open Course</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchasedCourses;
