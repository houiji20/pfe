import React from 'react';
import './Course2.css';
import { Link } from 'react-router-dom';

const Course1 = () => {
    return (
        <div className="course1-container">
            <h1 className="course-title">SQL Courses</h1>
            
            <div className="course-description">
                <h2>Welcome to SQL</h2>
                <p>
                    SQL (Structured Query Language) is a standard programming language specifically designed for managing and manipulating relational databases. 
                    Whether you want to analyze data, create reports, or build data-driven applications, learning SQL is essential for anyone working with data.
                </p>
                <p>
                    In this course, you will learn the fundamental concepts of SQL:
                    <ul>
                        <li><strong>Data Retrieval</strong> - Using SELECT statements to query data from databases.</li>
                        <li><strong>Data Manipulation</strong> - Inserting, updating, and deleting records in a database.</li>
                        <li><strong>Database Design</strong> - Understanding tables, relationships, and normalization.</li>
                        <li><strong>Advanced Queries</strong> - Working with JOINs, GROUP BY, and subqueries.</li>
                    </ul>
                </p>
                <p>
                    By the end of this course, you will have the skills to write complex SQL queries and manage databases effectively, providing a strong foundation for a career in data analysis, data science, or software development.
                </p>
                <p>
                    Join us as we embark on this exciting journey into the world of databases and SQL!
                </p>
            </div>

            <div className="video-container">
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/5OdVJbNCSso" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Course1;
