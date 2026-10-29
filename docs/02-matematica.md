# 02 — Fundamentação matemática

Este documento é a base do código (`js/calculo.js`) e dos slides da etapa
"Fundamentação Matemática" do seminário.

## 1. O modelo de movimento

- O terreno é o gráfico de uma função `y = f(x)`, escolhida pelo jogador.
- O carro começa em `x₀` e avança no **eixo x** em ritmo constante `c`:

  ```
  x(t) = x₀ + c·t
  ```

- Constante do projeto: **`c = 1` unidade por segundo** (constante `C` em `js/simulacao.js`).
  Com `c = 1`, todas as fórmulas ficam mais limpas, e é assim que serão apresentadas.

O que muda é a **distância percorrida sobre a curva**: num trecho plano o carro anda 1 unidade
de caminho por segundo; num trecho inclinado ele percorre **mais** caminho no mesmo segundo,
então anda **mais rápido**.

## 2. Derivada da função: inclinação e reta tangente

A derivada `f′(x)` é a **inclinação da reta tangente** ao gráfico no ponto `x`.

Como o jogador pode digitar qualquer função, o programa calcula a derivada **numericamente**,
direto da definição de limite (diferença central, com `h` pequeno):

```
f′(x) ≈ [f(x + h) − f(x − h)] / (2h)          h = 1·10⁻⁴
```

A segunda derivada (usada na aceleração exata):

```
f″(x) ≈ [f(x + h) − 2·f(x) + f(x − h)] / h²    h = 1·10⁻³
```

Usos no jogo:

- **Ângulo do carro:** `θ = arctan(f′(x))` — o carro fica alinhado com a tangente.
- **Reta tangente desenhada:** `y = f(a) + f′(a)·(x − a)`, com `a` = posição atual do carro.

## 3. A integral: comprimento de arco (a distância percorrida)

Um pedacinho da curva com largura `dx` tem comprimento (Pitágoras):

```
ds = √(dx² + dy²) = √(1 + f′(x)²) · dx
```

Somando todos os pedacinhos de `x₀` até onde o carro está, temos a **função integral** da
distância percorrida sobre a curva:

```
          x(t)
s(t) =  ∫      √(1 + f′(u)²) du
          x₀
```

### Cálculo numérico da integral

A integral é calculada de forma **incremental**: a cada passo da simulação, soma-se o pedaço
entre a posição anterior `xₐ` e a nova `x_b` usando a **regra de Simpson**:

```
∫ g(u) du  ≈  (x_b − xₐ)/6 · [ g(xₐ) + 4·g((xₐ + x_b)/2) + g(x_b) ]
```

com `g(u) = √(1 + f′(u)²)`.

Slide sugerido: mostrar que a regra do trapézio também funciona, mas Simpson é mais precisa
com o mesmo número de pontos.

## 4. Derivando a integral: velocidade e aceleração

Pelo **Teorema Fundamental do Cálculo** + **regra da cadeia**:

```
v(t) = s′(t) = √(1 + f′(x(t))²) · x′(t) = c · √(1 + f′(x)²)
```

Com `c = 1`:

```
v = √(1 + f′(x)²)
```

**A velocidade depende só da inclinação no ponto onde o carro está.**

Derivando de novo (regra da cadeia mais uma vez):

```
a(t) = s″(t) = v′(t) = c² · f′(x) · f″(x) / √(1 + f′(x)²)
```

### Consequências que o jogador percebe

| Situação | `f′(x)` | Velocidade |
|---|---|---|
| Trecho plano (topo, vale ou reta horizontal) | 0 | mínima: `v = c = 1` |
| Inclinação de 45° | ±1 | `√2 ≈ 1,41` |
| Inclinação de 60° | ±√3 | `2` |
| Muito íngreme | grande | grande |

- Subida e descida com a mesma inclinação dão a **mesma velocidade** (`f′` aparece ao quadrado).
- Uma **reta** dá velocidade **constante** e aceleração **zero**.
- A aceleração é zero nos topos/vales (`f′ = 0`) e nos pontos de inflexão (`f″ = 0`).

## 5. As derivadas "medidas" na telemetria

Além das fórmulas exatas, o jogo **mede** velocidade e aceleração direto da posição,
exatamente como a definição de derivada no tempo:

```
v_medida(t) ≈ [s(t) − s(t − Δt)] / Δt
a_medida(t) ≈ [v_medida(t) − v_medida(t − Δt)] / Δt          Δt = 1/60 s
```

A telemetria mostra **as duas versões lado a lado** (medida × fórmula exata).
Elas coincidem, o que **comprova** que `v = s′(t)` e `a = v′(t)`.

## 6. Exemplos resolvidos (para slides e testes)

### Exemplo A — reta `f(x) = √3·x`

`f′(x) = √3` ⇒ `v = √(1 + 3) = 2` (constante), `a = 0`.
É exatamente a solução da Fase 1.

### Exemplo B — parábola `f(x) = x²`, `x₀ = 0`

`f′(x) = 2x`, e com `c = 1`, `x = t`:

```
s(t) = ∫₀ᵗ √(1 + 4u²) du
v(t) = √(1 + 4t²)
a(t) = 4t / √(1 + 4t²)
```

| t | v(t) | a(t) |
|---|---|---|
| 0 | 1,000 | 0,000 |
| 0,5 | 1,414 | 1,414 |
| 1 | 2,236 | 1,789 |
| 2 | 4,123 | 1,940 |

Valor de referência da integral: `s(1) = ∫₀¹ √(1 + 4u²) du ≈ 1,4789`.

### Exemplo C — seno `f(x) = sen(x)`

`f′(x) = cos(x)` ⇒ `v = √(1 + cos²x)`: oscila entre `1` (em `x = π/2`, topo) e `√2` (em `x = 0`).
A aceleração troca de sinal: o carro "acelera" e "freia" sem ninguém pisar em nada.

## 7. Cuidados numéricos

- Se `f(x)` não for um número finito (ex.: `1/x` em `x = 0`, `log(x)` com `x ≤ 0`), a simulação
  para e mostra: _"A função não está definida em x = …"_.
- Como `x` avança de `1/60` em `1/60`, o carro quase nunca cai exatamente numa assíntota
  (ex.: `1/(x − 5)`): ele só veria valores gigantes. Por isso a simulação também para se a
  velocidade medida passar de `100` (constante `VMAX` em `js/simulacao.js`).
- A simulação dá um passo de `Δt = 1/60 s` por quadro da tela.
