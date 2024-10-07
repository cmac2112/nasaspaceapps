import React from 'react';
import './AboutUs.css';
import caden from "../../assets/caden.png"
import meriem from "../../assets/meriem.png"
import logo from "../../assets/logo.png"
import Layout from "../Layout/Layout";

const Aboutus= () => {
    return (
        <Layout>
        <div className="bg">
        <div className="aboutus">
            <div className="content">
            </div>
            <div className="logo-container">
            <img src={logo} alt="logo" className="logo-image" />
        </div>

            <div className="video-container">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/HfaFDWLiPl0?si=o88z9P6c_u3XyVun" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                
            </div>
            <div className="team">
            <h2>OUR TEAM:</h2>
            </div>
            <div className="bio-container">
                <div className="bio">
                    <h2>Caden McArthur</h2>

 <img src={caden} alt="caden" className="circular-image" />
                    <p>Senior Computer Science major, Mathematics minor at Bethel College.</p>
                    <p>Experience in developing for large companies, schools, and many personal projects.</p>
                    <p>Currently working at Bethel as an Observatory Assistant and Software Developer</p>
                    <a href="https://github.com/cmac2112">GitHub</a>
                    <p>Connect with me on LinkedIn</p>
                    <a href="https://www.linkedin.com/in/cadenmcarthur/">LinkedIn</a>
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
        </div>
        </Layout>
    );
};

export default Aboutus;
