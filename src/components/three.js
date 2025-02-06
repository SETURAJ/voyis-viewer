/* import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

function PCDModel({ file }) {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('PCDModel mounted with file:', file);
    const container = containerRef.current;
    let scene, camera, renderer, controls;
    let animationId;

    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Setup Camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Setup OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Add ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    // Load the PCD file
    const loader = new PCDLoader();
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log('PCDReader onload triggered');
      try {
        const data = event.target.result;
        console.log('PCD file data byteLength:', data.byteLength);
        // Parse the data synchronously
        const pcdPoints = loader.parse(data);
        
        // Increase the point size for visibility
        const forcedMaterial = new THREE.PointsMaterial({
          size: 0.0002, // Adjust this value as needed
          color: 0xff0000,
        });

        // Center the geometry
        pcdPoints.geometry.center();

        // Create Points object and add it to the scene
        const points = new THREE.Points(pcdPoints.geometry, forcedMaterial);
        scene.add(points);

        console.log('Loaded PCD points:', points);

        // Compute bounding box to zoom to fit
        const box = new THREE.Box3().setFromObject(points);
        if (!box.isEmpty()) {
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = maxDim / (2 * Math.tan(fov / 2));
          cameraZ *= 1.2;

          camera.position.set(0, 0, cameraZ);
          camera.near = cameraZ / 100;
          camera.far = cameraZ * 100;
          camera.updateProjectionMatrix();

          controls.target.set(0, 0, 0);
          controls.update();
        }
      } catch (error) {
        console.error('Error loading PCD file:', error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading PCD file:', error);
    };
    reader.readAsArrayBuffer(file);

    // Update renderer size on window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animate the scene
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [file]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}

export default PCDModel;
 */
/* 
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

function PCDModel({ file }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scene, camera, renderer, controls;
    let animationId;

    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Setup Camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // Setup Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Setup OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    // Load the PCD file
    const loader = new PCDLoader();
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const pcdPoints = loader.parse(data);

        const forcedMaterial = new THREE.PointsMaterial({
          size: 0.0002,
          color: 0xff0000,
        });

        pcdPoints.geometry.center();

        const points = new THREE.Points(pcdPoints.geometry, forcedMaterial);
        scene.add(points);

        // Compute bounding box to zoom to fit
        const box = new THREE.Box3().setFromObject(points);
        if (!box.isEmpty()) {
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = maxDim / (2 * Math.tan(fov / 2));
          cameraZ *= 1.2;

          camera.position.set(0, 0, cameraZ);
          camera.near = cameraZ / 100;
          camera.far = cameraZ * 100;
          camera.updateProjectionMatrix();

          controls.target.set(0, 0, 0);
          controls.update();
        }
      } catch (error) {
        console.error('Error loading PCD file:', error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading PCD file:', error);
    };
    reader.readAsArrayBuffer(file);

    // Update renderer size on window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animate
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [file]);

  // Modified container style to include overflow for scrollbars on small displays
  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'auto' }} />;
}

export default PCDModel;  */

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";

function PCDModel({
  file,
  pointSize = 0.0002,
  useColorByAltitude = false,
  onLoaded = () => {},
  setLog = () => {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const container = containerRef.current;
    let scene, camera, renderer, controls;
    let animationId;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const width = container.clientWidth;
    const height = container.clientHeight;
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const loader = new PCDLoader();
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const pcdPoints = loader.parse(data);

        // If color by altitude, set vertexColors on each point
        let minZ = Infinity;
        let maxZ = -Infinity;
        if (useColorByAltitude) {
          const positions = pcdPoints.geometry.attributes.position.array;
          for (let i = 2; i < positions.length; i += 3) {
            minZ = Math.min(minZ, positions[i]);
            maxZ = Math.max(maxZ, positions[i]);
          }
          const colors = new Float32Array(positions.length);
          for (let i = 2; i < positions.length; i += 3) {
            const zVal = positions[i];
            const ratio = (zVal - minZ) / (maxZ - minZ + 1e-6);
            // simple gradient from blue (low) to red (high)
            const r = ratio;
            const g = 0;
            const b = 1 - ratio;
            colors[i - 2] = r;
            colors[i - 1] = g;
            colors[i] = b;
          }
          pcdPoints.geometry.setAttribute(
            "color",
            new THREE.BufferAttribute(colors, 3)
          );
        }

        const material = new THREE.PointsMaterial({
          size: pointSize,
          vertexColors: useColorByAltitude, // true if color-by-altitude
          color: useColorByAltitude ? 0xffffff : 0xff0000
        });

        pcdPoints.geometry.center();
        const points = new THREE.Points(pcdPoints.geometry, material);
        scene.add(points);

        // Number of points
        const numPoints = pcdPoints.geometry.attributes.position.count || 0;
        // Compute bounding box
        const box = new THREE.Box3().setFromObject(points);
        if (!box.isEmpty()) {
          const size3 = new THREE.Vector3();
          box.getSize(size3);
          const maxDim = Math.max(size3.x, size3.y, size3.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = maxDim / (2 * Math.tan(fov / 2));
          cameraZ *= 2.0;
          camera.position.set(0, 0, cameraZ);
          camera.near = cameraZ / 100;
          camera.far = cameraZ * 100;
          camera.updateProjectionMatrix();
          controls.target.set(0, 0, 0);
          controls.update();

          onLoaded({
            numPoints,
            bbox: {
              min: [box.min.x, box.min.y, box.min.z],
              max: [box.max.x, box.max.y, box.max.z]
            }
          });
        }

        setLog(`PCD loaded: ${file.name} with ${numPoints} points`);
      } catch (error) {
        console.error("Error loading PCD file:", error);
        setLog("Error parsing PCD file");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading PCD file:", error);
      setLog("Error reading PCD file");
    };
    reader.readAsArrayBuffer(file);

    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      renderer.setSize(newW, newH);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [file, pointSize, useColorByAltitude]);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }} ref={containerRef} />
  );
}

export default PCDModel;