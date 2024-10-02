import React from 'react';
import './Course3.css'; // Reusing the same CSS file

const Course2 = () => {
    return (
        <div className="course1-container">
            <h1 className="course-title">Cyber Security Basics</h1>
            
            <div className="course-description">
                <h2>Welcome to Cyber Security Basics</h2>
                <p>
                    In our increasingly digital world, understanding the fundamentals of cyber security is essential. 
                    This course is designed to provide you with the foundational knowledge needed to protect yourself 
                    and your organization from cyber threats.
                </p>
                <p>
                    Throughout this course, you will learn about key topics in cyber security:
                    <ul>
                        <li><strong>Types of Threats</strong> - Understanding various cyber threats like malware, phishing, and ransomware.</li>
                        <li><strong>Security Measures</strong> - Implementing effective security measures such as firewalls and antivirus software.</li>
                        <li><strong>Safe Browsing Practices</strong> - Tips on how to stay safe online and protect your personal information.</li>
                    </ul>
                </p>
                <p>
                    By the end of this course, you will have a solid understanding of cyber security principles and how to 
                    apply them in real-world scenarios.
                </p>
                <p>
                    Join us on this journey to becoming more cyber-aware and prepared!
                </p>
            </div>

            <div className="video-container">
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/njPY7pQTRWg" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Course2;
