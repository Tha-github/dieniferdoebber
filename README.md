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
js/main.js                     header ao rolar, menu mobile, reveal, botão do WhatsApp, formulário
fonts/                         Quicksand e Mulish (auto-hospedadas)
img/                           logotipo, selo DD, favicons, ícones e imagem de compartilhamento
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
<!-- ===================== SOBRE ===================== -->
```

Na ordem da página: `HEADER`, `MENU MOBILE`, `HERO`, `TEMAS`, `SOBRE`, `COMO FUNCIONA`, `FORMAS DE ATENDIMENTO`, `FORMAÇÃO E TRAJETÓRIA`, `PERGUNTAS FREQUENTES`, `CONTATO`, `RODAPÉ` e o botão flutuante do WhatsApp.

**Estrutura de cada seção**: todas, exceto o hero e o Sobre, começam com o mesmo cabeçalho centralizado:

```html
<header class="section-head">
  <h2 id="temas-title" class="heading heading--section">O que se trabalha em análise</h2>
  <p class="section-head__intro">Introdução curta (opcional).</p>
</header>
```

**Negritos**: marque de 2 a 4 expressões-chave por bloco com `<strong>…</strong>`. O CSS as deixa em negrito e num marrom mais escuro. Não use mais que isso, senão o destaque perde o efeito.

**Cards**: os temas, os blocos de "Como funciona", a trajetória e o FAQ são cards. Para mudar um texto, edite o `<h3 class="card__title">` (título) e o `<p class="card__text">` (frase) do card. Os ícones são desenhos SVG em linha fina, dentro do próprio HTML, logo acima do título. Para trocar um ícone, substitua o `<svg class="icon" …>…</svg>` inteiro por outro na mesma grade (`viewBox="0 0 36 36"`, só traços, sem preenchimento). Não use cérebro, lótus, borboleta, coração partido, quebra-cabeça nem mãos (ver `prompt.md`).

**Header, menu mobile e rodapé são idênticos** em `index.html`, `politica-de-privacidade.html` e `404.html`. Ao mudar um deles, mude nos três arquivos. A única diferença permitida: na página inicial os links do menu são `#sobre`; nas outras, `index.html#sobre`.

**Informações que aparecem em vários lugares**: ao alterar alguma delas, use a busca no projeto inteiro.

| Informação                  | Onde aparece                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CRP `06/184387`             | Hero, Sobre ("Psicóloga clínica · CRP…"), rodapé, `<meta description>`, JSON-LD e política de privacidade.                                                                           |
| WhatsApp `5511992561321`    | Todos os botões de contato (link `https://wa.me/5511992561321?text=…`), o número exibido `(11) 99256-1321`, a constante `WHATSAPP_NUMERO` em `js/main.js`, o JSON-LD e a política. |
| Mensagem padrão do WhatsApp | Parâmetro `text=` dos links `wa.me`, **codificada** (ex.: `%20` = espaço). Para gerar: no console do navegador, `encodeURIComponent('Sua mensagem')`.                                |
| Endereço                    | Formas de atendimento (card Presencial, com "Ver no mapa"), Contato (também com "Ver no mapa") e JSON-LD.                                                                          |

**Tom de voz**: mantenha o que está no `prompt.md` (seção 2). Frases curtas e diretas, primeira pessoa só na seção Sobre, nada de linguagem promocional ou motivacional, sem promessa de resultados, depoimentos ou preços (Código de Ética do Psicólogo, art. 20).

**Textos pendentes**: aparecem no site com um destaque tracejado, assim:

```html
<span class="pending">[CONFIRMAR instituição/ano]</span>
```

Ao receber a informação, substitua o `<span …>…</span>` inteiro pelo texto definitivo. Pendências que não aparecem no site (fotos, validação de texto e do selo) estão em comentários `<!-- [CONFIRMAR …] -->` ou `<!-- [REVISAR …] -->`. A lista completa está em [`PENDENCIAS.md`](PENDENCIAS.md). Quando não houver mais nenhum `pending`, apague também o bloco `.pending` do `css/style.css`.

**Hífens**: palavras como `on-line` e `PUC-SP` ficam dentro de `<span class="nowrap">…</span>` para não quebrarem no fim da linha. Mantenha esse padrão em textos novos.

### Seção "Quem é Dienifer Doebber?" (`id="sobre"`)

No bloco `SOBRE` do `index.html`:

- **Título e registro:** `<h2 id="sobre-title">` e `<p class="about__meta">Psicóloga clínica · CRP 06/184387</p>`.
- **Retrato:** `<div class="about__photo about__photo--placeholder">`. Veja "Como trocar as fotos".
- **Selo "DD":** o círculo sobre o canto do retrato usa `img/selo-dd.svg` (o monograma em linha dourada). Para retirar o selo, apague o `<span class="about__seal">…</span>`.
- **Texto:** os quatro parágrafos dentro de `<div class="about__text">`, em primeira pessoa.

### Formulário de contato

O formulário fica no bloco `CONTATO` do `index.html` (`<form class="contact-form">`, dentro do card branco `contact__card`). **Ele não envia nada ao site**: o `js/main.js` valida os campos, monta uma mensagem e abre o WhatsApp em nova aba, já com o texto preenchido, para a pessoa conferir e enviar.

- **Textos dos campos, dicas e opções:** direto no HTML (`<label>`, `<p class="form-hint">`, `<input type="radio" value="…">`).
- **Texto da mensagem enviada:** função `montarMensagem()` em `js/main.js` (seção 6). Hoje o formato é: _"Olá, Dienifer. Meu nome é {nome}. Gostaria de informações sobre o atendimento ({modalidade}). Melhor período: {período}. Contato: {contato}. {mensagem}"_. Partes não preenchidas são omitidas.
- **Como cada modalidade aparece na mensagem:** objeto `MODALIDADES` em `js/main.js`. A chave é o `value` do radio no HTML.
- **Mensagens de erro:** no array `regras`, em `js/main.js`.
- **Limites de tamanho:** `LIMITES` em `js/main.js` e o atributo `maxlength` no HTML. Mantenha os dois iguais; o contador usa o valor de `LIMITES.mensagem`.
- **Número do WhatsApp:** `WHATSAPP_NUMERO` em `js/main.js`, além dos links `wa.me` do HTML.

Sem JavaScript, o formulário fica oculto (`css/noscript.css`) e aparece um aviso para usar o botão "Conversar pelo WhatsApp". Não acrescente campos que peçam informações de saúde: o texto de apoio orienta a não detalhar o motivo da procura por escrito.

---

## Como trocar as fotos

Hoje há três lugares com imagem provisória, todos marcados com `<!-- [CONFIRMAR …] -->` no `index.html`:

| Lugar                                     | Provisório                                 | Foto final                                   |
| ----------------------------------------- | ------------------------------------------ | -------------------------------------------- |
| Sobre → retrato                           | retângulo com gradiente bege               | vertical 4:5, cerca de 960 × 1200 px         |
| Formas de atendimento → card Presencial   | gradiente com uma poltrona desenhada       | horizontal, cerca de 1200 × 800 px           |
| Formas de atendimento → card On-line      | gradiente com um notebook desenhado        | horizontal, cerca de 1200 × 800 px           |

1. Prepare a foto em **WebP**. O [Squoosh](https://squoosh.app) converte e comprime no navegador.
2. Salve em `img/`, por exemplo `img/retrato.webp`, `img/consultorio.webp` e `img/online.webp`.
3. No `index.html`, troque o provisório pela imagem.

   **Retrato (Sobre):** procure `about__photo--placeholder` e substitua a linha por:

   ```html
   <img
     src="img/retrato.webp"
     alt="Dienifer Doebber"
     class="about__photo"
     width="960"
     height="1200"
     loading="lazy"
   />
   ```

   O selo "DD" continua sobre o canto da foto.

   **Presencial e On-line (Formas de atendimento):** dentro de `<div class="mode__media" aria-hidden="true">`, apague o comentário da ilustração e o `<svg class="mode__illustration">…</svg>`, coloque a foto no lugar e **remova o `aria-hidden="true"`** do `div` (a foto passa a ter descrição):

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

   A foto ocupa cerca de 45% do card no desktop e se esmaece em direção ao fundo bege (o gradiente vem do CSS). No celular, fica em cima do texto.

Use `width` e `height` com as dimensões reais da imagem, para o layout não pular enquanto ela carrega. O `alt` deve descrever a foto em poucas palavras. Evite imagens de banco genéricas e os clichês listados no `prompt.md`.

---

## Cores, fontes e espaçamentos

Ficam no início do `css/style.css`, na seção **Tokens** (`:root { … }`). Mude o valor do token e o site inteiro acompanha.

**Cores** (visual claro, quente e delicado):

| Token                       | Cor       | Uso                                                                    |
| --------------------------- | --------- | ---------------------------------------------------------------------- |
| `--color-bg`                | `#FFFDFA` | fundo principal, header                                                |
| `--color-cream`             | `#FBF5EE` | seções alternadas, blocos arredondados (Como funciona, Contato)       |
| `--color-sand`              | `#F6EBDD` | cards, FAQ, rodapé                                                     |
| `--color-sand-strong`       | `#EFDFCB` | bordas e divisores                                                     |
| `--color-gold`              | `#C29A6B` | ícones e detalhes decorativos (**nunca em texto**)                     |
| `--color-gold-dark`         | `#9C774E` | títulos de seção (≥ 24px), anos da trajetória, foco                    |
| `--color-gold-deep`         | `#856542` | textos dourados pequenos: sobretítulos, títulos de card, links, CRP    |
| `--color-btn-from` / `-to`  | `#E6C9A3` → `#D2AC80` | gradiente dos botões                                       |
| `--color-btn-text`          | `#544234` | texto e ícone sobre o gradiente (`#45362A` no hover)                   |
| `--color-text`              | `#7A6858` | texto corrido                                                          |
| `--color-text-strong`       | `#5E4A3A` | negritos e destaques                                                   |
| `--color-field-border`      | `#AC885F` | borda dos campos do formulário                                         |

Todos os pares de texto e fundo passam no contraste WCAG AA (tabela no `CLAUDE.md`). Ao trocar uma cor, confira o contraste (por exemplo em https://webaim.org/resources/contrastchecker/).

**Fontes** (em `fonts/`, auto-hospedadas, sem Google Fonts): **Quicksand 500** nos títulos e **Mulish 400/700** no texto e nos negritos. Para trocar uma fonte, substitua o arquivo `.woff2` (subset latin), ajuste o `@font-face` no início do `css/style.css` e o `<link rel="preload">` nos três HTML.

**Formas**: raio de 14px nos cards (`--radius-card`), 28px nos blocos grandes (`--radius-block`), 12px nas imagens (`--radius-image`) e 10px nos campos (`--radius-field`). Botões em pílula.

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

- **Sem terceiros:** nenhum cookie, analytics ou script externo. Fontes e imagens são servidas pelo próprio site. O formulário de contato não envia dados: só monta a mensagem e abre o WhatsApp.
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
