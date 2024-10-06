import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'


const Header = () => {
    // header component, should hold links to all the pages here
  return (
    <div className="header-container">
        <h1 className="header-title">Near Earth Object Orrery</h1>
        <nav className="navbar">
            <ul className="list">
            <li className='header-li'><Link to="/">Home</Link></li>
            <li className='header-li'><Link to="/solareyes/simulation">Simulation</Link></li>
            <li className='header-li'><Link to="/solareyes/info">Info</Link></li>
            <li className='header-li'><Link to="/solareyes/aboutus">About us</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header