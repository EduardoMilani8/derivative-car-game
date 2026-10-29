# CLAUDE.md — Instruções para o Claude Code

Você vai construir o **"Radar da Derivada"**, um jogo web para o trabalho de
**Cálculo Diferencial e Integral I** (BCC — IFSul Câmpus Passo Fundo).

Leia os documentos em `docs/` antes de escrever código, nesta ordem:
`01-visao-geral` → `02-matematica` → `03-jogabilidade` → `04-interface` →
`05-arquitetura` → `06-plano-de-implementacao` → `07-roteiro-seminario`.

## REGRA PRINCIPAL: SIMPLICIDADE

O grupo quer **o mais simples possível**, tanto o jogo quanto o código.
O objetivo é ser **apresentável e fácil de explicar**, não bonito.

- Faça **só** o que está nos documentos. Nada de funcionalidades extras.
- **Sem animações, transições, efeitos, sons, imagens ou ícones elaborados.**
  O carro é um retângulo; a interface é HTML comum com CSS mínimo.
- Código curto e direto. Prefira uma solução óbvia a uma elegante.
  Sem classes complexas, sem padrões de projeto, sem abstrações "para o futuro".
- Se estiver em dúvida entre duas formas, escolha a mais fácil de explicar em voz alta.

## Regras do trabalho (não podem ser quebradas)

1. **Nenhum motor de física pronto.** Todo o movimento vem das fórmulas de `docs/02-matematica.md`.
2. **Única biblioteca: math.js**, só para ler a função digitada. Gráficos feitos à mão com `<canvas>`.
3. **Roda offline** com duplo clique no `index.html`: math.js salvo em `vendor/math.min.js`
   e scripts comuns (sem `type="module"`).
4. **Toda a matemática fica em `js/calculo.js`**, com um comentário mostrando a fórmula
   em cada função, ex.: `// f'(x) ≈ [f(x + h) − f(x − h)] / 2h`. Esse arquivo é projetado no seminário.
5. Código, comentários, interface e commits **em português**. Só o nome do repositório é em inglês.

## Repositório no GitHub

- Nome: **`derivative-car-game`** — público
- Descrição: `Jogo educativo de Cálculo I: um carrinho percorre o gráfico de uma função e a derivada define a velocidade.`

1. `gh auth status`. Se não estiver autenticado, peça ao usuário para rodar `gh auth login`.
2. `git init` e primeiro commit com `README.md`, `CLAUDE.md` e `docs/`.
3. `gh repo create derivative-car-game --public --source=. --remote=origin --push --description "..."`
4. No fim, ative o GitHub Pages (branch `main`, raiz) e coloque o link no `README.md`.
5. Um commit por etapa, mensagem em português.

## Como trabalhar

- Siga `docs/06-plano-de-implementacao.md` em ordem.
- Rode `node tests/calculo.test.js` ao terminar a Etapa 1 e sempre que mexer em `calculo.js`.
- Confira que as soluções de referência das fases (`docs/03-jogabilidade.md`) passam nos radares.
