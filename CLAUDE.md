# CLAUDE.md

Site institucional da psicóloga **Dienifer Doebber (CRP 06/184387)**, voltado à psicoterapia psicanalítica, com contato só pelo WhatsApp. Publicado no GitHub Pages em https://tha-github.github.io/dieniferdoebber/.

> **Regra principal: sempre consultar `prompt.md` antes de alterar conteúdo ou design.** Ele é a fonte de verdade. Em caso de conflito, `prompt.md` prevalece sobre este arquivo.

## Stack

- **HTML, CSS e JavaScript puros.** Sem framework, sem build, sem `npm`. A versão anterior, em Astro, está no histórico do git (tag `astro-v1`).
- Páginas: `index.html`, `politica-de-privacidade.html` e `404.html`. Estilos: `css/style.css` (único) e `css/noscript.css`. Script: `js/main.js` (único, `defer`, sem módulos, para funcionar também em `file://`).
- Fontes auto-hospedadas em `fonts/` (Cormorant Garamond 400/500 e 400 itálico, Inter 300/400/500, subset latin, `font-display: swap`) com fallbacks de métrica ajustada (`Inter Fallback`, `Cormorant Fallback`) para não haver layout shift. Proibido usar o CDN do Google Fonts.

## Convenções

- **Layout centralizado em todas as seções**: sobretítulo, título, introdução, chamadas e blocos de texto centralizados, com largura de leitura controlada. **Exceção: o hero no desktop (≥ 1024px)**, em duas colunas (texto à esquerda, retrato à direita). No mobile e no tablet, o hero também é centralizado, com o retrato abaixo do texto. Textos com mais de 3 linhas ficam num bloco centralizado (`.prose`, 680px) e alinhados à esquerda por dentro; as perguntas do FAQ também ficam à esquerda dentro do bloco de 760px.
- **Header, menu mobile e rodapé idênticos nos 3 HTML** (`index.html`, `politica-de-privacidade.html`, `404.html`). Qualquer mudança vale para os três. A única diferença permitida: os links do menu são `#sobre` na página inicial e `index.html#sobre` nas outras. Depois de mudar, compare os blocos com `diff`, normalizando esse prefixo.
- **Cabeçalho de seção padrão** (`.section-head`): filete curto em sand, sobretítulo numerado (`<span class="eyebrow__number">01</span>Sobre a psicóloga`; o travessão vem do CSS), título `h2` e introdução opcional. Numeração atual: 01 Sobre a psicóloga, 02 Temas, 03 Atendimento, 04 Formação, 05 Dúvidas, 06 Contato.
- **Itálico pontual**: no máximo uma palavra-chave por título, em `<em>` (Cormorant 400 itálico).

- **Caminhos sempre relativos** (`css/style.css`, `img/x.webp`, `index.html#contato`). O site está na subpasta `/dieniferdoebber/`, e um caminho iniciado por `/` quebra o site (fica sem CSS). A exceção é o `<base href="/dieniferdoebber/">` da `404.html`.
- **CSP em `<meta>` nos três HTML** (`default-src 'self'`, sem `unsafe-inline`). Nunca usar `style="…"`, `<style>` ou `<script>` com código inline. O JSON-LD (`application/ld+json`) é a única exceção, porque não é executado. Para variações visuais, usar classes.
- **Header, menu mobile e rodapé estão repetidos nas três páginas.** Qualquer mudança neles vale para os três arquivos. Nas páginas internas, as âncoras do menu apontam para `index.html#…`.
- **CSS:** tokens em `:root` no início do arquivo; as seções usam só os tokens semânticos (`--fg`, `--fg-muted`, `--fg-accent`, `--line`, `--focus-ring`, `--btn-*`), que a seção marinho (`data-surface="navy"`) redefine. Classes no padrão BEM (`bloco__elemento--modificador`). O reset de listas usa `:where()` (especificidade zero) para não vencer as classes das seções.
- **Escala e espaços:** títulos de seção `--text-3xl` (34→54px), h1 do hero `--text-5xl` (44→96px), corpo 17→18px; `--space-section` clamp(96px, 12vw, 160px) entre seções; `--space-stack` entre cabeçalho e conteúdo; container de 1240px. Botões primário e secundário com altura ≥ 52px, em versalete.
- **Formulário de contato** (`js/main.js`, seção 6): sem `action` e sem envio; valida, limpa e limita as entradas, aplica `encodeURIComponent` e abre `wa.me` em nova aba com `noopener`. Erros ligados por `aria-describedby`, status em `role="status"`, foco no primeiro campo inválido. Não salvar nada.
- **Textos pendentes:** `<span class="pending">[CONFIRMAR …]</span>` ou `[REVISAR …]` (validação jurídica). Mantenha o marcador até a confirmação e atualize o `PENDENCIAS.md`.
- **Palavras com hífen** ficam em `<span class="nowrap">` (o subset latin da Inter não tem o hífen inseparável).
- **Títulos:** `text-wrap: balance`. Para evitar palavra órfã em títulos de 3 ou mais palavras, una as duas últimas com `&nbsp;` (já aplicado).
- **Links externos:** `target="_blank" rel="noopener noreferrer"` e texto oculto `<span class="visually-hidden"> (abre em nova aba)</span>`. Não use `aria-label` que substitua o texto visível (WCAG 2.5.3); o botão flutuante, só com ícone, é a exceção.
- **Logotipo:** `img/wordmark.svg` (com "Psicanálise · Psicologia Clínica") e `img/wordmark-nome.svg` (só o nome), em texto convertido em desenho.

## Design (resumo; detalhes na seção 3 do prompt.md)

- Minimalismo editorial: muito espaço em branco, a tipografia como protagonista, filetes finos e numeração editorial (01, 02…) no lugar de ícones.
- Paleta: bg `#F6F2EC` · surface `#ECE5DA` · sand `#D8CCBA` · ink `#1E1E1C` · muted `#6B655C` · navy `#1F2A3A` · navy-soft `#2E3B4F`. Contraste WCAG AA verificado em toda combinação usada (o `muted` não pode ser usado sobre o navy).
- Fundos alternados: hero em bg, Sobre em surface, Temas em bg, Atendimento em surface, Formação em bg, FAQ em surface, Contato em navy.
- Movimento: só o reveal (fade + 14px, 400ms) e transições ≤ 400ms, desligados com `prefers-reduced-motion`. Nada de parallax, contadores ou carrosséis.
- Mobile-first: breakpoints em 48rem (768px) e 64rem (1024px), testado de 320 a 1440px.

## Tom de voz

- Escrita direta, frases curtas, vocabulário preciso e pouco adjetivo.
- Linguagem clínica acessível, sem jargão excessivo.
- Primeira pessoa só na seção "Sobre". Nas demais, texto impessoal ou em terceira pessoa.

## Proibições

- Linguagem comercial ou promocional ("agende já", "vagas limitadas", "transforme sua vida").
- Linguagem motivacional ("você merece", "jornada de autoconhecimento", "cura", "ressignificar").
- Clichês visuais: cérebros, quebra-cabeças, borboletas, mãos dadas, silhuetas, árvores, corações, banco de imagens genérico.
- Promessa de resultados, depoimentos de pacientes, preço como chamariz e comparação com outros profissionais (CFP, art. 20).
- Formulários que enviem dados a um servidor, banco de dados, cookies, `localStorage` e scripts de terceiros. O único formulário permitido é o de contato, que só monta a mensagem e abre o WhatsApp (decisão da cliente, que amplia o prompt.md §8). Analytics só com aprovação e sem cookies (exige ajustar a CSP e a política de privacidade).
- Campos que peçam informações de saúde no formulário.
- iframe do Google Maps. Usar só o link "Ver no mapa".

## Acessibilidade (WCAG 2.2 AA — manter)

Um único h1 por página, landmarks (header, nav, main, footer), skip link, foco visível, alvos de toque ≥ 44px, `aria-current` na navegação (scroll-spy em `js/main.js`), menu mobile em `<dialog>` com foco preso e ESC, FAQ em `<details>/<summary>`, foco nunca escondido sob o header fixo (`scroll-margin` no CSS).

## CFP

O CRP aparece no hero, no Sobre e no rodapé; o rodapé tem o aviso de emergência (188 CVV / 192 SAMU) e o cadastro e-Psi (link pendente). O JSON-LD não pode ter avaliações, ratings nem preços. O tipo `Psychologist` do prompt não existe no schema.org: usa-se `MedicalBusiness` + `LocalBusiness`, com `founder.jobTitle` "Psicóloga".
