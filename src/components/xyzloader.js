/* import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function XYZLoader({ file }) {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('XYZLoader mounted with file:', file);
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

    // Load the XYZ file
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log('XYZReader onload triggered');
      try {
        const data = event.target.result;
        console.log('XYZ file data length:', data.length);
        const points = [];
        const lines = data.split('\n');
        lines.forEach(line => {
          // Split by whitespace
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 3) {
            const [x, y, z] = parts.map(Number);
            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
              points.push(new THREE.Vector3(x, y, z));
            }
          }
        });
        console.log('Loaded points count:', points.length);

        // Create geometry and center it
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        geometry.center(); // center the geometry

        // Create points material and add the point cloud to the scene
        const material = new THREE.PointsMaterial({ size: 0.1, color: 0x00ff00 });
        const pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);

        // Compute bounding box to zoom to fit
        const box = new THREE.Box3().setFromObject(pointCloud);
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
        console.error('Error loading XYZ file:', error);
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading XYZ file:', error);
    };
    reader.readAsText(file);

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

export default XYZLoader;
 */
/* import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function XYZLoader({ file }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scene, camera, renderer, controls;
    let animationId;

    // Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

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

    // Load the XYZ file
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const points = [];
        const lines = data.split("\n");
        lines.forEach((line) => {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 3) {
            const [x, y, z] = parts.map(parseFloat);
            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
              points.push(new THREE.Vector3(x, y, z));
            }
          }
        });
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        geometry.center();
        const material = new THREE.PointsMaterial({ size: 0.1, color: 0x00ff00 });
        const pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);

        // Compute bounding box to zoom to fit
        const box = new THREE.Box3().setFromObject(pointCloud);
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
        console.error("Error loading XYZ file:", error);
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading XYZ file:", error);
    };
    reader.readAsText(file);

    // Update renderer size on window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [file]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  );
}

export default XYZLoader; */

/* import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function XYZLoader({
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

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const lines = data.split("\n");
        const positions = [];
        let minZ = Infinity;
        let maxZ = -Infinity;

        lines.forEach((line) => {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 3) {
            const [x, y, z] = parts.map(Number);
            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
              positions.push(x, y, z);
              if (z < minZ) minZ = z;
              if (z > maxZ) maxZ = z;
            }
          }
        });

        const positionsFloat = new Float32Array(positions);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positionsFloat, 3)
        );

        // color by altitude if needed
        if (useColorByAltitude && positions.length > 0) {
          const colors = new Float32Array(positions.length);
          for (let i = 2; i < positions.length; i += 3) {
            const zVal = positions[i];
            const ratio = (zVal - minZ) / (maxZ - minZ + 1e-6);
            const r = ratio;
            const g = 0;
            const b = 1 - ratio;
            colors[i - 2] = r;
            colors[i - 1] = g;
            colors[i] = b;
          }
          geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        }

        geometry.center();
        const material = new THREE.PointsMaterial({
          size: pointSize,
          vertexColors: useColorByAltitude,
          color: useColorByAltitude ? 0xffffff : 0x00ff00
        });
        const pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);

        const numPoints = positions.length / 3;
        const box = new THREE.Box3().setFromObject(pointCloud);
        if (!box.isEmpty()) {
          const size3 = new THREE.Vector3();
          box.getSize(size3);
          const maxDim = Math.max(size3.x, size3.y, size3.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = maxDim / (2 * Math.tan(fov / 2));
          cameraZ *= 1.5;
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
        setLog(`XYZ loaded: ${file.name} with ${numPoints} points`);
      } catch (error) {
        console.error("Error loading XYZ file:", error);
        setLog("Error parsing XYZ file");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading XYZ file:", error);
      setLog("Error reading XYZ file");
    };
    reader.readAsText(file);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      renderer.setSize(newW, newH);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
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

export default XYZLoader;   */

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function XYZLoader({
  file,
  pointSize = 0.02,
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

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = event.target.result;
        const lines = data.split("\n");
        const positions = [];
        let minZ = Infinity;
        let maxZ = -Infinity;

        lines.forEach((line) => {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 3) {
            const [x, y, z] = parts.map(Number);
            if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
              positions.push(x, y, z);
              if (z < minZ) minZ = z;
              if (z > maxZ) maxZ = z;
            }
          }
        });

        const positionsFloat = new Float32Array(positions);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positionsFloat, 3)
        );

        // color by altitude if needed
        if (useColorByAltitude && positions.length > 0) {
          const colors = new Float32Array(positions.length);
          for (let i = 2; i < positions.length; i += 3) {
            const zVal = positions[i];
            const ratio = (zVal - minZ) / (maxZ - minZ + 1e-6);
            const r = ratio;
            const g = 0;
            const b = 1 - ratio;
            colors[i - 2] = r;
            colors[i - 1] = g;
            colors[i] = b;
          }
          geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        }

        geometry.center();
        const material = new THREE.PointsMaterial({
          size: pointSize,
          vertexColors: useColorByAltitude,
          color: useColorByAltitude ? 0xffffff : 0x00ff00
        });
        const pointCloud = new THREE.Points(geometry, material);
        scene.add(pointCloud);

        const numPoints = positions.length / 3;
        const box = new THREE.Box3().setFromObject(pointCloud);
        if (!box.isEmpty()) {
          const size3 = new THREE.Vector3();
          box.getSize(size3);
          const maxDim = Math.max(size3.x, size3.y, size3.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = maxDim / (2 * Math.tan(fov / 2));
          cameraZ *= 1.5;
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
        setLog(`XYZ loaded: ${file.name} with ${numPoints} points`);
      } catch (error) {
        console.error("Error loading XYZ file:", error);
        setLog("Error parsing XYZ file");
      }
    };
    reader.onerror = (error) => {
      console.error("Error reading XYZ file:", error);
      setLog("Error reading XYZ file");
    };
    reader.readAsText(file);

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      renderer.setSize(newW, newH);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
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

export default XYZLoader;