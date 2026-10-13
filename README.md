# Dienifer Doebber · Psicanálise · Psicologia Clínica

Site institucional da psicóloga **Dienifer Doebber, CRP 06/184387**. O contato é feito só pelo WhatsApp.

**Endereço:** https://tha-github.github.io/dieniferdoebber/

É um site estático em **HTML, CSS e JavaScript puros**, sem build, sem dependências e sem `npm`. Para editar, basta alterar os arquivos e publicar (commit e push).

- **Briefing (fonte de verdade de conteúdo e design):** [`prompt.md`](prompt.md)
- **Itens pendentes com a cliente:** [`PENDENCIAS.md`](PENDENCIAS.md)
- **Segurança:** [`SECURITY.md`](SECURITY.md)

---

## Estrutura

```
index.html                     página principal (todas as seções)
politica-de-privacidade.html   política de privacidade (LGPD)
404.html                       página de erro
css/style.css                  todos os estilos (cores e tamanhos nos tokens, no início)
css/noscript.css               ajustes para quem navega sem JavaScript
js/main.js                     header ao rolar, menu mobile, reveal, botão flutuante do WhatsApp
fonts/                         Quicksand e Mulish (auto-hospedadas)
img/                           logo (img/logo/), favicons, ícones e imagem de compartilhamento
manifest.webmanifest           ícones para Android/atalho na tela inicial
sitemap.xml                    páginas para buscadores
.well-known/security.txt       contato para relatos de segurança
.nojekyll                      obrigatório no GitHub Pages (ver "Publicação")
```

---

## Ver o site no computador

Dê dois cliques em `index.html`. O site abre com o visual completo.

No console do navegador (F12) podem aparecer avisos sobre fontes e `manifest`. Eles só acontecem ao abrir o arquivo direto do disco e somem no GitHub Pages.

Para uma prévia idêntica à publicada, sirva a pasta com qualquer servidor local, por exemplo a extensão **Live Server** do VS Code.

---

## Como editar os textos

Os textos estão direto no HTML. Cada bloco é marcado com um comentário, por exemplo:

```html
<!-- ===================== SOBRE (#sobre) ===================== -->
```

Na ordem da página: `HEADER`, `MENU MOBILE`, `HERO (#home)`, `QUANDO PROCURAR`, `SOBRE (#sobre)` (Quem é, selo SIGILO • ÉTICA • ACOLHIMENTO, Perspectiva clínica e Trajetória), `MÉTODO (#metodo)`, `CONSULTÓRIO (#consultorio)`, `DÚVIDAS (#duvidas)`, `CONTATO (#contato)`, `RODAPÉ` e o botão flutuante do WhatsApp.

**Os textos são os aprovados pela cliente.** Não reescreva nem acrescente frases sem a aprovação dela.

**Menu**: `Home · Sobre · Método · Consultório · Dúvidas · Contato`, com as âncoras `#home`, `#sobre`, `#metodo`, `#consultorio`, `#duvidas` e `#contato`. Os mesmos links se repetem no rodapé.

**Estrutura de cada seção**: um cabeçalho centralizado:

```html
<header class="section-head">
  <p class="eyebrow">Perspectiva clínica</p>
  <!-- sobretítulo (opcional) -->
  <h2 id="…-title" class="heading heading--section">Título da seção</h2>
  <p class="section-head__intro">Introdução curta (opcional).</p>
</header>
```

**Negritos**: marque de 2 a 4 expressões-chave por bloco com `<strong>…</strong>`. Isso não muda o texto, só o destaque.

**Cards**: os temas de "Quando procurar", os itens da Perspectiva clínica, a Trajetória, os blocos de "Como funciona" e as perguntas frequentes são cards. Para mudar um texto, edite o título (`card__title` ou `feature__label`) e o parágrafo (`card__text`). Os ícones são desenhos SVG em linha fina, dentro do próprio HTML. Para trocar um ícone, substitua o `<svg class="icon" …>…</svg>` inteiro por outro na mesma grade (`viewBox="0 0 36 36"`, só traços, sem preenchimento).

**Header, menu mobile e rodapé são idênticos** em `index.html`, `politica-de-privacidade.html` e `404.html`. Ao mudar um deles, mude nos três arquivos. A única diferença permitida: na página inicial os links são `#sobre`; nas outras, `index.html#sobre`.

**Informações que aparecem em vários lugares**: ao alterar alguma delas, use a busca no projeto inteiro.

| Informação                  | Onde aparece                                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRP `06/184387`             | Hero, Sobre, rodapé, `<meta description>`, JSON-LD e política de privacidade.                                                                                   |
| WhatsApp `5511992561321`    | Todos os botões de contato (link `https://wa.me/5511992561321?text=…`), o número exibido `(11) 99256-1321`, o botão flutuante, o JSON-LD e a política.         |
| Mensagem padrão do WhatsApp | Parâmetro `text=` dos links `wa.me`, **codificada** (ex.: `%20` = espaço). Para gerar: no console do navegador, `encodeURIComponent('Sua mensagem')`.           |
| Endereço `Rua Bela Cintra, 968` | Consultório (card Presencial, com "Ver no mapa"), Contato, rodapé, JSON-LD (`streetAddress`) e política de privacidade.                                    |

**Tom de voz**: frases curtas e diretas, nada de linguagem promocional ou motivacional, sem promessa de resultados, depoimentos ou preços (Código de Ética do Psicólogo, art. 20).

**Textos pendentes**: aparecem no site com um destaque tracejado (`<span class="pending">[CONFIRMAR …]</span>`). Ao receber a informação, substitua o `<span …>…</span>` inteiro pelo texto definitivo. Pendências que não aparecem no site (fotos, validação) estão em comentários `<!-- [CONFIRMAR …] -->` ou `<!-- [REVISAR …] -->`. A lista completa está em [`PENDENCIAS.md`](PENDENCIAS.md).

**Hífens**: palavras como `on-line` e `PUC-SP` ficam dentro de `<span class="nowrap">…</span>` para não quebrarem no fim da linha.

**Contato**: é feito exclusivamente pelo WhatsApp (botões e botão flutuante). O site não tem formulário.

---

## Como trocar as fotos

Hoje há dois lugares com imagem provisória (fundo cinza-claro), todos marcados com `<!-- [CONFIRMAR …] -->` no `index.html`:

| Lugar                              | Provisório                               | Foto final                           |
| ---------------------------------- | ---------------------------------------- | ------------------------------------ |
| Consultório → card Presencial      | cinza-claro com uma poltrona desenhada   | horizontal, cerca de 1200 × 800 px   |
| Consultório → card On-line         | cinza-claro com um notebook desenhado    | horizontal, cerca de 1200 × 800 px   |

1. Prepare a foto em **WebP**. O [Squoosh](https://squoosh.app) converte e comprime no navegador.
2. Salve em `img/`, por exemplo `img/consultorio.webp` e `img/online.webp`.
3. No `index.html`, troque o provisório pela imagem.

   **Presencial e On-line (Consultório):** dentro de `<div class="mode__media" aria-hidden="true">`, apague o comentário da ilustração e o `<svg class="mode__illustration">…</svg>`, coloque a foto e **remova o `aria-hidden="true"`** do `div`:

   ```html
   <div class="mode__media">
     <img
       src="img/consultorio.webp"
       alt="Consultório na Rua Bela Cintra"
       class="mode__photo"
       width="1200"
       height="800"
       loading="lazy"
     />
   </div>
   ```

Use `width` e `height` com as dimensões reais da imagem, para o layout não pular enquanto ela carrega. O `alt` deve descrever a foto em poucas palavras.

---

## Logotipo

O logo oficial é a **opção 5** da pasta de identidade visual (horizontal: monograma + "Dienifer Doebber · Psicóloga & Psicanalista"). Os arquivos usados no site ficam em `img/logo/`:

| Arquivo                                         | Uso                                         |
| ----------------------------------------------- | ------------------------------------------- |
| `logo-preto.png` / `logo-preto@2x.png`          | header e menu mobile (fundo branco)         |
| `logo-branco.png` / `logo-branco@2x.png`        | rodapé e seção Contato (fundo preto)        |

Os ícones (`img/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-*.png`) e a imagem de compartilhamento `img/og-image.png` (1200 × 630) também saem do logo.

Os originais (PNG 9000 × 9000) estão em `_identidade-visual/`, **fora do git e do site publicado** (pasta listada no `.gitignore`). Guarde uma cópia deles em outro lugar.

**Como trocar o logo**: os originais são imagens (PNG), não vetores. Para gerar novas versões, recorte as margens, deixe o fundo transparente e exporte em duas alturas: 48 px (`logo-preto.png`) e 96 px (`logo-preto@2x.png`), e o mesmo para o branco. Mantendo os mesmos nomes, nada mais muda no HTML. Se a proporção mudar, atualize `width` e `height` das `<img class="logo">` nos três HTML. A altura exibida é definida no CSS (`--logo-h`: 36 px no header mobile, 44 px no desktop, 48 px no rodapé e no Contato). Alt do logo: `Dienifer Doebber — Psicóloga`.

---

## Cores, fontes e espaçamentos

Ficam no início do `css/style.css`, na seção **Tokens** (`:root { … }`).

**Paleta** (só preto, branco e cinza):

| Token                | Cor       | Uso                                                                              |
| -------------------- | --------- | -------------------------------------------------------------------------------- |
| `--color-black`      | `#000000` | texto, botão primário, ícones, seção Contato, rodapé, botão flutuante            |
| `--color-white`      | `#FFFFFF` | fundo, cards, texto sobre preto                                                  |
| `--color-gray`       | `#A6A6A6` | **só** bordas, filetes, divisores, contornos de ícones e detalhes decorativos    |
| `--color-gray-light` | `#F4F4F4` | **só** fundo de seções alternadas e placeholders de foto                         |

**Regra do cinza:** `#A6A6A6` sobre branco tem contraste de 2,43:1 e **não pode ser usado em texto**. Texto é sempre preto sobre branco ou cinza-claro (21:1 e 19,09:1) ou branco sobre preto (21:1).

**Fundo preto:** a seção Contato (`data-surface="black"`) e o rodapé invertem automaticamente texto, linhas, foco, ícones e botões. Para criar outro bloco escuro, use o mesmo atributo.

**Fontes** (em `fonts/`, auto-hospedadas, sem Google Fonts): **Quicksand 500** nos títulos e **Mulish 400/700** no texto e nos negritos. Para trocar uma fonte, substitua o arquivo `.woff2` (subset latin), ajuste o `@font-face` no início do `css/style.css` e o `<link rel="preload">` nos três HTML.

**Formas**: raio de 14px nos cards (`--radius-card`), 28px nos blocos grandes (`--radius-block`), 12px nas imagens (`--radius-image`). Botões em pílula.

**Espaços**: `--space-section` (72 → 120px entre seções) e `--container-content` (1000px de largura útil).

---

## Publicação (GitHub Pages)

O site é servido pelo GitHub Pages a partir da raiz do branch `main` (**Settings → Pages → Deploy from a branch → `main` / `(root)`**). Para publicar uma alteração:

```bash
git add -A
git commit -m "conteúdo: descreva a alteração"
git push
```

O GitHub atualiza o site em cerca de 1 minuto. No celular, pode ser preciso recarregar a página.

**Não apague o arquivo `.nojekyll`**: sem ele, o GitHub ignora a pasta `.well-known/`.

**Caminhos sempre relativos**: use `css/style.css`, `img/foto.webp` e `index.html#contato`, nunca começando com `/`. O site fica numa subpasta (`/dieniferdoebber/`), e um caminho começando com `/` aponta para fora dela, o que deixa a página sem estilo. A única exceção é o `<base href="/dieniferdoebber/">` da `404.html`, porque o GitHub mostra essa página em qualquer endereço inexistente. Se o nome do repositório mudar, atualize esse `<base>` e as URLs completas `https://tha-github.github.io/dieniferdoebber/…` (canonical, Open Graph, JSON-LD e `sitemap.xml`).

---

## Segurança e privacidade

- **Sem terceiros:** nenhum cookie, analytics ou script externo. Fontes e imagens são servidas pelo próprio site. Não há formulário: o contato é só pelo WhatsApp (a CSP mantém `form-action 'none'`).
- **CSP em `<meta>`:** cada página tem uma Content-Security-Policy no `<head>` que só permite arquivos do próprio site. Por isso, **não use `style="…"`, `<style>` nem `<script>` com código dentro do HTML**: o navegador bloqueia. Todo estilo vai no `css/style.css` e todo script no `js/main.js`. Para incluir algo externo (por exemplo, analytics aprovado), é preciso ajustar a CSP nos três HTML e a política de privacidade.
- **Limitações do GitHub Pages:** ele não permite headers HTTP próprios, então algumas proteções (impedir que o site seja exibido dentro de outro, `Permissions-Policy`, HSTS com preload) não podem ser ativadas. Detalhes em [`SECURITY.md`](SECURITY.md).
- **Links externos** (WhatsApp e Google Maps) abrem em nova aba com `rel="noopener noreferrer"`.

---

## Checklist antes de publicar uma mudança

- [ ] Abriu o `index.html` no navegador e conferiu a seção alterada no computador e no celular (F12 → modo dispositivo).
- [ ] Nenhum caminho novo começa com `/`.
- [ ] Nenhum `style="…"` ou `<script>` com código no HTML.
- [ ] Mudou header, menu ou rodapé? Repetiu nos três HTML.
- [ ] Texto revisado no tom do `prompt.md`.
