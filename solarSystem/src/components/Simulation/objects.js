import neoData from "../../assets/neo.json"
// Keplerian elements for each planet

/*
Semi-major axis (a): 
The average distance from the body to the focus of the ellipse
(e.g., the sun for planets).

Eccentricity (e): 
A measure of how much the orbit deviates from a perfect circle 
(0 is circular, values closer to 1 are more elliptical).

Inclination (I): 
The tilt of the orbit relative to the reference plane (e.g., the ecliptic plane for planets).

Mean anomaly (L): 
The fraction of the orbital period that has elapsed since the body passed periapsis,
expressed in degrees.

Argument of periapsis (longPeri): 
The angle from the ascending node to the periapsis, in degrees.

Longitude of ascending node (longNode): 
The angle from the reference direction to the ascending node, in degrees.



Name: "P/2004 R1 (McNaught)"
Semi-major axis (a): This can be calculated using the perihelion distance (q_au_1) and the aphelion distance (q_au_2). The semi-major axis is the average of these two distances: a = (q_au_1 + q_au_2) / 2.
Eccentricity (e): "0.682526943"
Inclination (I): "4.894555854"
Mean anomaly (L): This is not directly provided, but you can set it to 0 or calculate it if you have the necessary data.
Argument of periapsis (longPeri): "0.626837835"
Longitude of ascending node (longNode): "295.9854497" posiition of the object itself

*/
const planets = [
  {
    name: 'Mercury',
    a: 0.38709927,
    e: 0.20563593,
    I: 7.00497902,
    L: 252.25032350,
    longPeri: 77.45779628,
    longNode: 48.33076593
  },
  {
    name: 'Venus',
    a: 0.72333566,
    e: 0.00677672,
    I: 3.39467605,
    L: 181.97909950,
    longPeri: 131.60246718,
    longNode: 76.67984255
  },
  {
    name: 'Earth',
    a: 1.00000261,
    e: 0.01671123,
    I: -0.00001531,
    L: 100.46457166,
    longPeri: 102.93768193,
    longNode: 0.0,
    moons: [
      {
        name: 'Moon',
        a: 0.2257, // Semi-major axis in AU already x100 for visibility in the program
        e: 0.0549,  // Eccentricity
        I: 5.145,   // Inclination in degrees
        L: 13.176358, // Mean longitude in degrees
        longPeri: 318.15, // Longitude of perihelion in degrees
        longNode: 125.08  // Longitude of ascending node in degrees
      }
    ]
  },
  {
    name: 'Mars',
    a: 1.52371034,
    e: 0.09339410,
    I: 1.84969142,
    L: -4.55343205,
    longPeri: -23.94362959,
    longNode: 49.55953891,
    moons:[
      {
        name: 'Phobos',
        a: 0.32817, // Semi-major axis in AU, very close, spreading it out for visualization
        e: 0.0151,      // Eccentricity
        I: 1.093,       // Inclination in degrees
        L: 177.62,      // Mean longitude in degrees
        longPeri: 150.057, // Longitude of perihelion in degrees
        longNode: 317.68  // Longitude of ascending node in degrees
      },
      {
        name: 'Deimos',
        a: 0.156,    // Semi-major axis in AU
        e: 0.0002,      // Eccentricity
        I: 1.788,       // Inclination in degrees
        L: 53.57,       // Mean longitude in degrees
        longPeri: 260.729, // Longitude of perihelion in degrees
        longNode: 316.65  // Longitude of ascending node in degrees
      }
    ]
  },

  {
    name: 'Jupiter',
    a: 5.20288700,
    e: 0.04838624,
    I: 1.30439695,
    L: 34.39644051,
    longPeri: 14.72847983,
    longNode: 100.47390909,
    moons: [
      {
        name: 'Io',
        a: 0.2819, // Semi-major axis in AU
        e: 0.0041,  // Eccentricity
        I: 0.036,   // Inclination in degrees
        L: 200.39, // Mean longitude in degrees
        longPeri: 84.129, // Longitude of perihelion in degrees
        longNode: 43.977  // Longitude of ascending node in degrees
      },
      {
        name: 'Europa',
        a: 0.4485, // Semi-major axis in AU
        e: 0.009,  // Eccentricity
        I: 0.466,   // Inclination in degrees
        L: 100.46, // Mean longitude in degrees
        longPeri: 88.970, // Longitude of perihelion in degrees
        longNode: 219.106  // Longitude of ascending node in degrees
      },
      {
        name: 'Ganymede',
        a: 0.7155, // Semi-major axis in AU
        e: 0.0013,  // Eccentricity
        I: 0.177,   // Inclination in degrees
        L: 50.317, // Mean longitude in degrees
        longPeri: 192.417, // Longitude of perihelion in degrees
        longNode: 63.552  // Longitude of ascending node in degrees
      },
      {
        name: 'Callisto',
        a: 0.2585, // Semi-major axis in AU
        e: 0.0074,  // Eccentricity
        I: 0.192,   // Inclination in degrees
        L: 300.56, // Mean longitude in degrees
        longPeri: 52.643, // Longitude of perihelion in degrees
        longNode: 298.848  // Longitude of ascending node in degrees
      }
    ]
  },
  {
    name: 'Saturn',
    a: 9.53667594,
    e: 0.05386179,
    I: 2.48599187,
    L: 49.95424423,
    longPeri: 92.59887831,
    longNode: 113.66242448,
    moons: [
      {

      }
    ]

  },
  //too far away to feasably get to in the simulation without breaking scale
  {
    name: 'Uranus',
    a: 19.18916464,
    e: 0.04725744,
    I: 0.77263783,
    L: 313.23810451,
    longPeri: 170.95427630,
    longNode: 74.01692503
  },
  {
    name: 'Neptune',
    a: 30.06992276,
    e: 0.00859048,
    I: 1.77004347,
    L: -55.12002969,
    longPeri: 44.96476227,
    longNode: 131.78422574,
    moons: [

    ]
  }
];

export const getObjects = async () => {
  try{
  
    let response = await fetch("https://data.nasa.gov/resource/b67r-rgxc.json")
  let data = await response.json()

  const mappedData = data.map(item => ({
    name: item.object_name || item.object,
    a: parseFloat(item.q_au_1) / (1 - parseFloat(item.e)), // Semi-major axis
    e: parseFloat(item.e),
    I: parseFloat(item.i_deg),
    L: parseFloat(item.tp_tdb), // Mean anomaly at epoch (tp_tdb)
    longPeri: parseFloat(item.w_deg),
    longNode: parseFloat(item.node_deg)
  }));

  // Append the mapped data to the planets array
  planets.push(...mappedData);

  console.log('Updated planets array 1:', planets);
} catch (error) {
  console.error('Error fetching or processing data:', error);
}
try{
  let response = await fetch("https://ssd-api.jpl.nasa.gov/sbdb_query.api?fields=full_name,epoch,e,a,q,i,om,w&sb-class=IEO")
  let data = await response.json()
  const mappedData = data.map(item => ({
    name: item.object_name || item.object,
    a: parseFloat(item.q_au_1) / (1 - parseFloat(item.e)), // Semi-major axis
    e: parseFloat(item.e),
    I: parseFloat(item.i_deg),
    L: parseFloat(item.tp_tdb), // Mean anomaly at epoch (tp_tdb)
    longPeri: parseFloat(item.w_deg),
    longNode: parseFloat(item.node_deg)
  }));

  // Append the mapped data to the planets array
  planets.push(...mappedData);

}catch(error){
  console.log(error);
}

}

export const getSecondObjects = async () => {
  try {
    // Map the data

    const filteredData = neoData.filter(item => item.orbit);
  
    console.log('filtered data', filteredData)
    const mappedSatData = filteredData.map(item => ({
      name: item.sat.iau_name,
      a: parseFloat(item.orbit.a), // Semi-major axis
      e: parseFloat(item.orbit.e), // Eccentricity, default to 0 if null
      I: parseFloat(item.orbit.i), // Inclination
      L: parseFloat(item.orbit.tp), // Mean anomaly at epoch (tp)
      longPeri: parseFloat(item.orbit.w), // Longitude of perihelion, default to 0 if null
      longNode: parseFloat(item.orbit.om) // Longitude of ascending node
    }));

    //filter out all null a values and delete the items
    // Append the mapped data to the planets array
    planets.push(...mappedSatData);

    console.log('Updated planets array 2:', planets);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};
  export default planets;