import React from 'react';
import './App.css';
import FormPage from './components/FormPage';
import LoginForm from './components/LoginForm';
import EntriesList from './components/EntriesList';
import ProtectedRoute from './components/ProtectedRoute';
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
      <Container component="main" maxWidth="lg" className="container">
        <CssBaseline />
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/listaentradas" element={<EntriesList />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;