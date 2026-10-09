/**
 * Gera os ativos de marca a partir das fontes do @fontsource, convertendo
 * o texto em paths SVG (não dependem de fonte carregada):
 *   - src/components/Logo.paths.ts      → dados do wordmark usados por Logo.astro
 *   - src/assets/brand/wordmark-*.svg   → wordmark avulso (fundo claro / escuro)
 *   - public/favicon.svg                → monograma "DD"
 *   - public/apple-touch-icon.png       → monograma 180×180
 *   - public/favicon.ico                → monograma 16 + 32 (navegadores antigos)
 *   - public/icon-192.png, icon-512.png → ícones do manifest (+ maskable 512)
 *   - public/og-image.png               → imagem Open Graph 1200×630
 *
 * Uso: npm run brand
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import opentype from 'opentype.js';
import sharp from 'sharp';
import { site } from '../src/data/site.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fontFile = (pkg, file) => path.join(root, 'node_modules/@fontsource', pkg, 'files', file);

const NAVY = '#1F2A3A';
const OFF_WHITE = '#F6F2EC';
const SURFACE = '#ECE5DA';
const SAND = '#D8CCBA';
const MUTED = '#6B655C';

const NAME = 'Dienifer Doebber';
const TAGLINE = 'PSICANÁLISE · PSICOLOGIA CLÍNICA';

async function loadFont(pkg, file) {
  const buf = await readFile(fontFile(pkg, file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

/** Monta um único Path a partir do texto, com kerning e tracking (em em). */
function textPath(font, text, x, y, size, trackingEm = 0) {
  // charToGlyph evita o shaping do opentype.js (sem suporte a algumas lookups GSUB).
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  const scale = size / font.unitsPerEm;
  const out = new opentype.Path();
  let cursor = x;
  glyphs.forEach((glyph, i) => {
    out.extend(glyph.getPath(cursor, y, size));
    cursor += glyph.advanceWidth * scale;
    const next = glyphs[i + 1];
    if (next) cursor += font.getKerningValue(glyph, next) * scale + trackingEm * size;
  });
  return out;
}

const round = (n) => Math.round(n * 100) / 100;

/**
 * Serializa os comandos do Path em path data SVG. O toPathData() do
 * opentype.js 2.0 gera saída que o librsvg/navegadores não leem por inteiro.
 */
function toD(p, dx = 0, dy = 0, s = 1) {
  // 1 casa decimal: imperceptível nos tamanhos de uso e reduz o HTML.
  const n = (v) => String(Math.round(v * 10) / 10);
  const pt = (x, y) => `${n(x * s + dx)} ${n(y * s + dy)}`;
  return p.commands
    .map((c) => {
      switch (c.type) {
        case 'M':
          return `M${pt(c.x, c.y)}`;
        case 'L':
          return `L${pt(c.x, c.y)}`;
        case 'Q':
          return `Q${pt(c.x1, c.y1)} ${pt(c.x, c.y)}`;
        case 'C':
          return `C${pt(c.x1, c.y1)} ${pt(c.x2, c.y2)} ${pt(c.x, c.y)}`;
        case 'Z':
          return 'Z';
        default:
          throw new Error(`Comando de path desconhecido: ${c.type}`);
      }
    })
    .join('');
}

async function buildWordmark() {
  const cormorant = await loadFont(
    'cormorant-garamond',
    'cormorant-garamond-latin-500-normal.woff',
  );
  const inter = await loadFont('inter', 'inter-latin-500-normal.woff');

  const nameSize = 64;
  const tracking = 0.24; // tracking amplo do versalete, em em

  const name = textPath(cormorant, NAME, 0, nameSize, nameSize);
  const nameBox = name.getBoundingBox();
  const nameWidth = nameBox.x2 - nameBox.x1;

  // Tamanho da tagline resolvido para que sua largura ótica
  // coincida com a do nome (alinhamento justificado do lockup).
  const probe = textPath(inter, TAGLINE, 0, 0, 100, tracking).getBoundingBox();
  const taglineSize = (nameWidth / (probe.x2 - probe.x1)) * 100;

  // Espaço entre a linha de base do nome e o topo das maiúsculas da tagline.
  const gap = nameSize * 0.3;
  const capHeight = (inter.tables.os2.sCapHeight / inter.unitsPerEm) * taglineSize;
  const taglineBaseline = nameBox.y2 + gap + capHeight;

  const firstTagGlyph = inter.charToGlyph(TAGLINE[0]);
  const lsb = (firstTagGlyph.getBoundingBox().x1 / inter.unitsPerEm) * taglineSize;
  const tagline = textPath(
    inter,
    TAGLINE,
    nameBox.x1 - lsb,
    taglineBaseline,
    taglineSize,
    tracking,
  );
  const tagBox = tagline.getBoundingBox();

  const x = Math.floor(Math.min(nameBox.x1, tagBox.x1));
  const y = Math.floor(nameBox.y1);
  const w = Math.ceil(Math.max(nameBox.x2, tagBox.x2)) - x;
  const h = Math.ceil(tagBox.y2) - y;

  return {
    viewBox: `${x} ${y} ${w} ${h}`,
    width: w,
    height: h,
    nameHeight: Math.ceil(nameBox.y2) - y,
    name: toD(name),
    tagline: toD(tagline),
    taglineSize: round(taglineSize),
  };
}

async function buildMonogram({ size, radius, letterHeight, maxWidth }) {
  // Peso 600 para manter as hastes legíveis em 16px.
  const font = await loadFont('cormorant-garamond', 'cormorant-garamond-latin-600-normal.woff');
  const fontSize = 100;
  const p = textPath(font, 'DD', 0, 0, fontSize, -0.06);
  const box = p.getBoundingBox();
  const scale = Math.min(
    (size * letterHeight) / (box.y2 - box.y1),
    (size * maxWidth) / (box.x2 - box.x1),
  );
  const tx = (size - (box.x2 - box.x1) * scale) / 2 - box.x1 * scale;
  const ty = (size - (box.y2 - box.y1) * scale) / 2 - box.y1 * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/>
  <path fill="${OFF_WHITE}" d="${toD(p, tx, ty, scale)}"/>
</svg>
`;
}

/** Imagem Open Graph: wordmark marinho sobre bege, filete curto e CRP. */
async function buildOgImage(w) {
  const W = 1200;
  const H = 630;
  const [vx, vy, vw, vh] = w.viewBox.split(' ').map(Number);
  const scale = 720 / vw;
  const markH = vh * scale;

  const inter = await loadFont('inter', 'inter-latin-500-normal.woff');
  const crpSize = 20;
  const crp = textPath(inter, site.crp.label.toUpperCase(), 0, 0, crpSize, 0.18);
  const crpBox = crp.getBoundingBox();

  const gapRule = 48;
  const gapCrp = 36;
  const blockH = markH + gapRule + 1 + gapCrp + (crpBox.y2 - crpBox.y1);
  const top = (H - blockH) / 2;
  const markX = (W - vw * scale) / 2 - vx * scale;
  const markY = top - vy * scale;
  const ruleY = top + markH + gapRule;
  const crpX = (W - (crpBox.x2 - crpBox.x1)) / 2 - crpBox.x1;
  const crpY = ruleY + 1 + gapCrp - crpBox.y1;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${SURFACE}"/>
  <g fill="${NAVY}">
    <path d="${toD(pathFromD(w.name), markX, markY, scale)}"/>
    <path d="${toD(pathFromD(w.tagline), markX, markY, scale)}"/>
  </g>
  <rect x="${W / 2 - 32}" y="${ruleY}" width="64" height="1" fill="${SAND}"/>
  <path fill="${MUTED}" d="${toD(crp, crpX, crpY)}"/>
</svg>`;
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

/** Reconstrói um opentype.Path a partir do path data gerado por toD (M/L/Q/C/Z absolutos). */
function pathFromD(d) {
  const p = new opentype.Path();
  const re = /([MLQCZ])([^MLQCZ]*)/g;
  let m;
  while ((m = re.exec(d))) {
    const n = m[2].trim() ? m[2].trim().split(/\s+/).map(Number) : [];
    if (m[1] === 'M') p.moveTo(n[0], n[1]);
    else if (m[1] === 'L') p.lineTo(n[0], n[1]);
    else if (m[1] === 'Q') p.quadraticCurveTo(n[0], n[1], n[2], n[3]);
    else if (m[1] === 'C') p.curveTo(n[0], n[1], n[2], n[3], n[4], n[5]);
    else p.close();
  }
  return p;
}

/** ICO com PNGs embutidos (formato aceito desde o Windows Vista). */
function pngsToIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

function wordmarkSvg(w, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${w.viewBox}" width="${w.width}" height="${w.height}" role="img">
  <title>${NAME} · Psicanálise · Psicologia Clínica</title>
  <path fill="${color}" d="${w.name}"/>
  <path fill="${color}" d="${w.tagline}"/>
</svg>
`;
}

const wordmark = await buildWordmark();

await writeFile(
  path.join(root, 'src/components/Logo.paths.ts'),
  `// Arquivo gerado por scripts/generate-brand.mjs — não editar à mão.
export const wordmark = {
  viewBox: '${wordmark.viewBox}',
  width: ${wordmark.width},
  height: ${wordmark.height},
  nameHeight: ${wordmark.nameHeight},
  name: '${wordmark.name}',
  tagline: '${wordmark.tagline}',
} as const;
`,
);

await mkdir(path.join(root, 'src/assets/brand'), { recursive: true });
await writeFile(
  path.join(root, 'src/assets/brand/wordmark-on-light.svg'),
  wordmarkSvg(wordmark, NAVY),
);
await writeFile(
  path.join(root, 'src/assets/brand/wordmark-on-dark.svg'),
  wordmarkSvg(wordmark, OFF_WHITE),
);

const favicon = await buildMonogram({ size: 64, radius: 6, letterHeight: 0.5, maxWidth: 0.8 });
await writeFile(path.join(root, 'public/favicon.svg'), favicon);

// O iOS aplica a própria máscara: fundo sem raio e margem maior.
const apple = await buildMonogram({ size: 180, radius: 0, letterHeight: 0.4, maxWidth: 0.64 });
await sharp(Buffer.from(apple))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'public/apple-touch-icon.png'));

const png = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

const ico = pngsToIco([
  { size: 16, data: await png(favicon, 16) },
  { size: 32, data: await png(favicon, 32) },
]);
await writeFile(path.join(root, 'public/favicon.ico'), ico);

// Manifest: ícone "any" com raio mínimo e "maskable" com margem de segurança (80%).
const icon = await buildMonogram({ size: 512, radius: 48, letterHeight: 0.42, maxWidth: 0.7 });
await writeFile(path.join(root, 'public/icon-192.png'), await png(icon, 192));
await writeFile(path.join(root, 'public/icon-512.png'), await png(icon, 512));
const maskable = await buildMonogram({ size: 512, radius: 0, letterHeight: 0.3, maxWidth: 0.5 });
await writeFile(path.join(root, 'public/icon-maskable-512.png'), await png(maskable, 512));

await writeFile(path.join(root, 'public/og-image.png'), await buildOgImage(wordmark));

console.log(`wordmark ${wordmark.viewBox} · tagline ${wordmark.taglineSize}px p/ nome 64px`);
console.log('favicon.svg/.ico, apple-touch-icon, ícones do manifest e og-image.png gerados');
