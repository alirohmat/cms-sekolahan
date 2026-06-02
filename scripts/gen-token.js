import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'rahasia_sekolah_2024_ganti_dengan_nilai_acak_panjang';
const payload = { 
  role: 'admin', 
  username: 'admin_test' 
};

const token = jwt.sign(payload, secret, { expiresIn: '1h' });
console.log(token);
