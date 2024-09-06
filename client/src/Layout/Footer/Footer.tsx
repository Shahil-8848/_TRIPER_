import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Company Name</h2>
          <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul className="footer-links">
            <li className="footer-link-item">
              <a href="#home" className="footer-link">Home</a>
            </li>
            <li className="footer-link-item">
              <a href="#about" className="footer-link">About</a>
            </li>
            <li className="footer-link-item">
              <a href="#services" className="footer-link">Services</a>
            </li>
            <li className="footer-link-item">
              <a href="#contact" className="footer-link">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <ul className="footer-social-links">
            <li className="footer-social-link-item">
              <a href="https://facebook.com" className="footer-social-link">Facebook</a>
            </li>
            <li className="footer-social-link-item">
              <a href="https://twitter.com" className="footer-social-link">Twitter</a>
            </li>
            <li className="footer-social-link-item">
              <a href="https://instagram.com" className="footer-social-link">Instagram</a>
            </li>
            <li className="footer-social-link-item">
              <a href="https://linkedin.com" className="footer-social-link">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
