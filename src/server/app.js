import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import announcementRouter from './routes/announcements.js';
import authRouter from './routes/auth.js';

const app = new Hono();

app.use('/*', cors());

app.route('/api/auth', authRouter);
app.route('/api/announcements', announcementRouter);

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/ping', (c) => c.text('pong'));

export default app;
