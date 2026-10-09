/**
 * Dados institucionais do site — fonte única.
 * Componentes e content.ts devem importar daqui; nunca repetir nome, CRP,
 * telefone, endereço ou links diretamente no markup.
 * Origem: prompt.md, seções 1, 4, 5 e 6.
 */

const whatsappNumber = '5511992561321';
const whatsappMessage = 'Olá, Dienifer. Gostaria de informações sobre o atendimento.';

const addressQuery = 'Rua Bela Cintra, São Paulo, SP';

/** Texto oculto acrescentado a links que abrem em nova aba (leitores de tela). */
const newTabHint = '(abre em nova aba)';

export const site = {
  /**
   * Domínio de produção, sem barra final — [CONFIRMAR] pendente com a cliente.
   * Usado na URL canônica, no Open Graph, no JSON-LD, no sitemap e no robots.txt.
   */
  url: 'https://www.dieniferdoebber.com.br',
  name: 'Dienifer Doebber',
  profession: 'Psicóloga',
  tagline: 'Psicanálise · Psicologia Clínica',
  city: 'São Paulo',
  lang: 'pt-BR',

  crp: {
    number: '06/184387',
    label: 'CRP 06/184387',
  },

  whatsapp: {
    number: whatsappNumber,
    display: '(11) 99256-1321',
    international: '+55 11 99256-1321',
    message: whatsappMessage,
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
    /** Rótulo do botão flutuante (só ícone). */
    ariaLabel: 'Conversar com Dienifer Doebber pelo WhatsApp',
    /** Complemento oculto para CTAs cujo texto visível não cita o WhatsApp. */
    ctaHint: 'pelo WhatsApp',
  },

  address: {
    street: 'Rua Bela Cintra',
    city: 'São Paulo',
    region: 'SP',
    country: 'BR',
    // Número não é exibido; o endereço completo é passado no agendamento.
    display: 'Rua Bela Cintra, São Paulo',
    mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`,
    mapsLabel: 'Ver no mapa',
  },

  online: 'Brasil e exterior',

  /** Atributos obrigatórios para links externos (prompt.md, seção 6). */
  externalLink: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  newTabHint,

  nav: {
    skipLink: 'Pular para o conteúdo',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    // Rótulos para leitores de tela (não exibidos).
    ariaLabel: 'Navegação principal',
    menuLabel: 'Menu',
    contactButton: 'Contato',
    items: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Temas', href: '#temas' },
      { label: 'Atendimento', href: '#atendimento' },
      { label: 'Formação', href: '#formacao' },
      { label: 'Contato', href: '#contato' },
    ],
  },

  seo: {
    /** Title da página inicial. Demais páginas: "<título> | Dienifer Doebber". */
    title: 'Dienifer Doebber | Psicóloga Psicanalista em São Paulo e On-line',
    /** ≤ 155 caracteres. */
    description:
      'Psicoterapia psicanalítica com Dienifer Doebber (CRP 06/184387). Atendimento individual presencial em São Paulo e on-line para todo o Brasil e o exterior.',
    ogImage: {
      path: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Dienifer Doebber · Psicanálise · Psicologia Clínica',
    },
    themeColor: '#f6f2ec',
    locale: 'pt_BR',
  },

  privacyPolicy: {
    label: 'Política de privacidade',
    href: '/politica-de-privacidade',
  },
} as const;

export type Site = typeof site;
