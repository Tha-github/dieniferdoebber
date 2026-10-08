/**
 * Dados institucionais do site — fonte única.
 * Componentes e content.ts devem importar daqui; nunca repetir nome, CRP,
 * telefone, endereço ou links diretamente no markup.
 * Origem: prompt.md, seções 1, 4, 5 e 6.
 */

const whatsappNumber = '5511992561321';
const whatsappMessage = 'Olá, Dienifer. Gostaria de informações sobre o atendimento.';

const addressQuery = 'Rua Bela Cintra, São Paulo, SP';

export const site = {
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
    ariaLabel: 'Conversar com Dienifer Doebber pelo WhatsApp (abre em nova aba)',
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
    mapsAriaLabel: 'Ver Rua Bela Cintra, São Paulo, no Google Maps (abre em nova aba)',
  },

  online: 'Brasil e exterior',

  /** Atributos obrigatórios para links externos (prompt.md, seção 6). */
  externalLink: {
    target: '_blank',
    rel: 'noopener noreferrer',
  },

  nav: {
    skipLink: 'Pular para o conteúdo',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    contactButton: 'Contato',
    items: [
      { label: 'Sobre', href: '#sobre' },
      { label: 'Temas', href: '#temas' },
      { label: 'Atendimento', href: '#atendimento' },
      { label: 'Formação', href: '#formacao' },
      { label: 'Contato', href: '#contato' },
    ],
  },

  privacyPolicy: {
    label: 'Política de privacidade',
    href: '/politica-de-privacidade',
  },
} as const;

export type Site = typeof site;
