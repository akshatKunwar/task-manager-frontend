import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Optional: Import a specific CSS file for custom styling

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Welcome to Task Manager</h1>
        <p>Manage your tasks efficiently and never miss a deadline.</p>
        <div className="home-buttons">
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
