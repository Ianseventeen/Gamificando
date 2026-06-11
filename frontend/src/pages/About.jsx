import React from 'react';
import { User, Target, Compass } from 'lucide-react';
import { soundService } from '../services/sound';
import './About.css';

export default function About() {
  return (
    <div className="about-page container">
      <section className="about-hero">
        <div className="hero-tag">CONCEITO & DESENHO</div>
        <h1 className="main-title">Quem Somos & Propósito</h1>
        <p className="about-subtitle">
          Entenda a visão pedagógica e técnica por trás do desenvolvimento do nosso portal de gamificação.
        </p>
      </section>

      <div className="about-grid">
        <div 
          className="about-card glass-panel"
          onMouseEnter={() => soundService.playHover()}
        >
          <div className="card-header-icon">
            <Target className="about-icon" />
          </div>
          <h2>Nossa Missão</h2>
          <p>
            Transformamos conhecimento em aventura. Nossa equipe desenvolve experiências gamificadas para o ensino superior, combinando aprendizado, tecnologia e design centrado no usuário. Atualmente, estamos construindo um jogo para ensinar Banco de Dados de forma prática e divertida.
          </p>
        </div>

        <div 
          className="about-card glass-panel"
          onMouseEnter={() => soundService.playHover()}
        >
          <div className="card-header-icon">
            <Compass className="about-icon" />
          </div>
          <h2>O Projeto</h2>
          <p>
            Esta plataforma é um projeto web centrado na experiência do usuário, combinando design moderno e aprendizagem interativa. Unimos a seriedade dos conteúdos educacionais à ludicidade dos jogos clássicos para criar uma experiência envolvente, capaz de despertar o interesse do público geral e evidenciar o potencial da gamificação para avaliadores técnicos.
          </p>
        </div>
      </div>

      <section 
        className="creator-section glass-panel"
        onMouseEnter={() => soundService.playHover()}
      >
        <div className="creator-avatar-wrapper">
          <div className="creator-avatar-placeholder animate-glow">
            <User size={48} className="avatar-icon" />
          </div>
        </div>
        <div className="creator-info">
          <h2>Sobre os Idealizadores</h2>
          <h3>Desenvolvedores e Mestres do jogo</h3>
          <p style={{ marginBottom: '15px' }}>
            Somos Ian de Morais e Juan Dieguez, estudantes da UERJ – Campus Zona Oeste, juntamente com a professora Adriana Sicsu. Desenvolvemos um jogo voltado ao ensino de Banco de Dados, utilizando tecnologias modernas para criar uma experiência leve, responsiva e visualmente atrativa.
          </p>
          <p>
            Durante o desenvolvimento, percebemos a importância de compartilhar o processo de criação de um projeto de gamificação educacional. Por isso, criamos este portal, onde apresentamos o projeto, seus objetivos e as etapas envolvidas em seu desenvolvimento, buscando aproximar mais pessoas das áreas de tecnologia, educação e desenvolvimento de jogos.
          </p>
        </div>
      </section>
    </div>
  );
}
