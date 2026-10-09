/**
 * Fonte única dos headers de segurança e cache (prompt.md §8).
 * Gera os arquivos dos dois hosts suportados, para não depender da escolha:
 *   - vercel.json        (Vercel)
 *   - public/_headers    (Netlify — copiado para dist/ no build)
 *
 * Uso: npm run headers   (rodar após alterar este arquivo e commitar o resultado)
 *
 * A CSP não usa 'unsafe-inline' nem hashes: o build não gera <style>, style=
 * nem scripts executáveis inline (ver astro.config.mjs). O JSON-LD é um bloco
 * de dados (application/ld+json), que não é executado nem afetado pela CSP.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const csp = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

// Só recursos reconhecidos pelos navegadores atuais (nomes desconhecidos geram
// avisos no console).
const permissionsPolicy = [
  'accelerometer=()',
  'autoplay=()',
  'browsing-topics=()',
  'camera=()',
  'display-capture=()',
  'encrypted-media=()',
  'fullscreen=()',
  'geolocation=()',
  'gyroscope=()',
  'hid=()',
  'magnetometer=()',
  'microphone=()',
  'midi=()',
  'payment=()',
  'picture-in-picture=()',
  'publickey-credentials-get=()',
  'screen-wake-lock=()',
  'serial=()',
  'usb=()',
  'xr-spatial-tracking=()',
].join(', ');

/** Headers aplicados a todas as respostas. */
export const securityHeaders = {
  'Content-Security-Policy': csp,
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': permissionsPolicy,
  'Cross-Origin-Opener-Policy': 'same-origin',
  // Redundante com frame-ancestors, para navegadores antigos.
  'X-Frame-Options': 'DENY',
};

/*
 * Cache. As regras NÃO se sobrepõem (o mesmo caminho nunca recebe dois
 * Cache-Control): em sobreposições, os hosts mesclam ou sobrescrevem de formas
 * diferentes, e o resultado ficaria ambíguo.
 */
const IMMUTABLE = 'public, max-age=31536000, immutable';
const ONE_DAY = 'public, max-age=86400';
const REVALIDATE = 'public, max-age=0, must-revalidate';

/** Arquivos estáveis da raiz (sem hash no nome): 1 dia. */
const rootAssets = [
  'favicon.ico',
  'favicon.svg',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'og-image.png',
  'manifest.webmanifest',
];

/** Páginas HTML: sempre revalidar (deploys aparecem na hora). */
const htmlRoutes = ['/', '/politica-de-privacidade', '/politica-de-privacidade/'];

const escapeRe = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function vercelConfig() {
  return {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    cleanUrls: true,
    trailingSlash: false,
    headers: [
      {
        source: '/(.*)',
        headers: Object.entries(securityHeaders).map(([key, value]) => ({ key, value })),
      },
      // Assets com hash do build: 1 ano, imutável.
      { source: '/_astro/(.*)', headers: [{ key: 'Cache-Control', value: IMMUTABLE }] },
      {
        source: `/(${rootAssets.map(escapeRe).join('|')})`,
        headers: [{ key: 'Cache-Control', value: ONE_DAY }],
      },
      // Todo o resto (HTML, robots, sitemap…): revalidar sempre.
      {
        source: `/((?!_astro/|${rootAssets.map(escapeRe).join('|')}).*)`,
        headers: [{ key: 'Cache-Control', value: REVALIDATE }],
      },
    ],
  };
}

function netlifyHeaders() {
  const block = (pathPattern, entries) =>
    [pathPattern, ...entries.map(([k, v]) => `  ${k}: ${v}`)].join('\n');
  const parts = [
    '# Gerado por scripts/security-headers.mjs — não editar à mão.',
    block('/*', Object.entries(securityHeaders)),
  ];
  parts.push(block('/_astro/*', [['Cache-Control', IMMUTABLE]]));
  for (const asset of rootAssets) parts.push(block(`/${asset}`, [['Cache-Control', ONE_DAY]]));
  // Demais caminhos: o padrão do Netlify já é "public, max-age=0, must-revalidate";
  // explicitado para as rotas HTML.
  for (const route of htmlRoutes) parts.push(block(route, [['Cache-Control', REVALIDATE]]));
  return parts.join('\n\n') + '\n';
}

// Executado diretamente (npm run headers): grava os arquivos.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await writeFile(path.join(root, 'vercel.json'), JSON.stringify(vercelConfig(), null, 2) + '\n');
  await writeFile(path.join(root, 'public/_headers'), netlifyHeaders());
  console.log('vercel.json e public/_headers gerados');
}
