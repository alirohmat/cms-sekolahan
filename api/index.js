import app from '../src/server/app.js';
import { getRequestListener } from '@hono/node-server';

export default getRequestListener(app.fetch);
