import React from 'react'
import './Header.css'

const Header = () => {
    // header component, should hold links to all the pages here
  return (
    <div className="header-container">
        <h1>Near Earth Object Orrery</h1>
        <nav className="navbar">
            <ul className="list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">How it Works</a></li>
            <li><a href="/info">Info</a></li>
            <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header