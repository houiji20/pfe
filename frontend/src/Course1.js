import React from 'react';
import './Course1.css';

const Course1 = () => {
  return (
    <div className="course-container">
      <h1 className="course-title">Web Development Courses</h1>
      <div className="course-description">
        <p>
          Welcome to our Web Development course! In today's digital age, web development is a vital skill that empowers you to create stunning and interactive websites. 
          This comprehensive course is designed for beginners and intermediate learners, guiding you through the essential building blocks of web technologies, including HTML, CSS, and JavaScript.
        </p>
        <p>
          Throughout this course, you will:
        </p>
        <ul>
          <li>Gain a solid understanding of HTML structure and semantic markup.</li>
          <li>Learn how to style your web pages using modern CSS techniques.</li>
          <li>Discover the power of JavaScript for making your websites interactive.</li>
          <li>Create responsive designs that look great on all devices.</li>
          <li>Build your own web projects to showcase your skills.</li>
        </ul>
        <p>
          By the end of this course, you will have the confidence and knowledge to start your journey in the world of web development. 
          Let's embark on this exciting learning adventure together!
        </p>
      </div>
      <div className="video-container">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/wRNinF7YQqQ" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
};

export default Course1;
