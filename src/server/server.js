import 'dotenv/config';
import app from './app.js';
import { serve } from '@hono/node-server';

const port = Number(process.env.PORT_API) || 3000;

console.log(`🚀 Admin API running on http://localhost:${port}`);
console.log(`🔍 Health check: http://localhost:${port}/health`);

serve({ fetch: app.fetch, port });
