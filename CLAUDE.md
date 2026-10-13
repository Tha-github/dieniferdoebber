# CLAUDE.md

Site institucional da psicóloga **Dienifer Doebber (CRP 06/184387)**, voltado à psicoterapia psicanalítica, com contato só pelo WhatsApp. Publicado no GitHub Pages em https://tha-github.github.io/dieniferdoebber/.

> **Regra principal: sempre consultar `prompt.md` antes de alterar conteúdo ou design.** Ele é a fonte de verdade de tom e regras do CFP. **Exceções, por decisão da cliente (outubro de 2026):** o design (paleta P&B e logo oficial, seção "Design" abaixo, substitui a seção 3 do `prompt.md`), os textos (versão aprovada pela cliente, já no `index.html`, substitui a seção 5) e a estrutura/navegação (seção "Navegação" abaixo, substitui a seção 4). Versões anteriores: tags `pre-visual-v2` e `pre-ajuste-cliente`.

## Stack

- **HTML, CSS e JavaScript puros.** Sem framework, sem build, sem `npm`. A versão anterior, em Astro, está no histórico do git (tag `astro-v1`).
- Páginas: `index.html`, `politica-de-privacidade.html` e `404.html`. Estilos: `css/style.css` (único) e `css/noscript.css`. Script: `js/main.js` (único, `defer`, sem módulos, para funcionar também em `file://`).
- Fontes auto-hospedadas em `fonts/` (Quicksand 500 nos títulos; Mulish 400/700 no corpo e nos negritos; subset latin, `font-display: swap`) com fallbacks de métrica ajustada (`Quicksand Fallback`, `Mulish Fallback`) para não haver layout shift. Proibido usar o CDN do Google Fonts.

## Convenções

- **Composição:** títulos de seção, introduções e chamadas centralizados. Exceções: o hero no desktop (≥ 1024px), em duas colunas (título à esquerda; texto, botão e CRP à direita); os cards do Consultório, horizontais e alternados. Textos com mais de 3 linhas ficam alinhados à esquerda dentro de um bloco de largura controlada, exceto o "Quem é" do Sobre, todo centralizado a pedido da cliente.
- **Header, menu mobile e rodapé idênticos nos 3 HTML** (`index.html`, `politica-de-privacidade.html`, `404.html`). Qualquer mudança vale para os três. A única diferença permitida: os links do menu são `#sobre` na página inicial e `index.html#sobre` nas outras. Depois de mudar, compare os blocos com `diff`, normalizando esse prefixo.
- **Cabeçalho de seção padrão** (`.section-head`): sobretítulo opcional (`.eyebrow`), `h2.heading--section` e introdução opcional, centralizados. As subseções do Sobre (Perspectiva clínica, Trajetória) usam o mesmo cabeçalho com `h3`.
- **Negritos:** 2 a 4 expressões-chave por bloco em `<strong>` (Mulish 700, `--color-text-strong`).

- **Caminhos sempre relativos** (`css/style.css`, `img/x.webp`, `index.html#contato`). O site está na subpasta `/dieniferdoebber/`, e um caminho iniciado por `/` quebra o site (fica sem CSS). A exceção é o `<base href="/dieniferdoebber/">` da `404.html`.
- **CSP em `<meta>` nos três HTML** (`default-src 'self'`, sem `unsafe-inline`). Nunca usar `style="…"`, `<style>` ou `<script>` com código inline. O JSON-LD (`application/ld+json`) é a única exceção, porque não é executado. Para variações visuais, usar classes.
- **Header, menu mobile e rodapé estão repetidos nas três páginas.** Qualquer mudança neles vale para os três arquivos. Nas páginas internas, as âncoras do menu apontam para `index.html#…`.
- **CSS:** tokens em `:root` no início do arquivo; as seções usam os tokens semânticos (`--fg`, `--fg-strong`, `--fg-accent`, `--fg-title`, `--line`, `--focus-ring`, `--btn-gradient`). `data-surface="cream"|"sand"` só muda o fundo. Classes no padrão BEM (`bloco__elemento--modificador`). O reset de listas usa `:where()` (especificidade zero) para não vencer as classes das seções.
- **Escala e espaços:** títulos de seção `--text-3xl` (26→36px), h1 do hero `--text-5xl` (34→56px), h1 das páginas internas `--text-4xl` (30→48px), títulos de card `--text-xl` (20→24px), corpo 16→17px com entrelinha 1.75; `--space-section` clamp(72px, 9vw, 120px); container de 1000px (`--container-content`) e blocos de até 1200px (`--container-wide`); gutter de 20px no mobile.
- **Sem formulário** (removido a pedido da cliente): o contato é só pelo WhatsApp, pelos botões e pelo botão flutuante. A CSP mantém `form-action 'none'`. Não salvar nada (sem cookies, `localStorage` etc.).
- **Textos pendentes:** `<span class="pending">[CONFIRMAR …]</span>` ou `[REVISAR …]` (validação jurídica). Mantenha o marcador até a confirmação e atualize o `PENDENCIAS.md`.
- **Palavras com hífen** ficam em `<span class="nowrap">` (o subset latin das fontes não tem o hífen inseparável).
- **Títulos:** `text-wrap: balance`. Para evitar palavra órfã em títulos de 3 ou mais palavras, una as duas últimas com `&nbsp;` (já aplicado).
- **Links externos:** `target="_blank" rel="noopener noreferrer"` e texto oculto `<span class="visually-hidden"> (abre em nova aba)</span>`. Não use `aria-label` que substitua o texto visível (WCAG 2.5.3); o botão flutuante, só com ícone, é a exceção.
- **Logotipo oficial:** opção 5 da identidade visual (horizontal). PNG transparentes 1x/2x em `img/logo/` (`logo-preto` no header e menu, `logo-branco` no rodapé e no Contato), sempre com `srcset` e alt "Dienifer Doebber — Psicóloga". Os originais (PNG 9000px, raster) ficam em `_identidade-visual/`, fora do git e do site publicado (`.gitignore`; com o `.nojekyll`, o prefixo "_" não basta). Não vetorizar automaticamente.

## Navegação e estrutura

- Menu (header, menu mobile e rodapé, nesta ordem): **Home · Sobre · Método · Consultório · Dúvidas · Contato** → `#home`, `#sobre`, `#metodo`, `#consultorio`, `#duvidas`, `#contato`. "Contato" é a pílula do header.
- Ordem do `index.html`: Hero (`#home`) → Quando procurar (sem item de menu) → Sobre (Quem é, centralizado e sem retrato, + selo SIGILO • ÉTICA • ACOLHIMENTO + Perspectiva clínica + Trajetória) → Como funciona (`#metodo`) → Consultório → Perguntas frequentes (`#duvidas`) → Contato (fundo preto) → rodapé (fundo preto).
- **Header, menu mobile e rodapé idênticos nos 3 HTML**; nas páginas internas as âncoras são `index.html#…`. Conferir com `diff` depois de qualquer mudança.
- Âncoras com `scroll-margin-top` para o header fixo (regra `[id]` no CSS).

## Design (P&B, substitui a seção 3 do prompt.md)

- Mesma composição e componentes do visual anterior (grids, cards, botões em pílula, raios, espaçamentos, animações), só em preto, branco e cinza. Sem beges, dourados, caramelos ou gradientes.
- **Paleta:** `--color-black #000000` · `--color-white #FFFFFF` · `--color-gray #A6A6A6` · `--color-gray-light #F4F4F4` (tom derivado do cinza, **só fundo** de seção alternada e placeholders).
- **Regra do cinza:** `#A6A6A6` **nunca em texto** (2,43:1 sobre branco). Só em bordas, filetes, divisores, contornos/círculos de ícones e detalhes decorativos. Texto sempre preto sobre branco/#F4F4F4 ou branco sobre preto.
- **Contraste (WCAG AA), medido:**

  | Par | Contraste | Uso |
  |---|---|---|
  | preto sobre branco | 21:1 | texto, ícones, foco, botão primário |
  | preto sobre #F4F4F4 | 19,09:1 | texto nas seções alternadas |
  | branco sobre preto | 21:1 | Contato, rodapé, botão primário e flutuante |
  | cinza sobre branco | 2,43:1 | **só decorativo** (bordas de card, filetes) |
  | cinza sobre #F4F4F4 | 2,21:1 | **só decorativo** |
  | cinza sobre preto | 8,63:1 | divisores e bordas no fundo preto |

- **Componentes:** cards brancos com borda 1px cinza (hover: borda preta, sobe 3px); `btn--primary` preto com texto branco (no fundo preto, inverte); `btn--outline` contorno e texto pretos (hover: contorno mais grosso); ícones em linha preta (traço 1,25px; na Perspectiva clínica, dentro de círculo cinza); botão flutuante preto com ícone branco; selo de valores em pílula com contorno cinza.
- **Contexto escuro:** `data-surface="black"` (bloco do Contato) e `.site-footer` redefinem `--fg`, `--line-hover`, `--focus-ring`, `--icon-color`, `--btn-bg`/`--btn-fg`. `data-surface="light"` só muda o fundo para #F4F4F4.
- **Ritmo de fundos:** hero #F4F4F4 → Quando procurar branco → Sobre #F4F4F4 → Como funciona (bloco #F4F4F4 sobre branco) → Consultório branco → Dúvidas #F4F4F4 → Contato (bloco preto) → rodapé preto. Os blocos (Como funciona e Contato) são caixas com margens laterais e cantos arredondados em todas as larguras (raio 20px no mobile, 28px a partir do tablet), para o Contato não se confundir com o rodapé.
- **Tipografia:** Quicksand 500 (títulos) e Mulish 400/700 (corpo), mantidas a pedido. Qualquer troca de fonte deve ser proposta à cliente antes.
- **Ícones proibidos:** cérebro, lótus, borboleta, coração partido, quebra-cabeça, mãos. Os ícones de "pessoa" da Perspectiva clínica foram pedidos pela cliente: manter abstratos (círculo + arco), sem silhueta detalhada.
- **Movimento:** reveal (fade + 12px, 400ms), hover dos cards (sobe 3px) e dos botões (sobe 1px). Tudo desligado com `prefers-reduced-motion`.
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
- Formulários de qualquer tipo, banco de dados, cookies, `localStorage` e scripts de terceiros. Analytics só com aprovação e sem cookies (exige ajustar a CSP e a política de privacidade).
- iframe do Google Maps. Usar só o link "Ver no mapa".

## Acessibilidade (WCAG 2.2 AA — manter)

Um único h1 por página, landmarks (header, nav, main, footer), skip link, foco visível, alvos de toque ≥ 44px, `aria-current` na navegação (scroll-spy em `js/main.js`), menu mobile em `<dialog>` com foco preso e ESC, FAQ em `<details>/<summary>`, foco nunca escondido sob o header fixo (`scroll-margin` no CSS).

## CFP

O CRP aparece no hero, no Sobre e no rodapé. A pedido da cliente, o rodapé não tem mais o aviso de emergência (188 CVV / 192 SAMU) nem a linha do cadastro e-Psi; o `prompt.md` §9 recomendava os dois (ver PENDENCIAS.md, "Decisões"). O JSON-LD não pode ter avaliações, ratings nem preços. O tipo `Psychologist` do prompt não existe no schema.org: usa-se `MedicalBusiness` + `LocalBusiness`, com `founder.jobTitle` "Psicóloga".
