# 🎮 Gamificando — Portal de Aprendizagem Interativa

> **Uma jornada conceitual em engenharia pedagógica e gamificação para o Ensino Superior.**

O **Gamificando** é um portal interativo projetado para apresentar e gerenciar o cronograma e a metodologia de desenvolvimento de projetos acadêmicos e técnicos de forma lúdica. Inspirado em mecânicas de jogos de RPG clássicos, o sistema transforma a visualização de cronogramas tradicionais em uma jornada imersiva, facilitando a assimilação de etapas de desenvolvimento e valorizando as entregas (*loots*) de cada fase.

Este projeto foi construído com foco em **experiência do usuário (UX) premium**, apresentando animações complexas baseadas em física, síntese de áudio nativa no navegador e uma arquitetura moderna e escalável.

---

## 🚀 Principais Funcionalidades

### 1. Trilha de RPG Interativa (Jornada 3D)
* **Visualização Orbital 3D**: Os 7 níveis de desenvolvimento do projeto são dispostos em uma órbita tridimensional. Os nós mais distantes aplicam efeitos dinâmicos de escala e desfoque (*depth of field*).
* **Movimento com Física Elástica**: O avatar do jogador navega entre as fases utilizando transições baseadas em física amortecida (`cubic-bezier` com efeito *overshoot*), conferindo inércia e peso ao movimento.
* **Painel de Loots Holográfico**: Cada nível conquistado revela recompensas e entregáveis específicos em um pergaminho com efeito *glassmorphic* e luzes de neon.

### 2. Constelação de Lasers (Diagrama Técnico)
* **Canvas 2D Interativo**: Um mapa de constelação desenha conexões dinâmicas entre os nós das fases em tempo real.
* **Feixes de Luz Pulsantes**: Ao selecionar um nó técnico, conexões laser adjacentes acendem e pulsam de forma fluida.
* **Painel Detalhado de Processos**: Apresenta processos internos e entregáveis técnicos com layout integrado de alta legibilidade.

### 3. Atmosfera e Efeitos Sonoros Dinâmicos
* **Sintetizador Web Audio API**: O portal conta com um sintetizador de som nativo em tempo real (sem arquivos de áudio pesados, com peso de 0 KB de tráfego de rede), gerando efeitos de *hover*, cliques, varredura de frequência de movimento e acordes de vitória dinamicamente via código.
* **Widget de Áudio**: Controle flutuante minimalista para alternar o mute de forma discreta.

### 4. Interface Premium Responsiva
* **Fundo Vivo (Particle Canvas)**: Partículas estelares que flutuam e sofrem repulsão física em relação à posição do cursor do mouse.
* **Cursor Magnético Customizado**: Cursor inteligente com efeito *jelly* (deformação por velocidade) e *magnetic snapping* que é atraído ao passar próximo a elementos interativos. O cursor é automaticamente desativado em dispositivos móveis (< 1024px) para priorizar interações de toque.

---

## 🛠️ Stack Tecnológica

### Frontend
* **React 19** & **Vite**: Inicialização rápida, Hot Module Replacement (HMR) e compilação otimizada.
* **Vanilla CSS**: Estilização flexível e controle absoluto de transições, sem dependência de bibliotecas externas.
* **Lucide React**: Biblioteca de ícones vetoriais modernos.
* **Canvas 2D**: Utilizado para renderizar as partículas e as conexões dinâmicas no diagrama de constelações.

### Backend
* **Java 17** & **Spring Boot 3**: API robusta que expõe endpoints RESTful para fornecimento de fases dinâmicas (`GET /api/phases`) e envio de mensagens de contato (`POST /api/contacts`).

### Infraestrutura & Deploy
* **Docker**: Utilização de *multi-stage builds* no `backend` para compilar e gerar imagens de execução otimizadas de apenas alguns megabytes.
* **GitHub & CI/CD**: Deploy automático via Webhooks (Vercel + Render).
* **Hospedagem**: Frontend na **Vercel** e Backend no **Render.com**.

---

## 🤖 Desenvolvimento Assistido por Inteligência Artificial (AI-Assisted)

Este projeto é um exemplo prático de **engenharia de software moderna impulsionada por IA**, tendo sido construído em colaboração com o agente autônomo de programação **Antigravity** da equipe **Google DeepMind**.

### Como a IA foi utilizada no projeto:
1. **Divisão de Papéis**:
   * **Usuário (Product Owner & Designer)**: Definiu o escopo pedagógico, a narrativa de RPG, as paletas de cores específicas do tema dark (fundo `#050608`, destaques em ciano `#1AB8FF` e ciano/teal `#43E8D8`), as restrições de desempenho (uso de Canvas 2D ao invés de Three.js) e realizou a curadoria e revisão dos textos pedagógicos da UERJ.
   * **Agente AI (Engenheiro de Software)**: Traduziu as especificações de design em código otimizado. Codificou a lógica matemática das colisões de partículas, a renderização matemática de linhas de lasers no Canvas, as curvas de inércia do movimento do avatar, a programação de áudio via sintetizadores Web Audio API, os controladores REST em Spring Boot e a parametrização do `Dockerfile` multi-stage.
2. **Produtividade Acelerada**:
   * A colaboração permitiu criar, ajustar, testar e publicar um portal web funcional completo (frontend + backend + Docker + integração de deploy) em menos de um dia, garantindo boas práticas de codificação, SEO nativo e consistência absoluta no sistema de design.

---

## ⚙️ Configuração Local

### Executando o Backend (Java)
1. Certifique-se de ter o JDK 17 e o Maven instalados.
2. Navegue até a pasta:
   ```bash
   cd backend
   ```
3. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```
   A API estará disponível em `http://localhost:8080`.

### Executando o Frontend (React)
1. Certifique-se de ter o Node.js instalado.
2. Navegue até a pasta:
   ```bash
   cd frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O site estará rodando em `http://localhost:5173`.
