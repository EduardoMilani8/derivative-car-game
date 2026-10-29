// principal.js — modos, botões e o laço de animação.

let modo = "livre";
let estado = null;
let xMin = 0, xMax = 10;
let radares = [];

const telemetria = document.getElementById("telemetria");
const mensagem = document.getElementById("mensagem");

// Lê o texto digitado e devolve a função f(x) usando o math.js
function lerFuncaoDigitada() {
  const compilada = math.compile(document.getElementById("campoFuncao").value);
  return function (x) {
    try {
      const y = compilada.evaluate({ x: x });
      return typeof y === "number" ? y : NaN; // ex.: sqrt(-1) dá número complexo
    } catch (e) {
      return NaN;
    }
  };
}

// Prepara o carro parado no início, com a função atual
function preparar() {
  mensagem.textContent = "";
  let f, x0;
  try {
    f = lerFuncaoDigitada();
  } catch (e) {
    mensagem.textContent = "Função inválida: " + e.message;
    return false;
  }
  x0 = Number(document.getElementById("campoX0").value);
  if (!(x0 >= 0 && x0 < 10)) {
    mensagem.textContent = "A posição inicial precisa estar entre 0 e 10.";
    return false;
  }
  if (!isFinite(f(x0))) {
    mensagem.textContent = "A função não está definida em x = " + numero(x0);
    return false;
  }
  estado = novoEstado(f, x0, xMax);
  return true;
}

function largar() {
  if (preparar()) estado.rodando = true;
}

function reiniciar() {
  preparar();
}

// Laço de animação: um passo e um desenho por quadro
function quadro() {
  if (estado !== null) {
    if (estado.rodando) {
      passo(estado);
      if (estado.erro !== "") mensagem.textContent = estado.erro;
    }
    desenharGrafico(document.getElementById("grafico"), estado, xMin, xMax, radares);
    desenharTelemetria(telemetria, estado);
    const tTotal = (estado.xFim - estado.x0) / C; // tempo da largada até o fim
    desenharMiniGrafico(document.getElementById("graficoS"), "s(t)", estado.historico, "s", tTotal);
    desenharMiniGrafico(document.getElementById("graficoV"), "v(t)", estado.historico, "v", tTotal);
    desenharMiniGrafico(document.getElementById("graficoA"), "a(t)", estado.historico, "a", tTotal);
  }
  requestAnimationFrame(quadro);
}

document.getElementById("botaoLargar").onclick = largar;
document.getElementById("botaoReiniciar").onclick = reiniciar;
document.getElementById("funcoesProntas").onchange = function () {
  if (this.value !== "") {
    document.getElementById("campoFuncao").value = this.value;
    reiniciar();
  }
};

document.getElementById("instrucao").textContent =
  "Modo livre: digite uma função, escolha onde o carro começa e clique em Largar.";
document.getElementById("controlesFase").style.display = "none";
preparar();
quadro();
