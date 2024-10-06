import planets from "./objects";
import * as THREE from "three";
import sun from "../../assets/sun.jpg";
import meteormap from "../../assets/meteor.jpg";
import mercury from "../../assets/mercurymap.jpg";
import venusmap from "../../assets/venusmap.jpg";
import mars from "../../assets/mars.jpg";
import jupiter from "../../assets/jupiter.jpg";
import saturn from "../../assets/saturnmap.jpg";
import uranus from "../../assets/uranusmap.jpg";
import neptune from "../../assets/neptunemap.jpg";
import ear from "../../assets/earth.jpg";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";

export default async function sunGenerator() {
  // Create WebGL context
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2");

  console.log(document.getElementById("vertexshader").textContent);

  const texture = new THREE.TextureLoader().load(sun);

  // Create ShaderMaterial using compiled GLSL shaders
  const material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById("sunvert").textContent,
    fragmentShader: document.getElementById("sunfrag").textContent,
    glslVersion: THREE.GLSL3,
    uniforms: {
      globeTexture: { value: texture },
    },
  });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(30, 30, 30), material);
  sphere.rotation.x = Math.PI / 2;

  return sphere;
}
const createTextSprite = (text) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const fontSize = 100;
  context.font = `${fontSize}px Arial`;

  // Measure the text width
  const textWidth = context.measureText(text).width;

  // Set canvas size based on text width
  canvas.width = textWidth;
  canvas.height = fontSize;

  // Set the font again after resizing the canvas
  context.font = `${fontSize}px Arial`;
  context.fillStyle = "white";
  context.fillText(text, 0, fontSize);

  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(textWidth / 2, fontSize / 2, 1); // Adjust the scale as needed

  return sprite;
};

export const createPlanetMeshes = () => {
  const data = planets.map((planet) => {
    let geometry, material, mesh;

    const textureLoader = new THREE.TextureLoader();
    let texture;
    let moonMeshes;
    switch (planet.name) {
      case "Earth":
        texture = textureLoader.load(ear);
        geometry = new THREE.SphereGeometry(25, 30, 30);
        material = new THREE.ShaderMaterial({
          vertexShader: document.getElementById("vertexshader").textContent,
          fragmentShader: document.getElementById("fragmentshader").textContent,
          glslVersion: THREE.GLSL3,
          uniforms: {
            globeTexture: { value: texture },
          },
        });
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2; // Tilt the object down 90 degrees

        // Create atmosphere
        const atmosphereGeometry = new THREE.SphereGeometry(25, 50, 50);
        const atmosphereMaterial = new THREE.ShaderMaterial({
          vertexShader: document.getElementById("atmospherevert").textContent,
          fragmentShader: document.getElementById("atmospherefrag").textContent,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
        });
        const atmosphere = new THREE.Mesh(
          atmosphereGeometry,
          atmosphereMaterial
        );
        atmosphere.scale.set(1.1, 1.1, 1.1);

        // Create text label
        const textSprite = createTextSprite(planet.name);
        textSprite.position.set(250, 0, 0); // Position above the planet

        // Group Earth, atmosphere, and text label
        const earthGroup = new THREE.Group();
        earthGroup.add(mesh);
        earthGroup.add(atmosphere);
        earthGroup.add(textSprite);

        // Create moon meshes for Earth
        moonMeshes = (planet.moons || []).map((moon) => {
          const moonTexture = textureLoader.load(meteormap);
          const moonGeometry = new THREE.SphereGeometry(10, 15, 15);
          const moonMaterial = new THREE.MeshNormalMaterial({
            map: moonTexture,
          });
          const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
          moonMesh.position.set(500, 0, 0); // Position the moon relative to Earth
          //simulation with moons is tough, they need to show but space is too large to show
          //true scale, so artifical moon distances need
          earthGroup.add(moonMesh); // Add moon to the Earth group

          return { moon, moonMesh };
        });

        return { planet, mesh: earthGroup, moonMeshes };

      case "Mars":
        texture = textureLoader.load(mars);
        geometry = new THREE.SphereGeometry(15, 30, 30);
        material = new THREE.MeshBasicMaterial({ map: texture });
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;

        // Create text label
        const marsSprite = createTextSprite(planet.name);
        marsSprite.position.set(250, 0, 0); // Position above the planet

        // Group Mars and text label
        const marsGroup = new THREE.Group();
        marsGroup.add(mesh);
        marsGroup.add(marsSprite);

        // Create moon meshes for Mars
        moonMeshes = (planet.moons || []).map((moon) => {
          const moonTexture = textureLoader.load(meteormap);
          const moonGeometry = new THREE.SphereGeometry(10, 15, 15);
          const moonMaterial = new THREE.MeshNormalMaterial({
            map: moonTexture,
          });
          const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
          marsGroup.add(moonMesh);

          const moonSprite = createTextSprite(moon.name);
  moonSprite.position.set(0, 10, 0); // Adjust position as needed
  moonMesh.add(moonSprite);

          return { moon, moonMesh };
        });

        return { planet, mesh: marsGroup, moonMeshes };
      case "Mercury":
        texture = textureLoader.load(mercury);
        geometry = new THREE.SphereGeometry(20, 30, 30);
        material = new THREE.MeshBasicMaterial({ map: texture });

        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
        // Create text label

        const mercurySprite = createTextSprite(planet.name);
        mercurySprite.position.set(100, 0, 0); // Position above the planet
        mercurySprite.scale.set(100, 50, 10);

        // Group Mars and text label
        const mercuryGroup = new THREE.Group();
        mercuryGroup.add(mesh);
        mercuryGroup.add(mercurySprite);

       moonMeshes = []

        return { planet, mesh: mercuryGroup, moonMeshes };

      case "Venus":
        texture = textureLoader.load(venusmap);
        geometry = new THREE.SphereGeometry(20, 30, 30);
        material = new THREE.MeshBasicMaterial({ map: texture });

        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
        // Create text label

        const venusSprite = createTextSprite(planet.name);
        venusSprite.position.set(100, 0, 0); // Position above the planet
        venusSprite.scale.set(100, 50, 10);


        // Create atmosphere
        const venusAtmosphereGeometry = new THREE.SphereGeometry(25, 30, 30);
        const venusAtmosphereMaterial = new THREE.ShaderMaterial({
          vertexShader: document.getElementById("venusvert").textContent,
          fragmentShader: document.getElementById("venusfrag").textContent,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
        });
        const venusAtmosphere = new THREE.Mesh(
          venusAtmosphereGeometry,
          venusAtmosphereMaterial
        );
        venusAtmosphere.scale.set(1.1, 1.1, 1.1);

        // Group Mars and text label
        const venusGroup = new THREE.Group();
        venusGroup.add(mesh);
        venusGroup.add(venusSprite);
        venusGroup.add(venusAtmosphere)

       moonMeshes = []

        return { planet, mesh: venusGroup, moonMeshes };
      case "Jupiter":
        texture = textureLoader.load(jupiter);
        geometry = new THREE.SphereGeometry(50, 30, 30);
        material = new THREE.MeshBasicMaterial({ map: texture });

        mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;

        // Create text label
        const jupiterSprite = createTextSprite(planet.name);
        jupiterSprite.position.set(250, 0, 0); // Position above the planet

        // Group Mars and text label
        const jupiterGroup = new THREE.Group();
        jupiterGroup.add(mesh);
        jupiterGroup.add(jupiterSprite);

        // Create moon meshes for Mars
        moonMeshes = (planet.moons || []).map((moon) => {
          const moonTexture = textureLoader.load(meteormap);
          const moonGeometry = new THREE.SphereGeometry(10, 15, 15);
          const moonMaterial = new THREE.MeshNormalMaterial({
            map: moonTexture,
          });
          const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
          jupiterGroup.add(moonMesh);

           // Create text sprite for each moon
  const moonSprite = createTextSprite(moon.name);
  moonSprite.position.set(0, 10, 0); // Adjust position as needed
  moonMesh.add(moonSprite);

  return { moon, moonMesh };

 
        });

        return { planet, mesh: jupiterGroup, moonMeshes };
      case "Saturn":
        texture = textureLoader.load(saturn);
        geometry = new THREE.SphereGeometry(45, 30, 30);
        material = new THREE.MeshBasicMaterial({ map: texture });
        break;
      case "Uranus":
        texture = textureLoader.load(uranus);
        geometry = new THREE.SphereGeometry(40, 30, 30);
        material = new THREE.MeshBasicMaterial({ map: texture });
        break;
      case "Neptune":
        texture = textureLoader.load(neptune);
        geometry = new THREE.SphereGeometry(35, 30, 30);
        material = new THREE.MeshBasicMaterial({ map: texture });
        break;
      default:
        texture = textureLoader.load(meteormap);
        geometry = new THREE.IcosahedronGeometry(5, 8);
        const noise = new SimplexNoise();
        const vertices = geometry.attributes.position.array;

        //add random noise to make it look like a comet or meteor
        for (let i = 0; i < vertices.length; i += 3) {
          const x = vertices[i];
          const y = vertices[i + 1];
          const z = vertices[i + 2];
          const offset = noise.noise3d(x * 0.1, y * 0.1, z * 0.1);
          vertices[i] += offset * 2;
          vertices[i + 1] += offset * 2;
          vertices[i + 2] += offset * 2;
        }

        geometry.attributes.position.needsUpdate = true;
        material = new THREE.MeshBasicMaterial({ map: texture });
    }
    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = Math.PI / 2;

    // Create default moon meshes for each planet
    moonMeshes = (planet.moons || []).map((moon) => {
      const moonTexture = new THREE.TextureLoader().load(meteormap);
      const moonGeometry = new THREE.SphereGeometry(10, 15, 15);
      const moonMaterial = new THREE.MeshNormalMaterial({ map: moonTexture });
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

      return { moon, moonMesh };
    });

    return { planet, mesh, moonMeshes };
  });

  return data;
};