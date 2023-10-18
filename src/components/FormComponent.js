import React, { useState } from "react";
import { TextField, Button, Container, Typography, InputAdornment, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function FormComponent() {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    tienda: "",
    celular: "",
    correo: "",
    valorCompra: "",
    factura: null
  });

  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};

    // You can add more specific validation rules here
    tempErrors.nombre = formData.nombre ? "" : "El nombre es obligatorio.";
    tempErrors.dni = formData.dni ? "" : "El DNI es obligatorio.";
    tempErrors.tienda = formData.tienda ? "" : "La tienda es obligatoria.";
    tempErrors.celular = formData.celular ? "" : "El número de celular es obligatorio.";
    tempErrors.correo = formData.correo && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.correo) ? "" : "Se requiere un correo electrónico válido.";
    tempErrors.valorCompra = formData.valorCompra ? "" : "El valor de compra es obligatorio.";
    tempErrors.factura = formData.factura ? "" : "La imagen de la factura es obligatoria.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
        // TODO: Add API call here to send formData.
        alert("Gracias por participar");
      }

   
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      factura: e.target.files[0]
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
      Participa Ahora
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nombre"
          label="Nombre completo"
          name="nombre"
          autoFocus
          onChange={handleInputChange}
          {...(errors.nombre && { error: true, helperText: errors.nombre })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="dni"
          label="Número de DNI"
          name="dni"
          onChange={handleInputChange}
          {...(errors.dni && { error: true, helperText: errors.dni })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="tienda"
          label="Tienda donde realizo la compra"
          name="tienda"
          onChange={handleInputChange}
          {...(errors.tienda && { error: true, helperText: errors.tienda })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="celular"
          label="Celular - Whatsapp"
          name="celular"
          onChange={handleInputChange}
          {...(errors.celular && { error: true, helperText: errors.celular })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="correo"
          label="Correo"
          name="correo"
          onChange={handleInputChange}
          {...(errors.correo && { error: true, helperText: errors.correo })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="valorCompra"
          label="Valor de compra realizada"
          name="valorCompra"
          onChange={handleInputChange}
          {...(errors.valorCompra && { error: true, helperText: errors.valorCompra })}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
        >
          Subir Factura
          <input
            type="file"
            hidden
            name="factura"
            accept=".jpg, .jpeg, .png"
            required
            onChange={handleFileChange}
            {...(errors.factura && { error: true, helperText: errors.factura })}
          />
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="button"
          style={{ marginTop: "16px" }}
        >
          Enviar
        </Button>
      </form>
    </Container>
  );
}

export default FormComponent;