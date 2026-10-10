# Pendências para a cliente

> Atualize esta lista à mão sempre que um item for resolvido: troque o `<span class="pending">[…]</span>` pelo texto definitivo no arquivo indicado e apague a linha correspondente aqui.

**17 itens no código** (`[CONFIRMAR]` = informação da cliente · `[REVISAR]` = validação jurídica), mais as decisões abaixo.

## Conteúdo do site

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Como funciona → Duração e frequência | ex.: sessões de 50 minutos, frequência combinada individualmente | [index.html:363](index.html#L363) |
| Formação → Psicologia | instituição/ano | [index.html:411](index.html#L411) |
| Formação → Psicanálise | curso/instituição | [index.html:417](index.html#L417) |
| Formação → Psicopatologia | curso/instituição | [index.html:423](index.html#L423) |
| Formação → Formações complementares (PUC-SP · IPq-USP · Instituto Sedes Sapientiae) | nomes dos cursos | [index.html:431](index.html#L431) |
| Trajetória → 2022, CMB (São Paulo) | nome por extenso | [index.html:459](index.html#L459) |
| Trajetória → 2021, NASMU | nome por extenso | [index.html:469](index.html#L469) |
| Perguntas frequentes → Qual a duração e a frequência das sessões? | resposta | [index.html:528](index.html#L528) |
| Perguntas frequentes → Atende por convênio? | ex.: atendimento particular, com emissão de recibo para reembolso | [index.html:539](index.html#L539) |
| Rodapé (nas 3 páginas) → Cadastro e-Psi (Resolução CFP nº 11/2018) | link do cadastro e-Psi | [index.html:652](index.html#L652)<br>[politica-de-privacidade.html:377](politica-de-privacidade.html#L377)<br>[404.html:201](404.html#L201) |

## Política de privacidade (validação jurídica)

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Quem é a responsável → dispensa de encarregado (DPO) | confirmar enquadramento como agente de pequeno porte | [politica-de-privacidade.html:204](politica-de-privacidade.html#L204) |
| Registros técnicos da hospedagem (GitHub Pages) | confirmar o prazo de retenção dos registros de acesso do GitHub Pages | [politica-de-privacidade.html:249](politica-de-privacidade.html#L249) |
| Contato pelo WhatsApp | base legal (art. 7º e art. 11 da LGPD), prazo de guarda das conversas e se há uso de WhatsApp Business ou de outro aparelho além do pessoal | [politica-de-privacidade.html:271](politica-de-privacidade.html#L271) |
| Sigilo profissional → registros do atendimento | confirmar forma de registro e prazo de guarda (Resolução CFP nº 001/2009) | [politica-de-privacidade.html:298](politica-de-privacidade.html#L298) |
| Contato e atualizações → canais de contato | incluir e-mail como canal alternativo | [politica-de-privacidade.html:346](politica-de-privacidade.html#L346) |

## Contato de segurança

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| security.txt → campo Contact | e-mail de contato | [.well-known/security.txt:2](.well-known/security.txt#L2) |
| SECURITY.md → Como relatar uma vulnerabilidade | e-mail de contato | [SECURITY.md:7](SECURITY.md#L7) |

## Materiais e decisões fora do código

- [ ] **Retrato profissional** (hero): enviar a foto. Ver "Como trocar as fotos" no README.
- [ ] **Foto do consultório** (opcional, seção Sobre): enviar ou decidir não usar (apagar o bloco `about__media`).
- [ ] **Analytics:** decidir. Padrão: nenhum. Se aprovado, só ferramenta sem cookies, com ajuste da CSP e da política.
- [ ] **Data da política de privacidade:** atualizar "Última atualização" em `politica-de-privacidade.html` após a revisão jurídica.
- [ ] **security.txt:** renovar o campo `Expires` antes de 2027-10-10.
