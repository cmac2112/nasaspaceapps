import * as THREE from "three";
const calculateOrbitalPeriod = (a) => {
  return Math.sqrt(a ** 3); // Orbital period in Earth years based on kepler's third law
};

// Function to calculate the position of a celestial body based on Keplerian elements
export default function calculatePosition(body, time) {
  const { a, e, I, L, longPeri, longNode } = body;

  // Insert 0 for values that are undefined, null, NaN, or empty string
  const aVal = a || 0;
  const eVal = e || 0;
  const IVal = I || 0;
  const LVal = L || 0;
  const longPeriVal = longPeri || 0;
  const longNodeVal = longNode || 0;

  /* Parent Body Position:
  
  The calculatePosition function is used to compute the position of the parent body (e.g., a planet) in its orbit around the central star.
  Moon Position Relative to Parent:
  
  The same calculatePosition function is used to compute the position of the moon in its orbit around the parent body.
  Combining Positions:
  
  The position of the moon relative to the central star is obtained by adding the position vectors of the parent body and the moon.*/

  const orbitalPeriod = calculateOrbitalPeriod(aVal);

  const adjustedTime = time / orbitalPeriod;

  // Mean anomaly
  const M = (LVal - longPeriVal + adjustedTime * 360) % 360;

  // Eccentric anomaly (iterative solution)
  let E = M;

  for (let i = 0; i < 5; i++) {
    E = M + ((eVal * 180) / Math.PI) * Math.sin((E * Math.PI) / 180);
  }

  // True anomaly
  const v =
    (2 *
      Math.atan2(
        Math.sqrt(1 + eVal) * Math.sin(((E / 2) * Math.PI) / 180),
        Math.sqrt(1 - eVal) * Math.cos(((E / 2) * Math.PI) / 180)
      ) *
      180) /
    Math.PI;

  // Distance from the sun
  const r = aVal * (1 - eVal * Math.cos((E * Math.PI) / 180));

  // Heliocentric coordinates in the orbital plane
  const xOrb = r * Math.cos((v * Math.PI) / 180);
  const yOrb = r * Math.sin((v * Math.PI) / 180);

  // Convert to 3D coordinates
  const cosI = Math.cos((IVal * Math.PI) / 180);
  const sinI = Math.sin((IVal * Math.PI) / 180);
  const cosNode = Math.cos((longNodeVal * Math.PI) / 180);
  const sinNode = Math.sin((longNodeVal * Math.PI) / 180);
  const cosPeri = Math.cos(((longPeriVal - longNodeVal) * Math.PI) / 180);
  const sinPeri = Math.sin(((longPeriVal - longNodeVal) * Math.PI) / 180);

  const x =
    (cosNode * cosPeri - sinNode * sinPeri * cosI) * xOrb +
    (-cosNode * sinPeri - sinNode * cosPeri * cosI) * yOrb;
  const y =
    (sinNode * cosPeri + cosNode * sinPeri * cosI) * xOrb +
    (-sinNode * sinPeri + cosNode * cosPeri * cosI) * yOrb;
  const z = sinPeri * sinI * xOrb + cosPeri * sinI * yOrb;

  return { x, y, z };
}

export function calculateOrbitPoints(
  a,
  e,
  IVal,
  longNode,
  longPeri,
  segments = 64
) {
  const points = [];
  const scaledDistance = 1000;
  for (let i = 0; i <= segments; i++) {
    const E = (i / segments) * 360; // Eccentric anomaly in degrees
    const v =
      (2 *
        Math.atan(
          Math.sqrt((1 + e) / (1 - e)) * Math.tan((E * Math.PI) / 360)
        ) *
        180) /
      Math.PI; // True anomaly in degrees

    const r = a * (1 - e * Math.cos((E * Math.PI) / 180));
    const xOrb = r * Math.cos((v * Math.PI) / 180);
    const yOrb = r * Math.sin((v * Math.PI) / 180);

    const cosI = Math.cos((IVal * Math.PI) / 180);
    const sinI = Math.sin((IVal * Math.PI) / 180);
    const cosNode = Math.cos((longNode * Math.PI) / 180);
    const sinNode = Math.sin((longNode * Math.PI) / 180);
    const cosPeri = Math.cos(((longPeri - longNode) * Math.PI) / 180);
    const sinPeri = Math.sin(((longPeri - longNode) * Math.PI) / 180);

    const x =
      (cosNode * cosPeri - sinNode * sinPeri * cosI) * xOrb +
      (-cosNode * sinPeri - sinNode * cosPeri * cosI) * yOrb;
    const y =
      (sinNode * cosPeri + cosNode * sinPeri * cosI) * xOrb +
      (-sinNode * sinPeri + cosNode * cosPeri * cosI) * yOrb;
    const z = sinPeri * sinI * xOrb + cosPeri * sinI * yOrb;

    points.push(
      new THREE.Vector3(
        x * scaledDistance,
        y * scaledDistance,
        z * scaledDistance
      )
    );
  }
  return points;
}
export function createOrbitLine(points) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
  });
  return new THREE.Line(geometry, material);
}
