import { copyFile, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const builtSource = resolve(projectRoot, 'dist', 'source.html');
const distIndex = resolve(projectRoot, 'dist', 'index.html');
const mainIndex = resolve(projectRoot, 'index.html');
const workspaceIndex = resolve(projectRoot, '..', 'index.html');

await copyFile(builtSource, distIndex);
await copyFile(builtSource, mainIndex);
await copyFile(builtSource, workspaceIndex);
await rm(builtSource);

console.log('Standalone site promoted to the workspace index.html, project index.html, and dist/index.html');
