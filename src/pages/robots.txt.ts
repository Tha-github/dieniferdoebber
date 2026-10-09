import type { APIRoute } from 'astro';
import { site } from '../data/site';

/** robots.txt com o sitemap no domínio de site.ts (gerado no build). */
export const GET: APIRoute = ({ site: astroSite }) => {
  const base = (astroSite ?? new URL(site.url)).href.replace(/\/$/, '');
  return new Response(
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${base}/sitemap-index.xml`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
