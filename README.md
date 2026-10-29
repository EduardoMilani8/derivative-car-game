# Radar da Derivada (`derivative-car-game`)

Jogo educativo feito para o trabalho avaliativo de **Cálculo Diferencial e Integral I**
do curso de Bacharelado em Ciência da Computação do **IFSul Câmpus Passo Fundo**
(Prof. Dr. Denílson José Seidel).

Um carrinho percorre o **gráfico de uma função**. A **derivada** da função define o quanto a
curva está inclinada, e a inclinação define a **velocidade** do carro. Para vencer, o jogador
precisa moldar a função para que o carro passe por cada **radar de velocidade** exatamente
na velocidade pedida.

## Como jogar

- **Fases:** escolha o tipo de função, ajuste os controles deslizantes e largue o carro.
  Ele precisa passar por cada radar na velocidade-alvo (margem de ±5%).
- **Modo livre:** digite qualquer função (como no GeoGebra) ou escolha uma pronta, defina onde o
  carro começa e acompanhe a telemetria: posição, velocidade, aceleração e os gráficos de cada uma.

## A matemática em uma frase

O carro avança no eixo x em ritmo constante; a distância percorrida **sobre a curva** é a
integral do comprimento de arco, e derivando essa distância obtemos a velocidade
(`v = s′(t)`) e a aceleração (`a = s″(t)`). Detalhes em [`docs/02-matematica.md`](docs/02-matematica.md).

## Rodando

Abra `index.html` no navegador (funciona offline). Versão online: https://eduardomilani8.github.io/derivative-car-game/

Testes da parte matemática: `node tests/calculo.test.js`

## Grupo

- _nome 1_
- _nome 2_
- _..._

## Documentação

| Documento | Conteúdo |
|---|---|
| [01 — Visão geral](docs/01-visao-geral.md) | O trabalho e o conceito do jogo |
| [02 — Matemática](docs/02-matematica.md) | Modelo, fórmulas e exemplos |
| [03 — Jogabilidade](docs/03-jogabilidade.md) | Modos, fases e pontuação |
| [04 — Interface](docs/04-interface.md) | Telas, telemetria e gráficos |
| [05 — Arquitetura](docs/05-arquitetura.md) | Stack e organização do código |
| [06 — Plano](docs/06-plano-de-implementacao.md) | Etapas e cronograma |
| [07 — Seminário](docs/07-roteiro-seminario.md) | Roteiro da apresentação |
