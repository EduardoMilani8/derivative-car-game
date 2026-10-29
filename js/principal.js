// principal.js — fases, botões, sliders e o laço de animação.

// As três fases (docs/03-jogabilidade.md). Cada fase tem dois parâmetros, a e b.
const FASES = [
  {
    instrucao: "Fase 1 — f(x) = a·x + b. Que inclinação faz o carro passar no radar a 2?",
    sliders: [{ nome: "a", min: -3, max: 3, inicial: 0 }, { nome: "b", min: -5, max: 5, inicial: 0 }],
    funcao: function (a, b) { return function (x) { return a * x + b; }; },
    xFim: 8,
    radares: [{ x: 4, alvo: 2 }]
  },
  {
    instrucao: "Fase 2 — f(x) = a·(x − h)². A inclinação muda ao longo da curva. Faça o carro passar no radar a 3.",
    sliders: [{ nome: "a", min: -2, max: 2, inicial: 0.2 }, { nome: "h", min: 0, max: 10, inicial: 5 }],
    funcao: function (a, h) { return function (x) { return a * (x - h) * (x - h); }; },
    xFim: 10,
    radares: [{ x: 6, alvo: 3 }]
  },
  {
    instrucao: "Fase 3 — f(x) = a·sen(b·x). Um radar pede velocidade alta; o outro, a mínima (curva plana: f′ = 0).",
    sliders: [{ nome: "a", min: 0, max: 3, inicial: 1 }, { nome: "b", min: 0.2, max: 3, inicial: 1 }],
    funcao: function (a, b) { return function (x) { return a * Math.sin(b * x); }; },
    xFim: 6,
    radares: [{ x: 1.5, alvo: 2.5 }, { x: 4.5, alvo: 1 }]
  }
];

let modo = "livre"; // "livre" ou o número da fase (0, 1, 2)
let valores = [0, 0]; // valores atuais dos dois sliders da fase
let estado = null;
let xMin = 0, xMax = 10;
let radares = [];
let resultados = []; // linhas de texto com o resultado de cada radar

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
  resultados = [];
  radares.forEach(function (r) { r.acertou = false; });
  let f, x0;
  if (modo === "livre") {
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
  } else {
    f = FASES[modo].funcao(valores[0], valores[1]);
    x0 = 0;
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

// Cria os dois sliders da fase
function criarSliders(fase) {
  const div = document.getElementById("controlesFase");
  div.innerHTML = "";
  fase.sliders.forEach(function (s, i) {
    valores[i] = s.inicial;
    const label = document.createElement("label");
    const texto = document.createElement("span");
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = s.min;
    slider.max = s.max;
    slider.step = 0.01;
    slider.value = s.inicial;
    texto.textContent = s.nome + " = " + numero(s.inicial, 2) + " ";
    slider.oninput = function () {
      valores[i] = Number(slider.value);
      texto.textContent = s.nome + " = " + numero(valores[i], 2) + " ";
      preparar(); // o gráfico se atualiza ao mexer
    };
    label.appendChild(texto);
    label.appendChild(slider);
    div.appendChild(label);
  });
}

// Troca entre Fase 1, 2, 3 e Modo livre
function escolherModo(m) {
  modo = m;
  document.querySelectorAll("#modos button").forEach(function (b) {
    b.className = (b.dataset.modo === String(m)) ? "ativo" : "";
  });
  const livre = (m === "livre");
  document.getElementById("controlesLivre").style.display = livre ? "" : "none";
  document.getElementById("controlesFase").style.display = livre ? "none" : "";
  if (livre) {
    xMax = 10;
    radares = [];
    document.getElementById("instrucao").textContent =
      "Modo livre: digite uma função, escolha onde o carro começa e clique em Largar.";
  } else {
    const fase = FASES[m];
    xMax = fase.xFim;
    radares = fase.radares;
    document.getElementById("instrucao").textContent = fase.instrucao;
    criarSliders(fase);
  }
  preparar();
}

// Radar cruzado quando xAnterior < x_r ≤ x. Registra v = √(1 + f′(x_r)²).
function conferirRadares(xAnterior) {
  for (const r of radares) {
    if (xAnterior < r.x && r.x <= estado.x) {
      const v = velocidadeExata(estado.f, r.x);
      r.acertou = Math.abs(v - r.alvo) <= 0.05 * r.alvo; // margem de 5%
      resultados.push("Radar x=" + numero(r.x, 1) + ": v = " + numero(v, 2) +
        " (alvo " + numero(r.alvo, 2) + ") " + (r.acertou ? "✅" : "❌"));
    }
  }
}

// Laço de animação: um passo e um desenho por quadro
function quadro() {
  if (estado !== null) {
    if (estado.rodando) {
      const xAnterior = estado.x;
      passo(estado);
      if (modo !== "livre") {
        conferirRadares(xAnterior);
        if (!estado.rodando && estado.erro === "") {
          const todos = radares.every(function (r) { return r.acertou; });
          resultados.push(todos ? "Fase concluída!" : "Tente de novo");
        }
      }
      mensagem.textContent = resultados.join("\n") + (estado.erro !== "" ? "\n" + estado.erro : "");
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

document.querySelectorAll("#modos button").forEach(function (b) {
  b.onclick = function () {
    escolherModo(b.dataset.modo === "livre" ? "livre" : Number(b.dataset.modo));
  };
});
document.getElementById("botaoLargar").onclick = largar;
document.getElementById("botaoReiniciar").onclick = reiniciar;
document.getElementById("funcoesProntas").onchange = function () {
  if (this.value !== "") {
    document.getElementById("campoFuncao").value = this.value;
    reiniciar();
  }
};

escolherModo(0);
quadro();
