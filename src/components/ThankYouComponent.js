import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { darken } from '@mui/system';
import { Box } from '@mui/material';
import logoNavidad from '../images/logo-navidad.jpg';

function ThankYouComponent({ returnToForm }) {
  return (
    <Container component="main" maxWidth="xs">
      <img src={logoNavidad} alt="Navidad Logo" style={{ width: '75%',height:'40%', marginBottom: '16px' }} /> 
      <Typography variant="h5" style={{ marginTop: '20px', marginBottom: '20px' }}>
        Gracias por participar
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={returnToForm}
        sx={{ backgroundColor: '#e16c08', '&:hover': { backgroundColor: darken('#e16c08', 0.1) } }}
      >
        Volver al formulario
      </Button>
      <Box sx={{ 
        height: {
          xs: '250px',  
          md: '200px' 
        } 
      }} />
    </Container>
  );
}

export default ThankYouComponent;