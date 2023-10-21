import React, { useState } from "react";
import { TextField, Button, Container, Typography, InputAdornment, IconButton, Autocomplete } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import HeaderComponent from './HeaderComponent';
import { darken } from '@mui/system';
import logoNavidad from '../images/logo-navidad.png';
import footerChristmas from '../images/footer-christmas.jpg';
import { createFormData } from '../services/formDataService';
import tiendas from './storeList'; 

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
      try {
        const response = await createFormData(formData);

        if (response && response.id) { 
          alert("Gracias por participar");
        } else {
          alert("Hubo un problema al enviar los datos. Inténtalo de nuevo.");
        }
      } catch (error) {
        console.error("Error sending form data:", error);
        alert("Error al enviar el formulario. Por favor intente nuevamente más tarde.");
      }
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
       <img src={logoNavidad} alt="Navidad Logo" style={{ width: '100%',height:'40%', marginBottom: '16px' }} /> 
      <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
      Formulario de Promoción
      </Typography>
      <HeaderComponent />
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
          sx={{ backgroundColor: '#f5f5f5' }}
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
          sx={{ backgroundColor: '#f5f5f5' }}
          {...(errors.dni && { error: true, helperText: errors.dni })}
        />
        <Autocomplete
  id="tienda"
  options={tiendas}
  fullWidth
  freeSolo
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      tienda: newValue
    });
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="outlined"
      margin="normal"
      required
      label="Tienda donde realizo la compra"
      name="tienda"
      sx={{ backgroundColor: '#f5f5f5' }}
      {...(errors.tienda && { error: true, helperText: errors.tienda })}
    />
  )}
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
          sx={{ backgroundColor: '#f5f5f5' }}
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
          sx={{ backgroundColor: '#f5f5f5' }}
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
          sx={{ backgroundColor: '#f5f5f5' }}
          {...(errors.valorCompra && { error: true, helperText: errors.valorCompra })}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ backgroundColor: '#f29410', '&:hover': { backgroundColor: darken('#f29410', 0.1) } }}
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
          sx={{ backgroundColor: '#e16c08', '&:hover': { backgroundColor: darken('#e16c08', 0.1) } }}
          style={{ marginTop: "16px", width:"80%" }}
        >
          Enviar
        </Button>
      </form>
      <img src={footerChristmas} alt="Christmas Footer" style={{ width: '100%', marginTop: '16px' }} /> {/* Adjust width as necessary */}
    </Container>
  );
}

export default FormComponent;