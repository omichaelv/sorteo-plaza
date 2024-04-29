import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function HeaderComponent() {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body1" align="justify" gutterBottom sx={{ fontWeight: 'bold' }}>
        Plaza Miraflores premia a Mamá, participa con tus compras mayores a L 300.00 y podrás participar en el sorteo de 5 premios en efectivo, solo debes llenar el siguiente formulario.
        </Typography>
      
    </Box>
  );
}

export default HeaderComponent;