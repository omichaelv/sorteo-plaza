import React from 'react';
import './App.css';
import FormPage from './components/FormPage';
import LoginForm from './components/LoginForm';
import EntriesList from './components/EntriesList';
import ProtectedRoute from './components/ProtectedRoute';
import footerChristmas from './images/footer-christmas.jpg';
import { CssBaseline, Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container component="main" maxWidth="xl" className="container" disableGutters  style={{ flex: 1 }}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/listaentradas" element={<EntriesList />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Container>
        <img src={footerChristmas} alt="Christmas Footer" style={{ width: '100%' }} />
      </div>
    </Router>
  );
}

export default App;
