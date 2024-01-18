import React, { useEffect, useState, useRef } from 'react';
import useAuth from '../hooks/useAuth';
import { getAllFormData, getSingleFormData, deleteFormData } from '../services/formDataService'; // Import the service functions
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, TablePagination, TextField, InputAdornment, Modal,Button, Box
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

  const [isModalBorrarOpen, setIsModalBorrarOpen] = useState(false);
  const [idBorrar, setidBorrar] = useState("");

  const modalBorrarRegistro = async (entryId) => {
    try {
      setidBorrar(entryId);
      setIsModalBorrarOpen(true);
    } catch (error) {
      
    }
  };

  const borrarRegistro = async () => {
    try {
      const response = await deleteFormData(idBorrar);
      if (response.message === "Entry deleted successfully") {
        alert("Registro Borrado Correctamente");
        setIsModalBorrarOpen(false);
        getAllFormData().then(data => {
          if (Array.isArray(data)) {
            setEntries(data);
            setFilteredEntries(data);
          } else {
            console.error('Received data is not an array:', data);
          }
        });
      } else {
        console.error('Failed to delete id:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to delete id:', error.message);
    }
  };

  
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [winner, setWinner] = useState(null);

  const pickWinner = () => {
    if (entries.length === 0) {
      alert("No hay registros para seleccionar un ganador.");
      return;
    }
    const randomIndex = Math.floor(Math.random() * entries.length);
    setWinner(entries[randomIndex]);
    setIsWinnerModalOpen(true);
  };

  return (
    <div>
      <img src={logoNavidad} alt="Navidad Logo" style={{ width: '30%',height:'40%', marginBottom: '16px' }} /> 
      <Typography variant="h5">Lista de participantes de nuestra promoción, “En esta navidad, reviví momentos, plaza miraflores”</Typography>

      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
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
              </ InputAdornment>
            )
          }}
        />
        <Button
          style={{ width: '30%' }}
          variant="contained"
          onClick={pickWinner}
          sx={{
            marginLeft:2
          }}
        >
          Generar Ganador
        </Button>
      </Box>

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
              <TableCell>Administrar</TableCell>
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
                  <Button onClick={() => openFacturaImage(entry.id)}>Ver Imagen</Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => modalBorrarRegistro(entry.id)}>Borrar</Button>
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

  <Modal
    open={isModalBorrarOpen}
    onClose={() => setIsModalBorrarOpen(false)}
    aria-labelledby="modal-title"
    aria-describedby="modal-description"
  >
    <Box 
        sx={{ 
            position: 'absolute', 
            top: '50%', left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, bgcolor: 'background.paper', 
            boxShadow: 24, p: 4, 
            display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}
    >
        <Typography id="modal-title" variant="h6" component="h2">
            ¿Está seguro que desea eliminar el registro?
        </Typography>
        <Box 
            sx={{ 
                mt: 2, 
                display: 'flex', 
                justifyContent: 'space-around', 
                width: '100%' 
            }}
        >
            <Button 
                variant="outlined" 
                color="primary" 
                onClick={borrarRegistro}
            >
                Sí
            </Button>
            <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => setIsModalBorrarOpen(false)}
            >
                No
            </Button>
        </Box>
    </Box>
  </Modal>
      <Modal
        open={isWinnerModalOpen}
        onClose={() => setIsWinnerModalOpen(false)}
        aria-labelledby="winner-modal-title"
        aria-describedby="winner-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, bgcolor: 'background.paper',
            boxShadow: 24, p: 4,
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}
        >
          <Typography id="winner-modal-title" variant="h6" component="h2">
            El Ganador Es:
          </Typography>
          {winner && (
            <Box sx={{ mt: 2, textAlign: 'left' }}>
              <Typography>Numero: {winner.id}</Typography>
              <Typography>Nombre: {winner.nombre}</Typography>
              <Typography>Identidad: {winner.dni}</Typography>
              <Typography>Celular: {winner.celular}</Typography>
              <Typography>Tienda: {winner.tienda}</Typography>
              <Typography>Factura: <Button onClick={() => openFacturaImage(winner.id)}>Ver Imagen</Button></Typography>
            </Box>
          )}
          <Button sx={{ mt: 2 }} onClick={() => setIsWinnerModalOpen(false)}>Cerrar</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default EntriesList;