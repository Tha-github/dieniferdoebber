/**
 * Política de privacidade (LGPD — Lei nº 13.709/2018), página /politica-de-privacidade.
 * Linguagem clara, sem juridiquês. Marcadores REVISAR (entre colchetes) indicam
 * pontos que precisam de validação jurídica ou de informação da cliente; aparecem
 * com a marcação temporária .pending (formatText).
 */
import { site } from './site';

export interface PrivacySection {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  /** Parágrafos exibidos depois da lista. */
  after?: string[];
}

export const privacy = {
  title: 'Política de privacidade',
  /** ISO (datetime) e texto exibido. */
  updatedAt: { iso: '2026-10-08', label: '8 de outubro de 2026' },
  updatedLabel: 'Última atualização',
  intro: [
    `Esta política explica como o site de ${site.name} trata informações pessoais, de acordo com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018). Em resumo: o site não tem formulários, não usa cookies e não coleta dados de quem o visita.`,
  ],
  tocLabel: 'Nesta página',
  sections: [
    {
      id: 'controladora',
      title: 'Quem é a responsável',
      paragraphs: [
        `A responsável pelo tratamento de dados pessoais (controladora, nos termos da LGPD) é ${site.name}, ${site.profession.toLowerCase()} inscrita no Conselho Regional de Psicologia de São Paulo (${site.crp.label}), com consultório em ${site.address.display}.`,
        'Por se tratar de profissional autônoma que realiza tratamento de dados em pequena escala, a indicação de um encarregado (DPO) pode ser dispensada pela Resolução CD/ANPD nº 2/2022. O canal de contato para assuntos de privacidade é o mesmo informado ao final desta página. [REVISAR COM A CLIENTE: confirmar enquadramento como agente de pequeno porte]',
      ],
    },
    {
      id: 'dados-do-site',
      title: 'Quais dados o site coleta',
      paragraphs: ['Nenhum, de forma direta. O site é composto apenas de páginas informativas:'],
      list: [
        'não há formulários, cadastro, área de login ou campo de comentários;',
        'não há cookies, nem de navegação, nem de publicidade;',
        'não há ferramentas de análise de audiência (analytics), pixels de rastreamento ou anúncios;',
        'as fontes, imagens e demais arquivos são servidos pelo próprio site, sem chamadas a serviços de terceiros durante a navegação.',
      ],
    },
    {
      id: 'registros-tecnicos',
      title: 'Registros técnicos da hospedagem',
      paragraphs: [
        'Como qualquer site na internet, o serviço de hospedagem pode registrar automaticamente dados técnicos de cada acesso, como endereço IP, data e hora, página solicitada e tipo de navegador. Esses registros servem para manter o site funcionando e protegê-lo contra abusos. Eles não são usados para identificar visitantes nem para fins de publicidade.',
        'Esses registros ficam sob responsabilidade do provedor de hospedagem, conforme a política dele e a legislação aplicável, incluindo o Marco Civil da Internet (Lei nº 12.965/2014). Os servidores do provedor podem estar fora do Brasil. [REVISAR COM A CLIENTE: informar o provedor escolhido (Vercel ou Netlify) e o prazo de retenção dos registros]',
      ],
    },
    {
      id: 'whatsapp',
      title: 'Contato pelo WhatsApp',
      paragraphs: [
        'O site não envia nenhuma informação sua ao WhatsApp. Os botões de contato apenas abrem o aplicativo com uma mensagem padrão já escrita, que você pode alterar ou apagar antes de enviar.',
        'O WhatsApp é um serviço da Meta Platforms, com política de privacidade própria. Ao iniciar a conversa, os dados trocados (como seu número de telefone, nome de perfil e o conteúdo das mensagens) passam a ser tratados pelo WhatsApp, segundo as regras dele, e pela psicóloga, exclusivamente para responder ao contato, agendar a primeira conversa e organizar o atendimento.',
        'As conversas não são compartilhadas com terceiros. [REVISAR COM A CLIENTE: base legal (art. 7º e art. 11 da LGPD), prazo de guarda das conversas e se há uso de WhatsApp Business ou de outro aparelho além do pessoal]',
      ],
    },
    {
      id: 'mapa',
      title: 'Link do mapa',
      paragraphs: [
        'O link “Ver no mapa” abre o Google Maps em uma nova aba, com o endereço da rua do consultório. Nada do Google é carregado no site. O que acontece no Google Maps segue a política de privacidade do Google.',
      ],
    },
    {
      id: 'sigilo',
      title: 'Sigilo profissional',
      paragraphs: [
        'Tudo o que é compartilhado no contato inicial e ao longo do atendimento está protegido pelo sigilo profissional, conforme o Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/2005, art. 9º). Informações sobre saúde são dados pessoais sensíveis segundo a LGPD e recebem cuidado redobrado.',
        'Os registros do atendimento são guardados em local seguro, pelo prazo previsto nas normas do Conselho Federal de Psicologia, e não são compartilhados, salvo nas exceções previstas em lei e no próprio Código de Ética. [REVISAR COM A CLIENTE: confirmar forma de registro e prazo de guarda (Resolução CFP nº 001/2009)]',
        'O atendimento on-line segue a Resolução CFP nº 11/2018.',
      ],
    },
    {
      id: 'direitos',
      title: 'Seus direitos',
      paragraphs: ['Pelo art. 18 da LGPD, você pode solicitar a qualquer momento, sem custo:'],
      list: [
        'a confirmação de que existe tratamento dos seus dados;',
        'o acesso aos dados;',
        'a correção de dados incompletos, inexatos ou desatualizados;',
        'a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;',
        'a portabilidade dos dados a outro fornecedor de serviço;',
        'a eliminação dos dados tratados com base no seu consentimento;',
        'a informação sobre com quem os dados foram compartilhados;',
        'a informação sobre a possibilidade de não dar consentimento e suas consequências;',
        'a revogação do consentimento.',
      ],
      after: [
        'Alguns pedidos podem ter limites legais, como no caso de registros de atendimento que precisam ser guardados por obrigação profissional. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',
      ],
    },
    {
      id: 'seguranca',
      title: 'Segurança',
      paragraphs: [
        'O site é estático, não tem banco de dados e é acessado apenas por conexão criptografada (HTTPS). Ele também adota cabeçalhos de segurança que impedem o carregamento de conteúdo de outros domínios.',
      ],
    },
    {
      id: 'contato',
      title: 'Contato e atualizações',
      paragraphs: [
        `Para dúvidas sobre esta política ou para exercer seus direitos, entre em contato pelo WhatsApp ${site.whatsapp.display}. [REVISAR COM A CLIENTE: incluir e-mail como canal alternativo]`,
        'Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última atualização aparece no início da página.',
      ],
    },
  ] satisfies PrivacySection[],
};
