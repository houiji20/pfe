import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [CourseComponent, setCourseComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCourseComponent = async () => {
      try {
        // Dynamically import the course component based on the course ID
        const Course = await import(`./Course${id}`);
        setCourseComponent(() => Course.default);
        setLoading(false);
      } catch (err) {
        console.error(`Course${id}.js could not be found.`, err);
        setError('Course not found');
        setLoading(false);
      }
    };

    loadCourseComponent();
  }, [id]);

  if (loading) {
    return <div>Loading course...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Suspense fallback={<div>Loading course content...</div>}>
      {CourseComponent ? <CourseComponent /> : <div>Course not found</div>}
    </Suspense>
  );
};

export default CoursePage;
