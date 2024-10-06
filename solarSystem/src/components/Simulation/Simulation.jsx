import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import sunGenerator,{ createPlanetMeshes } from "./geometry";
import calculatePosition, { calculateOrbitPoints, createOrbitLine} from "./orbitalCalculation";
import { getObjects, getSecondObjects } from "./objects";
import Layout from "../Layout/Layout";
import "./SpaceSimulator.css"
import "./gui.css"
import { GUI } from "dat.gui";

const SpaceSimulation = () => {
  const canvasRef = useRef(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const cameraRef = useRef();
  const targetObjectRef = useRef(null);
  const isCameraLockedRef = useRef(false);
  let scene, renderer, controls, timeScale = 0.0001;
  let time;
  const [dataReady, setDataReady] = useState(false);
  let renderDistance = 5000;
  useEffect(() => {
    const fetchData = async () => {
      await getObjects();
      await getSecondObjects();
      setDataReady(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!dataReady) {
      console.log("Data not ready");
      return
    }
    const canvas = canvasRef.current;
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const selectedOffset = new THREE.Vector3(10, 25, 10); // Default offset from the object

    scene = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      renderDistance
    );
    cameraRef.current.position.set(0, 0, 2000); // Initialize camera position

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);
    const addSunMesh= async () => {
      const boxMesh = await sunGenerator();

      scene.add(boxMesh);
    };
    addSunMesh();

    // Create planet meshes
    const planetMeshes = createPlanetMeshes();
    planetMeshes.forEach(({ mesh, moonMeshes }) => {
      scene.add(mesh);
      moonMeshes.forEach(({ moonMesh }) => {
        scene.add(moonMesh);
      });
    });

    

    // FPS stats
    const stats = Stats();
    document.body.appendChild(stats.dom);

    // Controls
    controls = new OrbitControls(cameraRef.current, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 100000;
    const animate = () => {
      stats.update();
      time = Date.now() * timeScale;

      const scaledDistance = 1000; // Scale distance for better visibility
      const moonDistanceScale = 400; // better visibility, distances are not to
      // Update planet positions
      planetMeshes.forEach(({ planet, mesh, moonMeshes }) => {
        const { x, y, z } = calculatePosition(planet, time);
        mesh.position.set(x * scaledDistance, y * scaledDistance, z * scaledDistance);

        moonMeshes.forEach(({ moon, moonMesh }) => {
          const moonPosition = calculatePosition(moon, time);
          moonMesh.position.set(
            mesh.position.x + moonPosition.x * moonDistanceScale,
            mesh.position.y + moonPosition.y * moonDistanceScale,
            mesh.position.z + moonPosition.z * moonDistanceScale
          );
        });
      });

      renderer.render(scene, cameraRef.current);
      requestAnimationFrame(animate);
    };



    // Resize canvas on window resize
    const resizeCanvas = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
    };


    //gui intialization
    const gui = new GUI();
    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.domElement.querySelector('.title').style.fontSize = '12px';
    cameraFolder.add(cameraRef.current.position, 'x', -10000, 10000);
    cameraFolder.add(cameraRef.current.position, 'y', -10000, 10000);
    cameraFolder.add(cameraRef.current.position, 'z', -10000, 10000);
    cameraFolder.open();

    const renderDistanceFolder = gui.addFolder('Render Distance');
    renderDistanceFolder.domElement.querySelector('.title').style.fontSize = '12px';
    renderDistanceFolder.add({ increaseDistance: () => setRenderDistance += 1000 }, 'increaseDistance').name('Increase Distance');
    renderDistanceFolder.add({ decreaseDistance: () => setRenderDistance -= 1000 }, 'decreaseDistance').name('Decrease Distance');
    renderDistanceFolder.open();

    // Function to set the camera position
    const setCameraPosition = () => {
      cameraRef.current.position.set(0, 0, 7000); // Set to desired position
      cameraRef.current.lookAt(new THREE.Vector3(0, 0, 0)); // Adjust if needed
      controls.update(); // Update controls if using OrbitControls
    };

    // Add button to GUI
    const actionsFolder = gui.addFolder('Actions');
    actionsFolder.domElement.querySelector('.title').style.fontSize = '12px';
    actionsFolder.add({ setCameraPosition }, 'setCameraPosition').name('Reset Camera');
    actionsFolder.open();


    window.addEventListener("resize", resizeCanvas);


    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      document.body.removeChild(stats.dom);
      gui.destroy()
    };
  }, [dataReady]); // Ensure empty dependency array to run only once
  return (
    <>
    <Layout >
      <div className="canvas-container">
      <canvas className="simulation" id="webgl-canvas" ref={canvasRef}></canvas>
      </div>
      </Layout>
    </>
  );
};

export default SpaceSimulation;
