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

## 📋 To-Do List untuk Pengembang

### 🔴 Prioritas Tinggi

- [ ] **Buat halaman detail subjects** — `src/pages/subjects/[slug].astro` belum ada, padahal Content Collection `subjects` sudah didefinisikan di `src/content.config.ts`
- [ ] **Populate `data/subjects/`** — Direktori kosong; isi dengan file `.md` (metadata + konten mata pelajaran)
- [ ] **Tulis unit test** — `vitest` sudah terinstall, tapi `tests/unit/` masih kosong. Prioritaskan test untuk `src/server/engine/content.js` (CRUD, validasi Zod, atomic write)
- [ ] **Tulis integration test** — `tests/integration/` kosong. Test endpoint API: auth flow (login→JWT→akses), CRUD announcements
- [ ] **Lengkapi CRUD subjects di API** — Tambahkan route `POST/GET/PUT/DELETE /api/subjects` di `src/server/routes/` dengan validasi Zod

### 🟡 Prioritas Sedang

- [ ] **Buat `scripts/seed.js`** — Isi data awal announcements & subjects untuk development/testing
- [ ] **Buat `scripts/validate.js`** — Validasi semua file JSON di `data/` terhadap skema Zod
- [ ] **Buat `scripts/backup.js`** — Backup atomik `data/` ke arsip `.tar.gz` + hash SHA-256
- [ ] **Ukur sisa metrik validasi** — Hanya 2 dari 5 yang terukur (build time ✅, bundle size ✅). Ukur: error onboarding guru, backup/restore time, overhead memori
- [ ] **Tambahkan halaman error kustom** — Buat `src/pages/404.astro` dan `src/pages/500.astro`
- [ ] **Buat komponen interaktif** — Gunakan Svelte atau Vanilla Web Components untuk interaktivitas admin (sesuai rencana arsitektur), gantikan inline JS di `admin/index.astro`

### 🟢 Prioritas Rendah (Enhancement)

- [ ] **Pagination untuk announcements** — Tambahkan pagination di `src/pages/announcements.astro` dan endpoint `GET /api/announcements?page=1&limit=10`
- [ ] **Fitur pencarian** — Tambahkan search `/api/announcements?q=...` di route announcements
- [ ] **Upload gambar/file** — Tambahkan endpoint upload dan simpan path ke data JSON
- [ ] **Docker setup** — Buat `Dockerfile` dan `docker-compose.yml` untuk development/production
- [ ] **CI/CD pipeline** — Setup GitHub Actions untuk lint→test→build otomatis
- [ ] **Logging terstruktur** — Integrasikan `pino` atau `winston` untuk log API yang lebih baik
- [ ] **Rate limiting** — Tambahkan middleware rate-limit untuk endpoint auth/login
- [ ] **Refresh token** — Tambahkan refresh token flow untuk sesi admin yang lebih panjang
- [ ] **Internationalization (i18n)** — Dukungan multi-bahasa (Indonesia/Inggris) untuk frontend
- [ ] **Dark mode toggle** — Tambahkan tema gelap di `BaseLayout.astro`

### 📝 Catatan Arsitektur

- `data/` adalah **single source of truth** — jangan edit langsung `src/content/`
- Sebelum `astro build`, jalankan `npm run sync` untuk sinkronisasi data
- Semua schema validation menggunakan **Zod** — jangan tambahkan validasi manual
- Konten di-versioning via **SHA-256 hash** — jangan nonaktifkan
- Jika ≥3 metrik validasi gagal, migrasi ke `better-sqlite3` (lihat `main_plan.md`)

---
© 2026 CMS Web Sekolah - Flat-file Engine
