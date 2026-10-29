// desenho.js — desenha o gráfico principal, a telemetria e os 3 gráficos pequenos.

// Número com 3 casas e vírgula: 1.4142 → "1,414"
function numero(v, casas) {
  if (casas === undefined) casas = 3;
  return v.toFixed(casas).replace(".", ",");
}

// Gráfico principal: eixos, curva, radares, reta tangente e carro.
function desenharGrafico(canvas, estado, xMin, xMax, radares) {
  const ctx = canvas.getContext("2d");
  const L = canvas.width, A = canvas.height, M = 40; // largura, altura, margem
  const f = estado.f;
  ctx.clearRect(0, 0, L, A);

  // Escala automática em y: mínimo e máximo de f no domínio, com margem
  let yMin = Infinity, yMax = -Infinity;
  for (let i = 0; i <= 300; i++) {
    const y = f(xMin + (xMax - xMin) * i / 300);
    if (isFinite(y)) {
      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    }
  }
  if (!isFinite(yMin)) { yMin = -1; yMax = 1; }
  if (yMax - yMin < 2) { const meio = (yMin + yMax) / 2; yMin = meio - 1; yMax = meio + 1; }
  const folga = (yMax - yMin) * 0.1;
  yMin -= folga;
  yMax += folga;

  // Conversão de coordenadas do gráfico para a tela
  function tx(x) { return M + (x - xMin) / (xMax - xMin) * (L - 2 * M); }
  function ty(y) { return A - M - (y - yMin) / (yMax - yMin) * (A - 2 * M); }

  // Eixos e números
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.lineWidth = 1;
  ctx.font = "14px sans-serif";
  const yEixo = (yMin < 0 && yMax > 0) ? ty(0) : A - M;
  ctx.beginPath();
  ctx.moveTo(M, yEixo); ctx.lineTo(L - M, yEixo); // eixo x
  ctx.moveTo(tx(xMin), M); ctx.lineTo(tx(xMin), A - M); // eixo y
  ctx.stroke();
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    ctx.fillText(x, tx(x) - 4, yEixo + 16);
  }
  for (let i = 0; i <= 4; i++) {
    const y = yMin + (yMax - yMin) * i / 4;
    ctx.fillText(numero(y, 1), 2, ty(y) + 4);
  }

  // Curva f(x) ligando 300 pontos
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.beginPath();
  let continuar = false;
  for (let i = 0; i <= 300; i++) {
    const x = xMin + (xMax - xMin) * i / 300;
    const y = f(x);
    if (!isFinite(y)) { continuar = false; continue; }
    if (continuar) ctx.lineTo(tx(x), ty(y));
    else ctx.moveTo(tx(x), ty(y));
    continuar = true;
  }
  ctx.stroke();

  // Radares: linha vertical, texto do alvo e reta-guia tracejada
  for (const r of radares) {
    ctx.strokeStyle = "gray";
    ctx.fillStyle = "gray";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tx(r.x), M); ctx.lineTo(tx(r.x), A - M);
    ctx.stroke();
    ctx.fillText("alvo: " + numero(r.alvo, 2), tx(r.x) + 4, M - 8);

    // inclinação-alvo = √(v_alvo² − 1), com o mesmo sinal da curva no radar
    const yr = f(r.x);
    if (isFinite(yr)) {
      const sinal = derivada(f, r.x) < 0 ? -1 : 1;
      const m = sinal * Math.sqrt(r.alvo * r.alvo - 1);
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(tx(r.x - 1), ty(yr - m));
      ctx.lineTo(tx(r.x + 1), ty(yr + m));
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // Reta tangente e carro, no ponto (x, f(x)) do carro
  const x = estado.x, y = f(x);
  if (!isFinite(y)) return;
  const d = derivada(f, x);
  // Dois pontos da tangente y = f(a) + f'(a)(x − a), já convertidos para a tela
  const x1 = tx(x - 0.1), y1 = ty(y - 0.1 * d);
  const x2 = tx(x + 0.1), y2 = ty(y + 0.1 * d);
  const angulo = Math.atan2(y2 - y1, x2 - x1);

  ctx.save();
  ctx.translate(tx(x), ty(y));
  ctx.rotate(angulo);
  ctx.strokeStyle = "green";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-80, 0); ctx.lineTo(80, 0); // tangente
  ctx.stroke();
  ctx.fillStyle = "red";
  ctx.fillRect(-15, -7, 30, 14); // carro
  ctx.restore();
}

// Texto da telemetria (3 casas decimais)
function desenharTelemetria(elemento, estado) {
  const f = estado.f, x = estado.x;
  const d = derivada(f, x);
  // A medida Δs/Δt corresponde ao meio do último passo, e Δv/Δt a um passo atrás.
  // A fórmula é calculada nesses mesmos pontos, para comparar o mesmo instante.
  const n = estado.historico.length;
  const xV = n > 0 ? x - C * DT / 2 : x;
  const xA = n > 1 ? x - C * DT : x;
  elemento.textContent =
    "t         = " + numero(estado.t) + "\n" +
    "x         = " + numero(x) + "\n" +
    "f(x)      = " + numero(f(x)) + "\n" +
    "f'(x)     = " + numero(d) + "\n" +
    "ângulo    = " + numero(Math.atan(d) * 180 / Math.PI, 1) + "°\n" +
    "s(t)      = " + numero(estado.s) + "\n" +
    "v medida  = " + numero(estado.v) + "\n" +
    "v fórmula = " + numero(velocidadeExata(f, xV)) + "\n" +
    "a medida  = " + numero(estado.a) + "\n" +
    "a fórmula = " + numero(aceleracaoExata(f, xA));
}

// Gráfico pequeno de uma grandeza (s, v ou a) em função do tempo
function desenharMiniGrafico(canvas, titulo, historico, campo, tMax) {
  const ctx = canvas.getContext("2d");
  const L = canvas.width, A = canvas.height, M = 20;
  ctx.clearRect(0, 0, L, A);
  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(titulo, 5, 16);

  // Escala vertical automática (sempre incluindo o zero)
  let min = 0, max = 0;
  for (const p of historico) {
    min = Math.min(min, p[campo]);
    max = Math.max(max, p[campo]);
  }
  if (max - min < 1e-6) { max = min + 1; }

  function tx(t) { return M + t / tMax * (L - 2 * M); }
  function ty(v) { return A - M - (v - min) / (max - min) * (A - 2 * M - 10); }

  // Linha do zero
  ctx.strokeStyle = "gray";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(M, ty(0)); ctx.lineTo(L - M, ty(0));
  ctx.stroke();

  // Curva até o instante atual
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.beginPath();
  historico.forEach(function (p, i) {
    if (i === 0) ctx.moveTo(tx(p.t), ty(p[campo]));
    else ctx.lineTo(tx(p.t), ty(p[campo]));
  });
  ctx.stroke();
}
