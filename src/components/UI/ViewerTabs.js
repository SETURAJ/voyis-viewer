/* import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import PCDModel from '../three.js';
import XYZLoader from '../xyzloader.js';
import Geo from '../geo.js';

function ViewerTabs({ threeFile, gisFile, tabValue, onTabChange }) {
  const handleTabChange = (event, newValue) => {
    onTabChange(event, newValue);
  };

  const render3DViewer = () => {
    if (!threeFile) {
      return <Typography>No 3D file loaded</Typography>;
    }
    const ext = threeFile.name.split('.').pop().toLowerCase();
    if (ext === 'xyz') {
      return <XYZLoader key={threeFile.name} file={threeFile} />;
    }
    if (ext === 'pcd') {
      return <PCDModel key={threeFile.name} file={threeFile} />;
    }
    return <Typography>Unsupported 3D file type</Typography>;
  };

  const renderGIS = () => {
    if (!gisFile) {
      return <Typography>No GIS file loaded</Typography>;
    }
    const ext = gisFile.name.split('.').pop().toLowerCase();
    if (ext === 'json' || ext === 'geojson') {
      return <Geo key={gisFile.name} file={gisFile} />;
    }
    return <Typography>Unsupported GIS file type</Typography>;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: '1px solid #ccc' }}
      >
        <Tab label="3D Viewer" />
        <Tab label="GIS Map" />
      </Tabs>

      <Box sx={{ flex: 1, position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0, display: tabValue === 0 ? 'block' : 'none' }}>
          {render3DViewer()}
        </Box>
        <Box sx={{ position: 'absolute', inset: 0, display: tabValue === 1 ? 'block' : 'none' }}>
          {renderGIS()}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewerTabs; */

/* 
import React from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import PCDModel from "../three";
import XYZLoader from "../xyzloader";
import Geo from "../geo";

function ViewerTabs({ threeFile, gisFile, tabValue, onTabChange }) {
  const handleTabChange = (event, newValue) => {
    onTabChange(event, newValue);
  };

  const render3DViewer = () => {
    if (!threeFile) {
      return <Typography>No 3D file loaded</Typography>;
    }
    const ext = threeFile.name.split(".").pop().toLowerCase();
    if (ext === "xyz") {
      return <XYZLoader key={threeFile.name} file={threeFile} />;
    }
    if (ext === "pcd") {
      return <PCDModel key={threeFile.name} file={threeFile} />;
    }
    return <Typography>Unsupported 3D file type</Typography>;
  };

  const renderGIS = () => {
    if (!gisFile) {
      return <Typography>No GIS file loaded</Typography>;
    }
    const ext = gisFile.name.split(".").pop().toLowerCase();
    if (ext === "json" || ext === "geojson") {
      return <Geo key={gisFile.name} file={gisFile} />;
    }
    return <Typography>Unsupported GIS file type</Typography>;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: "1px solid #ccc" }}
      >
        <Tab label="3D Viewer" />
        <Tab label="GIS Map" />
      </Tabs>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {tabValue === 0 && (
          <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
            {render3DViewer()}
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
            {renderGIS()}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ViewerTabs; */
/* 
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import PCDModel from "../three";
import XYZLoader from "../xyzloader";
import Geo from "../geo";
import PointSizeControl from "./PointSizeControl";

function ViewerTabs({
  threeFile,
  gisFile,
  tabValue,
  onTabChange,
  on3DLoaded = () => {},
  onGISLoaded = () => {},
  setLog = () => {}
}) {
  const [pointSize, setPointSize] = useState(0.0002);
  const [useColorByAltitude, setUseColorByAltitude] = useState(false);

  const handleTabChange = (event, newValue) => {
    onTabChange(event, newValue);
  };

  const render3DViewer = () => {
    if (!threeFile) {
      return <Typography>No 3D file loaded</Typography>;
    }
    const ext = threeFile.name.split(".").pop().toLowerCase();
    if (ext === "xyz") {
      return (
        <XYZLoader
          file={threeFile}
          pointSize={pointSize}
          useColorByAltitude={useColorByAltitude}
          onLoaded={on3DLoaded}
          setLog={setLog}
        />
      );
    }
    if (ext === "pcd") {
      return (
        <PCDModel
          file={threeFile}
          pointSize={pointSize}
          useColorByAltitude={useColorByAltitude}
          onLoaded={on3DLoaded}
          setLog={setLog}
        />
      );
    }
    return <Typography>Unsupported 3D file type</Typography>;
  };

  const renderGIS = () => {
    if (!gisFile) {
      return <Typography>No GIS file loaded</Typography>;
    }
    const ext = gisFile.name.split(".").pop().toLowerCase();
    if (ext === "json" || ext === "geojson") {
      return <Geo file={gisFile} setLog={setLog} />;
    }
    return <Typography>Unsupported GIS file type</Typography>;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: "1px solid #ccc" }}
      >
        <Tab label="3D Viewer" />
        <Tab label="GIS Map" />
      </Tabs>
      <Box sx={{ flex: 1, overflow: "auto", position: "relative" }}>
        {tabValue === 0 && (
          <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Box sx={{ p: 1, display: "flex", gap: 2, alignItems: "center" }}>
              <PointSizeControl pointSize={pointSize} onPointSizeChange={setPointSize} />
              <Typography variant="body2">Color By Altitude:</Typography>
              <input
                type="checkbox"
                checked={useColorByAltitude}
                onChange={(e) => setUseColorByAltitude(e.target.checked)}
              />
            </Box>
            <Box sx={{ width: "100%", height: "calc(100% - 50px)" }}>{render3DViewer()}</Box>
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ width: "100%", height: "100%" }}>{renderGIS()}</Box>
        )}
      </Box>
    </Box>
  );
}

export default ViewerTabs;  */


import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import PCDModel from "../three";
import XYZLoader from "../xyzloader";
import Geo from "../geo";
import PointSizeControl from "./PointSizeControl";

function ViewerTabs({
  threeFile,
  gisFile,
  tabValue,
  onTabChange,
  on3DLoaded = () => {},
  onGISLoaded = () => {},
  setLog = () => {}
}) {
  const [pointSize, setPointSize] = useState(0.002);
  const [useColorByAltitude, setUseColorByAltitude] = useState(false);

  const handleTabChange = (event, newValue) => {
    onTabChange(event, newValue);
  };

  const render3DViewer = () => {
    if (!threeFile) {
      return <Typography>No 3D file loaded</Typography>;
    }
    const ext = threeFile.name.split(".").pop().toLowerCase();
    if (ext === "xyz") {
      return (
        <XYZLoader
          file={threeFile}
          pointSize={pointSize}
          useColorByAltitude={useColorByAltitude}
          onLoaded={on3DLoaded}
          setLog={setLog}
        />
      );
    }
    if (ext === "pcd") {
      return (
        <PCDModel
          file={threeFile}
          pointSize={pointSize}
          useColorByAltitude={useColorByAltitude}
          onLoaded={on3DLoaded}
          setLog={setLog}
        />
      );
    }
    return <Typography>Unsupported 3D file type</Typography>;
  };

  const renderGIS = () => {
    if (!gisFile) {
      return <Typography>No GIS file loaded</Typography>;
    }
    const ext = gisFile.name.split(".").pop().toLowerCase();
    if (ext === "json" || ext === "geojson") {
      return <Geo file={gisFile} setLog={setLog} />;
    }
    return <Typography>Unsupported GIS file type</Typography>;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: "1px solid #ccc" }}
      >
        <Tab label="3D Viewer" />
        <Tab label="GIS Map" />
      </Tabs>
      <Box sx={{ flex: 1, overflow: "auto", position: "relative" }}>
        {tabValue === 0 && (
          <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
            <Box sx={{ p: 1, display: "flex", gap: 2, alignItems: "center" }}>
              <PointSizeControl pointSize={pointSize} onPointSizeChange={setPointSize} />
              <Typography variant="body2">Color By Altitude:</Typography>
              <input
                type="checkbox"
                checked={useColorByAltitude}
                onChange={(e) => setUseColorByAltitude(e.target.checked)}
              />
            </Box>
            <Box sx={{ width: "100%", height: "calc(100% - 50px)" }}>{render3DViewer()}</Box>
          </Box>
        )}
        {tabValue === 1 && (
          <Box sx={{ width: "100%", height: "100%" }}>{renderGIS()}</Box>
        )}
      </Box>
    </Box>
  );
}

export default ViewerTabs;