/**
 * Servidor local que serve dist/ aplicando os headers de dist/_headers
 * (mesmo formato do Netlify), para validar CSP e cache antes do deploy.
 * Comprime texto com brotli/gzip, como Vercel e Netlify fazem em produção.
 *
 * Uso: npm run build && npm run preview:secure   → http://localhost:4322
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { brotliCompressSync, gzipSync, constants } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.env.PORT ?? 4322);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

/** Lê dist/_headers → [{ pattern: RegExp, headers: [[k, v]] }]. */
async function loadRules() {
  const text = await readFile(path.join(root, '_headers'), 'utf8');
  const rules = [];
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (!/^\s/.test(line)) {
      const source = line
        .trim()
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*');
      current = { pattern: new RegExp(`^${source}$`), headers: [] };
      rules.push(current);
    } else if (current) {
      const i = line.indexOf(':');
      current.headers.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
    }
  }
  return rules;
}

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = [clean, path.posix.join(clean, 'index.html'), `${clean}.html`];
  for (const candidate of candidates) {
    const file = path.join(root, candidate);
    if (!file.startsWith(root)) return null;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

const rules = await loadRules();

createServer(async (req, res) => {
  const urlPath = new URL(req.url ?? '/', 'http://localhost').pathname;
  let file = await resolveFile(urlPath);
  let status = 200;
  if (!file) {
    file = path.join(root, '404.html');
    status = 404;
  }
  for (const rule of rules) {
    if (!rule.pattern.test(urlPath)) continue;
    for (const [key, value] of rule.headers) res.setHeader(key, value);
  }
  const type = types[path.extname(file)] ?? 'application/octet-stream';
  res.setHeader('Content-Type', type);
  let body = await readFile(file);
  const accept = String(req.headers['accept-encoding'] ?? '');
  if (/^(text\/|application\/(json|manifest|xml)|image\/svg)/.test(type)) {
    res.setHeader('Vary', 'Accept-Encoding');
    if (accept.includes('br')) {
      body = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } });
      res.setHeader('Content-Encoding', 'br');
    } else if (accept.includes('gzip')) {
      body = gzipSync(body, { level: 9 });
      res.setHeader('Content-Encoding', 'gzip');
    }
  }
  res.writeHead(status);
  res.end(body);
}).listen(port, () => console.log(`dist/ com headers de _headers em http://localhost:${port}`));
