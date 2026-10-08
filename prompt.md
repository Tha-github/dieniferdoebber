# Landing Page — Dienifer Doebber | Psicologia Clínica · Psicanálise

## 1. Contexto do projeto
Landing page institucional para o consultório da psicóloga **Dienifer Doebber (CRP 06/184387)**, dedicado à psicoterapia psicanalítica.
- Atendimento individual, **presencial em São Paulo** (Rua Bela Cintra) e **on-line para todo o Brasil e exterior**.
- Objetivos: **apresentar a profissional** e **captar pacientes** via WhatsApp.
- Público: adultos de 21 a 50 anos, perfil que valoriza qualidade, discrição e profundidade.

## 2. Posicionamento e tom
O site deve transmitir **sofisticação, segurança e qualidade**: alto padrão sem exagero, cuidado refinado, acolhimento sóbrio e confiança na formação da psicóloga.

**Tom de voz**
- Escrita direta, frases curtas, vocabulário preciso. Pouco adjetivo.
- Linguagem clínica acessível, sem jargão excessivo.
- Primeira pessoa na seção "Sobre"; nas demais, texto impessoal ou em terceira pessoa.

**Proibido**
- Linguagem comercial ou promocional ("agende já", "vagas limitadas", "transforme sua vida").
- Linguagem motivacional ou "terapêutica demais" ("você merece", "jornada de autoconhecimento", "cura", "ressignificar").
- Clichês visuais de psicologia: cérebros, quebra-cabeças, borboletas, mãos dadas, silhuetas, árvores, corações, banco de imagens genérico.
- Promessa ou previsão de resultados, depoimentos de pacientes, preços como chamariz, comparação com outros profissionais (Código de Ética Profissional do Psicólogo, art. 20).

## 3. Identidade visual
**Conceito:** minimalismo editorial. Muito espaço em branco, tipografia como protagonista, poucos elementos.

**Paleta (neutra, bege + marinho)**
| Token | Hex | Uso |
|---|---|---|
| --color-bg | #F6F2EC | fundo principal (off-white quente) |
| --color-surface | #ECE5DA | seções alternadas (bege claro) |
| --color-sand | #D8CCBA | linhas, divisores, detalhes |
| --color-ink | #1E1E1C | texto principal (quase preto) |
| --color-muted | #6B655C | texto secundário |
| --color-navy | #1F2A3A | destaque, botões, seção escura |
| --color-navy-soft | #2E3B4F | hover |
Verificar contraste mínimo WCAG AA em todas as combinações usadas.

**Tipografia**
- Títulos: **Cormorant Garamond** (serifada, pesos 400/500, itálico pontual).
- Texto/UI: **Inter** ou **Manrope** (pesos 300/400/500).
- Fontes **auto-hospedadas** (via @fontsource), sem Google Fonts por CDN (privacidade/LGPD e CSP).
- Escala fluida com clamp(); títulos grandes e arejados; corpo de 17–18px; entrelinha de 1.6–1.7.

**Logotipo:** não existe. Criar um **wordmark tipográfico** em SVG com "Dienifer Doebber" em Cormorant e, abaixo, "PSICANÁLISE · PSICOLOGIA CLÍNICA" em versalete espaçado (Inter, tracking amplo). Criar também o monograma "DD" para o favicon.

**Ícones:** linha fina (1–1.25px), geométricos e abstratos, ou nenhum. Preferir numeração editorial (01, 02…) e filetes finos no lugar de ícones.

**Imagens:** espaço para retrato profissional da Dienifer (placeholder neutro até receber a foto) e uma foto opcional do consultório. Formato WebP/AVIF, com lazy-load abaixo da dobra.

**Movimento:** apenas fade/slide sutis ao rolar (≤ 400ms) e respeito a `prefers-reduced-motion`.

**Referência:** hermespsicologia.com.br. Usar como referência de sobriedade e espaçamento, sem copiar.

## 4. Estrutura da página (one-page)
1. **Header**: wordmark à esquerda; âncoras (Sobre · Temas · Atendimento · Formação · Contato); botão discreto "Contato". Fica fixo e compacto ao rolar; menu mobile em tela cheia.
2. **Hero**
3. **Sobre**
4. **Temas da clínica** (os 5 eixos)
5. **Psicanálise e atendimento** (como funciona, presencial e on-line)
6. **Formação e trajetória**
7. **Perguntas frequentes**
8. **Contato** (seção escura em marinho)
9. **Rodapé**
10. **Botão flutuante do WhatsApp** (discreto, monocromático)
11. Página separada: **/politica-de-privacidade**

## 5. Conteúdo (rascunho aprovado como base; manter o tom)

### Hero
- Sobretítulo: PSICOTERAPIA PSICANALÍTICA
- Título: **Uma escuta para o que ainda não encontrou palavras.**
- Texto: Atendimento individual com Dienifer Doebber, psicóloga clínica. Presencial em São Paulo e on-line para todo o Brasil e exterior.
- Botão: Entrar em contato (WhatsApp)
- Link secundário: Conheça a abordagem ↓
- Linha discreta: CRP 06/184387

### Sobre
Título: **Dienifer Doebber**
> Sou psicóloga clínica, com formação em Psicanálise e Psicopatologia. Meu trabalho é a psicoterapia psicanalítica: um atendimento individual, construído no tempo de cada pessoa, com uma escuta atenta ao que se diz e ao que fica de fora.
>
> Sigo em formação contínua. Integro grupos de estudo e pesquisa em Clínica Psicanalítica em São Paulo e tenho formações por instituições como PUC-SP, IPq-USP e Instituto Sedes Sapientiae.

### Temas da clínica
Título: **O que se trabalha em análise**
Intro: Algumas questões que costumam levar alguém a buscar um processo analítico.
- 01 **O não dito**: Escutar o que incomoda e não encontra palavras.
- 02 **Desejo**: Compreender o próprio desejo, suas escolhas e decisões.
- 03 **Repetições**: Reconhecer o que insiste e se repete.
- 04 **Perdas**: Elaborar perdas, rupturas e mudanças.
- 05 **Angústia**: Investigar o que sustenta o sofrimento.

### Psicanálise e atendimento
Título: **Como funciona**
- **A abordagem**: A psicanálise parte da fala de quem procura atendimento. Não há roteiro nem respostas prontas. O trabalho é construir, ao longo das sessões, um entendimento mais próprio sobre aquilo que causa sofrimento.
- **Primeiro contato**: O contato inicial é feito pelo WhatsApp. Em seguida, é agendada uma primeira conversa para entender a demanda e combinar o formato do atendimento.
- **Presencial**: Consultório na Rua Bela Cintra, em São Paulo.
- **On-line**: Sessões por videochamada, em plataforma segura, para pessoas em todo o Brasil e brasileiros no exterior.
- Duração e frequência: [CONFIRMAR COM A CLIENTE, ex.: sessões de 50 minutos, frequência combinada individualmente]

### Formação e trajetória
Título: **Formação e trajetória**
Formação:
- Psicologia: [CONFIRMAR instituição/ano]
- Psicanálise: [CONFIRMAR curso/instituição]
- Psicopatologia: [CONFIRMAR curso/instituição]
- Formações complementares: PUC-SP · IPq-USP · Instituto Sedes Sapientiae [CONFIRMAR nomes dos cursos]
- Grupos de estudo e pesquisa em Clínica Psicanalítica, São Paulo

Trajetória (linha do tempo minimalista):
- **2024**: Psicóloga voluntária junto à Força Aérea Brasileira (FAB), em contexto de tragédias e emergências.
- **2022**: CMB, São Paulo. Atendimento a pessoas em situação de violência. [CONFIRMAR nome por extenso]
- **2021**: NASMU. Atuação com foco em processos de luto. [CONFIRMAR nome por extenso]

### Perguntas frequentes (accordion acessível)
1. **O que é psicoterapia psicanalítica?** É um tratamento pela fala. A partir do que a pessoa traz, investiga-se o que se repete, o que angustia e o que sustenta o sofrimento, sem conselhos ou respostas prontas.
2. **Como é o atendimento on-line?** As sessões acontecem por videochamada, com o mesmo cuidado e sigilo do presencial. Basta um local reservado e uma conexão estável.
3. **Atende quem mora fora do Brasil?** Sim. O atendimento on-line é feito em português para brasileiros que vivem no exterior.
4. **Qual a duração e a frequência das sessões?** [CONFIRMAR]
5. **Atende por convênio?** [CONFIRMAR, ex.: atendimento particular, com emissão de recibo para reembolso]
6. **Como agendar?** Pelo WhatsApp. A primeira conversa serve para entender a demanda e combinar os próximos passos.

### Contato
Título: **Contato**
Texto: Para informações ou para agendar uma primeira conversa, entre em contato pelo WhatsApp.
- Botão: Conversar pelo WhatsApp
- WhatsApp: (11) 99256-1321
- Endereço: Rua Bela Cintra, São Paulo (sem número exibido; o endereço completo é passado no agendamento). Incluir link "Ver no mapa" para o Google Maps em nova aba. **Não** embutir iframe do Maps.
- On-line: Brasil e exterior

### Rodapé
Dienifer Doebber · Psicóloga · CRP 06/184387 · São Paulo · © {ano} · Política de privacidade
Linha opcional: "Este site não oferece atendimento de emergência. Em situação de crise, ligue 188 (CVV) ou 192 (SAMU)."

## 6. WhatsApp
- Número: +55 11 99256-1321
- Link: `https://wa.me/5511992561321?text=` + mensagem codificada com encodeURIComponent:
  "Olá, Dienifer. Gostaria de informações sobre o atendimento."
- Sempre com `target="_blank" rel="noopener noreferrer"` e aria-label descritivo.
- Botão flutuante: círculo marinho, ícone de linha em off-white, sombra mínima, sem animação chamativa, e sem cobrir conteúdo no mobile.

## 7. Requisitos técnicos
- **Stack:** Astro (output estático, zero JS por padrão), CSS puro com custom properties (sem framework de UI), TypeScript.
- JS mínimo: menu mobile, header ao rolar, accordion (preferir `<details>/<summary>`), reveal com IntersectionObserver.
- **Performance:** Lighthouse ≥ 95 em todas as categorias; LCP < 2s; imagens otimizadas com `astro:assets`.
- **Acessibilidade:** WCAG 2.2 AA, HTML semântico, foco visível, navegação por teclado, skip link, `lang="pt-BR"`.
- **SEO:** title/description, Open Graph, JSON-LD (`Psychologist` + `LocalBusiness`), sitemap, robots.txt, URL canônica.
- **Responsivo:** mobile-first, com breakpoints de 360 / 768 / 1024 / 1440.
- **Deploy:** Vercel ou Netlify, com arquivo de headers de segurança.

## 8. Segurança e privacidade
- Sem formulários e sem banco de dados: o contato é só pelo WhatsApp, o que reduz a superfície de ataque.
- Headers: CSP restritiva, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors 'none'.
- Nenhum script de terceiros por padrão. Analytics só se for aprovado, e nesse caso usar ferramenta sem cookies (ex.: Plausible/Umami), com aviso na política.
- Política de privacidade conforme a LGPD.
- `npm audit` sem vulnerabilidades altas/críticas; dependências fixadas; sem segredos no repositório.

## 9. Conformidade profissional (CFP)
- Exibir nome completo e CRP de forma visível.
- Sem depoimentos de pacientes, sem promessa de resultados, sem preços como propaganda.
- Atendimento on-line conforme a Resolução CFP nº 11/2018 (cadastro e-Psi). Incluir menção ou link ao cadastro [CONFIRMAR].
- Aviso de que o site não é canal de emergência.

## 10. Pendências com a cliente
Retrato profissional · fotos do consultório (opcional) · nomes completos de cursos e instituições · siglas NASMU e CMB por extenso · duração/frequência das sessões · convênio/reembolso · número do endereço (exibir ou não) · domínio · cadastro e-Psi · decisão sobre analytics.