import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import path from 'path';

export async function verifyJWT(c, next) {
  const auth = c.req.header('Authorization');
  if (!auth?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  
  try {
    const payload = jwt.verify(auth.slice(7), process.env.JWT_SECRET);
    const rolesPath = path.join('data', 'roles.json');
    const rolesData = await fs.readFile(rolesPath, 'utf-8');
    const roles = JSON.parse(rolesData);
    
    if (!roles[payload.role]?.includes('write:announcements')) {
      return c.json({ error: 'Forbidden' }, 403);
    }
    c.set('user', payload);
    return next();
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
}
