# CLAUDE.md

Landing page one-page da psicóloga **Dienifer Doebber (CRP 06/184387)**, voltada à psicoterapia psicanalítica, com contato só pelo WhatsApp.

> **Regra principal: sempre consultar `prompt.md` antes de alterar conteúdo ou design.** Ele é a fonte de verdade. Em caso de conflito, `prompt.md` prevalece sobre este arquivo.

## Stack

- **Astro** com output estático e zero JS por padrão. TypeScript em modo `strict`.
- **CSS puro** com custom properties. Nenhum framework de UI ou de CSS.
- **Fontes auto-hospedadas** via `@fontsource`: Cormorant Garamond (400, 500 e 400 itálico) e Inter (300, 400, 500). Proibido usar o CDN do Google Fonts.
- JS só onde for indispensável: menu mobile, header ao rolar, reveal com IntersectionObserver. Accordion com `<details>/<summary>`.
- Scripts: `npm run dev` · `build` · `preview` · `check` · `format`.

## Estrutura e convenções

- `src/data/site.ts`: nome, CRP, WhatsApp (link `wa.me` com `encodeURIComponent`), endereço, Google Maps e navegação. É a **fonte única**: nunca repetir esses dados nos componentes.
- `src/data/content.ts`: todo o texto da página (seção 5 do prompt). Os marcadores `[CONFIRMAR]` ficam como estão até a cliente confirmar.
- `src/components`, `src/layouts`, `src/pages`, `src/styles`, `src/assets/images` (imagens processadas por `astro:assets`, em WebP/AVIF), `public`.
- Formatação com Prettier (`prettier-plugin-astro`), aspas simples, 2 espaços, LF.
- Dependências com versão fixa (`save-exact` no `.npmrc`).
- Links externos sempre com `target="_blank" rel="noopener noreferrer"` e `aria-label` descritivo.

## Design (resumo; detalhes na seção 3 do prompt.md)

- Minimalismo editorial: muito espaço em branco, a tipografia como protagonista, filetes finos e numeração editorial (01, 02…) no lugar de ícones.
- Paleta: bg `#F6F2EC` · surface `#ECE5DA` · sand `#D8CCBA` · ink `#1E1E1C` · muted `#6B655C` · navy `#1F2A3A` · navy-soft `#2E3B4F`. Contraste WCAG AA verificado em toda combinação usada.
- Movimento: só fade/slide sutil (≤ 400ms), respeitando `prefers-reduced-motion`.
- Mobile-first, com breakpoints em 360 / 768 / 1024 / 1440.

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
- WCAG 2.2 AA: HTML semântico, foco visível, skip link, `lang="pt-BR"`.
- SEO: title/description, Open Graph, JSON-LD (`Psychologist` + `LocalBusiness`), sitemap, robots.txt e canonical.
- Headers de segurança (CSP, HSTS etc.) no deploy (Vercel ou Netlify). `npm audit` sem vulnerabilidades altas ou críticas.
- CFP: nome e CRP visíveis, aviso de que o site não é canal de emergência, menção ao e-Psi `[CONFIRMAR]`.
