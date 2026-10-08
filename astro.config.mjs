// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // TODO: definir o domínio definitivo (pendência com a cliente) — necessário para canonical e sitemap.
  // site: 'https://www.exemplo.com.br',
});
