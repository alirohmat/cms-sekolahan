import fs from 'fs/promises';
import path from 'path';

export async function syncContent() {
  const folders = [
    { src: 'data/announcements', dest: 'src/content/announcements' },
  ];

  for (const folder of folders) {
    try {
      await fs.mkdir(folder.dest, { recursive: true });
      const srcFiles = await fs.readdir(folder.src);
      const destFiles = await fs.readdir(folder.dest);
      const jsonSrcFiles = srcFiles.filter(f => f.endsWith('.json'));
      const jsonDestFiles = destFiles.filter(f => f.endsWith('.json'));

      for (const file of jsonSrcFiles) {
        await fs.copyFile(path.join(folder.src, file), path.join(folder.dest, file));
      }

      const filesToDelete = jsonDestFiles.filter(f => !jsonSrcFiles.includes(f));
      for (const file of filesToDelete) {
        await fs.unlink(path.join(folder.dest, file));
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`❌ Sync error ${folder.src}:`, error.message);
      }
    }
  }
  return { success: true };
}
