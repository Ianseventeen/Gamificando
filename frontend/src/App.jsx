import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RpgMap from './pages/RpgMap';
import Diagram from './pages/Diagram';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ParticleBackground from './components/ParticleBackground';
import BrandCursor from './components/BrandCursor';
import SoundWidget from './components/SoundWidget';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <ParticleBackground />
        <BrandCursor />
        <SoundWidget />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mapa" element={<RpgMap />} />
            <Route path="/diagrama" element={<Diagram />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contato" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
