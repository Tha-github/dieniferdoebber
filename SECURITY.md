# Segurança

Site estático e institucional (Astro), sem formulários, banco de dados, cookies
ou scripts de terceiros. O contato com a psicóloga acontece só pelo WhatsApp.

## Como relatar uma vulnerabilidade

Envie um e-mail para **seguranca@dieniferdoebber.com.br** `[CONFIRMAR]` com a
descrição do problema, os passos para reproduzir e o impacto esperado. Não abra
issue pública. O retorno inicial é feito em até 5 dias úteis.

O mesmo contato está em `/.well-known/security.txt` (RFC 9116).

## Medidas adotadas

- **Headers de segurança:** CSP restritiva só com `'self'` (sem `unsafe-inline` nem
  hashes), HSTS com preload, `nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  `Cross-Origin-Opener-Policy` e `frame-ancestors 'none'`. A fonte única é
  `scripts/security-headers.mjs`, que gera `vercel.json` e `public/_headers`
  (`npm run headers`).
- **Build sem conteúdo inline executável:** sem `<style>`, `style=` ou `<script>`
  inline. O único bloco inline é o JSON-LD (dados, não executado).
- **Zero terceiros:** fontes auto-hospedadas e nenhuma requisição a outros domínios.
  Os links externos (WhatsApp e Google Maps) usam `rel="noopener noreferrer"`.
- **Dependências:** versões fixas (`save-exact`, `package-lock.json`) e
  `npm run audit` (`npm audit --audit-level=high`) antes de cada publicação.
- **Segredos:** o projeto não usa chaves nem tokens. Arquivos `.env*` estão no
  `.gitignore`.

## Ao alterar o site

- Não adicionar `style=` ou `<script>` inline: a CSP vai bloqueá-los.
- Um novo domínio externo (por exemplo, analytics aprovado) exige atualizar a CSP
  em `scripts/security-headers.mjs`, rodar `npm run headers` e atualizar a
  política de privacidade.
