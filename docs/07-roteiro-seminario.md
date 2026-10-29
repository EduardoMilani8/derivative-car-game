# 07 — Roteiro do seminário (data a confirmar)

**15 minutos de apresentação + 5 minutos de arguição do professor.**
Divida as falas entre os integrantes. Ensaie com cronômetro.

## 1. Visão geral e jogabilidade (~3 min)

- Slide de título: "Radar da Derivada" + nomes do grupo.
- A ideia em uma frase: _"O jogador não dirige o carro: ele desenha o terreno com uma função,
  e a derivada decide a velocidade."_
- Objetivo do jogador: passar pelos radares na velocidade certa, acertando a **inclinação da
  reta tangente**.
- Os dois modos: Fases (3 fases com radares) e Modo livre (como o GeoGebra).

## 2. Demonstração prática (~4 min)

Roteiro sugerido (testar antes no notebook que será usado, **offline**):

1. **Fase 1**: alinhar a tangente com a reta-guia do radar, largar e passar no radar.
   Apontar na telemetria: `f′ = 1,73`, `v = 2,00` constante, `a = 0`.
2. **Fase 3**: mostrar o radar de velocidade mínima, onde a curva fica plana (`f′ = 0`).
3. **Modo livre** com `x^2/10`: apontar os mini-gráficos. A velocidade cresce, e
   **`v medida` e `v fórmula` mostram o mesmo número**.
4. Modo livre com `sin(x)`: a aceleração troca de sinal sozinha.

## 3. Fundamentação matemática (~5 min)

Slides, na ordem (o conteúdo está em `02-matematica.md`):

1. **O modelo:** `x(t) = x₀ + c·t`; o terreno é `y = f(x)`.
2. **Derivada como inclinação:** `f′(x)` e a reta tangente `y = f(a) + f′(a)(x − a)`;
   cálculo numérico pela definição de limite.
3. **Comprimento de arco:** `ds = √(1 + f′²) dx` (Pitágoras num pedacinho da curva) e a
   integral `s(t)`; regra de Simpson.
4. **Derivando a integral (TFC + regra da cadeia):** `v = s′(t) = c·√(1 + f′(x)²)` e
   `a = s″(t) = c²·f′·f″ / √(1 + f′²)`.
5. **Exemplo resolvido:** `f(x) = x²` → `v(t) = √(1 + 4t²)`; tabela de valores.
6. **Por que o radar funciona:** para `v_alvo = 2`, `√(1 + f′²) = 2` ⇒ `f′ = ±√3` (60°).

## 4. Inspeção do código (~3 min)

Com o VS Code aberto e fonte ampliada (Ctrl + `+`):

1. `js/calculo.js` → `derivada()`: a definição de limite em código.
2. `js/calculo.js` → `simpson()` e `trechoDeArco()`: a integral.
3. `js/calculo.js` → `velocidadeExata()` e `aceleracaoExata()`: as fórmulas.
4. `js/simulacao.js` → `passo()`: os 6 passos do laço (integral → `Δs/Δt` → `Δv/Δt`).

## Perguntas prováveis do professor (prepare as respostas)

| Pergunta | Resposta curta |
|---|---|
| Por que a derivada numérica e não a simbólica? | O usuário digita qualquer função; a diferença central é a própria definição de limite com `h` pequeno, e o erro é da ordem de `h²`. |
| Que `h` vocês usaram e por quê? | `10⁻⁴` para f′. Menor que isso, o erro de arredondamento do computador começa a crescer. |
| Por que a velocidade nunca é menor que 1? | Porque `√(1 + f′²) ≥ 1`: mesmo no plano o carro anda `c = 1` unidade por segundo. |
| Subir e descer dão a mesma velocidade? | Sim, `f′` aparece ao quadrado. É um modelo geométrico, sem gravidade. |
| Onde a aceleração é zero? | Onde `f′ = 0` (topos e vales) ou `f″ = 0` (pontos de inflexão). |
| Como sabem que o cálculo está certo? | A telemetria mostra a velocidade medida (`Δs/Δt`) e a da fórmula lado a lado, e elas coincidem; também há testes automatizados com valores calculados à mão. |
| Usaram motor de física? | Não. Só o math.js para ler o texto da função; todo o movimento está em `calculo.js`. |

## Checklist do dia

- [ ] Jogo aberto offline no notebook da apresentação (e cópia num pendrive)
- [ ] VS Code aberto em `js/calculo.js` com fonte grande
- [ ] Slides com o link do repositório no último slide
- [ ] Link da apresentação e arquivos enviados no Moodle até 25/11
