# JEJAK.VISUAL — Document Specification & Information

**Jejak.Visual** adalah platform berbagi gambar dan galeri inspirasi visual interaktif berbasis web (Pinterest-inspired image sharing platform) yang dikembangkan menggunakan **Laravel 12**, **Tailwind CSS**, dan **PostgreSQL**. Projek ini dirancang sebagai proyek Uji Kompetensi Keahlian (UKK) Rekayasa Perangkat Lunak (RPL).

---

## 📑 Daftar Isi

1. [Konsep Utama & Visi](#1-konsep-utama--visi)
2. [Sistem Role & Otentikasi](#2-sistem-role--otentikasi)
3. [Skema Database (ERD & SQL/PostgreSQL)](#3-skema-database-erd--sqlpostgresql)
4. [Alur Workflow Konten & Moderasi](#4-alur-workflow-konten--moderasi)
5. [Design System & UI/UX Guidelines](#5-design-system--uiux-guidelines)
6. [Struktur Folder Project (Laravel 12)](#6-struktur-folder-project-laravel-12)
7. [Instalasi & Panduan Pengembangan](#7-instalasi--panduan-pengembangan)
8. [Aturan Bisnis & Keamanan Utama](#8-aturan-bisnis--keamanan-utama)
9. [Rencana Modul Prompt (Coding Phases)](#9-rencana-modul-prompt-coding-phases)

---

## 1. Konsep Utama & Visi

**Tagline:** *Ruang Kreatif & Galeri Inspirasi Visual Digital*

Jejak.Visual menjadi wadah bagi para kreator, fotografer, dan pengguna umum untuk mengeksplorasi, mempublikasikan, menyimpan, serta mengunduh karya visual berkualitas tinggi.

### Fitur Utama Platform

- **Masonry Visual Grid:** Tampilan gambar dinamis bergaya Pinterest.
- **Interaksi Komunitas:** Fitur Like, Komentar, dan Penyelamatan Gambar (Save/Bookmark).
- **Manajemen Kategori:** Pengelompokan postingan berdasarkan topik visual.
- **Eksplorasi & Pencarian:** Fitur pencarian gambar dan pengguna secara real-time.
- **Moderasi Admin:** Panel kontrol khusus admin untuk memantau pengguna, postingan, dan kategori.

---

## 2. Sistem Role & Otentikasi

### Matrix Akses Role

| Fitur / Hak Akses | Admin | User (Pengguna Terdaftar) | Guest (Publik) |
| :--- | :---: | :---: | :---: |
| **Registrasi & Login** | ❌ (Pre-seeded / Internal) | ✅ | ✅ |
| **Eksplorasi & Search Gambar/User** | ✅ | ✅ | ✅ |
| **Unduh Gambar** | ✅ | ✅ | ✅ |
| **Upload / Edit / Hapus Post Sendiri** | ✅ | ✅ | ❌ |
| **Like / Komentar / Save Post** | ✅ | ✅ | ❌ |
| **Kelola Profil Mandiri** | ✅ | ✅ | ❌ |
| **User Management (Block/Delete)** | ✅ | ❌ | ❌ |
| **Moderasi & Hapus Post Apapun** | ✅ | ❌ | ❌ |
| **CRUD Kategori** | ✅ | ❌ | ❌ |

---

## 3. Skema Database (ERD & SQL/PostgreSQL)

### Ringkasan Entitas & Relasi ERD

- **`users`** `1 ─── < posts` (Postingan pengguna)
- **`categories`** `1 ─── < posts` (Kategori gambar)
- **`users` & `posts`** `1 ─── < comments` (Komentar postingan)
- **`users` & `posts`** `1 ─── < likes` (Like postingan)
- **`users` & `posts`** `1 ─── < saved_posts` (Postingan tersimpan/bookmark)

### DDL / PostgreSQL Script

```sql
-- Enum Roles
CREATE TYPE user_role AS ENUM ('admin', 'user');

-- Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP WITH TIME ZONE NULL,
    password VARCHAR(255) NOT NULL,
    avatar_path VARCHAR(255) NULL,
    bio TEXT NULL,
    role user_role NOT NULL DEFAULT 'user',
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description VARCHAR(255) NULL,
    cover_image_path VARCHAR(255) NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Posts Table
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) UNIQUE NOT NULL,
    description TEXT NULL,
    image_path VARCHAR(255) NOT NULL,
    view_count INT NOT NULL DEFAULT 0,
    download_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_posts_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_posts_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
);

-- Comments Table
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
);

-- Likes Table
CREATE TABLE likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_likes_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_likes_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    CONSTRAINT unique_user_post_like UNIQUE (user_id, post_id)
);

-- Saved Posts Table (Bookmarks)
CREATE TABLE saved_posts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    post_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_saved_post FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    CONSTRAINT unique_user_post_save UNIQUE (user_id, post_id)
);

-- Indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_user ON posts(user_id);
CREATE INDEX idx_comments_post ON comments(post_id);
```

---

## 4. Alur Workflow Konten & Moderasi

```
 [User] Upload Image ──► [ Published Immediately ]
                               │
                               ▼
                   [ Moderasi oleh Admin ]
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
   [ Post Tetap Aktif ]                [ Post Dihapus / Warning ]
                                       (Jika Melanggar Ketentuan)
```

### Aturan Moderasi:
- User terdaftar dapat mengunggah gambar secara langsung tanpa persetujuan awal (Auto-publish).
- Admin memiliki wewenang penuh untuk menghapus postingan yang tidak layak melalui Dashboard Moderasi.
- Admin dapat menonaktifkan/memblokir akun user (`is_blocked = true`) jika terindikasi melakukan penyalahgunaan platform.

---

## 5. Design System & UI/UX Guidelines

### Skema Warna Global

- **Primary Accent:** `#E60023` (Pinterest Red / Vibrant Red)
- **Secondary Dark:** `#111111` (Rich Dark Text)
- **Background:** `#FFFFFF` / Soft Neutral `#F7F7F7`
- **Muted Text:** `#767676`
- **Border / Divider:** `#E9E9E9`

### Typografi & Layout

- **Font Utama:** Inter / Plus Jakarta Sans
- **Layout Style:** Dynamic Masonry Grid untuk galeri utama.
- **Card Styling:** Rounded corners (`16px` / `rounded-2xl`), smooth hover overlay dengan aksi cepat (Save, Like, Download).

---

## 6. Struktur Folder Project (Laravel 12)

```
jejak-visual/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/             # DashboardController, UserController, CategoryController, ModerationController
│   │   │   ├── Auth/              # Login, Register, Password controllers
│   │   │   ├── User/              # ProfileController, PostController, InteractionController
│   │   │   └── PublicController.php # Landing Page, Explore, Search
│   │   ├── Middleware/            # AdminMiddleware, CheckBlockedUser
│   │   └── Requests/              # PostUploadRequest, ProfileUpdateRequest, CategoryRequest
│   ├── Models/                    # User, Post, Category, Comment, Like, SavedPost
│   └── Policies/                  # PostPolicy, CommentPolicy
├── database/
│   ├── migrations/                # Database migrations for PostgreSQL
│   └── seeders/                   # AdminSeeder, CategorySeeder, DummyPostSeeder
├── resources/
│   ├── css/                       # app.css (Tailwind & Masonry setup)
│   ├── js/                        # app.js, Masonry/Grid scripts, Interactivity
│   └── views/
│       ├── admin/                 # Panel Admin (Dashboard, User & Post Management)
│       ├── components/            # Blade Components (Navbar, PostCard, Modal, Button)
│       ├── layouts/               # app.blade.php, admin.blade.php, auth.blade.php
│       ├── posts/                 # Show detail, Create upload form, Edit form
│       ├── public/                # Landing, Search results, Category view
│       └── user/                  # Profile page, Saved posts, Liked posts
├── routes/
│   ├── web.php                    # Public & Auth routes
│   └── admin.php                  # Protected Admin routes (/admin)
└── screenshots/                   # Asset dokumentasi proyek
```

---

## 7. Instalasi & Panduan Pengembangan

### Persyaratan Sistem
- **PHP** >= 8.2
- **Composer** >= 2.x
- **Node.js** >= 18.x & NPM
- **PostgreSQL** >= 14

### Langkah-Langkah Instalasi

1. **Clone Repository & Masuk ke Direktori:**
   ```bash
   git clone https://github.com/USERNAME/jejak-visual.git
   cd jejak-visual
   ```

2. **Instal Dependensi PHP & JavaScript:**
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Sesuaikan variabel `DB_CONNECTION=pgsql`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` pada `.env`.*

4. **Migrasi & Seed Database:**
   ```bash
   php artisan migrate --seed
   ```

5. **Link Storage:**
   ```bash
   php artisan storage:link
   ```

6. **Jalankan Vite & Server Pengembangan:**
   ```bash
   npm run dev
   ```
   Di terminal terpisah:
   ```bash
   php artisan serve
   ```

---

## 8. Aturan Bisnis & Keamanan Utama

1. **Keamanan Upload File:**
   - Ekstensi yang diperbolehkan: `jpg`, `jpeg`, `png`, `webp`.
   - Batas maksimum ukuran file: 5 MB per gambar.
2. **Author Authorization Guard:** User hanya diperbolehkan mengedit atau menghapus postingan milik mereka sendiri.
3. **Penyimpanan Berulang Guard:** Mencegah pencatatan Like atau Save ganda dari user yang sama untuk satu post (`UNIQUE constraint`).
4. **Counter Incrementing:** Penghitungan `view_count` dan `download_count` dikelola secara atomic saat terjadi aksi akses/unduh.

---

## 9. Rencana Modul Prompt (Coding Phases)

- **`[P01]`** Setup Laravel 12, PostgreSQL Connection & Auth System (Breeze/Custom Auth).
- **`[P02]`** Database Migrations, Models, & Seeders (Users, Categories, Posts, Interactions).
- **`[P03]`** Layout System & Masonry Grid Integration (Tailwind CSS).
- **`[P04]`** Post Management: Upload, Image Resizing, Edit, & Delete.
- **`[P05]`** Interaksi User: Like, Komentar, Save/Bookmark, & Download Handler.
- **`[P06]`** Pencarian & Filter: Search Query (Post/User) & Filter Kategori.
- **`[P07]`** User Profile & Custom Dashboard (Karya Saya, Likes, Saved Posts).
- **`[P08]`** Panel Admin: Dashboard Analytics, User Blocking, & Post Moderation.
- **`[P09]`** Refactoring, Responsive Optimization, & Security Polish.