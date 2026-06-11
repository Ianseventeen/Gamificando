package com.gamification.api.controller;

import com.gamification.api.model.Phase;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/phases")
@CrossOrigin(origins = "*")
public class PhaseController {

    private final List<Phase> phases = new ArrayList<>();

    public PhaseController() {
        phases.add(new Phase(
                1,
                "A Grande Biblioteca",
                "Abril/2026 – Junho/2026",
                "Aqui a jornada começa com a preparação mental e o acúmulo de conhecimento. É a fase de planejar os próximos passos antes de sair para a aventura.",
                Arrays.asList("Definição da metodologia", "Organização da equipe"),
                Arrays.asList("Levantamento bibliográfico", "Análise crítica dos teóricos", "Elaboração de fichamentos e mapas conceituais")
        ));

        phases.add(new Phase(
                2,
                "O Planejamento da Jornada",
                "Julho/2026 – Agosto/2026",
                "O momento de traçar o mapa do mundo e decidir o destino. A narrativa ganha vida e as regras do universo começam a ser definidas.",
                Arrays.asList("Escolha do tema central", "Alinhamento com o público-alvo", "Desenvolvimento da narrativa (enredo, personagens e desafios)"),
                Arrays.asList("Estrutura de níveis", "Mecânicas básicas mapeadas", "Levantamento das ferramentas e plataformas que sustentarão o mundo")
        ));

        phases.add(new Phase(
                3,
                "A Forja do Código",
                "Setembro/2026 – Outubro/2026",
                "Nesta fase, o trabalho braçal começa. O esqueleto do projeto é moldado e a magia técnica dá os primeiros sinais de vida.",
                Arrays.asList("Criação de wireframes", "Organização das interfaces"),
                Arrays.asList("Protótipos visuais simples", "Navegação da estrutura base funcionando")
        ));

        phases.add(new Phase(
                4,
                "O Templo da Criação",
                "Novembro/2026 – Janeiro/2027",
                "Os elementos começam a se fundir. O que era apenas um esqueleto técnico ganha carne, som e atmosfera.",
                Arrays.asList("Implementação das mecânicas básicas no protótipo"),
                Arrays.asList("Inserção de elementos visuais e sonoros", "Refinamento de toda a ambientação do projeto")
        ));

        phases.add(new Phase(
                5,
                "O Calabouço dos Testes",
                "Fevereiro/2027 – Abril/2027",
                "A fase mais perigosa, onde é preciso explorar os cantos mais escuros do sistema para caçar 'bugs' e enfrentar as falhas de frente.",
                Arrays.asList("Testes internos de jogabilidade", "Identificação de falhas", "Ajustes pedagógicos"),
                Arrays.asList("Melhoria na acessibilidade e interface", "Protótipo funcional totalmente finalizado")
        ));

        phases.add(new Phase(
                6,
                "O Salão da Guilda",
                "Maio/2027 – Junho/2027",
                "Com a ferramenta em mãos, o herói prepara os pergaminhos para treinar os novos recrutas e espalhar o conhecimento.",
                Arrays.asList("Elaboração de todo o material de suporte"),
                Arrays.asList("Apostilas, slides e atividades práticas prontas para o treinamento")
        ));

        phases.add(new Phase(
                7,
                "A Consagração do Mestre",
                "Julho/2027 – Setembro/2027",
                "O triunfo final. O momento de compartilhar a conquista com a comunidade, registrar os feitos para a posteridade e concluir a jornada.",
                Arrays.asList("Aplicação das oficinas", "Acompanhamento dos participantes", "Coleta de impressões"),
                Arrays.asList("Sistematização dos dados", "Entrega do relatório final", "Grande encerramento institucional do projeto")
        ));
    }

    @GetMapping
    public List<Phase> getAllPhases() {
        return phases;
    }
}
