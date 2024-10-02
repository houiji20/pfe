import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { id } = useParams();
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/courses/${id}/check_access/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setAccessGranted(res.data.access_granted))
    .catch(err => console.error(err));
  }, [id]);

  return (
    <div>
      {accessGranted ? (
        <h2>Course Content for Course {id}</h2>
      ) : (
        <h2>You need to purchase this course to access the content.</h2>
      )}
    </div>
  );
};

export default CoursePage;
