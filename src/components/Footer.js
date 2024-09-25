// Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-0">© {new Date().getFullYear()} Developed By SAI HARSHA .R</p>
        <a href="#" className="text-white">Privacy Policy</a> | 
        <a href="#" className="text-white">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
