import React from 'react'
import Layout from '../Layout/Layout'
import './InfoPage.css'
import kep from "../../assets/kep.png"
import kep2 from "../../assets/kep2.png"
import kep3 from "../../assets/kep3.png"
import kep4 from "../../assets/kep4.png"
import kep5 from "../../assets/kep5.png"
import kep6 from "../../assets/kep6.png"
import kep7 from "../../assets/kep7.png"
import kep8 from "../../assets/kep8.png"




const InfoPage = () => {
    return (
        <Layout>
          <div className="bg">
            <p className="keplerianparameteres">Keplerian Parameteres</p>
            <ol className="parapraph1">
        <li> <i>1. Semi-major axis (a) </i>: Defines the size of the conic.</li>
        <li> <i>2. Eccentricity (e) </i>: Defines the shape of the conic.</li>
        <li> <i> 3. Inclination (i) </i>: The angle between the reference frame and the orbital plane.</li>
        <li> <i>4. Longitude of the ascending node (Ω) </i>: The pin.</li>
        <li> <i>5. Argument of periapsis (ω) </i>: The twist.</li>
        <li> <i>6. Mean anomaly at epoch (v) </i>: The angle.</li>
    </ol>

    <p className="calculated">Calculated quantities</p>

    <ul className="quantities">
    <li>M - mean anomaly (degrees)</li>
    <li> V - true anomaly </li>
    <li> r - radius vector (au) referred to current coordinate origin</li>
    </ul>
    <img src={kep2} alt="Description" class="centered-image" />

            <p className="anomaly1"> Finding the Mean Anomaly of the planet(M)</p>
            <ul className="anomaly2">
    <li>
        <strong>The mean anomaly of the planet is given by this formula; </strong> 
        <strong>M = n * d + L - p </strong>
    </li>
    <li>
    n - daily motion
    </li> <li> d - number of days since the date of the elements </li>
    <li> L - mean longitude </li> <li> p - logitude of perihelion </li>
    <li> m should be in range 0 to 360.</li>
    
</ul>
<img src={kep3} alt="Description" class="styled-image" />

<p className="radius1"> Finding the radius vector of the planet </p>
<ul className="radius2">
        <li>The distance from the planet to the focus of the ellipse is given by a simple formula based on the geometry of the ellipse;

</li>     
<strong> <i> r = a * (1 - e^2) / [1 + e * cos(v)]  </i></strong>

</ul>
            <p className="framework">Frameworks & Coordinates</p>
            <ul className="orbitalelements">
    <li>
        <strong>The positions of objects in the sky as viewed from Earth are referred to a coordinate system whose alignment is changing with time in a complex way. A few of the important motions and effects are; </strong>
    </li>
    <li>
    • The Earth is rotating on its axis once every siderial day.</li>
<li>
• The rotation axis is moving in a circle with a period of roughly 26,000 years.
</li><li>
• The axis is 'nodding' up and down with a period of roughly 19 years.
</li>
<li>
• The finite speed of light.
</li>
            </ul>
            <img src={kep} alt="Description" class="formed-image" />

            <p className="heliocentric"> Heliocentric coordinates of the planet</p>
            <ol className="helio">

        
            <strong> Heliocentric coordinates are a system of coordinates that measure the positions of objects in space relative to the center of the Sun. These coordinates are often used to describe the locations and movements of planets and other bodies within the Solar System.</strong>
           <li>Having found the true anomaly and the radius vector of the planet, we can go on to find the position of the planet with respect to the plane of the ecliptic</li>
           <img src={kep4} alt="Description" class="styled-image" />

           
           
            </ol>
            
             <p className="position">The planet's position in space</p>
             <ol className="pos">
                <li>Compute the planet's position in 3-D space</li>
                <img src={kep5} alt="Description" class="styled-image" />

             </ol>
            <p className="equa"> Equatorial Coordinates</p>
            <ol className="equatorial">
                <li>Let's convert our rectangular, ecliptic coordinates to rectangular, equatorial coordinates: simply rotate the y-z-plane by ecl, the angle of the obliquity of the ecliptic:
</li>
<img src={kep6} alt="Description" class="styled-image" />

            </ol>
            <p className="asteroids"> Positions of asteroids</p>
            <ol className="ast">
                <li>For asteroids, the orbital elements are often given as: N,i,w,a,e,M, where N,i,w are valid for a specific epoch (nowadays usually 2000.0). In our simplified computational scheme, the only significant changes with the epoch occurs in N. To convert N_Epoch to the N (today's epoch) we want to use, simply add a correction for precession:</li>
                <img src={kep7} alt="Description" class="styled-image" />

            </ol>
            <p className="comets"> Position of <del>asteroids</del> <ins>comets</ins> </p>
            <ol className="comet">
                <li>For comets with elliptical orbits, the mean anomaly (M) is typically not provided. Instead, the time of perihelion (T) is given. At perihelion, M is zero. To calculate M for any other time, follow these steps:</li>
            <li> 1. Compute the “day number” (d) for the time of perihelion (T), which we’ll call dT.
</li>
<li> 2. Compute the “day number” (d) for the moment you want to determine the position.
</li>
<li>Then, calculate the mean anomaly (M) using the formula: </li>
<img src={kep8} alt="Description" class="styled-image" />
<li>Additionally, the semi-major axis (a) is often not provided. Instead, the perihelion distance (q) is given. You can compute a from q and the <i>eccentricity (e)</i> using the formula:</li>
<i>a = q / (1.0 - e)</i> <li>
<b>Then proceed as with an asteroid.</b>
</li>
</ol>
          </div>
        </Layout>
      )
}
export default InfoPage