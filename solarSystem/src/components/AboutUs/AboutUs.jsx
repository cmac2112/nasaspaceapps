import React from 'react';
import './AboutUs.css';

const Aboutus= () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <div className="logo-container">
                <img src="path/to/your/logo.png" alt="Logo" />
            </div>
            <div className="video-container">
                <video controls>
                    <source src="path/to/your/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="bio-container">
                <div className="bio">
                    <h2>Caden McArthur</h2>
                    <p>Short biography for Name 1.</p>
                </div>
                <div className="bio">
                    <h2>Meriem Dhouibi</h2>
                    <p>Short biography for Name 2.</p>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;
