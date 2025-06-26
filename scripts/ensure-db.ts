import { existsSync } from 'fs';
import { spawnSync } from 'child_process';

console.log('Running ensure-db.ts...');

try {
  if (!existsSync('site.db')) {
    console.log('site.db not found. Seeding database...');
    const result = spawnSync('npx', ['ts-node', 'scripts/seed-db.ts'], { stdio: 'inherit', shell: true });
    if (result.error) {
      console.error('Error running seed-db.ts:', result.error);
      process.exit(1);
    }
  } else 
    console.log('Database already exists, skipping seed.');
} catch (err) {
  console.error('Error in ensure-db.ts:', err);
  process.exit(1);
} 