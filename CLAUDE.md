# CLAUDE.md

Landing page one-page da psicóloga **Dienifer Doebber (CRP 06/184387)**, voltada à psicoterapia psicanalítica, com contato só pelo WhatsApp.

> **Regra principal: sempre consultar `prompt.md` antes de alterar conteúdo ou design.** Ele é a fonte de verdade. Em caso de conflito, `prompt.md` prevalece sobre este arquivo.

## Stack

- **Astro** com output estático e zero JS por padrão. TypeScript em modo `strict`.
- **CSS puro** com custom properties. Nenhum framework de UI ou de CSS.
- **Fontes auto-hospedadas** via `@fontsource`: Cormorant Garamond (400, 500) e Inter (300, 400, 500). O itálico pontual previsto no prompt não é usado hoje; para usá-lo, importe `@fontsource/cormorant-garamond/latin-400-italic.css` no `global.css`. Proibido usar o CDN do Google Fonts.
- JS só onde for indispensável: menu mobile, header ao rolar, reveal com IntersectionObserver. Accordion com `<details>/<summary>`.
- Scripts: `npm run dev` · `build` · `preview` · `preview:secure` · `check` · `format` · `brand` · `headers` · `audit`.

## Estrutura e convenções

- `src/data/site.ts`: nome, CRP, WhatsApp (link `wa.me` com `encodeURIComponent`), endereço, Google Maps e navegação. É a **fonte única**: nunca repetir esses dados nos componentes.
- `src/data/content.ts`: todo o texto da página (seção 5 do prompt). Os marcadores `[CONFIRMAR]` ficam como estão até a cliente confirmar.
- `src/components`, `src/layouts`, `src/pages`, `src/styles`, `src/assets/images` (imagens processadas por `astro:assets`, em WebP/AVIF), `public`.
- `src/styles/tokens.css`: todos os tokens. Os componentes usam só os **tokens semânticos** (`--fg`, `--fg-muted`, `--fg-accent`, `--line`, `--focus-ring`, `--btn-*`). A seção marinho (`data-surface="navy"`) redefine esses tokens, e os componentes se adaptam sem variantes próprias.
- `src/components/ui/`: Container, Section, Eyebrow, Heading, Button, Divider e ArrowIcon. Reutilizar antes de criar estilos novos.
- Marca: o wordmark e o monograma são texto convertido em paths. Para alterar, editar `scripts/generate-brand.mjs` e rodar `npm run brand` (regenera `Logo.paths.ts`, `src/assets/brand/*.svg`, `public/favicon.svg` e `public/apple-touch-icon.png`). Nunca editar os arquivos gerados à mão.
- **SEO:** `site.url` (domínio, ainda placeholder `[CONFIRMAR]`) alimenta `astro.config.mjs` (`site`), a canonical, o Open Graph, o JSON-LD (`StructuredData.astro`), o sitemap (`@astrojs/sitemap`) e o `robots.txt` (`src/pages/robots.txt.ts`). O title e a description da home estão em `site.seo`; páginas internas passam `title` ao `BaseLayout` ("<título> | Dienifer Doebber"). Páginas temporárias ou de erro usam `noindex` e ficam fora do sitemap. O JSON-LD não pode ter avaliações, ratings nem preços (CFP).
- **Imagens:** sempre `<Picture>` de `astro:assets`, com `formats={['avif', 'webp']}`, `widths` e `sizes`. Acima da dobra, `loading="eager"` e `fetchpriority="high"`; abaixo, `loading="lazy"`.
- **Fontes:** só subset latin e só os pesos usados. Preload apenas de Cormorant 400 e Inter 400 (BaseLayout). Os fallbacks `Inter Fallback` e `Cormorant Fallback` (`global.css`) têm métricas medidas sobre o texto real e evitam layout shift; recalcule se trocar fonte ou peso principal.
- **CSS e JS sempre em arquivos** (`inlineStylesheets: 'never'`, `assetsInlineLimit: 0`, `cssCodeSplit: false`, que gera um único `style.*.css`). Motivo: a CSP. Ver "Segurança".
- Formatação com Prettier (`prettier-plugin-astro`), aspas simples, 2 espaços, LF.
- Dependências com versão fixa (`save-exact` no `.npmrc`).
- Links externos sempre com `target="_blank" rel="noopener noreferrer"`. No `Button`, usar `external` (acrescenta "(abre em nova aba)" oculto) e `hint` para complementar o nome acessível. **Não usar `aria-label` que substitua o texto visível** (WCAG 2.5.3). `aria-label` só em controles sem texto, como o botão flutuante.
- Textos de `content.ts` passam por `formatText()` (`src/utils/typography.ts`): ele escapa o HTML, impede quebra em palavras com hífen e marca `[CONFIRMAR]` com `.pending`. Em títulos e perguntas, usar `formatTitle()`, que evita palavra órfã. Exceção: títulos curtos que quebram em 2 linhas ficam só com `text-wrap: balance`, porque o espaço inseparável atrapalha o balanceamento (ex.: título de Temas).

## Publicação (GitHub Pages)

- O site é publicado pelo GitHub Pages a partir da **raiz** do repositório (branch `main`, `/ (root)`). Fluxo: `npm run pages` (build + cópia de `dist/` para a raiz, com `.nojekyll` e, só com domínio próprio, `CNAME`), depois commit e push.
- **Endereço e base:** `site.url` define o endereço público. Hoje é `https://tha-github.github.io/dieniferdoebber` (subpasta), e o `astro.config.mjs` deriva `site` (origem) e `base` (`/dieniferdoebber`). **Todo caminho interno absoluto passa por `withBase()`** e toda URL absoluta (canonical, OG, JSON-LD) por `absoluteUrl()`, ambos de `src/utils/url.ts`. Nunca escrever `href="/…"` direto: quebra o site na subpasta (fica sem CSS).
- Os arquivos publicados na raiz (`index.html`, `404.html`, `_astro/`, `politica-de-privacidade/`, ícones, `sitemap-*.xml`, `CNAME` etc.) são **gerados**: nunca os edite à mão. A lista fica em `.pages-files.json`. Para mudar o site, edite `src/` e rode `npm run pages`.
- O GitHub Pages não aceita headers HTTP: a CSP vai em `<meta>` (`cspMeta` em `scripts/security-headers.mjs`, só no build). Os arquivos `vercel.json` e `_headers` ficam como alternativa de hospedagem.

## Segurança e privacidade (prompt.md §8 e §9)

- **CSP só com `'self'`**, sem `unsafe-inline` nem hashes. **Nunca** usar `style=`, `<style>` ou `<script>` inline (nem `define:vars`/`is:inline` executável): a CSP bloqueia e o site quebra em produção. Para variações visuais, usar classes ou `data-*`. Exceção: o JSON-LD (`application/ld+json`, que não é executado).
- **Headers:** a fonte única é `scripts/security-headers.mjs`. Para alterar, editar esse arquivo e rodar `npm run headers`, que regenera `vercel.json` e `public/_headers`. As regras de `Cache-Control` não podem se sobrepor.
- **Validar antes de publicar:** `npm run build && npm run preview:secure` serve `dist/` com os headers e com compressão. Conferir o console: nenhuma violação de CSP.
- **Zero terceiros:** nenhuma requisição a outro domínio. Um serviço externo novo exige atualizar a CSP, a política de privacidade (`src/data/privacy.ts`) e o `SECURITY.md`.
- **Política de privacidade** em `/politica-de-privacidade` (`src/data/privacy.ts`). Os marcadores `[REVISAR COM A CLIENTE]` recebem a mesma marcação `.pending` de `[CONFIRMAR]`.
- **CFP:** o CRP aparece no hero, no Sobre e no rodapé; o rodapé tem o aviso de emergência e o cadastro e-Psi (`footer.ePsi.href`, ainda pendente).
- **Contatos de segurança:** `SECURITY.md` e `public/.well-known/security.txt` (Expires em 2027-10-08: renovar antes dessa data).

## Design (resumo; detalhes na seção 3 do prompt.md)

- Minimalismo editorial: muito espaço em branco, a tipografia como protagonista, filetes finos e numeração editorial (01, 02…) no lugar de ícones.
- Paleta: bg `#F6F2EC` · surface `#ECE5DA` · sand `#D8CCBA` · ink `#1E1E1C` · muted `#6B655C` · navy `#1F2A3A` · navy-soft `#2E3B4F`. Contraste WCAG AA verificado em toda combinação usada.
- Movimento: só fade/slide sutil (≤ 400ms), respeitando `prefers-reduced-motion`.
- Mobile-first, com breakpoints em 360 / 768 / 1024 / 1440. Testado de 320 a 1440 (320 e 720 equivalem a zoom de 400% e 200%).
- **Grade das seções (≥ 1024px):** 12 colunas. Título ou rótulo nas colunas 1–5, conteúdo nas colunas 7–12. Grupos de 3 blocos ocupam 1–4 · 5–8 · 9–12. Exceções: o hero (texto 1–7, retrato 9–12) e o destaque "A abordagem".
- **Ritmo:** as seções usam `--space-section` no padding vertical; entre título e conteúdo, `--space-stack`. Fundos alternados: hero e Sobre em bg, Temas em surface, Atendimento em bg, Formação em surface, FAQ em bg, Contato em navy.
- **Reveal:** `Section` aplica fade + 14px (400ms) ao conteúdo. Usar `reveal={false}` acima da dobra. Fica desligado com `prefers-reduced-motion` e sem JS. Nada de parallax, contadores ou carrosséis.

## Tom de voz

- Escrita direta, frases curtas, vocabulário preciso e pouco adjetivo.
- Linguagem clínica acessível, sem jargão excessivo.
- Primeira pessoa só na seção "Sobre". Nas demais, texto impessoal ou em terceira pessoa.

## Proibições

- Linguagem comercial ou promocional ("agende já", "vagas limitadas", "transforme sua vida").
- Linguagem motivacional ("você merece", "jornada de autoconhecimento", "cura", "ressignificar").
- Clichês visuais: cérebros, quebra-cabeças, borboletas, mãos dadas, silhuetas, árvores, corações, banco de imagens genérico.
- Promessa de resultados, depoimentos de pacientes, preço como chamariz e comparação com outros profissionais (CFP, art. 20).
- Formulários, banco de dados e scripts de terceiros. Analytics só com aprovação e sem cookies.
- iframe do Google Maps. Usar só o link "Ver no mapa".

## Requisitos

- Lighthouse ≥ 95 em todas as categorias, LCP < 2s.
- WCAG 2.2 AA: HTML semântico, foco visível, skip link, `lang="pt-BR"`, um único h1, todo conteúdo dentro de landmarks, alvos de toque ≥ 44px, `aria-current` na navegação (scroll-spy no Header) e foco nunca escondido sob o header fixo ou o botão flutuante (`scroll-margin` no `global.css`).
- SEO: title/description, Open Graph, JSON-LD (`MedicalBusiness` + `LocalBusiness`; o tipo `Psychologist` do prompt não existe no schema.org), sitemap, robots.txt e canonical.
- Headers de segurança (CSP, HSTS etc.) no deploy (Vercel ou Netlify). `npm audit` sem vulnerabilidades altas ou críticas.
- CFP: nome e CRP visíveis, aviso de que o site não é canal de emergência, menção ao e-Psi `[CONFIRMAR]`.
