import { Hono } from 'hono';
import jwt from 'jsonwebtoken';

const router = new Hono();

const DEMO_USERS = {
  admin: { password: 'admin123', role: 'admin' },
  teacher: { password: 'teacher123', role: 'teacher' },
};

router.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    const user = DEMO_USERS[username];
    if (!user || user.password !== password) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const token = jwt.sign(
      { username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return c.json({ token, role: user.role, username });
  } catch {
    return c.json({ error: 'Invalid request' }, 400);
  }
});

export default router;
