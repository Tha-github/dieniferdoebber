# Pendências para a cliente

> Ao resolver um item: troque o marcador (`<span class="pending">[…]</span>` ou o comentário `<!-- […] -->`) pelo conteúdo definitivo no arquivo indicado e apague a linha correspondente aqui.

**22 itens** (`[CONFIRMAR]` = informação ou material da cliente · `[REVISAR]` = validação pela cliente ou jurídica), mais as decisões no final.

## Fotos

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Sobre → retrato profissional | foto profissional (vertical 4:5) | [index.html:317](index.html#L317) |
| Sobre → selo com o monograma DD sobre o retrato | validar o uso do selo (ou retirá-lo) | [index.html:319](index.html#L319) |
| Formas de atendimento → Presencial: foto do consultório | foto horizontal do consultório (cerca de 1200 × 800 px) | [index.html:447](index.html#L447) |
| Formas de atendimento → On-line: foto | foto horizontal (cerca de 1200 × 800 px) | [index.html:483](index.html#L483) |

## Conteúdo do site

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Sobre → texto em primeira pessoa (validar com a cliente) | validar o texto da seção Sobre (primeira pessoa) | [index.html:332](index.html#L332) |
| Como funciona → Duração e frequência | ex.: sessões de 50 minutos, frequência combinada individualmente | [index.html:415](index.html#L415) |
| Formação → Psicologia | instituição/ano | [index.html:526](index.html#L526) |
| Formação → Psicanálise | curso/instituição | [index.html:532](index.html#L532) |
| Formação → Psicopatologia | curso/instituição | [index.html:538](index.html#L538) |
| Formação → Formações complementares (PUC-SP · IPq-USP · Instituto Sedes Sapientiae) | nomes dos cursos | [index.html:546](index.html#L546) |
| Trajetória → 2022, CMB (São Paulo) | nome por extenso | [index.html:570](index.html#L570) |
| Trajetória → 2021, NASMU | nome por extenso | [index.html:578](index.html#L578) |
| Perguntas frequentes → Qual a duração e a frequência das sessões? | resposta | [index.html:638](index.html#L638) |
| Perguntas frequentes → Atende por convênio? | ex.: atendimento particular, com emissão de recibo para reembolso | [index.html:649](index.html#L649) |
| Rodapé (nas 3 páginas) → link do cadastro e-Psi (Resolução CFP nº 11/2018) | link do cadastro e-Psi | [index.html:893](index.html#L893)<br>[politica-de-privacidade.html:405](politica-de-privacidade.html#L405)<br>[404.html:192](404.html#L192) |

## Política de privacidade (validação jurídica)

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Quem é a responsável → dispensa de encarregado (DPO) | confirmar enquadramento como agente de pequeno porte | [politica-de-privacidade.html:207](politica-de-privacidade.html#L207) |
| Registros técnicos da hospedagem (GitHub Pages) | confirmar o prazo de retenção dos registros de acesso do GitHub Pages | [politica-de-privacidade.html:259](politica-de-privacidade.html#L259) |
| Contato pelo WhatsApp | base legal (art. 7º e art. 11 da LGPD), prazo de guarda das conversas e se há uso de WhatsApp Business ou de outro aparelho além do pessoal | [politica-de-privacidade.html:298](politica-de-privacidade.html#L298) |
| Sigilo profissional → registros do atendimento | confirmar forma de registro e prazo de guarda (Resolução CFP nº 001/2009) | [politica-de-privacidade.html:325](politica-de-privacidade.html#L325) |
| Contato e atualizações → canais de contato | incluir e-mail como canal alternativo | [politica-de-privacidade.html:373](politica-de-privacidade.html#L373) |

## Contato de segurança

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| security.txt → campo Contact | e-mail de contato | [.well-known/security.txt:2](.well-known/security.txt#L2) |
| SECURITY.md → Como relatar uma vulnerabilidade | e-mail de contato | [SECURITY.md:7](SECURITY.md#L7) |

## Decisões fora do código

- [ ] **Analytics:** decidir. Padrão: nenhum. Se aprovado, só ferramenta sem cookies, com ajuste da CSP e da política.
- [ ] **Data da política de privacidade:** atualizar "Última atualização" em `politica-de-privacidade.html` após a revisão jurídica.
- [ ] **security.txt:** renovar o campo `Expires` antes de 2027-10-10.
