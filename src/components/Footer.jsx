import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-github"></i>
            GitHub
          </a>
          <a href="" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-linkedin"></i>
            LinkedIn
          </a>
          <a href="" target="_blank" rel="noopener noreferrer" className="social-link">
            <i className="fab fa-twitter"></i>
            Twitter
          </a>
        </div>
        <div className="love-message">
          Developed with <span className="heart">❤️</span> by Amarpreet
        </div>
      </div>
    </footer>
  );
};

export default Footer;
