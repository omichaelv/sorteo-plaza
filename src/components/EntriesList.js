import React, { useEffect, useState, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import { getAllFormData, getSingleFormData } from '../services/formDataService'; // Import the service functions
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination, TextField, InputAdornment, Modal
} from '@mui/material';
import { Search } from '@mui/icons-material';
import logoNavidad from '../images/logo-navidad.jpg';
import PanZoom from 'react-easy-panzoom';

function EntriesList() {
  // Call our custom authentication hook
  useAuth();
  const panZoomRef = useRef(null);
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    // Fetch the data
    getAllFormData().then(data => {
      if (Array.isArray(data)) {
        setEntries(data);
        setFilteredEntries(data);
      } else {
        console.error('Received data is not an array:', data);
      }
    });
  }, []);

  useEffect(() => {
    const results = entries.filter(entry =>
      Object.values(entry).some(val => 
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEntries(results);
  }, [searchTerm, entries]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = event.target.value;
    setRowsPerPage(value === "Todos" ? filteredEntries.length : parseInt(value, 10));
    setPage(0);
  };

  const openImageModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setCurrentImage(null);
    setIsModalOpen(false);
  };

  function formatLempiras(value) {
    return new Intl.NumberFormat('es-HN', {
        style: 'currency',
        currency: 'HNL',
    }).format(value);
  }

  function getMimeType(base64String) {
    if (!base64String) return 'unknown'; 

    const header = base64String.substring(0, 15); 
  
    if (header.includes('iVBOR')) return 'image/png';
    if (header.includes('/9j/')) return 'image/jpeg';
    if (header.includes('R0lGO')) return 'image/gif';
    if (header.includes('UklGR')) return 'image/webp';
    if (header.includes('Qk0=')) return 'image/bmp';
  
    return 'unknown'; 
  }
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openFacturaImage = async (entryId) => {
    try {
      const response = await getSingleFormData(entryId);
      if (response.status === 200) {
        openImageModal(response.data.factura);
      } else {
        console.error('Failed to fetch factura image:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching factura image:', error.message);
    }
  };

  return (
    <div>
      <img src={logoNavidad} alt="Navidad Logo" style={{ width: '30%',height:'40%', marginBottom: '16px' }} /> 
      <Typography variant="h5">Lista de participantes de nuestra promoción, “En esta navidad, reviví momentos, plaza miraflores”</Typography>

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Numero</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Tienda</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Valor de Compra</TableCell>
              <TableCell>Imagen de Factura</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry) => (
              <TableRow key={entry.id}>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{entry.id}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{entry.nombre}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{entry.dni}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{entry.tienda}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{entry.celular}</TableCell>
                <TableCell style={{ whiteSpace: 'nowrap' }}>{formatLempiras(entry.valorCompra)}</TableCell>
                <TableCell>
                  <button onClick={() => openFacturaImage(entry.id)}>Ver Imagen</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100, 150, 200, 250, 300, 500, "Todos"]}
          component="div"
          count={filteredEntries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Registros por pagina"
        />
      </TableContainer>
      <Modal
    open={isModalOpen}
    onClose={closeImageModal}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
>
    <div style={{
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
        position: 'absolute', width: '80%', backgroundColor: 'white', 
        padding: '20px', overflow: 'hidden'
    }}>
        <PanZoom>
            {currentImage && 
                <img 
                    src={`data:${getMimeType(currentImage)};base64,${currentImage}`} 
                    alt="Factura" 
                    style={{ width: '100%', cursor: 'grab' }} 
                />
            }
        </PanZoom>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={closeImageModal}>Cerrar</button>
        </div>
    </div>
</Modal>
    </div>
  );
}

export default EntriesList;