import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Anime Hub</h1>
        <p className="subtitle">Your Personal Anime Discovery Platform</p>
      </div>

      <div className="about-section">
        <h2>About This Project</h2>
        <p>
          Hi there! I'm Amarpreet, and this is my pet project for my college assignment. 
          As a passionate anime enthusiast, I wanted to create something that combines my 
          love for programming with my deep appreciation for anime.
        </p>
        
        <p>
          My journey with anime began when I first watched "Death Note" - it completely 
          changed my perspective on animation as a medium for storytelling. Since then, 
          I've been hooked, exploring various genres from shonen to slice-of-life.
        </p>

        <h2>Why This Project?</h2>
        <p>
          Being a Computer Science student at Langara College, I wanted to create 
          something meaningful that showcases both my technical skills and personal interests. 
          This project uses React and modern web technologies to create an intuitive platform 
          for fellow anime lovers to discover and track their favorite shows.
        </p>

        <div className="features-section">
          <h2>Features</h2>
          <ul>
            <li>Browse and search anime titles</li>
            <li>Detailed information about each show</li>
            <li>Personal watchlist management</li>
            <li>Character details and episode guides</li>
          </ul>
        </div>

        <div className="cta-section">
          <Link to="/gallery" className="cta-button">Start Exploring</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
