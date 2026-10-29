# 03 — Jogabilidade

**Princípio: o mais simples possível.** Só o necessário para jogar, demonstrar e explicar.

## Uma única tela

No topo, um seletor de modo: **Fase 1 | Fase 2 | Fase 3 | Modo livre**.
Todas as fases ficam liberadas desde o início (sem progresso salvo, sem tela inicial, sem tela final).

## Modo Fases

### Regras

1. Cada fase tem uma função com parâmetros ajustados por **sliders**. O gráfico se atualiza ao mexer.
2. O carro começa em `x₀ = 0` e vai até o fim do domínio da fase.
3. Há um ou mais **radares**, cada um num ponto `x_r` com uma **velocidade-alvo** `v_alvo`.
4. O jogador ajusta os sliders e clica em **Largar**.
5. Quando o carro passa por um radar, o jogo registra a velocidade naquele ponto
   (`v = √(1 + f′(x_r)²)`) e escreve o resultado na tela, por exemplo:
   `Radar x=4: v = 2,03 (alvo 2,00) ✅`
6. **Acertou** se a diferença for de no máximo **5%** do alvo. Ao final: _"Fase concluída!"_ se
   todos os radares acertaram, senão _"Tente de novo"_.

### Reta-guia

Em cada radar, desenhar uma **reta tracejada** com a inclinação certa
(`inclinação-alvo = √(v_alvo² − 1)`) passando por `(x_r, f(x_r))`.
O jogador acerta quando a reta tangente da curva naquele ponto fica paralela a ela
(subindo ou descendo, tanto faz). Sempre visível, sem botão.

### As três fases

Os valores de referência foram conferidos numericamente; servem para testar que a fase tem
solução. Não mostrar no jogo.

| Fase | Função | Sliders | Domínio | Radares | Solução de referência |
|---|---|---|---|---|---|
| 1 — Reta | `f(x) = a·x + b` | `a ∈ [−3, 3]`, `b ∈ [−5, 5]` | `[0, 8]` | `x=4`, alvo `2,00` | `a = 1,73` → `v ≈ 1,998` |
| 2 — Parábola | `f(x) = a·(x − h)²` | `a ∈ [−2, 2]`, `h ∈ [0, 10]` | `[0, 10]` | `x=6`, alvo `3,00` | `a = 0,50`, `h = 3,17` → `v ≈ 3,001` |
| 3 — Seno | `f(x) = a·sen(b·x)` | `a ∈ [0, 3]`, `b ∈ [0,2; 3]` | `[0, 6]` | `x=1,5` alvo `2,50`; `x=4,5` alvo `1,00` | `a = 1,52`, `b = 1,75` → `2,52` e `1,002` |

Todos os sliders com passo `0,01`. Valores iniciais: Fase 1 `a=0, b=0`; Fase 2 `a=0,2, h=5`;
Fase 3 `a=1, b=1`.

Uma frase de instrução por fase:
- Fase 1: _"Que inclinação faz o carro passar no radar a 2?"_
- Fase 2: _"A inclinação muda ao longo da curva. Faça o carro passar no radar a 3."_
- Fase 3: _"Um radar pede velocidade alta; o outro, a mínima (curva plana: f′ = 0)."_

## Modo Livre

1. Campo de texto para `f(x)` (sintaxe do math.js: `x^2/10`, `sin(x)`, `exp(-(x-5)^2)`).
2. Select **Funções prontas** (ao escolher, preenche o campo):

| Rótulo | Expressão |
|---|---|
| Reta | `0.5*x` |
| Parábola | `x^2/10` |
| Parábola invertida | `-x^2/10` |
| Onda | `sin(x)` |
| Morro | `3*exp(-(x-5)^2/2)` |

3. Campo numérico **Posição inicial do carro** (`x₀`, padrão `0`). Domínio fixo `[0, 10]`.
4. Botões **Largar** e **Reiniciar**.
5. Se a função for inválida ou não definida em algum ponto, mostrar uma mensagem de texto e parar.

## Sempre presente (fases e modo livre)

- Carro alinhado com a reta tangente, e a reta tangente desenhada no ponto do carro.
- Painel de telemetria e os três gráficos `s(t)`, `v(t)`, `a(t)` (ver `04-interface.md`).
