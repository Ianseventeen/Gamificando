import React from 'react';
import { Link } from 'react-router-dom';
import { GitFork, Gamepad2, ArrowUpRight } from 'lucide-react';
import { soundService } from '../services/sound';
import './Home.css';

export default function Home() {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.setProperty('--mouse-x', x);
    e.currentTarget.style.setProperty('--mouse-y', y);
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.setProperty('--mouse-x', 0);
    e.currentTarget.style.setProperty('--mouse-y', 0);
  };

  return (
    <div 
      className="home-page container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <section className="hero-section">
        <h1 className="main-title">Gamificando</h1>
        <p className="hero-subtitle">
          Uma jornada conceitual em engenharia pedagógica. Escolha o seu portal de entrada e 
          explore as etapas de desenvolvimento de forma convencional ou gamificada.
        </p>
      </section>

      {/* 3D Perspective Scenario */}
      <div className="perspective-wrapper">
        <div className="choice-container-3d">
          
          {/* Serious Diagram Card */}
          <Link 
            to="/diagrama" 
            className="choice-card-3d serious-card glass-panel"
            onMouseEnter={() => soundService.playHover()}
            onClick={() => soundService.playClick()}
          >
            <div className="card-top-glow"></div>
            <div className="card-depth-layer">
              <div className="icon-wrapper-3d">
                <GitFork className="card-icon-3d" />
              </div>
              <span className="card-tag-text">CONCEITUAL & TÉCNICO</span>
              <h2>Visualizador de Diagramas</h2>
              <p>
                A estrutura metodológica explicada por fluxogramas e cronogramas de engenharia de software.
              </p>
              <div className="card-footer-action">
                <span>Explorar Diagrama</span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </Link>

          {/* RPG Adventure Card */}
          <Link 
            to="/mapa" 
            className="choice-card-3d rpg-card glass-panel"
            onMouseEnter={() => soundService.playHover()}
            onClick={() => soundService.playClick()}
          >
            <div className="card-top-glow"></div>
            <div className="card-depth-layer">
              <div className="icon-wrapper-3d">
                <Gamepad2 className="card-icon-3d" />
              </div>
              <span className="card-tag-text">JOGO INTERATIVO</span>
              <h2>Jornada de RPG</h2>
              <p>
                Suba de nível, controle o herói pelas fases e colete loots em uma trilha com física interativa.
              </p>
              <div className="card-footer-action">
                <span>Jogar Aventura</span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
