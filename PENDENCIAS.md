# Pendências para a cliente

> Gerado por `npm run pendencias` em 2026-10-10. Não edite à mão: resolva o item no arquivo indicado e rode o comando de novo.

**20 marcadores no código** (`[CONFIRMAR]` = informação da cliente · `[REVISAR]` = validação jurídica), mais as decisões abaixo que não aparecem como marcador.

## Marcadores no código

### Contato de segurança — `SECURITY.md`

| Linha | Tipo | O que confirmar | Contexto |
|---|---|---|---|
| [8](SECURITY.md#L8) | CONFIRMAR | — | Envie um e-mail para **seguranca@dieniferdoebber.com.br**  com a |

### Contato de segurança — `public/.well-known/security.txt`

| Linha | Tipo | O que confirmar | Contexto |
|---|---|---|---|
| [2](public/.well-known/security.txt#L2) | CONFIRMAR | — | contato e domínio definitivos antes da publicação. |

### Textos do site — `src/data/content.ts`

| Linha | Tipo | O que confirmar | Contexto |
|---|---|---|---|
| [19](src/data/content.ts#L19) | CONFIRMAR | — | Retrato profissional —  pendente com a cliente. |
| [34](src/data/content.ts#L34) | CONFIRMAR | — | Foto do consultório (opcional) —  pendente com a cliente. |
| [85](src/data/content.ts#L85) | CONFIRMAR | ex.: sessões de 50 minutos, frequência combinada individualmente | Duração e frequência |
| [96](src/data/content.ts#L96) | CONFIRMAR | instituição/ano | Psicologia |
| [97](src/data/content.ts#L97) | CONFIRMAR | curso/instituição | Psicanálise |
| [98](src/data/content.ts#L98) | CONFIRMAR | curso/instituição | Psicopatologia |
| [101](src/data/content.ts#L101) | CONFIRMAR | nomes dos cursos | PUC-SP · IPq-USP · Instituto Sedes Sapientiae |
| [115](src/data/content.ts#L115) | CONFIRMAR | nome por extenso | CMB, São Paulo → Atendimento a pessoas em situação de violência. |
| [120](src/data/content.ts#L120) | CONFIRMAR | nome por extenso | NASMU → Atuação com foco em processos de luto. |
| [146](src/data/content.ts#L146) | CONFIRMAR | — | Qual a duração e a frequência das sessões? |
| [150](src/data/content.ts#L150) | CONFIRMAR | ex.: atendimento particular, com emissão de recibo para reembolso | Atende por convênio? |
| [189](src/data/content.ts#L189) | CONFIRMAR | link do cadastro e-Psi | Resolução CFP nº 11/2018 |

### Política de privacidade (validação jurídica) — `src/data/privacy.ts`

| Linha | Tipo | O que confirmar | Contexto |
|---|---|---|---|
| [33](src/data/privacy.ts#L33) | REVISAR | confirmar enquadramento como agente de pequeno porte | Por se tratar de profissional autônoma que realiza tratamento de dados em pequena escal… |
| [52](src/data/privacy.ts#L52) | REVISAR | informar o provedor escolhido (Vercel ou Netlify) e o prazo de retenção dos registros | Esses registros ficam sob responsabilidade do provedor de hospedagem, conforme a políti… |
| [61](src/data/privacy.ts#L61) | REVISAR | base legal (art. 7º e art. 11 da LGPD), prazo de guarda das conversas e se há uso de WhatsApp Business ou de outro aparelho além do pessoal | As conversas não são compartilhadas com terceiros. |
| [76](src/data/privacy.ts#L76) | REVISAR | confirmar forma de registro e prazo de guarda (Resolução CFP nº 001/2009) | Os registros do atendimento são guardados em local seguro, pelo prazo previsto nas norm… |
| [110](src/data/privacy.ts#L110) | REVISAR | incluir e-mail como canal alternativo | Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato pelo W… |

### Dados institucionais — `src/data/site.ts`

| Linha | Tipo | O que confirmar | Contexto |
|---|---|---|---|
| [18](src/data/site.ts#L18) | CONFIRMAR | — | Domínio de produção, sem barra final —  pendente com a cliente. |

## Materiais e decisões fora do código

- [ ] **Retrato profissional** (hero): enviar a foto; ver "Como trocar as fotos" no README.
- [ ] **Foto do consultório** (opcional, seção Sobre): enviar ou decidir não usar (`showPlaceholder: false`).
- [ ] **Domínio**: registrar/confirmar e apontar o DNS (README, "Domínio").
- [ ] **Hospedagem**: escolher Vercel ou Netlify (impacta a política de privacidade).
- [ ] **Analytics**: decidir. Padrão: nenhum. Se aprovado, só ferramenta sem cookies, com ajuste de CSP e da política.
- [ ] **HSTS preload**: só enviar o domínio a hstspreload.org com o domínio definitivo e certeza de HTTPS em todos os subdomínios (difícil de reverter).
- [ ] **Data da política de privacidade**: atualizar `updatedAt` em `src/data/privacy.ts` após a revisão jurídica.
- [ ] **security.txt**: renovar o campo `Expires` antes de 2027-10-08.
