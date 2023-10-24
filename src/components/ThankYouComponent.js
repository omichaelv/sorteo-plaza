import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { darken } from '@mui/system';

function ThankYouComponent({ returnToForm }) {
  return (
    <Container component="main" maxWidth="xs">
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
    </Container>
  );
}

export default ThankYouComponent;