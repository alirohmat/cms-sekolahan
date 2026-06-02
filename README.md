# 🏫 CMS Web Sekolah

Sistem Manajemen Konten (CMS) sekolah berperforma tinggi dengan desain **Glassmorphism** modern dan arsitektur **flat-file** yang minimalis. Dirancang untuk kecepatan maksimal, kemudahan deployment, dan efisiensi biaya pemeliharaan.

## 🌟 Visi & Fitur Utama

- **Glassmorphism UI**: Antarmuka futuristik dengan *floating navigation bar*, *backdrop-blur*, dan *soft-UI cards*.
- **Zero-JS by Default**: Menggunakan **Astro** untuk rendering statis instan.
- **Flat-File Engine**: Data disimpan dalam berkas `.json` dan `.md` dengan validasi skema **Zod**, menghindari overhead database relasional.
- **Atomic Writes**: Menjamin integritas data menggunakan penulisan atomik dan versioning berbasis hash SHA-256.
- **Admin Panel Secure**: Sistem autentikasi berbasis **JWT** dan **Capability Tokens** untuk kontrol akses peran (Admin, Guru, Siswa).

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Runtime** | Node.js v20+ |
| **Server/API** | Hono |
| **Frontend** | Astro |
| **Validation** | Zod |
| **Auth** | JWT |
| **Storage** | Flat-file (JSON/Markdown) |

## 🚀 Quick Start

### 1. Instalasi
```bash
git clone https://github.com/alirohmat/cms-sekolahan.git
cd cms-sekolahan
npm install
```

### 2. Konfigurasi Environment
Salin `.env.example` menjadi `.env` dan isi nilai yang diperlukan:
```bash
cp .env.example .env
```

### 3. Menjalankan Aplikasi
Jalankan API Server (Admin Panel) dan Frontend (Astro) secara bersamaan:

**Run API Server:**
```bash
node src/server/server.js
```

**Run Frontend:**
```bash
npm run dev
```

## 🔑 Akses Admin (Demo)

Kunjungi `/admin` dan gunakan kredensial berikut:
- **Username:** `admin` | **Password:** `admin123` (Role: Admin)
- **Username:** `teacher` | **Password:** `teacher123` (Role: Teacher)

## 📁 Struktur Proyek

```text
├── data/               # Single source of truth (JSON/MD)
├── src/
│   ├── content/        # Astro Content Collections
│   ├── layouts/        # BaseLayout (Glassmorphism)
│   ├── pages/          # Routing Astro (Public & Admin)
│   └── server/         # Backend Hono (Engine, Routes, Utils)
├── scripts/            # Sync & Maintenance tools
└── tests/              # Unit & Integration tests
```

## 📊 Metrik Validasi

| Metrik | Target |
| :--- | :--- |
| Waktu deploy pertama | ≤ 3 menit |
| Ukuran bundle frontend | ≤ 45 KB (gzip) |
| Backup & restore time | ≤ 10 detik |
| Overhead memori proses | ≤ 120 MB |

---
© 2026 CMS Web Sekolah - Flat-file Engine
