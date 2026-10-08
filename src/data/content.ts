/**
 * Conteúdo textual da página — transcrição da seção 5 do prompt.md.
 * Marcadores [CONFIRMAR] são pendências com a cliente e devem permanecer
 * até a confirmação. Dados institucionais (nome, CRP, WhatsApp, endereço)
 * vêm de site.ts.
 */
import { site } from './site';

export const hero = {
  // Exibido em versalete via CSS (text-transform), por isso grafado em caixa normal.
  eyebrow: 'Psicoterapia psicanalítica',
  title: 'Uma escuta para o que ainda não encontrou palavras.',
  text: `Atendimento individual com ${site.name}, psicóloga clínica. Presencial em São Paulo e on-line para todo o Brasil e exterior.`,
  primaryCta: { label: 'Entrar em contato', href: site.whatsapp.href },
  secondaryCta: { label: 'Conheça a abordagem', href: '#atendimento' },
  crp: site.crp.label,
};

export const about = {
  id: 'sobre',
  title: site.name,
  paragraphs: [
    'Sou psicóloga clínica, com formação em Psicanálise e Psicopatologia. Meu trabalho é a psicoterapia psicanalítica: um atendimento individual, construído no tempo de cada pessoa, com uma escuta atenta ao que se diz e ao que fica de fora.',
    'Sigo em formação contínua. Integro grupos de estudo e pesquisa em Clínica Psicanalítica em São Paulo e tenho formações por instituições como PUC-SP, IPq-USP e Instituto Sedes Sapientiae.',
  ],
};

export const themes = {
  id: 'temas',
  title: 'O que se trabalha em análise',
  intro: 'Algumas questões que costumam levar alguém a buscar um processo analítico.',
  items: [
    { number: '01', title: 'O não dito', text: 'Escutar o que incomoda e não encontra palavras.' },
    {
      number: '02',
      title: 'Desejo',
      text: 'Compreender o próprio desejo, suas escolhas e decisões.',
    },
    { number: '03', title: 'Repetições', text: 'Reconhecer o que insiste e se repete.' },
    { number: '04', title: 'Perdas', text: 'Elaborar perdas, rupturas e mudanças.' },
    { number: '05', title: 'Angústia', text: 'Investigar o que sustenta o sofrimento.' },
  ],
};

export const practice = {
  id: 'atendimento',
  title: 'Como funciona',
  items: [
    {
      title: 'A abordagem',
      text: 'A psicanálise parte da fala de quem procura atendimento. Não há roteiro nem respostas prontas. O trabalho é construir, ao longo das sessões, um entendimento mais próprio sobre aquilo que causa sofrimento.',
    },
    {
      title: 'Primeiro contato',
      text: 'O contato inicial é feito pelo WhatsApp. Em seguida, é agendada uma primeira conversa para entender a demanda e combinar o formato do atendimento.',
    },
    {
      title: 'Presencial',
      text: `Consultório na ${site.address.street}, em ${site.address.city}.`,
    },
    {
      title: 'On-line',
      text: 'Sessões por videochamada, em plataforma segura, para pessoas em todo o Brasil e brasileiros no exterior.',
    },
  ],
  sessionInfo: {
    label: 'Duração e frequência',
    text: '[CONFIRMAR COM A CLIENTE, ex.: sessões de 50 minutos, frequência combinada individualmente]',
  },
};

export const education = {
  id: 'formacao',
  title: 'Formação e trajetória',
  educationTitle: 'Formação',
  educationItems: [
    { area: 'Psicologia', detail: '[CONFIRMAR instituição/ano]' },
    { area: 'Psicanálise', detail: '[CONFIRMAR curso/instituição]' },
    { area: 'Psicopatologia', detail: '[CONFIRMAR curso/instituição]' },
    {
      area: 'Formações complementares',
      detail: 'PUC-SP · IPq-USP · Instituto Sedes Sapientiae [CONFIRMAR nomes dos cursos]',
    },
    { area: 'Grupos de estudo e pesquisa em Clínica Psicanalítica, São Paulo', detail: '' },
  ],
  timelineTitle: 'Trajetória',
  timeline: [
    {
      year: '2024',
      title: 'Psicóloga voluntária junto à Força Aérea Brasileira (FAB)',
      text: 'Em contexto de tragédias e emergências.',
    },
    {
      year: '2022',
      title: 'CMB, São Paulo',
      text: 'Atendimento a pessoas em situação de violência. [CONFIRMAR nome por extenso]',
    },
    {
      year: '2021',
      title: 'NASMU',
      text: 'Atuação com foco em processos de luto. [CONFIRMAR nome por extenso]',
    },
  ],
};

export const faq = {
  id: 'perguntas',
  title: 'Perguntas frequentes',
  items: [
    {
      question: 'O que é psicoterapia psicanalítica?',
      answer:
        'É um tratamento pela fala. A partir do que a pessoa traz, investiga-se o que se repete, o que angustia e o que sustenta o sofrimento, sem conselhos ou respostas prontas.',
    },
    {
      question: 'Como é o atendimento on-line?',
      answer:
        'As sessões acontecem por videochamada, com o mesmo cuidado e sigilo do presencial. Basta um local reservado e uma conexão estável.',
    },
    {
      question: 'Atende quem mora fora do Brasil?',
      answer:
        'Sim. O atendimento on-line é feito em português para brasileiros que vivem no exterior.',
    },
    {
      question: 'Qual a duração e a frequência das sessões?',
      answer: '[CONFIRMAR]',
    },
    {
      question: 'Atende por convênio?',
      answer: '[CONFIRMAR, ex.: atendimento particular, com emissão de recibo para reembolso]',
    },
    {
      question: 'Como agendar?',
      answer:
        'Pelo WhatsApp. A primeira conversa serve para entender a demanda e combinar os próximos passos.',
    },
  ],
};

export const contact = {
  id: 'contato',
  title: 'Contato',
  text: 'Para informações ou para agendar uma primeira conversa, entre em contato pelo WhatsApp.',
  cta: { label: 'Conversar pelo WhatsApp', href: site.whatsapp.href },
  details: [
    { label: 'WhatsApp', value: site.whatsapp.display },
    { label: 'Endereço', value: site.address.display },
    { label: 'On-line', value: site.online },
  ],
  mapLink: { label: site.address.mapsLabel, href: site.address.mapsHref },
};

export const footer = {
  /** Montar como: Dienifer Doebber · Psicóloga · CRP 06/184387 · São Paulo · © {ano} · Política de privacidade */
  parts: [site.name, site.profession, site.crp.label, site.city],
  copyright: (year: number) => `© ${year}`,
  privacyLink: site.privacyPolicy,
  emergencyNotice:
    'Este site não oferece atendimento de emergência. Em situação de crise, ligue 188 (CVV) ou 192 (SAMU).',
};
