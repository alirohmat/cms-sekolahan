import { syncContent } from '../server/engine/sync.js';

async function run() {
  console.log('🔄 Synchronizing data to Astro content collections...');
  await syncContent();
  console.log('✨ Synchronization complete.');
}

run().catch(console.error);
