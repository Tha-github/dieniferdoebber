import type { APIRoute } from 'astro';
import { site } from '../data/site';

/** Manifest simples (instalação/atalho em Android e ícones), gerado a partir de site.ts. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: `${site.name} · ${site.tagline}`,
        short_name: site.name,
        description: site.seo.description,
        lang: site.lang,
        start_url: '/',
        display: 'browser',
        background_color: site.seo.themeColor,
        theme_color: site.seo.themeColor,
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
