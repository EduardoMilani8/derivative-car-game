// Testes da matemática. Rodar com: node tests/calculo.test.js

const c = require("../js/calculo.js");

let falhas = 0;

function confere(nome, obtido, esperado, tolerancia) {
  const ok = Math.abs(obtido - esperado) <= tolerancia;
  if (!ok) falhas++;
  console.log((ok ? "OK     " : "FALHOU ") + nome + ": obtido " + obtido.toFixed(6) + ", esperado " + esperado);
}

// Radar: acertou se |v − alvo| ≤ 5% do alvo
function confereRadar(nome, f, xRadar, alvo) {
  const v = c.velocidadeExata(f, xRadar);
  const ok = Math.abs(v - alvo) <= 0.05 * alvo;
  if (!ok) falhas++;
  console.log((ok ? "OK     " : "FALHOU ") + nome + ": v = " + v.toFixed(3) + " (alvo " + alvo + ")");
}

confere("derivada de x² em 3", c.derivada(x => x * x, 3), 6, 1e-6);
confere("segunda derivada de x³ em 2", c.segundaDerivada(x => x ** 3, 2), 12, 1e-3);

// Soma de 100 pedaços de 0 a 1, como o jogo faz passo a passo
let s = 0;
for (let i = 0; i < 100; i++) {
  s += c.trechoDeArco(x => x * x, i / 100, (i + 1) / 100);
}
confere("arco de x² de 0 a 1", s, 1.47894, 1e-4);

confere("arco de 0,75x de 0 a 4 (triângulo 3-4-5)", c.trechoDeArco(x => 0.75 * x, 0, 4), 5, 1e-6);
confere("velocidade de √3·x", c.velocidadeExata(x => Math.sqrt(3) * x, 7), 2, 1e-6);
confere("aceleração de x² em 1", c.aceleracaoExata(x => x * x, 1), 1.78885, 1e-4);
confere("derivada no tempo", c.derivadaNoTempo(5, 3, 0.5), 4, 1e-12);

// Soluções de referência das fases (docs/03-jogabilidade.md)
confereRadar("Fase 1, radar x=4", x => 1.73 * x + 0, 4, 2);
confereRadar("Fase 2, radar x=6", x => 0.5 * (x - 3.17) ** 2, 6, 3);
confereRadar("Fase 3, radar x=1,5", x => 1.52 * Math.sin(1.75 * x), 1.5, 2.5);
confereRadar("Fase 3, radar x=4,5", x => 1.52 * Math.sin(1.75 * x), 4.5, 1);

console.log(falhas === 0 ? "\nTodos os testes passaram." : "\n" + falhas + " teste(s) falharam.");
if (falhas > 0) process.exit(1);
