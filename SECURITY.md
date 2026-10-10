# Segurança

Site estático e institucional (HTML, CSS e JavaScript puros), publicado no GitHub Pages. Não tem banco de dados, cookies nem scripts de terceiros. O contato com a psicóloga acontece só pelo WhatsApp: o formulário de contato não envia dados a nenhum servidor, apenas monta uma mensagem e abre o WhatsApp em nova aba.

## Como relatar uma vulnerabilidade

Envie um e-mail para **seguranca@exemplo.com** `[CONFIRMAR e-mail de contato]` com a descrição do problema, os passos para reproduzir e o impacto esperado. Não abra issue pública. O retorno inicial é feito em até 5 dias úteis.

O mesmo contato está em `/.well-known/security.txt` (RFC 9116).

## Medidas adotadas

- **Content-Security-Policy em `<meta>`** nas três páginas: só recursos do próprio site (`default-src 'self'`), sem `unsafe-inline`, sem `eval`, `object-src 'none'`, `form-action 'none'`, `base-uri 'self'`, `upgrade-insecure-requests`. O único bloco inline é o JSON-LD, que é só dados e não é executado.
- **Referrer-Policy** `strict-origin-when-cross-origin` em `<meta>`.
- **Zero terceiros:** fontes auto-hospedadas e nenhuma requisição a outros domínios ao carregar as páginas. Os links externos (WhatsApp e Google Maps) usam `rel="noopener noreferrer"` e não enviam dados do visitante: o link do WhatsApp leva só a mensagem padrão, e o do mapa só o nome da rua.
- **HTTPS** obrigatório pelo GitHub Pages ("Enforce HTTPS").
- **Sem dependências:** não há `npm`, pacotes ou build. Não há o que atualizar nem auditar.
- **Formulário sem envio:** o formulário de contato não tem `action` e a CSP mantém `form-action 'none'`. O `js/main.js` valida e limpa as entradas (caracteres de controle, espaços, limite de tamanho), aplica `encodeURIComponent` e abre `https://wa.me/…` com `noopener`. Nada é salvo (sem cookies, `localStorage` ou similares).
- **Sem segredos:** o projeto não usa chaves, tokens nem variáveis de ambiente.

## Limitações conhecidas (GitHub Pages)

O GitHub Pages não permite headers HTTP próprios. Por isso, ficam fora do alcance:

- **`frame-ancestors` / `X-Frame-Options`:** impedir que o site seja exibido dentro de outro (clickjacking). Essa diretiva não funciona em `<meta>`. O site não tem formulários nem ações sensíveis, então o risco é baixo.
- **`Permissions-Policy`, `X-Content-Type-Options`, `Cross-Origin-Opener-Policy`.**
- **HSTS com preload** e cache longo dos arquivos.

Para ter todos esses headers, seria preciso publicar em outro host (por exemplo Netlify ou Vercel, com arquivo de headers). A configuração anterior para esses hosts está no histórico do git (tag `astro-v1`).

## Ao alterar o site

- Não adicione `style="…"`, `<style>` ou `<script>` com código no HTML: a CSP bloqueia.
- Um novo domínio externo (por exemplo, analytics aprovado) exige atualizar a CSP nos três HTML e a política de privacidade.
