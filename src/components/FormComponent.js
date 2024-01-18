import React, { useState } from "react";
import { TextField, Button, Container, Typography, InputAdornment, IconButton, Autocomplete } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import HeaderComponent from './HeaderComponent';
import { darken } from '@mui/system';
import logoNavidad from '../images/logo-navidad.jpg';

import { createFormData } from '../services/formDataService';
import tiendas from './storeList'; 
import { Search } from '@mui/icons-material';
import ThankYouComponent from './ThankYouComponent';

function FormComponent() {

  const initialFormData = {
    nombre: "",
    dni: "",
    tienda: "",
    celular: "",
    correo: "",
    valorCompra: "",
    factura: null
};

  const [formData, setFormData] = useState(initialFormData);


  const sortedTiendas = tiendas.sort((a, b) => a.localeCompare(b));
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};

    // You can add more specific validation rules here
    tempErrors.nombre = formData.nombre ? "" : "El nombre es obligatorio.";
    tempErrors.dni = formData.dni ? "" : "El DNI es obligatorio.";
    tempErrors.tienda = formData.tienda ? "" : "La tienda es obligatoria.";
    tempErrors.celular = formData.celular ? "" : "El número de celular es obligatorio.";
    tempErrors.valorCompra = formData.valorCompra ? "" : "El valor de compra es obligatorio.";
    tempErrors.factura = formData.factura ? "" : "La imagen de la factura es obligatoria.";

    if(parseFloat(formData.valorCompra) < 300.00){
      tempErrors.valorCompra = tempErrors.valorCompra+ "El valor de la compra debe ser de L300.00 minimo." 
    }
    const count = (formData.valorCompra.match(/\./g) || []).length;
    if(count > 1){
      tempErrors.valorCompra = tempErrors.valorCompra+ "El valor de compra no es un numero valido." 
    }
    if (!sortedTiendas.includes(formData.tienda)) {
      tempErrors.tienda = "Por favor seleccione una tienda válida de la lista.";
    } else {
      tempErrors.tienda = formData.tienda ? "" : "La tienda es obligatoria.";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const deadlineDate = new Date('2024-01-07');
    if (currentDate >= deadlineDate) {
      alert("La fecha límite de participación era el 6 de Enero de 2024, muchas gracias por querer participar.");
      return; 
    }

    if (validate()) {
      try {
        const response = await createFormData(formData);

        if (response && response.id) { 
          setFormData(initialFormData);
          setFormSubmitted(true);
        } else {
          alert("Hubo un problema al enviar los datos. Inténtalo de nuevo.");
        }
      } catch (error) {
        alert("Error al enviar el formulario. Por favor intente nuevamente más tarde.");
      }
    }

   
  };

  const handleInputChange = (e) => {
    if (e.target.name === "nombre") {
      const nameRegex = /^[a-zA-Z\s]*$/;
  
      if (nameRegex.test(e.target.value)) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      }
    }else if(e.target.name === "dni") {
      let val = e.target.value.replace(/[^0-9]/g, "").substring(0, 13);
  
      if (val.length > 8) {
        val = `${val.slice(0, 4)}-${val.slice(4, 8)}-${val.slice(8)}`;
      } else if (val.length > 4) {
        val = `${val.slice(0, 4)}-${val.slice(4)}`;
      }
  
      setFormData({
        ...formData,
        [e.target.name]: val
      });
    } else if(e.target.name === "celular"){
      let val = e.target.value.replace(/[^0-9]/g, "").substring(0, 8);
  
      if (val.length > 4) {
        val = `${val.slice(0, 4)}-${val.slice(4)}`;
      }
      setFormData({
        ...formData,
        [e.target.name]: val
      });
    } else if (e.target.name === "valorCompra") {
      const valorCompraRegex = /^\d+(\.\d{0,2})?$/;
  
      if (valorCompraRegex.test(e.target.value) || e.target.value === "" || e.target.value.endsWith(".")) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      factura: e.target.files[0]
    });
  };

  if (formSubmitted) {
    return <ThankYouComponent returnToForm={() => {
      setFormSubmitted(false);
      setFormData(initialFormData); // reset the form data
    }} />;
  }
  return (
    <Container component="main" maxWidth="xs">
       <img src={logoNavidad} alt="Navidad Logo" style={{ width: '75%',height:'40%', marginBottom: '16px' }} /> 
      
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
          value={formData.nombre} 
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
          value={formData.dni} 
          sx={{ backgroundColor: '#f5f5f5' }}
          inputProps={{
            maxLength: 15,
          }}    
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
      InputProps={{
        ...params.InputProps, // Spread provided InputProps. This is important!
        startAdornment: (
          <>
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
            {params.InputProps.startAdornment}
          </>
        )
      }}
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
          value={formData.celular} 
          sx={{ backgroundColor: '#f5f5f5' }}
          inputProps={{
            maxLength: 9,
          }}  
          {...(errors.celular && { error: true, helperText: errors.celular })}
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
          value={formData.valorCompra} 
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
      
    </Container>
  );
}

export default FormComponent;