import React, { useState } from "react";
import config from '../config';
import logoNavidad from '../images/logo-navidad.png';
import authService from '../services/authService'; 
import { darken } from '@mui/system';
import {
  TextField,
  Button,
  Container,
  Typography
} from "@mui/material";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token } = await authService.login(credentials);  

      localStorage.setItem('token', token);
      localStorage.setItem("authenticated", "true");
      window.location.replace("/listaentradas");
  } catch (error) {
      console.error('Error:', error.message);
      // You might also want to show a user-friendly error message on the UI
  }
};

  return (
    <Container component="main" maxWidth="xs">
      <img src={logoNavidad} alt="Navidad Logo" style={{ width: '100%',height:'40%', marginBottom: '16px' }} /> 
      <Typography component="h1" variant="h5">
      Inicia Sesión
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Usuario"
          autoFocus
          onChange={e => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Contraseña"
          type="password"
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
          sx={{ backgroundColor: '#e16c08', '&:hover': { backgroundColor: darken('#e16c08', 0.1) } }}
        >
          Iniciar Sesion
        </Button>
      </form>
    </Container>
  );
}

export default LoginForm;
