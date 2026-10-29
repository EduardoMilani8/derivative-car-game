# 04 — Interface

**Simples e apresentável, não bonito.** Sem animações extras, sem efeitos, sem imagens.
HTML padrão com um pouco de CSS para organizar o layout. Pensado para notebook/projetor.

## Layout

```
┌──────────────────────────────────────────────┬──────────────────┐
│ [Fase 1] [Fase 2] [Fase 3] [Modo livre]       │ TELEMETRIA       │
│ Instrução da fase                             │ t       = 3,250  │
├──────────────────────────────────────────────┤ x       = 3,250  │
│                                              │ f(x)    = 0,003  │
│        GRÁFICO PRINCIPAL (canvas)            │ f'(x)   = 0,080  │
│                                              │ ângulo  = 4,6°   │
│  eixos, curva, carro, reta tangente,         │ s(t)    = 5,412  │
│  radares com reta-guia                       │ v medida  = 1,003│
│                                              │ v fórmula = 1,003│
├──────────────────────────────────────────────┤ a medida  = 0,080│
│ Controles (sliders OU campo de função)        │ a fórmula = 0,080│
│ [Largar] [Reiniciar]                          ├──────────────────┤
│ Resultado dos radares (texto)                 │ gráfico s(t)     │
│                                              │ gráfico v(t)     │
│                                              │ gráfico a(t)     │
└──────────────────────────────────────────────┴──────────────────┘
```

## Gráfico principal (canvas)

- Eixos x e y com alguns números. Grade opcional.
- Curva `f(x)` desenhada ligando ~300 pontos.
- Escala automática: x cobre o domínio; y cobre o mínimo e o máximo de `f` no domínio, com margem.
- **Carro**: um retângulo pequeno colorido, centrado no ponto `(x, f(x))` e girado para
  acompanhar a curva. Para girar certo mesmo com escalas diferentes nos eixos, calcule o ângulo
  de desenho a partir de dois pontos da tangente já convertidos para a tela.
- **Reta tangente**: um segmento passando pelo carro.
- **Radar**: uma linha vertical em `x_r` com o texto `alvo: 2,00`, e a reta-guia tracejada.

## Telemetria (exigência do professor)

Uma lista de texto, atualizada a cada quadro, com 3 casas decimais:

`t`, `x`, `f(x)`, `f′(x)`, `ângulo (graus)`, `s(t)`, `v medida`, `v fórmula`, `a medida`, `a fórmula`.

"Medida" e "fórmula" ficam lado a lado de propósito: na apresentação mostramos que batem.

## Três gráficos pequenos (s, v, a × tempo)

- Três canvas pequenos empilhados, cada um com título, linha do zero e a curva desenhada até o
  instante atual. Escala vertical automática.
- Sem legendas elaboradas, sem interação.

## Estilo

- Fundo branco, curva azul, carro vermelho, tangente verde, radar cinza.
- Fonte de pelo menos 16 px (vai para o projetor).
- Um único arquivo CSS curto.
