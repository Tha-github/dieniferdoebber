/**
 * Publica o site para o GitHub Pages servindo a RAIZ do repositório
 * (Settings → Pages → Deploy from a branch → main → / (root)).
 *
 * Uso: npm run pages   (faz o build e copia dist/ para a raiz; depois, commit e push)
 *
 * Como funciona:
 *   1. Roda `astro build` (saída em dist/, que continua no .gitignore).
 *   2. Apaga da raiz apenas os arquivos publicados na vez anterior, listados em
 *      .pages-files.json (assim não sobram assets antigos com hash).
 *   3. Copia o conteúdo de dist/ para a raiz, exceto arquivos que só servem a
 *      outros hosts (_headers do Netlify).
 *   4. Grava .nojekyll (sem ele o GitHub ignora _astro/ e .well-known/) e, só com
 *      domínio próprio em site.url (src/data/site.ts), o arquivo CNAME.
 *
 * Segurança: aborta se algum item de dist/ tiver o mesmo nome de um arquivo ou
 * pasta do código-fonte. Nunca apaga nada fora da lista de publicados.
 */
import { execSync } from 'node:child_process';
import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { site } from '../src/data/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const manifestFile = path.join(root, '.pages-files.json');

/** Itens do código-fonte que a publicação nunca pode sobrescrever ou apagar. */
const protectedNames = new Set([
  '.git',
  '.github',
  '.gitignore',
  '.gitattributes',
  '.editorconfig',
  '.npmrc',
  '.prettierrc.json',
  '.prettierignore',
  '.pages-files.json',
  '.astro',
  '.vscode',
  'node_modules',
  'dist',
  'src',
  'public',
  'scripts',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'astro.config.mjs',
  'netlify.toml',
  'vercel.json',
  'prompt.md',
  'README.md',
  'CLAUDE.md',
  'SECURITY.md',
  'PENDENCIAS.md',
]);

/** Arquivos do build que não fazem sentido no GitHub Pages. */
const skip = new Set(['_headers']);

console.log('1/4 build…');
execSync('npm run build', { cwd: root, stdio: 'inherit' });

const entries = (await readdir(dist)).filter((name) => !skip.has(name));
const clash = entries.filter((name) => protectedNames.has(name));
if (clash.length) {
  throw new Error(`Conflito com o código-fonte, publicação abortada: ${clash.join(', ')}`);
}

console.log('2/4 removendo a publicação anterior…');
const previous = existsSync(manifestFile) ? JSON.parse(await readFile(manifestFile, 'utf8')) : [];
for (const name of previous) {
  if (protectedNames.has(name) || name.includes('/') || name.includes('..')) continue;
  await rm(path.join(root, name), { recursive: true, force: true });
}

console.log('3/4 copiando dist/ para a raiz…');
for (const name of entries) {
  await cp(path.join(dist, name), path.join(root, name), { recursive: true });
}

console.log('4/4 .nojekyll e CNAME…');
await writeFile(path.join(root, '.nojekyll'), '');

// CNAME só com domínio próprio. No endereço *.github.io ele não deve existir:
// faria o GitHub redirecionar para um domínio que ainda não aponta para cá.
const { hostname } = new URL(site.url);
const customDomain = hostname.endsWith('.github.io') ? null : hostname;
if (customDomain) await writeFile(path.join(root, 'CNAME'), `${customDomain}\n`);

const published = [...entries, '.nojekyll', ...(customDomain ? ['CNAME'] : [])].sort();
await writeFile(manifestFile, JSON.stringify(published, null, 2) + '\n');

console.log(`\nPublicado na raiz: ${published.length} itens (lista em .pages-files.json).`);
console.log(`Endereço: ${site.url}${customDomain ? ` (CNAME: ${customDomain})` : ' (sem CNAME)'}`);
console.log('Próximo passo: git add -A && git commit && git push');
