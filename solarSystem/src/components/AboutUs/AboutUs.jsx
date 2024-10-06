import React from 'react';
import './AboutUs.css';
import caden from "../../assets/caden.png"
import meriem from "../../assets/meriem.png"
import logo from "../../assets/logo.png"
 

const Aboutus= () => {
    return (
        <div className="aboutus">
            <div className="content">
            </div>
            <div className="logo-container">
            <img src={logo} alt="logo" className="logo-image" />
        </div>

            <div className="video-container">
                <video controls>
                    <source src="path/to/your/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="team">
            <h2>OUR TEAM:</h2>
            </div>
            <div className="bio-container">
                <div className="bio">
                    <h2>Caden McArthur</h2>

 <img src={caden} alt="caden" className="circular-image" />
                    <p>Short biography for Name 1.</p>
                </div>
                <div className="bio">
                    <h2>Meriem Dhouibi</h2>
                    <img src={meriem} alt="caden" className="circular-image" />

                    <p>Freshman Math and Physics major at Bethel College from Tunis, Tunisia.</p>
                    <p>With a loud passion for astrophysics, the quest is ever afoot toward a bright future in aerospace engineering for Meriem. Her fascination with Astronomy drives her to work with Caden to run the Bethel College Observatory. 
Beyond that, Meriem is a violinist, finding solace and inspiration in the harmonious world of music. The delicate balance between the rigors of science and the artistry of music serves as a testament to her versatility and dedication.</p>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;
