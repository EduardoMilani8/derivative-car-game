// simulacao.js — estado do carro e um passo da simulação.

const C = 1;       // o carro avança 1 unidade em x por segundo
const DT = 1 / 60; // um passo por quadro
const VMAX = 100;  // acima disso a curva tem assíntota ou é íngreme demais

// Cria o estado do carro parado em x0. O carro vai até xFim.
function novoEstado(f, x0, xFim) {
  return {
    f: f,
    x0: x0,
    x: x0,
    xFim: xFim,
    t: 0,
    s: 0,
    v: velocidadeExata(f, x0),
    a: aceleracaoExata(f, x0),
    sAnterior: 0,
    vAnterior: null, // ainda não existe no primeiro passo
    historico: [],
    rodando: false,
    erro: ""
  };
}

// Um passo da simulação (chamado uma vez por quadro).
function passo(estado) {
  // 1. o carro avança no eixo x
  const xNovo = estado.x + C * DT;

  // 2. integral: soma o pedaço de comprimento de arco percorrido
  const sNovo = estado.s + trechoDeArco(estado.f, estado.x, xNovo);

  // 6 (antes de guardar). se a função não está definida (ou dá um salto), para
  if (!isFinite(sNovo) || !isFinite(estado.f(xNovo)) || (sNovo - estado.s) / DT > VMAX) {
    estado.rodando = false;
    estado.erro = "A função não está definida em x = " + numero(xNovo);
    return;
  }

  estado.sAnterior = estado.s;
  estado.vAnterior = estado.historico.length > 0 ? estado.v : null;

  // 3. v = s'(t) ≈ Δs / Δt
  const vNovo = derivadaNoTempo(sNovo, estado.sAnterior, DT);

  // 4. a = v'(t) ≈ Δv / Δt  (no primeiro passo ainda não há v anterior)
  let aNovo;
  if (estado.vAnterior === null) {
    aNovo = aceleracaoExata(estado.f, xNovo);
  } else {
    aNovo = derivadaNoTempo(vNovo, estado.vAnterior, DT);
  }

  // 5. atualiza o estado e guarda no histórico
  estado.t = estado.t + DT;
  estado.x = xNovo;
  estado.s = sNovo;
  estado.v = vNovo;
  estado.a = aNovo;
  estado.historico.push({ t: estado.t, s: estado.s, v: estado.v, a: estado.a });

  // 6. chegou ao fim do domínio: para
  if (estado.x >= estado.xFim - 1e-9) {
    estado.rodando = false;
  }
}
