# CLAUDE.md

Site institucional da psicóloga **Dienifer Doebber (CRP 06/184387)**, voltado à psicoterapia psicanalítica, com contato só pelo WhatsApp. Publicado no GitHub Pages em https://tha-github.github.io/dieniferdoebber/.

> **Regra principal: sempre consultar `prompt.md` antes de alterar conteúdo ou design.** Ele é a fonte de verdade de conteúdo, tom e regras do CFP. **Exceção: o design.** O visual v2 (outubro de 2026, pedido da cliente) substitui a seção 3 do `prompt.md` (paleta, tipografia, numeração editorial, sem ícones). Para o design, vale a seção "Design" abaixo. O visual anterior está na tag `pre-visual-v2`.

## Stack

- **HTML, CSS e JavaScript puros.** Sem framework, sem build, sem `npm`. A versão anterior, em Astro, está no histórico do git (tag `astro-v1`).
- Páginas: `index.html`, `politica-de-privacidade.html` e `404.html`. Estilos: `css/style.css` (único) e `css/noscript.css`. Script: `js/main.js` (único, `defer`, sem módulos, para funcionar também em `file://`).
- Fontes auto-hospedadas em `fonts/` (Quicksand 500 nos títulos; Mulish 400/700 no corpo e nos negritos; subset latin, `font-display: swap`) com fallbacks de métrica ajustada (`Quicksand Fallback`, `Mulish Fallback`) para não haver layout shift. Proibido usar o CDN do Google Fonts.

## Convenções

- **Composição:** títulos de seção, introduções e chamadas centralizados. Exceções: o hero no desktop (≥ 1024px), em duas colunas (título à esquerda; texto, botão e CRP à direita); o Sobre no desktop (≥ 896px), com retrato à esquerda e texto à direita; os cards de Formas de atendimento, horizontais e alternados. Textos com mais de 3 linhas ficam alinhados à esquerda dentro de um bloco de largura controlada.
- **Header, menu mobile e rodapé idênticos nos 3 HTML** (`index.html`, `politica-de-privacidade.html`, `404.html`). Qualquer mudança vale para os três. A única diferença permitida: os links do menu são `#sobre` na página inicial e `index.html#sobre` nas outras. Depois de mudar, compare os blocos com `diff`, normalizando esse prefixo.
- **Cabeçalho de seção padrão** (`.section-head`): `h2.heading--section` e introdução opcional, centralizados. Sem numeração editorial e sem itálico (o visual v2 removeu os dois).
- **Negritos:** 2 a 4 expressões-chave por bloco em `<strong>` (Mulish 700, `--color-text-strong`).

- **Caminhos sempre relativos** (`css/style.css`, `img/x.webp`, `index.html#contato`). O site está na subpasta `/dieniferdoebber/`, e um caminho iniciado por `/` quebra o site (fica sem CSS). A exceção é o `<base href="/dieniferdoebber/">` da `404.html`.
- **CSP em `<meta>` nos três HTML** (`default-src 'self'`, sem `unsafe-inline`). Nunca usar `style="…"`, `<style>` ou `<script>` com código inline. O JSON-LD (`application/ld+json`) é a única exceção, porque não é executado. Para variações visuais, usar classes.
- **Header, menu mobile e rodapé estão repetidos nas três páginas.** Qualquer mudança neles vale para os três arquivos. Nas páginas internas, as âncoras do menu apontam para `index.html#…`.
- **CSS:** tokens em `:root` no início do arquivo; as seções usam os tokens semânticos (`--fg`, `--fg-strong`, `--fg-accent`, `--fg-title`, `--line`, `--focus-ring`, `--btn-gradient`). `data-surface="cream"|"sand"` só muda o fundo. Classes no padrão BEM (`bloco__elemento--modificador`). O reset de listas usa `:where()` (especificidade zero) para não vencer as classes das seções.
- **Escala e espaços:** títulos de seção `--text-3xl` (26→36px), h1 do hero `--text-5xl` (34→56px), h1 das páginas internas `--text-4xl` (30→48px), títulos de card `--text-xl` (20→24px), corpo 16→17px com entrelinha 1.75; `--space-section` clamp(72px, 9vw, 120px); container de 1000px (`--container-content`) e blocos de até 1200px (`--container-wide`); gutter de 20px no mobile.
- **Formulário de contato** (`js/main.js`, seção 6): sem `action` e sem envio; valida, limpa e limita as entradas, aplica `encodeURIComponent` e abre `wa.me` em nova aba com `noopener`. Erros ligados por `aria-describedby`, status em `role="status"`, foco no primeiro campo inválido. Não salvar nada.
- **Textos pendentes:** `<span class="pending">[CONFIRMAR …]</span>` ou `[REVISAR …]` (validação jurídica). Mantenha o marcador até a confirmação e atualize o `PENDENCIAS.md`.
- **Palavras com hífen** ficam em `<span class="nowrap">` (o subset latin das fontes não tem o hífen inseparável).
- **Títulos:** `text-wrap: balance`. Para evitar palavra órfã em títulos de 3 ou mais palavras, una as duas últimas com `&nbsp;` (já aplicado).
- **Links externos:** `target="_blank" rel="noopener noreferrer"` e texto oculto `<span class="visually-hidden"> (abre em nova aba)</span>`. Não use `aria-label` que substitua o texto visível (WCAG 2.5.3); o botão flutuante, só com ícone, é a exceção.
- **Logotipo:** `img/wordmark.svg` (com "Psicanálise · Psicologia Clínica") e `img/wordmark-nome.svg` (só o nome), em texto convertido em desenho.

## Design (visual v2, substitui a seção 3 do prompt.md)

- Estética clara, quente e delicada: creme, bege e caramelo dourado; tipografia arredondada leve; cards suaves; ícones em linha fina dourada; botões em pílula; muito respiro. Inspiração só de **linguagem visual**: nunca copiar textos ou imagens de terceiros.
- **Paleta:** bg `#FFFDFA` · cream `#FBF5EE` · sand `#F6EBDD` · sand-strong `#EFDFCB` · gold `#C29A6B` · gold-dark `#9C774E` · btn `#E6C9A3 → #D2AC80` · text `#7A6858` · text-strong `#5E4A3A`. Sem azul-marinho. Tons criados por ajuste de contraste: gold-deep `#856542`, btn-text `#544234`, btn-text-hover `#45362A` e field-border `#AC885F`.
- **Contraste (WCAG AA), medido:**

  | Cor | branco | bg | cream | sand | Uso permitido |
  |---|---|---|---|---|---|
  | text `#7A6858` | 5.32 | 5.24 | 4.91 | 4.52 | texto corrido em qualquer fundo |
  | text-strong `#5E4A3A` | 8.34 | 8.22 | 7.71 | 7.09 | negritos, perguntas do FAQ |
  | gold-deep `#856542` | 5.33 | 5.25 | 4.93 | 4.53 | texto dourado < 24px (sobretítulos, títulos de card, links, CRP) |
  | gold-dark `#9C774E` | 4.07 | 4.01 | 3.76 | 3.46 | só texto ≥ 24px (títulos de seção, anos) e anel de foco (≥ 3:1) |
  | gold `#C29A6B` | 2.58 | 2.54 | 2.39 | 2.20 | **só decorativo** (ícones, filetes); nunca texto |
  | field-border `#AC885F` | 3.26 | — | — | — | borda de campos e opções (≥ 3:1) |

  Sobre o gradiente do botão: btn-text `#544234` dá 6.01 → 4.51 (hover: `#45362A`, 6.63 → 4.87). Branco sobre o gradiente dá 1.59–2.11 e **não pode** ser usado (por isso o ícone do botão flutuante é escuro). Bordas de card em sand-strong (~1.3:1) são decorativas: o card não é controle.
- **Ritmo de fundos:** hero cream → Temas bg → Sobre cream → Como funciona (bloco cream arredondado sobre bg) → Formas bg → Formação cream → FAQ bg → Contato (bloco cream) → rodapé sand.
- **Formas:** cards 14px, blocos 28px (sem raio e sem margens laterais no mobile), imagens 12px, campos 10px; sombra quase invisível; variante `card--outline` com borda 1px sand-strong.
- **Botões:** `btn--primary` (gradiente, versalete 12–13px, tracking .12em, Mulish 700, altura ≥ 48px; hover escurece e sobe 1px), `btn--outline` (contorno dourado, secundário), `btn--sm` (pílula do header, 44px), `btn--link` (link com seta).
- **Ícones:** SVG inline, `viewBox 0 0 36 36`, traço 1.25px em `--color-gold`, 34px, abstratos, `aria-hidden`. Proibidos: cérebro, lótus, borboleta, coração partido, quebra-cabeça, mãos. O selo do Sobre é o monograma "DD" em linha (`img/selo-dd.svg`), não lótus.
- **Logotipo:** o wordmark mantém o desenho de letra original (serifado), recolorido em gold-dark.
- **Movimento:** reveal (fade + 12px, 400ms), hover dos cards (sobe 3px, borda um pouco mais escura) e dos botões (sobe 1px). Tudo desligado com `prefers-reduced-motion`. Nada de parallax, contadores ou carrosséis.
- Mobile-first: breakpoints em 40rem (640px), 48rem (768px), 56rem (896px) e 64rem (1024px), testado de 360 a 1440px.

## Tom de voz

- Escrita direta, frases curtas, vocabulário preciso e pouco adjetivo.
- Linguagem clínica acessível, sem jargão excessivo.
- Primeira pessoa só na seção "Sobre". Nas demais, texto impessoal ou em terceira pessoa.

## Proibições

- Linguagem comercial ou promocional ("agende já", "vagas limitadas", "transforme sua vida").
- Linguagem motivacional ("você merece", "jornada de autoconhecimento", "cura", "ressignificar").
- Clichês visuais: cérebros, lótus, quebra-cabeças, borboletas, mãos, silhuetas, árvores, corações (inclusive partidos), banco de imagens genérico.
- Promessa de resultados, depoimentos de pacientes, preço como chamariz e comparação com outros profissionais (CFP, art. 20).
- Formulários que enviem dados a um servidor, banco de dados, cookies, `localStorage` e scripts de terceiros. O único formulário permitido é o de contato, que só monta a mensagem e abre o WhatsApp (decisão da cliente, que amplia o prompt.md §8). Analytics só com aprovação e sem cookies (exige ajustar a CSP e a política de privacidade).
- Campos que peçam informações de saúde no formulário.
- iframe do Google Maps. Usar só o link "Ver no mapa".

## Acessibilidade (WCAG 2.2 AA — manter)

Um único h1 por página, landmarks (header, nav, main, footer), skip link, foco visível, alvos de toque ≥ 44px, `aria-current` na navegação (scroll-spy em `js/main.js`), menu mobile em `<dialog>` com foco preso e ESC, FAQ em `<details>/<summary>`, foco nunca escondido sob o header fixo (`scroll-margin` no CSS).

## CFP

O CRP aparece no hero, no Sobre e no rodapé; o rodapé tem o aviso de emergência (188 CVV / 192 SAMU) e o cadastro e-Psi (link pendente). O JSON-LD não pode ter avaliações, ratings nem preços. O tipo `Psychologist` do prompt não existe no schema.org: usa-se `MedicalBusiness` + `LocalBusiness`, com `founder.jobTitle` "Psicóloga".
