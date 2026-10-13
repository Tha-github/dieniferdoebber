# Pendências para a cliente

> Ao resolver um item: troque o marcador (`<span class="pending">[…]</span>` ou o comentário `<!-- […] -->`) pelo conteúdo definitivo no arquivo indicado e apague a linha correspondente aqui.

**9 itens** (`[CONFIRMAR]` = informação ou material da cliente · `[REVISAR]` = validação pela cliente ou jurídica), mais as decisões no final.

## Fotos

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Consultório → Presencial: foto do consultório | foto horizontal do consultório (cerca de 1200 × 800 px) | [index.html:512](index.html#L512) |
| Consultório → On-line: foto | foto horizontal (cerca de 1200 × 800 px) | [index.html:548](index.html#L548) |

## Política de privacidade (validação jurídica)

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| Quem é a responsável → dispensa de encarregado (DPO) | confirmar enquadramento como agente de pequeno porte | [politica-de-privacidade.html:209](politica-de-privacidade.html#L209) |
| Registros técnicos da hospedagem (GitHub Pages) | confirmar o prazo de retenção dos registros de acesso do GitHub Pages | [politica-de-privacidade.html:260](politica-de-privacidade.html#L260) |
| Contato pelo WhatsApp | base legal (art. 7º e art. 11 da LGPD), prazo de guarda das conversas e se há uso de WhatsApp Business ou de outro aparelho além do pessoal | [politica-de-privacidade.html:282](politica-de-privacidade.html#L282) |
| Sigilo profissional → registros do atendimento | confirmar forma de registro e prazo de guarda (Resolução CFP nº 001/2009) | [politica-de-privacidade.html:309](politica-de-privacidade.html#L309) |
| Contato e atualizações → canais de contato | incluir e-mail como canal alternativo | [politica-de-privacidade.html:357](politica-de-privacidade.html#L357) |

## Contato de segurança

| Onde no site | O que confirmar | Arquivo e linha |
|---|---|---|
| security.txt → campo Contact | e-mail de contato | [.well-known/security.txt:2](.well-known/security.txt#L2) |
| SECURITY.md → Como relatar uma vulnerabilidade | e-mail de contato | [SECURITY.md:7](SECURITY.md#L7) |

## Decisões fora do código

- [ ] **Analytics:** decidir. Padrão: nenhum. Se aprovado, só ferramenta sem cookies, com ajuste da CSP e da política.
- [ ] **Data da política de privacidade:** atualizar "Última atualização" em `politica-de-privacidade.html` após a revisão jurídica.
- [ ] **security.txt:** renovar o campo `Expires` antes de 2027-10-10.
- [ ] **Cadastro e-Psi e aviso de emergência:** retirados do rodapé a pedido da cliente. O `prompt.md` (§9) recomendava os dois: o atendimento on-line exige cadastro no e-Psi (Resolução CFP nº 11/2018), e avisar que o site não é canal de emergência é boa prática. Confirmar com a cliente que a retirada é definitiva.
- [ ] **Originais do logotipo:** a pasta `_identidade-visual/` está fora do git, para não ser publicada. Guardar uma cópia em outro lugar (por exemplo, no drive da cliente).
- [ ] **Fonte dos títulos:** avaliar a troca da Quicksand (arredondada) por uma serifada mais próxima do logo (ver relatório do ajuste da cliente). Só trocar com aprovação.

Respondidos pela cliente (outubro de 2026) e removidos desta lista: nomes por extenso do NASMU e da CMB, convênio, número do endereço e formação.
