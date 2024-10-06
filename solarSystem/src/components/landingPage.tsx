// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './landingPage';
import ContactPage from './ContactPage';

function App() {
    return (
        <Router>
            <header>
                <h1>Landing Page</h1>
            </header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </main>
            <footer>
                <p>© 2024 My Basic Website</p>
            </footer>
        </Router>
    );
}

export default App ;
