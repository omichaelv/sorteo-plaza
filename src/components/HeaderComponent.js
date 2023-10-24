import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function HeaderComponent() {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body1" align="justify" gutterBottom sx={{ fontWeight: 'bold' }}>
        Te premia, participa con tus compras mayores a L300, podrás ganar un viaje para 2 personas, premios en efectivo y muchas sorpresas más, solo debes  llenar el siguiente formulario:
        </Typography>
      
    </Box>
  );
}

export default HeaderComponent;