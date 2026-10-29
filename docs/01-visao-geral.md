# 01 — Visão geral

## O trabalho (enunciado do professor, resumido)

- **Disciplina:** Cálculo Diferencial e Integral I — BCC, IFSul Câmpus Passo Fundo
- **Professor:** Prof. Dr. Denílson José Seidel
- **Objetivo:** consolidar o conceito de **derivada** (taxa de variação, velocidade, aceleração)
  implementando a mecânica de um jogo 2D ou 3D.
- **Grupo:** no máximo 5 estudantes.
- **Peso:** até 20% da nota final da disciplina.

### Datas

| O quê | Quando |
|---|---|
| Envio dos arquivos do jogo e do link da apresentação no Moodle | **01/12/2026** |
| Seminário de apresentação | **02/12/2026** |

### Requisitos do jogo

1. **Inédito.** Se for identificado uso de jogo similar já existente, a nota é **zero**.
2. Movimentação baseada em conceitos e equações do Cálculo Diferencial,
   **sem motores de física prontos**.
3. Sugestões do professor: aceleração não constante, função da posição (`v(t) = s′(t)`),
   ou retas tangentes à curva calculadas em tempo real. **Este projeto usa as três.**

### Seminário (15 min + 5 min de perguntas)

1. **Visão geral e jogabilidade** — conceitos, objetivo do jogador, mecânicas.
2. **Demonstração prática** — jogo ao vivo com **telemetria** (valores numéricos instantâneos na tela).
3. **Fundamentação matemática** — conceitos e equações usados.
4. **Inspeção do código** — o ambiente de desenvolvimento aberto, mostrando as linhas que calculam as derivadas.

## O conceito do jogo

**"Radar da Derivada"** — um carrinho percorre o gráfico de uma função `y = f(x)`.

- O jogador **constrói o terreno**: escolhe uma função e ajusta seus parâmetros
  (ou digita uma função livremente, como no GeoGebra).
- O carro avança no eixo x em ritmo constante. Como a curva sobe e desce, o carro percorre
  **mais caminho** nos trechos inclinados — então sua velocidade sobre a curva **muda conforme
  a derivada** `f′(x)`.
- **Objetivo (fases):** há **radares de velocidade** em pontos do terreno. O carro precisa passar
  por cada radar **exatamente na velocidade pedida**. Para isso, o jogador precisa acertar a
  **inclinação da reta tangente** da curva naquele ponto.
- **Modo livre:** sem objetivo, para experimentar qualquer função e observar os gráficos de
  posição, velocidade e aceleração em tempo real.

### Origem da ideia

- O grupo queria um "GeoGebra jogável": digitar uma função e ver um carrinho andar por ela.
- O professor sugeriu calcular a distância percorrida com a **integral do comprimento de arco**
  e derivá-la para obter velocidade e aceleração, além de oferecer **funções pré-definidas**
  para quem não domina funções.
- Os radares foram a mecânica escolhida para transformar o simulador em jogo, com um objetivo
  claro e totalmente ligado à derivada.

### Por que é inédito

Jogos de "carro em morros" (como o Hill Climb Racing) usam gravidade, acelerador e física de
corpo rígido. Aqui não há nada disso: **o jogador não dirige**, ele **projeta a função**, e a
única regra do movimento é a derivada. A mecânica de acertar velocidades em radares moldando a
reta tangente não existe em jogos conhecidos.

**Evitar:** coletar estrelas/itens pelo caminho (lembra o "Marbleslides" da Desmos), personagens
que batem a cabeça, moedas e upgrades (lembram o Hill Climb Racing).

## Escopo (o que NÃO entra)

Para ser simples de construir e de explicar:

- sem gravidade, acelerador ou freio;
- sem combinar várias funções num mesmo terreno (uma função por vez);
- sem 3D, sem contas de usuário, sem backend.
