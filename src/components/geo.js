/* import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { bbox } from "@turf/turf";

mapboxgl.accessToken = "pk.eyJ1Ijoic2V0dXJhaiIsImEiOiJjbTZsZnQweWkwODc3MmpwemhkaWZ6cGo5In0.fe2GS7wcKdVDg1DbyCfECg";

const Geo = ({ file }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0],
        zoom: 1,
      });

      mapRef.current.on("load", () => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const geoJson = JSON.parse(event.target.result);

          console.log('Loaded GeoJSON:', geoJson); // Add this line to check if GeoJSON is loaded

          mapRef.current.addSource("my-geojson", {
            type: "geojson",
            data: geoJson,
          });

          mapRef.current.addLayer({
            id: "points-layer",
            type: "circle",
            source: "my-geojson",
            filter: ["==", "$type", "Point"],
            paint: {
              "circle-radius": 8,
              "circle-color": "#FF0000",
            },
          });

          mapRef.current.addLayer({
            id: "lines-layer",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "LineString"],
            paint: {
              "line-color": "#0000FF",
              "line-width": 3,
            },
          });

          mapRef.current.addLayer({
            id: "polygons-layer",
            type: "fill",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "fill-color": "#00FF00",
              "fill-opacity": 0.4,
            },
          });

          mapRef.current.addLayer({
            id: "polygons-outline",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          });

          const bounds = bbox(geoJson);
          mapRef.current.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], {
            padding: 40,
          });
        };
        reader.readAsText(file);
      });
    }
  }, [file]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default Geo; */

/* 
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { bbox } from "@turf/turf";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2V0dXJhaiIsImEiOiJjbTZsZnQweWkwODc3MmpwemhkaWZ6cGo5In0.fe2GS7wcKdVDg1DbyCfECg";

const Geo = ({ file }) => {
  // Outer container provides a scrollable viewport.
  const scrollContainerRef = useRef(null);
  // Inner container holds the Mapbox GL canvas and is given a fixed (larger) size.
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (file && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0],
        zoom: 1,
      });

      mapRef.current.on("load", () => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const geoJson = JSON.parse(event.target.result);
          mapRef.current.addSource("my-geojson", {
            type: "geojson",
            data: geoJson,
          });
          mapRef.current.addLayer({
            id: "points-layer",
            type: "circle",
            source: "my-geojson",
            filter: ["==", "$type", "Point"],
            paint: {
              "circle-radius": 8,
              "circle-color": "#FF0000",
            },
          });
          mapRef.current.addLayer({
            id: "lines-layer",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "LineString"],
            paint: {
              "line-color": "#0000FF",
              "line-width": 3,
            },
          });
          mapRef.current.addLayer({
            id: "polygons-layer",
            type: "fill",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "fill-color": "#00FF00",
              "fill-opacity": 0.4,
            },
          });
          mapRef.current.addLayer({
            id: "polygons-outline",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          });
          const bounds = bbox(geoJson);
          mapRef.current.fitBounds(
            [
              [bounds[0], bounds[1]],
              [bounds[2], bounds[3]]
            ],
            { padding: 40 }
          );
        };
        reader.readAsText(file);
      });
    }
  }, [file]);

  return (
    // The outer div handles scrolling if the inner map is larger than the viewport.
    <div
      ref={scrollContainerRef}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    >
      // The inner div is given a fixed, larger size to force scrollbars 
      <div
        ref={mapContainerRef}
        style={{ width: "1500px", height: "1000px" }}
      />
    </div>
  );
};

export default Geo;
 */

/* 
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { bbox } from "@turf/turf";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2V0dXJhaiIsImEiOiJjbTZsZnQweWkwODc3MmpwemhkaWZ6cGo5In0.fe2GS7wcKdVDg1DbyCfECg";

function Geo({ file, setLog = () => {} }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!file) return;
    if (mapRef.current) return; // prevent re-init

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 1,
    });

    mapRef.current.on("load", () => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const geoJson = JSON.parse(event.target.result);

          mapRef.current.addSource("my-geojson", {
            type: "geojson",
            data: geoJson,
          });

          // Marker for points
          mapRef.current.addLayer({
            id: "points-layer",
            type: "circle",
            source: "my-geojson",
            filter: ["==", "$type", "Point"],
            paint: {
              "circle-radius": 6,
              "circle-color": "#FF0000",
            },
          });

          // Lines
          mapRef.current.addLayer({
            id: "lines-layer",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "LineString"],
            paint: {
              "line-color": "#0000FF",
              "line-width": 3,
            },
          });

          // Polygons
          mapRef.current.addLayer({
            id: "polygons-layer",
            type: "fill",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "fill-color": "#00FF00",
              "fill-opacity": 0.4,
            },
          });
          mapRef.current.addLayer({
            id: "polygons-outline",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          });

          // Fit map to bounds if possible
          const boundsArray = bbox(geoJson);
          mapRef.current.fitBounds(
            [
              [boundsArray[0], boundsArray[1]],
              [boundsArray[2], boundsArray[3]],
            ],
            { padding: 40 }
          );

          // Click on points
          mapRef.current.on("click", "points-layer", (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const props = e.features[0].properties;
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`
                <div>
                  <strong>Coordinates:</strong> ${coordinates.join(", ")}<br/>
                  <strong>Properties:</strong> ${JSON.stringify(props)}
                </div>
              `)
              .addTo(mapRef.current);
          });

          setLog(`GeoJSON loaded: ${file.name}`);
        } catch (err) {
          console.error("Error parsing GeoJSON:", err);
          setLog("Error parsing GeoJSON");
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading GIS file:", error);
        setLog("Error reading GIS file");
      };
      reader.readAsText(file);
    });
  }, [file, setLog]);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default Geo; */

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { bbox } from "@turf/turf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2V0dXJhaiIsImEiOiJjbTZsZnQweWkwODc3MmpwemhkaWZ6cGo5In0.fe2GS7wcKdVDg1DbyCfECg";

function Geo({ file, setLog = () => {} }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Control the dialog visibility
  const [dialogOpen, setDialogOpen] = useState(false);
  // Store all clicked feature properties here
  const [featureProps, setFeatureProps] = useState(null);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setFeatureProps(null);
  };

  useEffect(() => {
    if (!file) return;
    if (mapRef.current) return; // prevent re-init

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 1,
    });

    mapRef.current.on("load", () => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const geoJson = JSON.parse(event.target.result);

          // Add the GeoJSON source
          mapRef.current.addSource("my-geojson", {
            type: "geojson",
            data: geoJson,
          });

          // Points layer
          mapRef.current.addLayer({
            id: "points-layer",
            type: "circle",
            source: "my-geojson",
            filter: ["==", "$type", "Point"],
            paint: {
              "circle-radius": 6,
              "circle-color": "#FF0000",
            },
          });

          // Lines
          mapRef.current.addLayer({
            id: "lines-layer",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "LineString"],
            paint: {
              "line-color": "#0000FF",
              "line-width": 3,
            },
          });

          // Polygons
          mapRef.current.addLayer({
            id: "polygons-layer",
            type: "fill",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "fill-color": "#00FF00",
              "fill-opacity": 0.4,
            },
          });

          // Polygon outline
          mapRef.current.addLayer({
            id: "polygons-outline",
            type: "line",
            source: "my-geojson",
            filter: ["==", "$type", "Polygon"],
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          });

          // Auto-fit the map to the extent of the features
          const boundsArray = bbox(geoJson);
          mapRef.current.fitBounds(
            [
              [boundsArray[0], boundsArray[1]],
              [boundsArray[2], boundsArray[3]],
            ],
            { padding: 40 }
          );

          // On click, open our MUI dialog
          mapRef.current.on("click", "points-layer", (e) => {
            const props = e.features[0].properties;
            setFeatureProps(props);
            setDialogOpen(true);
          });

          setLog(`GeoJSON loaded: ${file.name}`);
        } catch (err) {
          console.error("Error parsing GeoJSON:", err);
          setLog("Error parsing GeoJSON");
        }
      };
      reader.onerror = (error) => {
        console.error("Error reading GIS file:", error);
        setLog("Error reading GIS file");
      };
      reader.readAsText(file);
    });
  }, [file, setLog]);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Map container */}
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />

      {/* Dialog for feature details */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Feature Details</DialogTitle>
        <DialogContent>
          {featureProps &&
            Object.entries(featureProps).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Geo;
