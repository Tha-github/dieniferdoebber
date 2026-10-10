import type { APIRoute } from 'astro';
import { site } from '../data/site';

/**
 * robots.txt com o sitemap no endereço de site.ts (gerado no build).
 * No GitHub Pages sem domínio próprio, este arquivo fica na subpasta e os
 * buscadores só leem /robots.txt na raiz do domínio; passa a valer com domínio próprio.
 */
export const GET: APIRoute = () => {
  const base = site.url.replace(/\/$/, '');
  return new Response(
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${base}/sitemap-index.xml`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
