import React from 'react';
import './App.css';
import FormPage from './components/FormPage';
import LoginForm from './components/LoginForm';
import EntriesList from './components/EntriesList';
import ProtectedRoute from './components/ProtectedRoute';
import footerChristmas from './images/footer.png';
import { CssBaseline, Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

function App() {
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${footerChristmas})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  };
  return (
    <Router>
      <div style={appStyle}>
        <Container component="main" maxWidth="xl" className="container" disableGutters  style={{ flex: 1 }}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/listaentradas" element={<EntriesList />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
