import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { soundService } from '../services/sound';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    soundService.playClick();
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container container">
        <NavLink 
          to="/" 
          className="logo-link" 
          onClick={handleLinkClick}
          onMouseEnter={() => soundService.playHover()}
        >
          <Shield className="logo-icon animate-float" />
          <span className="logo-text">Gamificando</span>
        </NavLink>

        <button 
          className="mobile-toggle" 
          onClick={() => { soundService.playClick(); setIsOpen(!isOpen); }} 
          aria-label="Toggle Menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        <nav className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
            onClick={handleLinkClick}
            onMouseEnter={() => soundService.playHover()}
          >
            Início
          </NavLink>
          <NavLink 
            to="/sobre" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
            onClick={handleLinkClick}
            onMouseEnter={() => soundService.playHover()}
          >
            Sobre Nós
          </NavLink>
          {/* 
          <NavLink 
            to="/blog" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
            onClick={handleLinkClick}
            onMouseEnter={() => soundService.playHover()}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/contato" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} 
            onClick={handleLinkClick}
            onMouseEnter={() => soundService.playHover()}
          >
            Contato
          </NavLink>
          */}
        </nav>
      </div>
    </header>
  );
}
