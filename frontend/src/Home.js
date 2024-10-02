import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure you have this file for styling
import course1 from './images/course1.jpg'; // Adjusted path
import course2 from './images/course2.jpg'; // Adjusted path
import course3 from './images/course3.jpg'; // Adjusted path



const HomePage = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Learn from the Best Instructors</h1>
          <p>Boost your skills with top-notch courses in coding, design, and more.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">Get Started</Link>
            <Link to="/courses" className="btn-secondary">Browse Courses</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why Learn with Us?</h2>
        <div className="about-grid">
          <div className="about-card">
            <i className="fas fa-code"></i>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of experience. Our instructors are dedicated to your success.</p>
          </div>
          <div className="about-card">
            <i className="fas fa-clock"></i>
            <h3>Flexible Learning</h3>
            <p>Access your courses anywhere, anytime, at your own pace. Enjoy the freedom to learn when it suits you best.</p>
          </div>
          <div className="about-card">
            <i className="fas fa-certificate"></i>
            <h3>Get Certified</h3>
            <p>Earn certificates after completing your courses, enhancing your resume and showcasing your new skills.</p>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="courses-grid">
          <div className="course-card">
            <img src={course1} alt="Python for Beginners" />
            <h3>Python for Beginners</h3>
            <p>Learn the basics of Python in this comprehensive beginner's course.</p>
          </div>
          <div className="course-card">
            <img src={course2} alt="React Development" />
            <h3>React Development</h3>
            <p>Master React and build interactive UIs through hands-on projects.</p>
          </div>
          <div className="course-card">
            <img src={course3} alt="Web Development Bootcamp" />
            <h3>Web Development Bootcamp</h3>
            <p>Become a full-stack developer in just a few months. Learn HTML, CSS, JavaScript, and more.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Explore Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>Web Development</h3>
            <p>Dive into front-end and back-end technologies to build amazing websites.</p>
          </div>
          <div className="category-card">
            <h3>Data Science</h3>
            <p>Analyze data and extract meaningful insights using Python and R.</p>
          </div>
          <div className="category-card">
            <h3>Design</h3>
            <p>Learn the principles of design and UX/UI to create visually appealing products.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"The courses were incredibly informative and the instructors were top-notch!"</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"I learned so much in such a short amount of time. Highly recommend!"</p>
            <h4>- Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="instructors">
        <h2>Meet Our Instructors</h2>
        <div className="instructors-grid">
          <div className="instructor-card">
            <h3>John Smith</h3>
            <p>Expert in Python and Data Science with over 10 years of teaching experience.</p>
          </div>
          <div className="instructor-card">
            <h3>Mary Johnson</h3>
            <p>Front-end developer and UI/UX designer passionate about teaching.</p>
          </div>
        </div>
      </section>

     

      {/* Footer Section */}
      <footer>
        <p>&copy; 2024 My Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
