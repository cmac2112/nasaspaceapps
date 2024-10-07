import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";
import "./Earth.css";
import earth from "../../assets/earth.jpg";
import meteormap from "../../assets/meteor.jpg";

const Earth = () => {
  const canvasRef = useRef(null);
  const cameraRef = useRef();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    const texture = new THREE.TextureLoader().load(earth);
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent,
        glslVersion: THREE.GLSL3,
        uniforms: {
          globeTexture: { value: texture },
        },
      })
    );
    scene.add(sphere);
    //create atmosphere

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader: document.getElementById("atmospherevert").textContent,
        fragmentShader: document.getElementById("atmospherefrag").textContent,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      })
    );

    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    //create meteor like objects

    const meteorGeometry = new THREE.IcosahedronGeometry(5, 10);
    const noise = new SimplexNoise();
    const vertices = meteorGeometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = vertices[i + 2];
      const offset = noise.noise3d(x * 0.1, y * 0.1, z * 0.1);
      vertices[i] += offset * 2;
      vertices[i + 1] += offset * 2;
      vertices[i + 2] += offset * 2;
    }

    meteorGeometry.attributes.position.needsUpdate = true;

    // Load the meteor texture

    const meteorTexture = new THREE.TextureLoader().load(meteormap);

    // Create a material with the texture
    const meteorMaterial = new THREE.MeshStandardMaterial({
      map: meteorTexture,
    });

    const createMeteor = (x, y, z) => {
      const meteor = new THREE.Mesh(meteorGeometry, meteorMaterial);
      meteor.position.set(x, y, z);
      scene.add(meteor);
    };
    createMeteor(40, 0, -40);
    createMeteor(-45, -10, -30);
    createMeteor(-30, 20, -20);

    camera.position.z = 20;
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resizeCanvas(); // Call once to set initial size

    //raycasting
    raycaster.setFromCamera(mouse, cameraRef.current);
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / canvasRef.current.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / canvasRef.current.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        document.body.style.cursor = "pointer";
        intersects[0].object.rotation.y += 0.01;
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      sphere.rotation.y += 0.003;
      meteorGeometry.rotateY(0.0008);
      meteorGeometry.rotateZ(0.0008);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", resizeCanvas);
    animate();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  return (
    <div className="canvas-container">
      <canvas className="simulation" id="webgl-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default Earth;
