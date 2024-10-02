import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './CourseList';
import CoursePage from './CoursePage';
import PurchasedCourses from './PurchasedCourses';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';
import Logout from './Logout'; 
import Course1 from './Course1';
import Course2 from './Course2';
import UserProfile from './UserProfile';
import Notification from './Notification';
import Home from './Home';
import Footer from './Footer';

const App = () => {


  return (
    <Router>
      <Navbar />
     
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course/:id" element={<CoursePage />} />
          <Route path="/purchased-courses" element={<PurchasedCourses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/course1" element={<Course1 />} />
          <Route path="/course2" element={<Course2 />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Notification" element={<Notification />} />
          
        </Routes>
      
    </Router>
  );
};

export default App;
