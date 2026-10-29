# 05 — Arquitetura

**Poucos arquivos, código direto, fácil de explicar.**

## Stack

- HTML + CSS + JavaScript puro. Sem framework, sem build, sem npm.
- `<canvas>` para o gráfico e os três gráficos pequenos.
- **math.js** só para ler a função digitada, salvo em `vendor/math.min.js` (funciona offline).
- Scripts comuns (`<script src="...">`, sem `type="module"`), para abrir o `index.html` com
  duplo clique, sem servidor. Os arquivos compartilham funções como variáveis globais simples.

## Estrutura

```
derivative-car-game/
├── index.html
├── estilo.css
├── js/
│   ├── calculo.js      ★ toda a matemática (é o arquivo mostrado no seminário)
│   ├── simulacao.js    estado do carro e a função passo()
│   ├── desenho.js      desenha o gráfico principal, a telemetria e os 3 gráficos
│   └── principal.js    fases, botões, sliders e o laço de animação
├── vendor/
│   └── math.min.js
├── tests/
│   └── calculo.test.js
└── docs/
```

## `js/calculo.js`

Funções puras, cada uma com um comentário mostrando a fórmula:

```js
const H1 = 1e-4;  // passo da derivada primeira
const H2 = 1e-3;  // passo da derivada segunda

function derivada(f, x)               // [f(x+h) − f(x−h)] / 2h
function segundaDerivada(f, x)        // [f(x+h) − 2f(x) + f(x−h)] / h²
function integrandoArco(f, u)         // √(1 + f′(u)²)
function simpson(g, a, b)             // (b − a)/6 · [g(a) + 4g((a+b)/2) + g(b)]
function trechoDeArco(f, xa, xb)      // ∫ de xa a xb de √(1 + f′²), usando simpson
function velocidadeExata(f, x)        // √(1 + f′(x)²)            (com c = 1)
function aceleracaoExata(f, x)        // f′(x)·f″(x) / √(1 + f′²)  (com c = 1)
function derivadaNoTempo(atual, anterior, dt)   // (atual − anterior) / dt
```

No final: `if (typeof module !== "undefined") module.exports = { ... };` para os testes no Node.

## `js/simulacao.js`

```js
const C = 1;        // o carro avança 1 unidade em x por segundo
const DT = 1 / 60;  // um passo por quadro

estado = { f, x, t, s, v, a, sAnterior, vAnterior, historico, rodando }
```

`passo(estado)`, um passo por quadro, em ordem (é o trecho explicado no seminário):

1. `xNovo = x + C·DT`
2. `s = s + trechoDeArco(f, x, xNovo)`             ← integral
3. `v = derivadaNoTempo(s, sAnterior, DT)`         ← v = s′(t)
4. `a = derivadaNoTempo(v, vAnterior, DT)`         ← a = v′(t)
5. atualiza `t` e `x`, guarda `{t, s, v, a}` no histórico
6. se `f(x)` não for número finito ou o carro passou do fim, para

No primeiro passo `vAnterior` não existe: use `a = aceleracaoExata(f, x)` só nesse passo.

## Radares (em `principal.js`)

- Radar cruzado quando `xAnterior < x_r ≤ x`.
- Valor registrado: `velocidadeExata(f, x_r)`.
- Acertou se `|v − alvo| ≤ 0,05·alvo`.

## Testes (`node tests/calculo.test.js`)

Sem biblioteca: compara e imprime OK/FALHOU.

| Teste | Esperado |
|---|---|
| `derivada(x => x*x, 3)` | ≈ 6 |
| `segundaDerivada(x => x**3, 2)` | ≈ 12 |
| soma de `trechoDeArco` para `x*x` de 0 a 1 em 100 pedaços | ≈ 1,47894 |
| `trechoDeArco(x => 0.75*x, 0, 4)` | = 5 (triângulo 3-4-5) |
| `velocidadeExata(x => Math.sqrt(3)*x, 7)` | ≈ 2 |
| `aceleracaoExata(x => x*x, 1)` | ≈ 1,78885 |
| soluções de referência das 3 fases (doc 03) | dentro dos 5% |
