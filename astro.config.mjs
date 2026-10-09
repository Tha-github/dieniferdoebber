// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Domínio definido em src/data/site.ts (fonte única) — canonical, OG e sitemap.
  site: site.url,
  build: {
    // CSS sempre em arquivo (nunca <style> inline): a CSP usa style-src 'self'
    // sem 'unsafe-inline' nem hashes, que mudariam a cada build.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Idem para JS: sem scripts inline (script-src 'self').
      assetsInlineLimit: 0,
      // Um único arquivo de CSS (~35 KB) em vez de vários pequenos: uma só
      // requisição bloqueante, reaproveitada em cache pelas outras páginas.
      cssCodeSplit: false,
    },
  },
  integrations: [
    sitemap({
      // A página de erro fica fora do sitemap.
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
