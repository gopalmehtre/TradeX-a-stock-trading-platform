import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./landing_page/home/HomePage";
import Authentication from "./landing_page/signup/Authentication";
import AboutPage from "./landing_page/about/About";
import ProductPage from "./landing_page/product/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import NotFound from "./landing_page/NotFound";
import { AuthProvider } from "./contexts/AuthContext";  

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>  
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Authentication />} />  
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
