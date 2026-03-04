import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const args = process.argv.slice(2);

const getArgValue = (name) => {
  const i = args.indexOf(name);
  if (i === -1) return undefined;
  const v = args[i + 1];
  if (!v || v.startsWith('--')) return undefined;
  return v;
};

const hasFlag = (name) => args.includes(name);

const distDir = getArgValue('--dir') ?? 'dist';
const topN = Number(getArgValue('--top') ?? '20');
const maxFileBrotliKb = getArgValue('--max-file-brotli-kb');
const maxTotalBrotliKb = getArgValue('--max-total-brotli-kb');
const json = hasFlag('--json');

const toKb = (bytes) => bytes / 1024;
const round = (n) => Math.round(n * 100) / 100;

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
};

const compress = (buf) => {
  const gzip = zlib.gzipSync(buf, { level: zlib.constants.Z_BEST_COMPRESSION });
  const brotli = zlib.brotliCompressSync(buf, {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY
    }
  });
  return { gzip, brotli };
};

const absDist = path.resolve(process.cwd(), distDir);
if (!fs.existsSync(absDist)) {
  console.error(`No existe el directorio: ${absDist}`);
  process.exit(2);
}

const files = walk(absDist).filter((p) => {
  const ext = path.extname(p);
  if (ext === '.map' || ext === '.d.ts') return false;
  return ext === '.js' || ext === '.css';
});

const rows = files
  .map((filePath) => {
    const buf = fs.readFileSync(filePath);
    const { gzip, brotli } = compress(buf);
    return {
      file: path.relative(absDist, filePath),
      bytes: buf.byteLength,
      gzip: gzip.byteLength,
      brotli: brotli.byteLength
    };
  })
  .sort((a, b) => b.brotli - a.brotli);

const total = rows.reduce(
  (acc, r) => {
    acc.bytes += r.bytes;
    acc.gzip += r.gzip;
    acc.brotli += r.brotli;
    return acc;
  },
  { bytes: 0, gzip: 0, brotli: 0 }
);

const limits = {
  maxFileBrotliKb: maxFileBrotliKb ? Number(maxFileBrotliKb) : undefined,
  maxTotalBrotliKb: maxTotalBrotliKb ? Number(maxTotalBrotliKb) : undefined
};

const failures = [];
if (limits.maxFileBrotliKb) {
  for (const r of rows) {
    if (toKb(r.brotli) > limits.maxFileBrotliKb) failures.push({ type: 'file', ...r });
  }
}
if (limits.maxTotalBrotliKb && toKb(total.brotli) > limits.maxTotalBrotliKb) {
  failures.push({ type: 'total', ...total });
}

if (json) {
  console.log(
    JSON.stringify(
      {
        dir: absDist,
        totals: total,
        top: rows.slice(0, topN),
        limits,
        ok: failures.length === 0,
        failures
      },
      null,
      2
    )
  );
} else {
  const format = (b) => `${round(toKb(b))} KB`;
  console.log(`Directorio: ${absDist}`);
  console.log(`Total (raw/gzip/brotli): ${format(total.bytes)} / ${format(total.gzip)} / ${format(total.brotli)}`);
  console.log(`Top ${Math.min(topN, rows.length)} por brotli:`);
  for (const r of rows.slice(0, topN)) {
    console.log(`- ${r.file}: ${format(r.bytes)} / ${format(r.gzip)} / ${format(r.brotli)}`);
  }
  if (limits.maxFileBrotliKb || limits.maxTotalBrotliKb) {
    console.log('Límites:');
    if (limits.maxFileBrotliKb) console.log(`- max-file-brotli-kb: ${limits.maxFileBrotliKb} KB`);
    if (limits.maxTotalBrotliKb) console.log(`- max-total-brotli-kb: ${limits.maxTotalBrotliKb} KB`);
  }
}

process.exit(failures.length === 0 ? 0 : 1);
