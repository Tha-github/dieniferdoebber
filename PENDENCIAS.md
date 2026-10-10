# Pendências para a cliente

> Ao resolver um item: troque o marcador (`<span class="pending">[…]</span>` ou o comentário `<!-- […] -->`) pelo conteúdo definitivo no arquivo indicado e apague a linha correspondente aqui.

**21 itens** (`[CONFIRMAR]` = informação ou material da cliente · `[REVISAR]` = validação pela cliente ou jurídica), mais as decisões no final.

## Fotos

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Hero → retrato profissional | foto profissional (vertical 4:5) | [index.html:241](index.html#L241) |
| Sobre a psicóloga → retrato profissional | foto profissional (vertical 4:5) | [index.html:260](index.html#L260) |
| Como funciona → Presencial: foto do consultório (opcional) | enviar foto ou decidir não usar | [index.html:378](index.html#L378) |

## Conteúdo do site

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Sobre a psicóloga → texto em primeira pessoa (validar com a cliente) | validar o texto da seção Sobre (primeira pessoa) | [index.html:264](index.html#L264) |
| Como funciona → Duração e frequência | ex.: sessões de 50 minutos, frequência combinada individualmente | [index.html:394](index.html#L394) |
| Formação → Psicologia | instituição/ano | [index.html:437](index.html#L437) |
| Formação → Psicanálise | curso/instituição | [index.html:443](index.html#L443) |
| Formação → Psicopatologia | curso/instituição | [index.html:449](index.html#L449) |
| Formação → Formações complementares (PUC-SP · IPq-USP · Instituto Sedes Sapientiae) | nomes dos cursos | [index.html:457](index.html#L457) |
| Trajetória → 2022, CMB (São Paulo) | nome por extenso | [index.html:483](index.html#L483) |
| Trajetória → 2021, NASMU | nome por extenso | [index.html:493](index.html#L493) |
| Perguntas frequentes → Qual a duração e a frequência das sessões? | resposta | [index.html:559](index.html#L559) |
| Perguntas frequentes → Atende por convênio? | ex.: atendimento particular, com emissão de recibo para reembolso | [index.html:570](index.html#L570) |
| Rodapé (nas 3 páginas) → link do cadastro e-Psi (Resolução CFP nº 11/2018) | link do cadastro e-Psi | [index.html:811](index.html#L811)<br>[politica-de-privacidade.html:403](politica-de-privacidade.html#L403)<br>[404.html:201](404.html#L201) |

## Política de privacidade (validação jurídica)

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Quem é a responsável → dispensa de encarregado (DPO) | confirmar enquadramento como agente de pequeno porte | [politica-de-privacidade.html:206](politica-de-privacidade.html#L206) |
| Registros técnicos da hospedagem (GitHub Pages) | confirmar o prazo de retenção dos registros de acesso do GitHub Pages | [politica-de-privacidade.html:258](politica-de-privacidade.html#L258) |
| Contato pelo WhatsApp | base legal (art. 7º e art. 11 da LGPD), prazo de guarda das conversas e se há uso de WhatsApp Business ou de outro aparelho além do pessoal | [politica-de-privacidade.html:297](politica-de-privacidade.html#L297) |
| Sigilo profissional → registros do atendimento | confirmar forma de registro e prazo de guarda (Resolução CFP nº 001/2009) | [politica-de-privacidade.html:324](politica-de-privacidade.html#L324) |
| Contato e atualizações → canais de contato | incluir e-mail como canal alternativo | [politica-de-privacidade.html:372](politica-de-privacidade.html#L372) |

## Contato de segurança

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| security.txt → campo Contact | e-mail de contato | [.well-known/security.txt:2](.well-known/security.txt#L2) |
| SECURITY.md → Como relatar uma vulnerabilidade | e-mail de contato | [SECURITY.md:7](SECURITY.md#L7) |

## Decisões fora do código

- [ ] **Analytics:** decidir. Padrão: nenhum. Se aprovado, só ferramenta sem cookies, com ajuste da CSP e da política.
- [ ] **Data da política de privacidade:** atualizar "Última atualização" em `politica-de-privacidade.html` após a revisão jurídica.
- [ ] **security.txt:** renovar o campo `Expires` antes de 2027-10-10.
