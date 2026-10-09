# Dienifer Doebber · Psicanálise · Psicologia Clínica

Site institucional (one-page) da psicóloga **Dienifer Doebber, CRP 06/184387**. O contato é feito só pelo WhatsApp.

Feito com [Astro](https://astro.build), gera um site estático: HTML, CSS e um mínimo de JavaScript. Não usa banco de dados, formulários, cookies nem scripts de terceiros.

- **Briefing (fonte de verdade):** [`prompt.md`](prompt.md)
- **Convenções técnicas e de conteúdo:** [`CLAUDE.md`](CLAUDE.md)
- **Itens pendentes com a cliente:** [`PENDENCIAS.md`](PENDENCIAS.md)
- **Segurança:** [`SECURITY.md`](SECURITY.md)

---

## Como rodar

Requer **Node.js 22.12 ou mais recente** (desenvolvido com Node 24) e npm.

```bash
npm install          # instala as dependências (versões fixas no package-lock.json)
npm run dev          # servidor de desenvolvimento em http://localhost:4321
npm run build        # gera o site final em dist/
npm run preview      # serve o dist/ localmente
```

### Todos os scripts

| Comando                  | O que faz                                                                                                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`            | Desenvolvimento com recarga automática.                                                                                |
| `npm run build`          | Gera o site em `dist/`.                                                                                                |
| `npm run preview`        | Serve `dist/` (sem os headers de segurança).                                                                           |
| `npm run preview:secure` | Serve `dist/` **com** os headers de produção (CSP etc.) e compressão, em http://localhost:4322. Use antes de publicar. |
| `npm run check`          | Verificação de tipos (TypeScript/Astro).                                                                               |
| `npm run format`         | Formata o código com Prettier.                                                                                         |
| `npm run audit`          | `npm audit --audit-level=high`: falha se houver vulnerabilidade alta ou crítica.                                       |
| `npm run brand`          | Regenera logotipo, favicons e imagem de compartilhamento (ver "Marca").                                                |
| `npm run headers`        | Regenera `vercel.json` e `public/_headers` a partir de `scripts/security-headers.mjs`.                                 |
| `npm run pendencias`     | Regenera `PENDENCIAS.md` a partir dos marcadores no código.                                                            |

### Checklist antes de publicar

```bash
npm run check && npm run audit && npm run build && npm run preview:secure
```

Abra http://localhost:4322, navegue pela página e confira o console do navegador (F12): não deve aparecer nenhum erro de CSP.

---

## Como editar os textos

Todo o texto do site fica em três arquivos. Nenhum componente tem texto fixo.

| Arquivo                                      | Conteúdo                                                                                                                     |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [`src/data/site.ts`](src/data/site.ts)       | Nome, CRP, WhatsApp (número e mensagem padrão), endereço, link do mapa, menu, domínio e textos de SEO (title e description). |
| [`src/data/content.ts`](src/data/content.ts) | Textos das seções: Hero, Sobre, Temas, Como funciona, Formação, FAQ, Contato, Rodapé e página 404.                           |
| [`src/data/privacy.ts`](src/data/privacy.ts) | Política de privacidade.                                                                                                     |

Regras:

- **Mantenha o tom** descrito no `prompt.md` (seção 2): frases curtas e diretas, primeira pessoa só na seção Sobre, nada de linguagem promocional ou motivacional, sem promessa de resultados, depoimentos ou preços (Código de Ética, art. 20).
- **Marcadores de pendência:** textos com `[CONFIRMAR …]` ou `[REVISAR …]` aparecem no site com um destaque tracejado. Ao substituir o marcador pelo texto definitivo, o destaque some sozinho. Depois rode `npm run pendencias` para atualizar a lista.
- **WhatsApp:** altere o número e a mensagem só em `site.ts` (`whatsappNumber` e `whatsappMessage`). Todos os botões usam esse link, com a mensagem codificada automaticamente.
- **Respostas do FAQ:** ficam em `content.ts`, em `faq.items`.
- **Formação e trajetória:** ficam em `content.ts`, em `education`. A linha do tempo é ordenada automaticamente do ano mais recente para o mais antigo.

---

## Como trocar as fotos

As imagens são otimizadas no build: viram AVIF e WebP em vários tamanhos, com largura e altura definidas para não deslocar o layout.

### Retrato profissional (Hero)

1. Salve a foto em `src/assets/images/`, por exemplo `retrato.jpg`. Use formato vertical (4:5) e no mínimo 1200 px de largura.
2. Em [`src/data/content.ts`](src/data/content.ts), importe a imagem no topo e preencha `hero.portrait`:

   ```ts
   import retrato from '../assets/images/retrato.jpg';

   export const hero = {
     // …
     portrait: { src: retrato, alt: 'Retrato de Dienifer Doebber' },
   };
   ```

3. O texto `alt` deve descrever a foto em poucas palavras. O retrato é carregado com prioridade alta, porque fica acima da dobra.

### Foto do consultório (seção Sobre, opcional)

- **Com foto:** salve em `src/assets/images/` e preencha `about.office.photo` da mesma forma (formato horizontal 3:2). Ela é carregada sob demanda (lazy).
- **Sem foto:** defina `about.office.showPlaceholder: false` para remover o espaço reservado.

Evite imagens de banco genéricas e os clichês listados no `prompt.md` (cérebros, quebra-cabeças, borboletas, mãos dadas etc.).

---

## Marca (logotipo e ícones)

O wordmark "Dienifer Doebber", o monograma "DD" e a imagem de compartilhamento são gerados por [`scripts/generate-brand.mjs`](scripts/generate-brand.mjs), que converte o texto das fontes em desenhos vetoriais. Para mudar o texto, as proporções ou as cores, edite o script e rode `npm run brand`. Não edite os arquivos gerados à mão: `src/components/Logo.paths.ts`, `public/favicon.*`, `public/icon-*.png`, `public/apple-touch-icon.png` e `public/og-image.png`.

As versões avulsas do wordmark (fundo claro e escuro), para uso fora do site, ficam em `src/assets/brand/`.

---

## Deploy

O projeto já está configurado para **Vercel** e para **Netlify**. Os headers de segurança e de cache são os mesmos nos dois, gerados a partir de uma única fonte (`npm run headers`).

### Vercel

1. Suba o repositório para o GitHub, GitLab ou Bitbucket.
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e importe o repositório.
3. A Vercel detecta o Astro. As configurações de build e os headers vêm do [`vercel.json`](vercel.json) e não precisam ser alterados no painel.
4. Clique em **Deploy**. Cada novo commit no branch principal publica automaticamente.

### Netlify

1. Suba o repositório para o GitHub, GitLab ou Bitbucket.
2. Em [app.netlify.com](https://app.netlify.com), clique em **Add new site → Import an existing project** e escolha o repositório.
3. O build (`npm run build`), a pasta publicada (`dist`) e a versão do Node vêm do [`netlify.toml`](netlify.toml). Os headers vêm de `public/_headers`.
4. Clique em **Deploy**.

Depois de escolher o host, informe-o na política de privacidade (há um item em `PENDENCIAS.md`).

---

## Domínio

1. **Configure o domínio no projeto:** edite `url` em [`src/data/site.ts`](src/data/site.ts), sem barra no final. Esse valor alimenta a URL canônica, o Open Graph, o JSON-LD, o sitemap e o `robots.txt`. Atualize também o e-mail e o domínio em [`public/.well-known/security.txt`](public/.well-known/security.txt) e em [`SECURITY.md`](SECURITY.md). Faça commit e publique.
2. **Adicione o domínio no host:**
   - Vercel: **Project → Settings → Domains → Add**.
   - Netlify: **Site configuration → Domain management → Add a domain**.
3. **Aponte o DNS** no registro do domínio (Registro.br, por exemplo). Os valores usuais estão abaixo, mas **use sempre os que o painel do host mostrar**:

   | Host    | Domínio raiz (`dieniferdoebber.com.br`) | `www`                                  |
   | ------- | --------------------------------------- | -------------------------------------- |
   | Vercel  | registro `A` → `76.76.21.21`            | `CNAME` → `cname.vercel-dns.com`       |
   | Netlify | registro `A` → `75.2.60.5`              | `CNAME` → `<nome-do-site>.netlify.app` |

4. O certificado HTTPS é emitido automaticamente pelo host, em alguns minutos ou até algumas horas depois que o DNS propagar.
5. **HSTS preload (opcional e difícil de reverter):** o site já envia `Strict-Transport-Security` com `preload`. Só cadastre o domínio em [hstspreload.org](https://hstspreload.org) quando o domínio for definitivo e todos os subdomínios funcionarem em HTTPS.

---

## Estrutura

```
src/
  data/           site.ts · content.ts · privacy.ts — todo o conteúdo
  components/     seções da página (Header, Hero, About, Themes, Practice,
                  Education, Faq, Contact, Footer, WhatsAppFloat…)
  components/ui/  componentes base (Container, Section, Heading, Button…)
  layouts/        BaseLayout.astro (head, SEO, favicons, skip link)
  pages/          index · politica-de-privacidade · 404 · robots.txt · manifest
  styles/         tokens.css (cores, tipografia, espaços) · global.css
  utils/          typography.ts (formatação de texto e marcadores)
  assets/         images/ (fotos) · brand/ (wordmark avulso)
scripts/          marca, headers, servidor de preview seguro, pendências
public/           arquivos servidos como estão (ícones, _headers, security.txt)
```
