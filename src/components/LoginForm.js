import React, { useState } from "react";
import config from '../path-to-config';
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
        const response = await fetch('${config.apiBaseUrl}/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (response.ok) {
            // Assuming your server responds with { token: "YOUR_JWT_TOKEN" }
            localStorage.setItem('token', data.token);
            localStorage.setItem("authenticated", "true");
            window.location.replace("/listaentradas");
        } else {
            // Handle login errors here
            console.error(data.message || 'Login failed');
            // You might also want to show a user-friendly error message on the UI
        }
    } catch (error) {
        console.error('Network or server error', error);
        // Again, consider showing a user-friendly message for these kinds of errors
    }
};

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          autoFocus
          onChange={e => setCredentials({ ...credentials, username: e.target.value })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default LoginForm;
