const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

interface FormatOptions {
  /**
   * Une as duas últimas palavras com espaço inseparável, evitando uma
   * palavra sozinha na última linha. Só se aplica a textos com 3+ palavras
   * (em títulos de 2 palavras, isso impediria qualquer quebra).
   */
  noOrphan?: boolean;
}

/**
 * Prepara um texto de content.ts para renderização com set:html:
 * - escapa HTML;
 * - impede quebras dentro de palavras hifenizadas ("on- / line", "PUC- / SP"),
 *   com <span class="nowrap"> (o subset latin da Inter não tem o U+2011);
 * - envolve marcadores [CONFIRMAR …] e [REVISAR …] em <span class="pending"> (marcação
 *   temporária; some sozinha quando o marcador sair de content.ts);
 * - opcionalmente, evita palavra órfã (noOrphan).
 */
export function formatText(text: string, { noOrphan = false }: FormatOptions = {}): string {
  let source = text;
  if (noOrphan && source.trim().split(/\s+/).length >= 3) {
    source = source.replace(/ (?=\S+\s*$)/, ' ');
  }
  return escapeHtml(source)
    .replace(/[\p{L}]+(?:-[\p{L}]+)+/gu, '<span class="nowrap">$&</span>')
    .replace(/\[(?:CONFIRMAR|REVISAR)[^\]]*\]/g, '<span class="pending">$&</span>');
}

/** Atalho para títulos e perguntas: formatText com noOrphan. */
export const formatTitle = (text: string) => formatText(text, { noOrphan: true });
