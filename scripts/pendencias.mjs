/**
 * Gera PENDENCIAS.md: todos os marcadores [CONFIRMAR …] e [REVISAR …] do
 * repositório, com arquivo e linha, mais as decisões que não estão no código.
 *
 * Uso: npm run pendencias   (rodar de novo sempre que um item for resolvido)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Arquivos que só explicam o mecanismo dos marcadores (não são pendências).
const ignore = new Set([
  'PENDENCIAS.md',
  'README.md',
  'CLAUDE.md',
  'prompt.md',
  'scripts/pendencias.mjs',
  'src/utils/typography.ts',
  'src/styles/global.css',
]);

const pagesManifest = path.join(root, '.pages-files.json');
const published = new Set(
  existsSync(pagesManifest) ? JSON.parse(await readFile(pagesManifest, 'utf8')) : [],
);

const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
  cwd: root,
  encoding: 'utf8',
})
  .split('\n')
  .filter(
    (f) =>
      f && !ignore.has(f) && !f.endsWith('package-lock.json') && !/\.(png|ico|woff2?)$/.test(f),
  )
  // --cached também lista arquivos apagados que ainda não foram para o stage.
  .filter((f) => existsSync(path.join(root, f)))
  // Site publicado na raiz (npm run pages) é cópia do build, não fonte.
  .filter((f) => !published.has(f.split('/')[0]));

const marker = /\[(CONFIRMAR|REVISAR)([^\]]*)\]/g;
const groups = new Map();

/** Strings literais da linha, sem os marcadores. */
const strings = (line) =>
  [...line.matchAll(/'([^']*)'|`([^`]*)`|"([^"]*)"/g)]
    .map((m) => (m[1] ?? m[2] ?? m[3]).replace(marker, '').trim())
    .filter((s) => s.length > 1 && !s.startsWith('$'));

/**
 * Contexto legível: comentários e Markdown usam o próprio texto; em dados,
 * as strings da linha ou, se não houver, da linha anterior (ex.: a pergunta
 * de uma resposta do FAQ).
 */
function contextOf(lines, i, file) {
  const line = lines[i];
  if (/^\s*(\*|\/\/|#)/.test(line) || /\.(md|txt)$/.test(file)) {
    return line
      .replace(marker, '')
      .replace(/^[\s*/#>-]+/, '')
      .replace(/`/g, '')
      .trim();
  }
  let ctx = strings(line).join(' · ');
  for (let j = i - 1; !ctx && j >= Math.max(0, i - 4); j--) ctx = strings(lines[j]).join(' · ');
  // Item de lista com título na linha anterior (ex.: "CMB, São Paulo" → descrição).
  const prev = lines[i - 1] ?? '';
  if (/^\s*(title|question|label):/.test(prev) && !ctx.includes(strings(prev)[0] ?? '')) {
    ctx = `${strings(prev).join(' · ')} → ${ctx}`;
  }
  return ctx;
}

for (const file of files) {
  const lines = (await readFile(path.join(root, file), 'utf8')).split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(marker)) {
      const detail = m[2].replace(/^[\s,:]+|COM A CLIENTE[\s,:]*/g, '').trim();
      const context = contextOf(lines, i, file);
      const key = file;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ line: i + 1, kind: m[1], detail, context });
    }
  });
}

const sections = {
  'src/data/content.ts': 'Textos do site',
  'src/data/site.ts': 'Dados institucionais',
  'src/data/privacy.ts': 'Política de privacidade (validação jurídica)',
  'SECURITY.md': 'Contato de segurança',
  'public/.well-known/security.txt': 'Contato de segurança',
};

let total = 0;
const body = [];
for (const [file, items] of groups) {
  total += items.length;
  body.push(`### ${sections[file] ?? 'Outros'} — \`${file}\`\n`);
  body.push('| Linha | Tipo | O que confirmar | Contexto |');
  body.push('|---|---|---|---|');
  for (const it of items) {
    const ctx = it.context.length > 90 ? it.context.slice(0, 87) + '…' : it.context;
    body.push(
      `| [${it.line}](${file}#L${it.line}) | ${it.kind} | ${it.detail || '—'} | ${ctx.replace(/\|/g, '\\|') || '—'} |`,
    );
  }
  body.push('');
}

const md = `# Pendências para a cliente

> Gerado por \`npm run pendencias\` em ${new Date().toISOString().slice(0, 10)}. Não edite à mão: resolva o item no arquivo indicado e rode o comando de novo.

**${total} marcadores no código** (\`[CONFIRMAR]\` = informação da cliente · \`[REVISAR]\` = validação jurídica), mais as decisões abaixo que não aparecem como marcador.

## Marcadores no código

${body.join('\n')}
## Materiais e decisões fora do código

- [ ] **Retrato profissional** (hero): enviar a foto; ver "Como trocar as fotos" no README.
- [ ] **Foto do consultório** (opcional, seção Sobre): enviar ou decidir não usar (\`showPlaceholder: false\`).
- [ ] **Domínio**: registrar/confirmar e apontar o DNS (README, "Domínio").
- [ ] **Hospedagem**: escolher Vercel ou Netlify (impacta a política de privacidade).
- [ ] **Analytics**: decidir. Padrão: nenhum. Se aprovado, só ferramenta sem cookies, com ajuste de CSP e da política.
- [ ] **HSTS preload**: só enviar o domínio a hstspreload.org com o domínio definitivo e certeza de HTTPS em todos os subdomínios (difícil de reverter).
- [ ] **Data da política de privacidade**: atualizar \`updatedAt\` em \`src/data/privacy.ts\` após a revisão jurídica.
- [ ] **security.txt**: renovar o campo \`Expires\` antes de 2027-10-08.
`;

await writeFile(path.join(root, 'PENDENCIAS.md'), md);
console.log(`PENDENCIAS.md: ${total} marcadores em ${groups.size} arquivos`);
