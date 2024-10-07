import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import sunGenerator, { createPlanetMeshes } from "./geometry";
import calculatePosition, {
  calculateOrbitPoints,
  createOrbitLine,
} from "./orbitalCalculation";
import { getObjects, getSecondObjects } from "./objects";
import Layout from "../Layout/Layout";
import "./SpaceSimulator.css";
import { GUI } from "dat.gui";

const SpaceSimulation = () => {
  const canvasRef = useRef(null);
  const cameraRef = useRef();
  const orbitLinesRef = useRef([]);
  let scene, renderer, controls;
  let timeScale = 0.00001;
  const [dataReady, setDataReady] = useState(false);
  const [showOrbitLines, setShowOrbitLines] = useState(true);

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
      return;
    }
    const isMobile = window.innerWidth < 768;
    const renderDistance = isMobile ? 1000 : 4000;

    if (isMobile) {
      alert(
        "This simulation is not optimized for mobile. Please use a desktop for the best experience"
      );
    }
    const canvas = canvasRef.current;
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      renderDistance
    );
    cameraRef.current.position.set(0, 0, 300);
    renderer.domElement.addEventListener(
      "webglcontextlost",
      (event) => {
        event.preventDefault();
        alert(
          "WebGL context lost. Please reload the page to continue. If you are on moble, please use a desktop"
        );
        console.warn("WebGL context lost");
      },
      false
    );

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);
    const addSunMesh = async () => {
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

    // Create orbit lines
    const orbitLines = planetMeshes.map(({ planet }) => {
      const orbitPoints = calculateOrbitPoints(
        planet.a,
        planet.e,
        planet.I,
        planet.longNode,
        planet.longPeri
      );
      return createOrbitLine(orbitPoints);
    });

    orbitLinesRef.current = orbitLines;

    if (showOrbitLines) {
      orbitLines.forEach((line) => {
        scene.add(line);
      });
    } else {
      orbitLines.forEach((line) => {
        line.visible = false;
      });
    }

    // Controls
    controls = new OrbitControls(cameraRef.current, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 100000;
    const animate = () => {
      const now = Date.now() * timeScale;

      const scaledDistance = 1000; // Scale distance for better visibility
      const moonDistanceScale = 400; // better visibility, distances are not to
      // Update planet positions
      planetMeshes.forEach(({ planet, mesh, moonMeshes }) => {
        const { x, y, z } = calculatePosition(planet, now);
        mesh.position.set(
          x * scaledDistance,
          y * scaledDistance,
          z * scaledDistance
        );

        moonMeshes.forEach(({ moon, moonMesh }) => {
          const moonPosition = calculatePosition(moon, now);
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

    // Function to set the camera position
    //used in reset camera button on gui
    const setCameraPosition = () => {
      cameraRef.current.position.set(0, 0, 200);
      cameraRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      controls.update();
    };
    const DecreaseTimeScale = () => {
      timeScale = timeScale - 0.00001;
    };
    const IncreaseTimeScale = () => {
      timeScale = timeScale + 0.00001;
    };
    //gui intialization
    const gui = new GUI();
    const actionsFolder = gui.addFolder("Actions");
    actionsFolder.domElement.querySelector(".title").style.fontSize = "12px";
    actionsFolder
      .add({ setCameraPosition }, "setCameraPosition")
      .name("Reset Camera");
    actionsFolder
      .add({ showOrbitLines }, "showOrbitLines")
      .name("Show Orbit Lines")
      .onChange((value) => {
        setShowOrbitLines(value);
        orbitLinesRef.current.forEach((line) => {
          line.visible = value;
        });
      });
    actionsFolder
      .add({ IncreaseTimeScale }, "IncreaseTimeScale", 0, 0.0001)
      .name("Increase Time")
      .onChange((value) => {
        IncreaseTimeScale();
      });
    actionsFolder
      .add({ DecreaseTimeScale }, "DecreaseTimeScale", 0, 0.0001)
      .name("Decrease Time")
      .onChange((value) => {
        DecreaseTimeScale();
      });

    window.addEventListener("resize", resizeCanvas);

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gui.destroy();
    };
  }, [dataReady]); // Ensure empty dependency array to run only once
  return (
    <>
      <Layout>
        {!dataReady ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="canvas-container">
            <canvas
              className="simulation"
              id="webgl-canvas"
              ref={canvasRef}
            ></canvas>
          </div>
        )}
      </Layout>
    </>
  );
};

export default SpaceSimulation;
