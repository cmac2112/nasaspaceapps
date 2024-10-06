

const calculateOrbitalPeriod = (a) => {
    return Math.sqrt(a ** 3); // Orbital period in Earth years based on kepler's third law
  };
  
  // Function to calculate the position of a celestial body based on Keplerian elements
export default function calculatePosition (body, time){
    const { a, e, I, L, longPeri, longNode } = body;
  
    /* Parent Body Position:
  
  The calculatePosition function is used to compute the position of the parent body (e.g., a planet) in its orbit around the central star.
  Moon Position Relative to Parent:
  
  The same calculatePosition function is used to compute the position of the moon in its orbit around the parent body.
  Combining Positions:
  
  The position of the moon relative to the central star is obtained by adding the position vectors of the parent body and the moon.*/
    const orbitalPeriod = calculateOrbitalPeriod(a);
  
    const adjustedTime = time / orbitalPeriod;
  
    //mean anomaly
    const M = (L - longPeri + adjustedTime * 360) % 360;
  //1727473.172396
  // 1.8808476640832312
    // -4.5534 - -23.94362959 + ( 1727473.172396 / sqrt(1.52371034^3))
    // Eccentric anomaly (iterative solution)
    let E = M;
  
    for (let i = 0; i < 5; i++) {
      E = M + (e * 180 / Math.PI) * Math.sin(E * Math.PI / 180);
    }
  
    // True anomaly
    const v = 2 * Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2 * Math.PI / 180),
      Math.sqrt(1 - e) * Math.cos(E / 2 * Math.PI / 180)
    ) * 180 / Math.PI;
  
    // Distance from the sun
    const r = a * (1 - e * Math.cos(E * Math.PI / 180));
  
    // Heliocentric coordinates in the orbital plane
    const xOrb = r * Math.cos(v * Math.PI / 180); //calculating the longitude of acending node etc...
    const yOrb = r * Math.sin(v * Math.PI / 180);
  
    // Convert to 3D coordinates
    const cosI = Math.cos(I * Math.PI / 180); //cosine and sine = circle basically
    const sinI = Math.sin(I * Math.PI / 180);
    const cosNode = Math.cos(longNode * Math.PI / 180);
    const sinNode = Math.sin(longNode * Math.PI / 180);
    const cosPeri = Math.cos((longPeri - longNode) * Math.PI / 180);
    const sinPeri = Math.sin((longPeri - longNode) * Math.PI / 180);
  
    const x = (cosNode * cosPeri - sinNode * sinPeri * cosI) * xOrb + (-cosNode * sinPeri - sinNode * cosPeri * cosI) * yOrb;
    const y = (sinNode * cosPeri + cosNode * sinPeri * cosI) * xOrb + (-sinNode * sinPeri + cosNode * cosPeri * cosI) * yOrb;
    const z = (sinPeri * sinI) * xOrb + (cosPeri * sinI) * yOrb;
  
    return { x, y, z };
  };