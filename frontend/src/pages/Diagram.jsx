import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Settings, Package, Sparkles } from 'lucide-react';
import { soundService } from '../services/sound';
import './Diagram.css';

const FALLBACK_PHASES = [
  {
    id: 1,
    title: "A Grande Biblioteca",
    period: "Abril/2026 – Junho/2026",
    description: "Aqui a jornada começa com a preparação mental e o acúmulo de conhecimento. É a fase de planejar os próximos passos antes de sair para a aventura.",
    missions: ["Definição da metodologia", "Organização da equipe"],
    loots: ["Levantamento bibliográfico", "Análise crítica dos teóricos", "Elaboração de fichamentos e mapas conceituais"]
  },
  {
    id: 2,
    title: "O Planejamento da Jornada",
    period: "Julho/2026 – Agosto/2026",
    description: "O momento de traçar o mapa do mundo e decidir o destino. A narrativa ganha vida e as regras do universo começam a ser definidas.",
    missions: ["Escolha do tema central", "Alinhamento com o público-alvo", "Desenvolvimento da narrativa (enredo, personagens e desafios)"],
    loots: ["Estrutura de níveis", "Mecânicas básicas mapeadas", "Levantamento das ferramentas e plataformas que sustentarão o mundo"]
  },
  {
    id: 3,
    title: "A Forja do Código",
    period: "Setembro/2026 – Outubro/2026",
    description: "Nesta fase, o trabalho braçal começa. O esqueleto do projeto é moldado e a magia técnica dá os primeiros sinais de vida.",
    missions: ["Criação de wireframes", "Organização das interfaces"],
    loots: ["Protótipos visuais simples", "Navegação da estrutura base funcionando"]
  },
  {
    id: 4,
    title: "O Templo da Criação",
    period: "Novembro/2026 – Janeiro/2027",
    description: "Os elementos começam a se fundir. O que era apenas um esqueleto técnico ganha carne, som e atmosfera.",
    missions: ["Implementação das mecânicas básicas no protótipo"],
    loots: ["Inserção de elementos visuais e sonoros", "Refinamento de toda a ambientação do projeto"]
  },
  {
    id: 5,
    title: "O Calabouço dos Testes",
    period: "Fevereiro/2027 – Abril/2027",
    description: "A fase mais perigosa, onde é preciso explorar os cantos mais escuros do sistema para caçar 'bugs' e enfrentar as falhas de frente.",
    missions: ["Testes internos de jogabilidade", "Identificação de falhas", "Ajustes pedagógicos"],
    loots: ["Melhoria na acessibilidade e interface", "Protótipo funcional totalmente finalizado"]
  },
  {
    id: 6,
    title: "O Salão da Guilda",
    period: "Maio/2027 – Junho/2027",
    description: "Com a ferramenta em mãos, o herói prepara os pergaminhos para treinar os novos recrutas e espalhar o conhecimento.",
    missions: ["Elaboração de todo o material de suporte"],
    loots: ["Apostilas, slides e atividades práticas prontas para o treinamento"]
  },
  {
    id: 7,
    title: "A Consagração do Mestre",
    period: "Julho/2027 – Setembro/2027",
    description: "O triunfo final. O momento de compartilhar a conquista com a comunidade, registrar os feitos para a posteridade e concluir a jornada.",
    missions: ["Aplicação das oficinas", "Acompanhamento dos participantes", "Coleta de impressões"],
    loots: ["Sistematização dos dados", "Entrega do relatório final", "Grande encerramento institucional do projeto"]
  }
];

const CONSTELLATION_NODES = [
  { id: 1, cx: 30, cy: 80, label: "Fase 1" },
  { id: 2, cx: 65, cy: 70, label: "Fase 2" },
  { id: 3, cx: 35, cy: 55, label: "Fase 3" },
  { id: 4, cx: 70, cy: 45, label: "Fase 4" },
  { id: 5, cx: 35, cy: 30, label: "Fase 5" },
  { id: 6, cx: 70, cy: 20, label: "Fase 6" },
  { id: 7, cx: 50, cy: 8, label: "Fase 7" }
];

export default function Diagram() {
  const [phases, setPhases] = useState(FALLBACK_PHASES);
  const [activeId, setActiveId] = useState(1);
  const canvasRef = useRef(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/phases`)
      .then(res => {
        if (!res.ok) throw new Error('Error status');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setPhases(data);
        }
      })
      .catch(err => {
        console.warn('Utilizando backup de fases local para o diagrama.', err);
      });
  }, []);

  // Animate dynamic constellation connections on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    let pulseVal = 0;
    const drawConstellation = () => {
      ctx.clearRect(0, 0, width, height);
      pulseVal += 0.05;

      // Draw all connections
      ctx.lineWidth = 1.5;
      for (let i = 0; i < CONSTELLATION_NODES.length - 1; i++) {
        const n1 = CONSTELLATION_NODES[i];
        const n2 = CONSTELLATION_NODES[i + 1];

        const x1 = (n1.cx / 100) * width;
        const y1 = (n1.cy / 100) * height;
        const x2 = (n2.cx / 100) * width;
        const y2 = (n2.cy / 100) * height;

        const isConnectingActive = n1.id === activeId || n2.id === activeId;

        // Draw laser pulse line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        
        if (isConnectingActive) {
          ctx.strokeStyle = `rgba(26, 184, 255, ${0.4 + Math.sin(pulseVal) * 0.25})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#1AB8FF';
        } else {
          ctx.strokeStyle = 'rgba(43, 52, 66, 0.4)';
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(drawConstellation);
    };

    drawConstellation();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeId]);

  const activePhase = phases.find(p => p.id === activeId) || phases[0];

  const handleNodeClick = (id) => {
    setActiveId(id);
    soundService.playClick();
  };

  return (
    <div className="diagram-page container">
      <div className="diagram-header">
        <Link to="/" className="back-link" onClick={() => soundService.playClick()}>
          <ArrowLeft size={16} /> Voltar para o Início
        </Link>
        <h1 className="diagram-title">Estrutura Metodológica</h1>
        <p className="diagram-desc-top">
          Explore o fluxograma interativo de constelações para analisar as entregas e processos operacionais de cada etapa.
        </p>
      </div>

      <div className="constellation-grid">
        {/* Constellation Canvas View */}
        <div className="constellation-view-wrapper glass-panel">
          <canvas ref={canvasRef} className="constellation-canvas"></canvas>

          {/* Floating Interactive Nodes */}
          {CONSTELLATION_NODES.map((node) => {
            const isActive = node.id === activeId;
            return (
              <button
                key={node.id}
                className={`constellation-node ${isActive ? 'active' : ''}`}
                style={{
                  left: `${node.cx}%`,
                  top: `${node.cy}%`,
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => soundService.playHover()}
                aria-label={`Visualizar Fase ${node.id}`}
              >
                <div className="constellation-node-pulse"></div>
                <div className="constellation-node-core">
                  <span>{node.id}</span>
                </div>
                <span className="constellation-node-label">{node.label}</span>
              </button>
            );
          })}
        </div>

        {/* Informative Dashboard Panel */}
        <div className="constellation-detail-panel glass-panel">
          <div className="detail-panel-header">
            <span className="panel-badge-level">FASE {activePhase.id}</span>
            <span className="panel-period-text">
              <Calendar size={14} /> {activePhase.period}
            </span>
          </div>

          <h2 className="panel-title-large">{activePhase.title}</h2>
          <p className="panel-description-large">{activePhase.description}</p>

          <div className="panel-sections-row">
            <div className="panel-section-box border-teal">
              <h3 className="section-sub-title">
                <Settings size={16} className="sub-icon color-teal" /> Processos
              </h3>
              <ul className="section-list-style">
                {activePhase.missions.map((mission, idx) => (
                  <li key={idx}>
                    <span className="bullet-teal">✦</span> {mission}
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-section-box border-blue">
              <h3 className="section-sub-title">
                <Package size={16} className="sub-icon color-blue" /> Entregáveis
              </h3>
              <ul className="section-list-style">
                {activePhase.loots.map((loot, idx) => (
                  <li key={idx}>
                    <span className="bullet-blue">■</span> {loot}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
