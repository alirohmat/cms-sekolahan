import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { createHash } from 'crypto';
import { emitter } from './events.js';

const AnnouncementSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3),
  content: z.string(),
  date: z.string().datetime(),
  hash: z.string().optional(),
});

export async function saveAnnouncement(data) {
  const result = AnnouncementSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Validation failed: ${result.error.issues.map(i => i.message).join(', ')}`);
  }
  
  const validated = result.data;
  const hash = createHash('sha256').update(validated.content).digest('hex');
  validated.hash = hash;
  
  const dir = path.join('data/announcements');
  const filePath = path.join(dir, `${validated.id}.json`);
  const tempPath = `${filePath}.tmp`;
  
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(tempPath, JSON.stringify(validated, null, 2));
  await fs.rename(tempPath, filePath); // Atomic write
  
  emitter.emit('content:saved', { id: validated.id, hash });
  return validated;
}

export async function getAllAnnouncements() {
  const dir = path.join('data/announcements');
  try {
    const files = await fs.readdir(dir);
    const items = await Promise.all(
      files.filter(f => f.endsWith('.json')).map(async f => {
        try {
          const raw = await fs.readFile(path.join(dir, f), 'utf-8');
          return JSON.parse(raw);
        } catch (e) {
          console.error(`Failed to parse JSON file ${f}:`, e.message);
          return null; // Skip corrupt files
        }
      })
    );
    
    return items
      .filter(item => item !== null)
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
      });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}
