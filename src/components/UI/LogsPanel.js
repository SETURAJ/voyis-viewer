import React from "react";
import { Box, Typography } from "@mui/material";

function LogsPanel({ logs }) {
  return (
    <Box
      sx={{
        height: { xs: "100px", md: "120px" },
        borderTop: "1px solid #ccc",
        overflowY: "auto",
        padding: 1,
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        System Log
      </Typography>
      {logs.map((log, i) => (
        <Typography key={i} variant="body2">
          {log}
        </Typography>
      ))}
    </Box>
  );
}

export default LogsPanel;