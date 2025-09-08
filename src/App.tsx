import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CarSales from './pages/CarSales';
import Workshop from './pages/Workshop';
import PublicInvoices from './pages/PublicInvoices';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/cars" element={
          <Layout>
            <CarSales />
          </Layout>
        } />
        <Route path="/workshop" element={
          <Layout>
            <Workshop />
          </Layout>
        } />
        <Route path="/invoices" element={
          <Layout>
            <PublicInvoices />
          </Layout>
        } />
        
        {/* Admin Routes without Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;