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
js/main.js                     header ao rolar, menu mobile, reveal, botão do WhatsApp
fonts/                         Cormorant Garamond e Inter (auto-hospedadas)
img/                           logotipo, favicons, ícones e imagem de compartilhamento
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

Os blocos são: `HEADER`, `MENU MOBILE`, `HERO`, `SOBRE`, `TEMAS`, `COMO FUNCIONA`, `FORMAÇÃO E TRAJETÓRIA`, `PERGUNTAS FREQUENTES`, `CONTATO`, `RODAPÉ` e o botão flutuante do WhatsApp.

**Textos que se repetem em várias páginas**: o header, o menu mobile e o rodapé estão em `index.html`, `politica-de-privacidade.html` e `404.html`. Ao mudar um deles, mude nos três arquivos (use "buscar e substituir" do editor).

**Informações que aparecem em vários lugares**: ao alterar alguma delas, use a busca no projeto inteiro.

| Informação                  | Onde aparece                                                                                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRP `06/184387`             | Hero, Sobre, rodapé, `<meta description>`, JSON-LD e política de privacidade.                                                                         |
| WhatsApp `5511992561321`    | Todos os botões de contato (link `https://wa.me/5511992561321?text=…`), o número exibido `(11) 99256-1321`, o JSON-LD e a política de privacidade.    |
| Mensagem padrão do WhatsApp | Parâmetro `text=` dos links `wa.me`, **codificada** (ex.: `%20` = espaço). Para gerar: no console do navegador, `encodeURIComponent('Sua mensagem')`. |
| Endereço                    | Seção Como funciona, Contato (com o link "Ver no mapa") e JSON-LD.                                                                                    |

**Tom de voz**: mantenha o que está no `prompt.md` (seção 2). Frases curtas e diretas, primeira pessoa só na seção Sobre, nada de linguagem promocional ou motivacional, sem promessa de resultados, depoimentos ou preços (Código de Ética do Psicólogo, art. 20).

**Textos pendentes**: aparecem no site com um destaque tracejado, assim:

```html
<span class="pending">[CONFIRMAR instituição/ano]</span>
```

Ao receber a informação, substitua o `<span …>…</span>` inteiro pelo texto definitivo. A lista completa está em [`PENDENCIAS.md`](PENDENCIAS.md). Quando não houver mais nenhum `pending`, apague também o bloco `.pending` do `css/style.css`.

**Hífens**: palavras como `on-line` e `PUC-SP` ficam dentro de `<span class="nowrap">…</span>` para não quebrarem no fim da linha. Mantenha esse padrão em textos novos.

---

## Como trocar as fotos

Hoje o hero (retrato) e a seção Sobre (consultório) mostram um retângulo bege no lugar da foto.

1. Prepare a foto em **WebP**: retrato vertical 4:5, com cerca de 960 × 1200 px; consultório horizontal 3:2, com cerca de 1200 × 800 px. O [Squoosh](https://squoosh.app) converte e comprime no navegador.
2. Salve em `img/`, por exemplo `img/retrato.webp`.
3. No `index.html`, troque o placeholder pela imagem.

   **Retrato (Hero):** procure `hero__portrait--placeholder` e substitua a linha por:

   ```html
   <img
     src="img/retrato.webp"
     alt="Retrato de Dienifer Doebber"
     class="hero__portrait"
     width="960"
     height="1200"
     fetchpriority="high"
   />
   ```

   **Consultório (Sobre):** procure `about__photo--placeholder` e substitua por:

   ```html
   <img
     src="img/consultorio.webp"
     alt="Consultório"
     class="about__photo"
     width="1200"
     height="800"
     loading="lazy"
   />
   ```

   Se não houver foto do consultório, apague o bloco `<div class="about__media">…</div>`.

Use `width` e `height` com as dimensões reais da imagem, para o layout não pular enquanto ela carrega. O `alt` deve descrever a foto em poucas palavras. Evite imagens de banco genéricas e os clichês listados no `prompt.md`.

---

## Cores, fontes e espaçamentos

Ficam no início do `css/style.css`, na seção **Tokens** (`:root { … }`), por exemplo `--color-navy`, `--text-base` e `--space-section`. Mude o valor do token e o site inteiro acompanha. A paleta e o contraste (WCAG AA) foram definidos no `prompt.md`, seção 3.

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

- **Sem terceiros:** nenhum formulário, cookie, analytics ou script externo. Fontes e imagens são servidas pelo próprio site.
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
