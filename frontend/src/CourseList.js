import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseList.css'; 
import Modal from './Modal'; // Import the Modal component

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null); // Store the selected course object

  useEffect(() => {
    fetchCourses();
    fetchPurchasedCourses();
  }, [selectedCategory]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/courses/?category=${selectedCategory}`);
        
        // Map through the courses and set the absolute URL for images
        const coursesWithAbsoluteUrls = res.data.map(course => ({
            ...course,
            image_url: `http://127.0.0.1:8000${course.image_url}`, // Prepend the base URL
        }));

        setCourses(coursesWithAbsoluteUrls);
    } catch (err) {
        setError('Failed to fetch courses');
        console.error(err);
    } finally {
        setLoading(false);
    }
};


  const fetchPurchasedCourses = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/purchased-courses/', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setPurchasedCourses(res.data.map(course => course.id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyCourse = (course) => {
    if (!localStorage.getItem('token')) {
      alert('You need to log in to purchase a course.');
      return;
    }
    setSelectedCourse(course); // Store the entire course object
    setShowModal(true);  // Show the modal
  };

  const confirmPurchase = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/buy-course/${selectedCourse.id}/`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Course purchased successfully');
      fetchPurchasedCourses(); // Refresh purchased courses list
    } catch (err) {
      console.error('Purchase failed:', err);
      alert('Please');
    } finally {
      setShowModal(false); // Close the modal
      setSelectedCourse(null); // Reset selected course
    }


  };

    
  return (
    <div className="course-list">
      <h2>All Courses</h2>

      {/* Display courses */}
      {loading ? (
        <div>Loading courses...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="course-grid">
          {courses.map(course => (
            <div className="course-card" key={course.id}>
              <img src={course.image_url} alt={course.title} className="course-image" />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p className="course-price">Price: ${course.price}</p>
              <p className="course-rating">Rating: {course.rating} ⭐</p>
              {!purchasedCourses.includes(course.id) ? (
                <button className='buy-button' onClick={() => handleBuyCourse(course)}>Buy Now</button>
              ) : (
                <p>Course Purchased</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination and Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        course={selectedCourse} 
        confirmPurchase={confirmPurchase} 
      />
    </div>
  );
};

export default CourseList;
