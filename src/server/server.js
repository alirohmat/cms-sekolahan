import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import announcementRouter from './routes/announcements.js';

const app = new Hono();

// Middleware
app.use('/*', cors());

// Routes
app.route('/api/announcements', announcementRouter);

// Health Check
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Ping endpoint for basic connectivity test
app.get('/api/ping', (c) => c.text('pong'));

const port = Number(process.env.PORT_API) || 3000;

console.log(`🚀 Admin API running on http://localhost:${port}`);
console.log(`🔍 Health check: http://localhost:${port}/health`);

serve({
  fetch: app.fetch,
  port
});
