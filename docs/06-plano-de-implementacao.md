# 06 — Plano de implementação

Siga em ordem. Um commit ao final de cada etapa. **Nada além do que está aqui.**

## Etapa 0 — Repositório
- [ ] `gh auth status` (se falhar, pedir ao usuário `gh auth login`)
- [ ] `git init`, commit inicial com `README.md`, `CLAUDE.md` e `docs/`
- [ ] Criar o repositório público `derivative-car-game` e fazer o push

## Etapa 1 — Matemática
- [ ] `js/calculo.js` conforme `05-arquitetura.md`
- [ ] `tests/calculo.test.js`

**Pronto quando:** `node tests/calculo.test.js` passa.

## Etapa 2 — Modo livre
- [ ] `vendor/math.min.js`
- [ ] `index.html`, `estilo.css`, `js/simulacao.js`, `js/desenho.js`, `js/principal.js`
- [ ] Campo de função, funções prontas, posição inicial, Largar/Reiniciar
- [ ] Carro, reta tangente, telemetria e os 3 gráficos

**Pronto quando:** com `x^2/10` o carro anda, `v medida ≈ v fórmula`, e uma função inválida
mostra mensagem em vez de travar.

## Etapa 3 — Fases
- [ ] As 3 fases com sliders, radares, reta-guia e resultado em texto

**Pronto quando:** as soluções de referência passam nos radares.

## Etapa 4 — Fechamento
- [ ] Conferir que abre offline com duplo clique no `index.html`
- [ ] Ativar o GitHub Pages e pôr o link no `README.md`
- [ ] Revisar `js/calculo.js` para a projeção: comentários claros, sem código sobrando

## Cronograma (entrega 25/11/2026)

| Até | O quê |
|---|---|
| 05/11 | Etapas 0 e 1 |
| 08/11 | Etapa 2 |
| 12/11 | Etapas 3 e 4 |
| 13/11 – 23/11 | Slides e ensaio |
| **25/11** | Envio no Moodle (arquivos + link da apresentação) |
| _a confirmar_ | Seminário |
