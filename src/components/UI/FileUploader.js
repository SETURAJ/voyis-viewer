/* import React from 'react';
import { Button } from '@mui/material';

function FileUploader({ onFileChange }) {
  return (
    <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
      Upload File
      <input type="file" hidden onChange={onFileChange} />
    </Button>
  );
}

export default FileUploader; */


import React from "react";
import { Button } from "@mui/material";

function FileUploader({ onFileChange }) {
  return (
    <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
      Upload File
      <input type="file" hidden onChange={onFileChange} />
    </Button>
  );
}

export default FileUploader;