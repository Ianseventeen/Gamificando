import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './BrandIcons';
import { soundService } from '../services/sound';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Gamificando. Todos os direitos reservados.
        </p>
        <p className="maker">
          Feito com <Heart className="heart-icon" /> para gamificação.
        </p>
        <div className="social-links">
          <a 
            href="https://github.com/Ianseventeen" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link" 
            aria-label="GitHub"
            onMouseEnter={() => soundService.playHover()}
            onClick={() => soundService.playClick()}
          >
            <GithubIcon size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/ian-de-morais-5b30aa225/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link" 
            aria-label="LinkedIn"
            onMouseEnter={() => soundService.playHover()}
            onClick={() => soundService.playClick()}
          >
            <LinkedinIcon size={20} />
          </a>
          <a 
            href="mailto:ianmoraiscosta@gmail.com" 
            className="social-link" 
            aria-label="Email"
            onMouseEnter={() => soundService.playHover()}
            onClick={() => soundService.playClick()}
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
