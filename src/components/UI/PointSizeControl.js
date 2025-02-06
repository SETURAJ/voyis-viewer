/* import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
function PointSizeControl({ pointSize, onPointSizeChange }) {
  const increaseSize = () => onPointSizeChange(pointSize + 0.0001);
  const decreaseSize = () => {
    const newSize = pointSize - 0.0001;
    if (newSize > 0) onPointSizeChange(newSize);
  };
  
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2">Point Size: {pointSize.toFixed(4)}</Typography>
      <IconButton onClick={decreaseSize} size="small">
        <RemoveIcon />
      </IconButton>
      <IconButton onClick={increaseSize} size="small">
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default PointSizeControl;   */


import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function PointSizeControl({ pointSize, onPointSizeChange }) {
  const increaseSize = () => onPointSizeChange(pointSize + 0.001);
  const decreaseSize = () => {
    const newSize = pointSize - 0.0005;
    if (newSize <= 0) onPointSizeChange(0.0002);
    if (newSize > 0) onPointSizeChange(newSize);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Typography variant="body2">Point Size: {pointSize.toFixed(4)}</Typography>
      <IconButton onClick={decreaseSize} size="small">
        <RemoveIcon />
      </IconButton>
      <IconButton onClick={increaseSize} size="small">
        <AddIcon />
      </IconButton>
    </Box>
  );
}

export default PointSizeControl;