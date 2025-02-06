/* import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Viewer App</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader; */
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function AppHeader() {
  return (
    <AppBar position="static" color="default" sx={{ backgroundColor: "light teal", boxShadow: "none"}}>
      <Toolbar>
        <Typography variant="h6">3D and GeoJson Viewer</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
