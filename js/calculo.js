// calculo.js — toda a matemática do jogo.
// Cada função tem um comentário com a fórmula que ela calcula.

const H1 = 1e-4; // passo da derivada primeira
const H2 = 1e-3; // passo da derivada segunda

// f'(x) ≈ [f(x + h) − f(x − h)] / 2h
// (diferença central: a definição de limite com h pequeno)
function derivada(f, x) {
  return (f(x + H1) - f(x - H1)) / (2 * H1);
}

// f''(x) ≈ [f(x + h) − 2·f(x) + f(x − h)] / h²
function segundaDerivada(f, x) {
  return (f(x + H2) - 2 * f(x) + f(x - H2)) / (H2 * H2);
}

// g(u) = √(1 + f'(u)²)
// (comprimento de um pedacinho da curva por unidade de x: ds = √(1 + f'²) dx)
function integrandoArco(f, u) {
  const d = derivada(f, u);
  return Math.sqrt(1 + d * d);
}

// Regra de Simpson:
// ∫ de a até b de g(u) du ≈ (b − a)/6 · [g(a) + 4·g((a + b)/2) + g(b)]
function simpson(g, a, b) {
  const meio = (a + b) / 2;
  return (b - a) / 6 * (g(a) + 4 * g(meio) + g(b));
}

// Δs = ∫ de xa até xb de √(1 + f'(u)²) du
// (pedaço do comprimento de arco percorrido em um passo)
function trechoDeArco(f, xa, xb) {
  return simpson(function (u) { return integrandoArco(f, u); }, xa, xb);
}

// v = s'(t) = √(1 + f'(x)²)          (com c = 1)
// (Teorema Fundamental do Cálculo + regra da cadeia)
function velocidadeExata(f, x) {
  return integrandoArco(f, x);
}

// a = s''(t) = f'(x)·f''(x) / √(1 + f'(x)²)   (com c = 1)
function aceleracaoExata(f, x) {
  const d1 = derivada(f, x);
  const d2 = segundaDerivada(f, x);
  return d1 * d2 / Math.sqrt(1 + d1 * d1);
}

// derivada no tempo ≈ (valor atual − valor anterior) / Δt
// (usada para medir v = Δs/Δt e a = Δv/Δt na telemetria)
function derivadaNoTempo(atual, anterior, dt) {
  return (atual - anterior) / dt;
}

// Permite usar este arquivo nos testes com Node.
if (typeof module !== "undefined") {
  module.exports = {
    derivada, segundaDerivada, integrandoArco, simpson,
    trechoDeArco, velocidadeExata, aceleracaoExata, derivadaNoTempo
  };
}
