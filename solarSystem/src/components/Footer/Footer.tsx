import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
        <p>© 2024 Caden McArthur, Meriem Dhouibi. MIT License</p>
        <p>Bethel College Software Club</p>
        <p>Created for NASA Space Apps Challenge 2024</p>
        <nav className="footer-nav">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/aboutus">About us</a>
            <a href="/contact">Contact Us</a>
        </nav>
    </div>
</footer>
  )
}

export default Footer;
