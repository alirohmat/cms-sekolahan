import { Hono } from 'hono';
import { saveAnnouncement, getAllAnnouncements } from '../engine/content.js';
import { verifyJWT } from '../utils/auth.js';
import { randomUUID } from 'crypto';
import { syncContent } from '../engine/sync.js';

const router = new Hono();

router.get('/', async (c) => {
  const announcements = await getAllAnnouncements();
  return c.json(announcements);
});

router.post('/', verifyJWT, async (c) => {
  try {
    const body = await c.req.json();
    const saved = await saveAnnouncement({
      ...body,
      id: randomUUID(),
      date: new Date().toISOString()
    });
    
    // Direct function call - no dependency on npm/shell
    syncContent().catch(err => console.error('Auto-sync failed:', err));
    
    return c.json(saved, 201);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

export default router;
