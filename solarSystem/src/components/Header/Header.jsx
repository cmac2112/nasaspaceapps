import React from 'react'
import './Header.css'


const Header = () => {
    // header component, should hold links to all the pages here
  return (
    <div className="header-container">
        <h1 className="headerh1">Near Earth Object Orrery</h1>
        <nav className="navbar">
            <ul className="list">
            <li className="headerli"><a href="/">Home</a></li>
            <li className="headerli"><a href="/simulation">Simulation</a></li>
            <li className="headerli"><a href="/about">How it Works</a></li>
            <li className="headerli"><a href="/info">Info</a></li>
            <li className="headerli"><a href="/aboutus">About Us</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header