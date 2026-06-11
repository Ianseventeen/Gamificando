import React, { useState, useEffect, useRef } from 'react';
import { Shield, Swords, Wand2, ArrowLeft, ArrowUp, ArrowDown, Award, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { soundService } from '../services/sound';
import './RpgMap.css';

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

const NODES = [
  { id: 1, x: 25, y: 86, scale: 1.1, depth: 0, icon: BookOpen },
  { id: 2, x: 73, y: 75, scale: 1.05, depth: 1, icon: Shield },
  { id: 3, x: 20, y: 63, scale: 1.0, depth: 2, icon: Swords },
  { id: 4, x: 80, y: 51, scale: 0.95, depth: 3, icon: Sparkles },
  { id: 5, x: 25, y: 39, scale: 0.9, depth: 4, icon: Shield },
  { id: 6, x: 73, y: 27, scale: 0.85, depth: 5, icon: BookOpen },
  { id: 7, x: 50, y: 12, scale: 0.8, depth: 6, icon: Award }
];

const CHARACTERS = [
  { id: 'warrior', name: 'Guerreiro', emoji: '⚔️', icon: Swords, color: '#1AB8FF' }, // Destaque forte (Blue)
  { id: 'mage', name: 'Mago', emoji: '🔮', icon: Wand2, color: '#43E8D8' },    // Destaque (Teal/Cyan)
  { id: 'rogue', name: 'Arqueiro', emoji: '🏹', icon: Shield, color: '#9CA7B8' }   // Texto secundário (Gray)
];

export default function RpgMap() {
  const [phases, setPhases] = useState(FALLBACK_PHASES);
  const [currentLevel, setCurrentLevel] = useState(() => {
    return parseInt(localStorage.getItem('rpg_current_level') || '1', 10);
  });
  const [charClass, setCharClass] = useState(() => {
    return localStorage.getItem('rpg_char_class') || 'warrior';
  });
  const [isMoving, setIsMoving] = useState(false);
  const mapContainerRef = useRef(null);

  // Fetch from Java Spring Boot API
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/phases`)
      .then(res => {
        if (!res.ok) throw new Error('Network response error');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setPhases(data);
        }
      })
      .catch(err => {
        console.warn('Backend offline ou inacessível. Usando fases fallback do frontend local.', err);
      });
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('rpg_current_level', currentLevel.toString());
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem('rpg_char_class', charClass);
  }, [charClass]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isMoving) return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        moveToLevel(Math.min(currentLevel + 1, 7));
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        moveToLevel(Math.max(currentLevel - 1, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLevel, isMoving]);

  const moveToLevel = (levelId) => {
    if (levelId === currentLevel) return;
    setIsMoving(true);
    setCurrentLevel(levelId);
    soundService.playMove();
    
    setTimeout(() => {
      setIsMoving(false);
      soundService.playClick();
      if (levelId === 7) {
        soundService.playVictory();
      }
    }, 900); // matching CSS transition
  };

  const selectedChar = CHARACTERS.find(c => c.id === charClass) || CHARACTERS[0];
  const activePhase = phases.find(p => p.id === currentLevel) || phases[0];
  const activeNode = NODES.find(n => n.id === currentLevel) || NODES[0];

  // Draw lines connecting the nodes
  const getSvgPath = () => {
    let path = `M ${NODES[0].x}% ${NODES[0].y}%`;
    for (let i = 1; i < NODES.length; i++) {
      path += ` L ${NODES[i].x}% ${NODES[i].y}%`;
    }
    return path;
  };

  return (
    <div className="rpg-map-page">
      <div className="rpg-header glass-panel">
        <Link to="/" className="back-home-link" onClick={() => soundService.playClick()}>
          <ArrowLeft size={16} /> Voltar para o Início
        </Link>
        <div className="character-select">
          <span className="select-label">Selecione sua Classe:</span>
          <div className="class-buttons">
            {CHARACTERS.map(c => (
              <button
                key={c.id}
                className={`class-btn ${charClass === c.id ? 'active' : ''}`}
                style={{ '--char-color': c.color }}
                onClick={() => {
                  soundService.playClick();
                  setCharClass(c.id);
                }}
              >
                <span className="class-emoji">{c.emoji}</span>
                <span className="class-name">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rpg-content-container">
        {/* Left column: RPG Map */}
        <div className="map-column glass-panel">
          <h2 className="map-title">Mapa de Fases</h2>
          <div className="map-instructions">
            <span>💻 Use as teclas <strong>W / S</strong> ou as <strong>Setas</strong> do teclado.</span>
            <span>📱 Clique ou toque em qualquer nó no mapa.</span>
          </div>

          <div className="map-view-wrapper" ref={mapContainerRef}>
            {/* Connection line between levels */}
            <svg className="map-svg-connections">
              <path d={getSvgPath()} fill="none" className="path-line" />
              {/* Progress Line */}
              <path 
                d={getSvgPath()} 
                fill="none" 
                className="path-line-progress" 
                style={{
                  strokeDasharray: '1000',
                  strokeDashoffset: `${1000 - (1000 * (currentLevel - 1) / 6)}`
                }}
              />
            </svg>

            {/* Level Nodes */}
            {NODES.map((node, index) => {
              const NodeIcon = node.icon;
              const isUnlocked = node.id <= currentLevel;
              const isActive = node.id === currentLevel;
              
              // 3D Depth effect: Scale down and blur nodes that are further away (higher depth)
              // If active, it stands out with full scale and no blur.
              const scale = isActive ? 1.2 : node.scale;
              const blur = isActive ? 0 : Math.max(0, (node.depth - (currentLevel - 1)) * 0.8);
              const opacity = isActive ? 1 : Math.max(0.4, 1 - (node.depth * 0.08));

              return (
                <button
                  key={node.id}
                  className={`level-node ${isUnlocked ? 'unlocked' : 'locked'} ${isActive ? 'active' : ''}`}
                  style={{ 
                    left: `${node.x}%`, 
                    top: `${node.y}%`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    filter: `blur(${blur}px)`,
                    opacity: opacity,
                    zIndex: isActive ? 8 : 5
                  }}
                  onClick={() => moveToLevel(node.id)}
                  aria-label={`Ir para Nível ${node.id}`}
                >
                  <span className="node-number">{node.id}</span>
                  <div className="node-icon-bg">
                    <NodeIcon className="node-icon" />
                  </div>
                  <span className="node-label">Nível {node.id}</span>
                </button>
              );
            })}

            {/* The Character (Boneco) */}
            <div 
              className={`rpg-character ${isMoving ? 'moving' : 'idle'}`}
              style={{
                left: `${activeNode.x}%`,
                top: `${activeNode.y}%`,
                borderColor: selectedChar.color,
                boxShadow: `0 0 20px ${selectedChar.color}`,
                transform: `translate(-50%, -50%) scale(${activeNode.scale * 1.1})`
              }}
            >
              <div className="character-avatar" style={{ backgroundColor: selectedChar.color + '22' }}>
                <span className="character-emoji-display">{selectedChar.emoji}</span>
              </div>
              <div className="character-tag" style={{ backgroundColor: selectedChar.color }}>
                {selectedChar.name}
              </div>
            </div>
          </div>

          {/* Quick Mobile Controls */}
          <div className="mobile-controls">
            <button 
              className="control-btn" 
              onClick={() => moveToLevel(Math.max(currentLevel - 1, 1))}
              disabled={currentLevel === 1 || isMoving}
            >
              <ArrowDown size={18} /> Descer Nível
            </button>
            <button 
              className="control-btn" 
              onClick={() => moveToLevel(Math.min(currentLevel + 1, 7))}
              disabled={currentLevel === 7 || isMoving}
            >
              <ArrowUp size={18} /> Subir Nível
            </button>
          </div>
        </div>

        {/* Right column: Level Detail Dialog (Scroll Style) */}
        <div className="detail-column scroll-container">
          <div className="scroll-paper animate-glow">
            <div className="scroll-header">
              <span className="badge-level" style={{ backgroundColor: selectedChar.color }}>
                NÍVEL {activePhase.id}
              </span>
              <span className="phase-period">{activePhase.period}</span>
            </div>
            
            <h1 className="phase-title">{activePhase.title}</h1>
            
            <div className="scroll-divider"></div>
            
            <div className="scroll-body">
              <p className="phase-desc">{activePhase.description}</p>
              
              <div className="section-box missions-box">
                <h3>⚔️ Missões do Nível:</h3>
                <ul>
                  {activePhase.missions.map((mission, idx) => (
                    <li key={idx}>
                      <span className="bullet">⚡</span> {mission}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="section-box loots-box">
                <h3>💎 Loot Principal:</h3>
                <ul>
                  {activePhase.loots.map((loot, idx) => (
                    <li key={idx}>
                      <span className="bullet-loot">✨</span> {loot}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="scroll-footer">
              {currentLevel < 7 ? (
                <p className="next-prompt">
                  Avance para o próximo nível para desbloquear mais conhecimentos da guilda!
                </p>
              ) : (
                <div className="completion-card">
                  <Sparkles className="completion-icon" />
                  <p className="completion-text">
                    <strong>Parabéns!</strong> Você atingiu a consagração do mestre e concluiu a jornada de gamificação!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
