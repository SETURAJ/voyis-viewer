
/*
import React, { useState } from 'react';
import './App.css';
import { Grid, Box, Typography } from '@mui/material';
import AppHeader from './components/UI/AppHeader';
import FileUploader from './components/UI/FileUploader';
import ViewerTabs from './components/UI/ViewerTabs';

function App() {
  const [threeFile, setThreeFile] = useState(null);
  const [gisFile, setGisFile] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split('.').pop().toLowerCase();

    if (ext === 'pcd' || ext === 'xyz') {
      setThreeFile(uploadedFile);
      setTabValue(0);
    } else if (ext === 'json' || ext === 'geojson') {
      setGisFile(uploadedFile);
      setTabValue(1);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      <Grid container sx={{ flex: 1, overflow: 'hidden' }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            borderRight: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            File Upload
          </Typography>
          <FileUploader onFileChange={handleFileChange} />

          {threeFile && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="subtitle1">3D File:</Typography>
              <Typography variant="body2">Name: {threeFile.name}</Typography>
              <Typography variant="body2">Size: {threeFile.size} bytes</Typography>
            </Box>
          )}

          {gisFile && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="subtitle1">GIS File:</Typography>
              <Typography variant="body2">Name: {gisFile.name}</Typography>
              <Typography variant="body2">Size: {gisFile.size} bytes</Typography>
            </Box>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <ViewerTabs
            threeFile={threeFile}
            gisFile={gisFile}
            tabValue={tabValue}
            onTabChange={(event, newValue) => setTabValue(newValue)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
*/
/*
import React, { useState } from "react";
import "./App.css";
import { Grid, Box, Typography } from "@mui/material";
import AppHeader from "./components/UI/AppHeader";
import FileUploader from "./components/UI/FileUploader";
import ViewerTabs from "./components/UI/ViewerTabs";

function App() {
  const [threeFile, setThreeFile] = useState(null);
  const [gisFile, setGisFile] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const ext = uploadedFile.name.split(".").pop().toLowerCase();
    if (ext === "pcd" || ext === "xyz") {
      setThreeFile(uploadedFile);
      setTabValue(0);
    } else if (ext === "json" || ext === "geojson") {
      setGisFile(uploadedFile);
      setTabValue(1);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "auto"
      }}
    >
      <AppHeader />
      <Grid container sx={{ flex: 1, overflow: "auto" }}>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            borderRight: { xs: "none", md: "1px solid #ccc" },
            borderBottom: { xs: "1px solid #ccc", md: "none" },
            display: "flex",
            flexDirection: "column",
            p: { xs: 1, md: 2 },
            overflow: "auto"
          }}
        >
          <Typography variant="h6" gutterBottom>
            File Upload
          </Typography>
          <FileUploader onFileChange={handleFileChange} />
          {threeFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">3D File:</Typography>
              <Typography variant="body2">Name: {threeFile.name}</Typography>
              <Typography variant="body2">
                Size: {threeFile.size} bytes
              </Typography>
            </Box>
          )}
          {gisFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">GIS File:</Typography>
              <Typography variant="body2">Name: {gisFile.name}</Typography>
              <Typography variant="body2">
                Size: {gisFile.size} bytes
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto"
          }}
        >
          <ViewerTabs
            threeFile={threeFile}
            gisFile={gisFile}
            tabValue={tabValue}
            onTabChange={(event, newValue) => setTabValue(newValue)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App; 
*/
/* 
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ViewerTabs from "./components/UI/ViewerTabs";
import LogsPanel from "./components/UI/LogsPanel";
import AppHeader from "./components/UI/AppHeader"; // assume you have a header
// ... other imports ...

function App() {
  const [logs, setLogs] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [threeFile, setThreeFile] = useState(null);
  const [gisFile, setGisFile] = useState(null);

  // For metadata about 3D files
  const [numPoints, setNumPoints] = useState(0);
  const [bbox, setBbox] = useState(null);

  const addLog = (msg) => {
    setLogs((prev) => [...prev, msg]);
  };

  const on3DLoaded = (info) => {
    if (!info) return;
    setNumPoints(info.numPoints || 0);
    setBbox(info.bbox || null);
  };

  const handleTabChange = (event, newVal) => {
    setTabValue(newVal);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      addLog("No file selected");
      return;
    }
    const name = file.name.toLowerCase();
    if (name.endsWith(".xyz") || name.endsWith(".pcd")) {
      setThreeFile(file);
      addLog(3D file selected: ${file.name});
    } else if (name.endsWith(".json") || name.endsWith(".geojson")) {
      setGisFile(file);
      addLog(GIS file selected: ${file.name});
    } else {
      addLog("Unsupported file type");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Grid container sx={{ flex: 1, overflow: "hidden" }}>
  
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            borderRight: { xs: "none", md: "1px solid #ccc" },
            borderBottom: { xs: "1px solid #ccc", md: "none" },
            padding: 2,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            File Uploader
          </Typography>
          <input type="file" onChange={handleFileChange} />

          {threeFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">3D File</Typography>
              <Typography variant="body2">Name: {threeFile.name}</Typography>
              <Typography variant="body2">Size: {threeFile.size} bytes</Typography>
              {numPoints > 0 && (
                <Typography variant="body2">Points: {numPoints}</Typography>
              )}
              {bbox && (
                <Typography variant="body2">
                  Bounding Box: [{bbox.min.join(", ")}] → [{bbox.max.join(", ")}]
                </Typography>
              )}
            </Box>
          )}

          {gisFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">GIS File</Typography>
              <Typography variant="body2">Name: {gisFile.name}</Typography>
              <Typography variant="body2">Size: {gisFile.size} bytes</Typography>
            </Box>
          )}
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <ViewerTabs
            threeFile={threeFile}
            gisFile={gisFile}
            tabValue={tabValue}
            onTabChange={handleTabChange}
            on3DLoaded={on3DLoaded}
            onGISLoaded={() => {}}
            setLog={addLog}
          />
        </Grid>
      </Grid>
      <LogsPanel logs={logs} />
    </Box>
  );
}

export default App;
 */

import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import ViewerTabs from "./components/UI/ViewerTabs";
import LogsPanel from "./components/UI/LogsPanel";
import AppHeader from "./components/UI/AppHeader"; // assume you have a header
// ... other imports ...

function App() {
  const [logs, setLogs] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [threeFile, setThreeFile] = useState(null);
  const [gisFile, setGisFile] = useState(null);

  // For metadata about 3D files
  const [numPoints, setNumPoints] = useState(0);
  const [bbox, setBbox] = useState(null);

  const addLog = (msg) => {
    setLogs((prev) => [...prev, msg]);
  };

  const on3DLoaded = (info) => {
    if (!info) return;
    setNumPoints(info.numPoints || 0);
    setBbox(info.bbox || null);
  };

  const handleTabChange = (event, newVal) => {
    setTabValue(newVal);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      addLog("No file selected");
      return;
    }
    const name = file.name.toLowerCase();
    if (name.endsWith(".xyz") || name.endsWith(".pcd")) {
      setThreeFile(file);
      addLog(`3D file selected: ${file.name}`);
    } else if (name.endsWith(".json") || name.endsWith(".geojson")) {
      setGisFile(file);
      addLog(`GIS file selected: ${file.name}`);
    } else {
      addLog("Unsupported file type");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppHeader />
      <Grid container sx={{ flex: 1, overflow: "hidden" }}>
        {/* Left Panel */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            borderRight: { xs: "none", md: "1px solid #ccc" },
            borderBottom: { xs: "1px solid #ccc", md: "none" },
            padding: 2,
            overflow: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            File Uploader
          </Typography>
          <input type="file" onChange={handleFileChange} />

          {/* Metadata */}
          {threeFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">3D File</Typography>
              <Typography variant="body2">Name: {threeFile.name}</Typography>
              <Typography variant="body2">Size: {threeFile.size} bytes</Typography>
              {numPoints > 0 && (
                <Typography variant="body2">Points: {numPoints}</Typography>
              )}
              {bbox && (
                <Typography variant="body2">
                  Bounding Box: [{bbox.min.join(", ")}] → [{bbox.max.join(", ")}]
                </Typography>
              )}
            </Box>
          )}

          {gisFile && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">GIS File</Typography>
              <Typography variant="body2">Name: {gisFile.name}</Typography>
              <Typography variant="body2">Size: {gisFile.size} bytes</Typography>
            </Box>
          )}
        </Grid>

        {/* Right Panel: Tabs */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <ViewerTabs
            threeFile={threeFile}
            gisFile={gisFile}
            tabValue={tabValue}
            onTabChange={handleTabChange}
            on3DLoaded={on3DLoaded}
            onGISLoaded={() => {}}
            setLog={addLog}
          />
        </Grid>
      </Grid>
      {/* Logs at the bottom */}
      <LogsPanel logs={logs} />
    </Box>
  );
}

export default App;