import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';
import { soundService } from '../services/sound';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error', 'simulated'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    soundService.playClick();

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    fetch(`${apiUrl}/api/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Falha na resposta do servidor');
        return res.json();
      })
      .then(data => {
        setStatus('success');
        setStatusMsg('Sua mensagem foi enviada com sucesso ao servidor Java!');
        soundService.playSuccessBell();
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch(err => {
        console.warn('Backend indisponível. Simulando o envio de mensagem localmente no console.', err);
        setStatus('simulated');
        setStatusMsg('Backend Java offline. Sua mensagem foi capturada e exibida no console de depuração!');
        soundService.playSuccessBell();
        console.log('Dados do Contato (Simulado):', formData);
        setFormData({ name: '', email: '', subject: '', message: '' });
      });
  };

  return (
    <div className="contact-page container">
      <section className="contact-hero">
        <div className="hero-tag">CONTATO & CANAIS</div>
        <h1 className="main-title">Fale Conosco</h1>
        <p className="contact-subtitle">
          Tem alguma dúvida, sugestão ou feedback sobre o projeto? Entre em contato conosco!
        </p>
      </section>

      <div className="contact-grid">
        {/* Contact Info Panel */}
        <div 
          className="info-panel glass-panel"
          onMouseEnter={() => soundService.playHover()}
        >
          <h2>Informações</h2>
          <p className="info-desc">
            Entre em contato pelos nossos canais oficiais ou utilize o formulário ao lado.
          </p>

          <div className="info-items">
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <h4>E-mail</h4>
                <p>ianmoraiscosta@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <Phone className="info-icon" />
              <div>
                <h4>Telefone</h4>
                <p>+55 (11) 99999-9999</p>
              </div>
            </div>
            <div className="info-item">
              <MapPin className="info-icon" />
              <div>
                <h4>Endereço</h4>
                <p>Av. Paulista, 1000 - São Paulo, SP</p>
              </div>
            </div>
          </div>

          <div className="social-box">
            <h4>Redes Sociais</h4>
            <div className="social-icons-row">
              <a 
                href="https://github.com/Ianseventeen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-link"
                onMouseEnter={() => soundService.playHover()}
                onClick={() => soundService.playClick()}
              >
                <GithubIcon size={22} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ian-de-morais-5b30aa225/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-social-link"
                onMouseEnter={() => soundService.playHover()}
                onClick={() => soundService.playClick()}
              >
                <LinkedinIcon size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div 
          className="form-panel glass-panel"
          onMouseEnter={() => soundService.playHover()}
        >
          <h2>Envie uma Mensagem</h2>
          
          {status === 'success' && (
            <div className="status-banner banner-success">
              <CheckCircle size={18} />
              <span>{statusMsg}</span>
            </div>
          )}

          {status === 'simulated' && (
            <div className="status-banner banner-warning">
              <AlertCircle size={18} />
              <span>{statusMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => soundService.playHover()}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => soundService.playHover()}
                placeholder="seu.email@exemplo.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Assunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => soundService.playHover()}
                placeholder="Qual o motivo do contato?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensagem</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => soundService.playHover()}
                placeholder="Escreva sua mensagem aqui..."
                rows={5}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-primary submit-btn" 
              disabled={status === 'loading'}
            >
              <Send size={16} /> {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
