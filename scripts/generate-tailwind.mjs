import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const tempDir = mkdtempSync(join(tmpdir(), 'aesc-tailwind-'));
const cssOut = join(tempDir, 'tailwind.css');

execFileSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', [
  '@tailwindcss/cli',
  '-c',
  'tailwind.config.cjs',
  '-i',
  'src/styles/tailwind.css',
  '-o',
  cssOut,
  '--minify'
], { stdio: 'inherit' });

const cssText = readFileSync(cssOut, 'utf8');
const outTs = `export const tailwindCssText = ${JSON.stringify(cssText)};\n`;

writeFileSync('src/styles/tailwind.generated.ts', outTs);
