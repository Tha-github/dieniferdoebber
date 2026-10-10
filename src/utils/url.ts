/**
 * Caminhos internos com o prefixo do site (base).
 *
 * O site pode ser servido na raiz de um domínio (base "/") ou numa subpasta,
 * como no GitHub Pages sem domínio próprio (tha-github.github.io/dieniferdoebber,
 * base "/dieniferdoebber"). O base é derivado de site.url (astro.config.mjs).
 *
 * Regra: todo caminho interno absoluto ("/…") passa por withBase(); nunca
 * escreva "/algo" direto no markup. Assets importados (CSS, JS, fontes,
 * imagens de astro:assets) já recebem o prefixo do Vite automaticamente.
 */
import { site } from '../data/site';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** "/politica-de-privacidade" → "/dieniferdoebber/politica-de-privacidade". */
export function withBase(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${base}${path}` || '/';
}

/** URL absoluta (canonical, Open Graph, JSON-LD): origem de site.url + base + caminho. */
export function absoluteUrl(path: string): string {
  return new URL(withBase(path), new URL(site.url).origin).href;
}
