import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    // Fetch all courses
    axios.get('http://127.0.0.1:8000/api/courses/')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));

    // Fetch user's purchased courses
    axios.get('http://127.0.0.1:8000/api/purchased-courses/', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setPurchasedCourses(res.data.map(course => course.id)))  // Store only course IDs
    .catch(err => {
      if (err.response && err.response.status === 401) {
        // Redirect to login if user is not authenticated
        navigate('/login');
      } else {
        console.error(err);
      }
    });
  }, [navigate]);

  const handleBuyCourse = (courseId) => {
    axios.post(`http://127.0.0.1:8000/api/buy-course/${courseId}/`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(() => alert('Course purchased successfully'))
    .catch(err => {
      if (err.response && err.response.status === 401) {
        // Redirect to login if user is not authenticated
        navigate('/login');
      } else {
        console.error(err);
      }
    });
  };

  return (
    <div>
      <h2>All Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.title} - ${course.price}
            {!purchasedCourses.includes(course.id) && (
              <button onClick={() => handleBuyCourse(course.id)}>Buy</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
