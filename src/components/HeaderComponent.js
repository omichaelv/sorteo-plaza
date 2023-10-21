import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function HeaderComponent() {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Mall Plaza Miraflores Te premia esta navidad, participa con tus compras mayores a L.300.00. Llenando el siguiente formulario:
        </Typography>
      
    </Box>
  );
}

export default HeaderComponent;