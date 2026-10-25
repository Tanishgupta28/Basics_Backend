import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

let checked = 0;
function checkDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) checkDirectory(file);
    else if (entry.name.endsWith('.js')) {
      const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
      if (result.error || result.status !== 0) throw new Error(`Syntax check failed: ${file}`);
      checked++;
    }
  }
}
for (const directory of ['models', 'scripts', 'examples', 'tests']) checkDirectory(directory);
console.log(`Syntax checked ${checked} JavaScript files.`);
