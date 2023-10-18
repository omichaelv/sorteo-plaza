import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function HeaderComponent() {
  return (
    <Box className="paper" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Mall Plaza Miraflores
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
        Te premia tus compras esta navidad, participa con tus compras mayores a L.300.00.
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Podrás ganar dinero en efectivo para compras en el centro comercial, viajes y mucho mas. Llenando el siguiente formulario:
        </Typography>
      </Paper>
    </Box>
  );
}

export default HeaderComponent;