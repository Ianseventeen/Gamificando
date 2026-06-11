import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { soundService } from '../services/sound';
import './Blog.css';

const POSTS = [
  {
    id: 1,
    category: "Gamificação",
    title: "O que é Gamificação e como aplicá-la em Projetos Acadêmicos",
    date: "10 de Junho, 2026",
    readTime: "5 min de leitura",
    summary: "Descubra como transformar cronogramas tradicionais e apresentações de TCC em jornadas gamificadas que capturam a atenção e facilitam a avaliação da banca.",
  },
  {
    id: 2,
    category: "Frontend Dev",
    title: "Construindo Mapas de RPG interativos com React e CSS Transitions",
    date: "02 de Junho, 2026",
    readTime: "8 min de leitura",
    summary: "Aprenda a mapear coordenadas responsivas em SVG/CSS e criar animações de caminhada e deslocamento suave de bonecos dentro do ecossistema React.",
  },
  {
    id: 3,
    category: "Backend Java",
    title: "Spring Boot 3 + Vite: A combinação definitiva para sistemas robustos",
    date: "25 de Maio, 2026",
    readTime: "6 min de leitura",
    summary: "Entenda por que desenvolvedores seniores recomendam desacoplar o frontend (Vite/React) do backend (Spring Boot Java) para alcançar melhor performance e flexibilidade.",
  }
];

export default function Blog() {
  return (
    <div className="blog-page container">
      <section className="blog-hero">
        <div className="hero-tag">CONTEÚDO & SEO</div>
        <h1 className="main-title">Blog & Novidades</h1>
        <p className="blog-subtitle">
          Dicas sobre gamificação, metodologias ágeis e as últimas novidades do nosso projeto.
        </p>
      </section>

      <div className="blog-grid">
        {POSTS.map(post => (
          <article 
            key={post.id} 
            className="blog-card glass-panel"
            onMouseEnter={() => soundService.playHover()}
          >
            <div className="post-meta-header">
              <span className="post-category">{post.category}</span>
              <div className="post-time-meta">
                <span className="meta-item"><Calendar size={12} /> {post.date}</span>
                <span className="meta-item"><Clock size={12} /> {post.readTime}</span>
              </div>
            </div>
            
            <h2 className="post-title">{post.title}</h2>
            <p className="post-summary">{post.summary}</p>
            
            <button 
              className="read-more-btn"
              onClick={() => soundService.playClick()}
            >
              Ler Artigo Completo <ArrowRight size={16} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
