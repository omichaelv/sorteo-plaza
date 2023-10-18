import React from 'react';
import useAuth from '../hooks/useAuth';
import { Typography } from '@mui/material';

function EntriesList() {
  // Call our custom authentication hook
  useAuth();

  // Mock data
  const entries = ["Entry 1", "Entry 2", "Entry 3"]; 

  return (
    <div>
      <Typography variant="h5">Entries</Typography>
      <ul>
        {entries.map(entry => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default EntriesList;