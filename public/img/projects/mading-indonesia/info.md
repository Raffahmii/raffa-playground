# MADING INDONESIA — Document Specification & Information

**Mading Indonesia** adalah platform digital mading dan pusat informasi antar-universitas di Indonesia dengan model *multi-university*, *role-based access*, *approval workflow*, dan *dynamic university branding*.

---

## 📑 Daftar Isi
1. [Konsep Utama & Visi](#1-konsep-utama--visi)
2. [Sistem Role & Otentikasi](#2-sistem-role--otentikasi)
3. [Skema Database (ERD & SQL)](#3-skema-database-erd--sql)
4. [Alur Workflow Konten (Approval System)](#4-alur-workflow-konten-approval-system)
5. [Dynamic University Branding System](#5-dynamic-university-branding-system)
6. [Design System & UI/UX Guidelines](#6-design-system--uiux-guidelines)
7. [Struktur Folder Project (Laravel)](#7-struktur-folder-project-laravel)
8. [Aturan Bisnis & Keamanan Utama](#8-aturan-bisnis--keamanan-utama)
9. [Rencana Modul Prompt (Coding Phases)](#9-rencana-modul-prompt-coding-phases)

---

## 1. Konsep Utama & Visi

**Tagline:** *Pusat Informasi dan Mading Antar-Universitas Indonesia*

Platform ini menjadi tempat terpusat bagi universitas di Indonesia untuk mempublikasikan:
- Pengumuman & Informasi Akademik/Non-Akademik
- Event Kampus & Seminar / Workshop
- Lomba & Kompetisi
- Beasiswa & Prestasi
- Kegiatan Organisasi Mahasiswa

### Arsitektur Konseptual

```text
                 MADING INDONESIA (Global Platform)
                                │
       ┌────────────────────────┼────────────────────────┐
       │                        │                        │
  ITB Tenant               UI Tenant                UGM Tenant
(Brand & Admin ITB)      (Brand & Admin UI)      (Brand & Admin UGM)
       │                        │                        │
   Konten ITB               Konten UI               Konten UGM
```

Setiap universitas memiliki ruang/tenant, admin, dan identitas visual (warna brand) sendiri, tetapi berada di bawah satu sistem platform terpusat.

---

## 2. Sistem Role & Otentikasi

### Matrix Akses Role

| Fitur / Hak Akses | Super Admin | Admin Universitas | Anggota (Member) | Guest (Publik) |
| :--- | :---: | :---: | :---: | :---: |
| **Registrasi Mandiri** | ❌ | ❌ | ✅ | ✅ |
| **Scope Akses** | Global (All) | Hanya Univ Miliknya | Global (Read-only) | Global (Read-only) |
| **CRUD Universitas & Admin** | ✅ | ❌ | ❌ | ❌ |
| **CRUD Konten Univ** | ✅ | ✅ (Univ sendiri) | ❌ | ❌ |
| **Approval / Publish Konten** | ✅ | ❌ (Submit PENDING) | ❌ | ❌ |
| **Bookmark / Favorit** | ❌ | ❌ | ✅ | ❌ |
| **Ganti Theme Platform Global** | ✅ | ❌ | ❌ | ❌ |

1. **SUPER ADMIN**
   - Mengelola seluruh platform.
   - Membuat universitas dan akun Admin Universitas.
   - Mengelola kategori dan memantau *activity logs*.
   - Mengontrol penuh *approval* konten (Approve/Reject/Publish/Archive).
   - Menggunakan identitas visual utama platform (*Pink/Purple*).

2. **ADMIN UNIVERSITAS**
   - Hanya dibuat oleh Super Admin.
   - Dibatasi secara ketat oleh `university_id` (Scope isolation).
   - Mengelola konten universitas sendiri (Draft, Edit, Submit for Approval).
   - Dashboard-nya menggunakan *Dynamic Branding Color* milik universitasnya.

3. **ANGGOTA (MEMBER)**
   - Mendaftar via halaman publik.
   - Tidak terikat pada satu universitas (Global User).
   - Membaca seluruh mading universitas, menyimpan bookmark, dan mengelola profil.

---

## 3. Skema Database (ERD & SQL)

### Ringkasan Entitas & Relasi ERD

- **`universities`** `1 ─── < users` (Soft deletes, status, branding colors)
- **`universities`** `1 ─── < posts` (RESTRICT on delete, CASCADE on update)
- **`categories`** `1 ─── < posts`
- **`users` (Author)** `1 ─── < posts`
- **`users` (Reviewer)** `1 ─── < posts`
- **`posts`** `1 ─── < post_reviews` (Cascade delete saat post dihapus)
- **`users` & `posts`** `1 ─── < bookmarks` (Cascade delete)
- **`users` & `universities`** `1 ─── < activity_logs` (Set null on delete)

### DDL / SQL Script

```sql
CREATE TABLE `universities` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `slug` varchar(160) UNIQUE NOT NULL COMMENT 'dipakai di URL: /universitas/{slug}',
  `logo_path` varchar(255),
  `description` text,
  `primary_color` char(7) NOT NULL DEFAULT '#8E1EA2' COMMENT 'hex, jadi --university-primary',
  `secondary_color` char(7) NOT NULL DEFAULT '#C654C3' COMMENT 'hex, jadi --university-secondary',
  `city` varchar(100),
  `address` varchar(255),
  `website` varchar(255),
  `email` varchar(150),
  `phone` varchar(30),
  `status` ENUM ('active', 'inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp COMMENT 'soft delete'
);

CREATE TABLE `users` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `university_id` bigint COMMENT 'NULL untuk super_admin & member; WAJIB terisi untuk university_admin',
  `name` varchar(150) NOT NULL,
  `email` varchar(150) UNIQUE NOT NULL,
  `email_verified_at` timestamp,
  `password` varchar(255) NOT NULL,
  `role` ENUM ('super_admin', 'university_admin', 'member') NOT NULL DEFAULT 'member',
  `status` ENUM ('active', 'suspended') NOT NULL DEFAULT 'active',
  `avatar_path` varchar(255),
  `remember_token` varchar(100),
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp COMMENT 'soft delete'
);

CREATE TABLE `categories` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) UNIQUE NOT NULL,
  `description` varchar(255),
  `icon` varchar(50) COMMENT 'nama icon Lucide',
  `is_active` boolean NOT NULL DEFAULT true,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `posts` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `university_id` bigint NOT NULL COMMENT 'scope utama query admin',
  `category_id` bigint NOT NULL,
  `author_id` bigint NOT NULL,
  `reviewed_by` bigint,
  `title` varchar(255) NOT NULL,
  `slug` varchar(280) NOT NULL,
  `excerpt` varchar(500),
  `body` longtext NOT NULL,
  `cover_image_path` varchar(255),
  `event_start` datetime,
  `event_end` datetime,
  `location` varchar(200),
  `status` ENUM ('draft', 'pending', 'approved', 'rejected', 'published', 'archived') NOT NULL DEFAULT 'draft',
  `submitted_at` timestamp,
  `reviewed_at` timestamp,
  `published_at` timestamp,
  `view_count` int NOT NULL DEFAULT 0,
  `created_at` timestamp,
  `updated_at` timestamp,
  `deleted_at` timestamp COMMENT 'soft delete'
);

CREATE TABLE `post_reviews` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `actor_id` bigint NOT NULL COMMENT 'user yang melakukan aksi',
  `action` ENUM ('submitted', 'approved', 'rejected', 'published', 'archived') NOT NULL,
  `note` text COMMENT 'alasan penolakan / catatan revisi',
  `created_at` timestamp
);

CREATE TABLE `bookmarks` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `post_id` bigint NOT NULL,
  `created_at` timestamp
);

CREATE TABLE `activity_logs` (
  `id` bigint PRIMARY KEY AUTO_INCREMENT,
  `user_id` bigint,
  `university_id` bigint,
  `action` varchar(100) NOT NULL,
  `subject_type` varchar(100),
  `subject_id` bigint,
  `properties` json,
  `ip_address` varchar(45),
  `user_agent` varchar(255),
  `created_at` timestamp
);

-- Indexing
CREATE INDEX `universities_index_0` ON `universities` (`status`);
CREATE INDEX `universities_index_1` ON `universities` (`city`);
CREATE INDEX `users_index_2` ON `users` (`role`, `status`);
CREATE INDEX `users_index_3` ON `users` (`university_id`);
CREATE UNIQUE INDEX `posts_index_4` ON `posts` (`university_id`, `slug`);
CREATE INDEX `posts_index_5` ON `posts` (`university_id`, `status`);
CREATE INDEX `posts_index_6` ON `posts` (`status`, `published_at`);
CREATE INDEX `posts_index_7` ON `posts` (`category_id`);
CREATE INDEX `posts_index_8` ON `posts` (`author_id`);
CREATE INDEX `post_reviews_index_9` ON `post_reviews` (`post_id`, `created_at`);
CREATE UNIQUE INDEX `bookmarks_index_10` ON `bookmarks` (`user_id`, `post_id`);
CREATE INDEX `activity_logs_index_11` ON `activity_logs` (`user_id`);
CREATE INDEX `activity_logs_index_12` ON `activity_logs` (`university_id`);
CREATE INDEX `activity_logs_index_13` ON `activity_logs` (`subject_type`, `subject_id`);
CREATE INDEX `activity_logs_index_14` ON `activity_logs` (`created_at`);

-- Foreign Keys
ALTER TABLE `users` ADD FOREIGN KEY (`university_id`) REFERENCES `universities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `posts` ADD FOREIGN KEY (`university_id`) REFERENCES `universities` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `posts` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `posts` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `posts` ADD FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `post_reviews` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `post_reviews` ADD FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `bookmarks` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `bookmarks` ADD FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `activity_logs` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `activity_logs` ADD FOREIGN KEY (`university_id`) REFERENCES `universities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
```

---

## 4. Alur Workflow Konten (Approval System)

Admin Universitas **tidak dapat mempublikasikan konten secara langsung**. Setiap publikasi wajib melalui proses moderasi Super Admin.

```text
 [Admin Universitas]                  [Super Admin]
   Buat / Edit Post
         │
         ▼
     [ DRAFT ] ──────────► Submit Approval
                                │
                                ▼
                           [ PENDING ]
                                │
                   ┌────────────┴────────────┐
                   ▼                         ▼
              [ REJECTED ]              [ APPROVED ]
         (Catatan revisi dicatat)            │
                   │                         ▼
                   └─► Ke DRAFT         [ PUBLISHED ]
                                        (Tampil Publik)
                                             │
                                             ▼
                                        [ ARCHIVED ]
```

### Aturan Status Konten:
- **DRAFT:** Konten sedang dibuat/direvisi oleh Admin Universitas.
- **PENDING:** Konten diajukan dan menunggu peninjauan Super Admin.
- **REJECTED:** Ditolak oleh Super Admin. Wajib melampirkan `note` alasan penolakan.
- **APPROVED / PUBLISHED:** Disetujui dan aktif secara publik. Hanya status `published` yang muncul di landing page dan search publik.
- **ARCHIVED:** Konten lama atau dinonaktifkan dari publikasi.

---

## 5. Dynamic University Branding System

Aplikasi menggunakan **satu codebase tunggal**, namun tema warna dapat berubah dinamis sesuai universitas.

### Mekanisme Implementasi:
1. Warna Hex disimpankan di tabel `universities`:
   - `primary_color` (contoh: `#123456`)
   - `secondary_color` (contoh: `#ABCDEF`)
2. Middleware `ShareUniversityTheme` membaca atribut universitas dari user yang login / URL halaman universitas.
3. Middleware menginjeksi CSS variables ke `<head>` layout:

```html
<style>
  :root {
    --university-primary: {{ $theme->primary_color }};
    --university-secondary: {{ $theme->secondary_color }};
  }
</style>
```

4. Kelas Tailwind menggunakan CSS variables dinamis:
```html
<button class="bg-[var(--university-primary)] text-white">
```

> **Catatan:** Landing Page Publik dan Dashboard Super Admin tetap konsisten menggunakan Brand utama Mading Indonesia (`#8E1EA2` / `#C654C3`).

---

## 6. Design System & UI/UX Guidelines

### Skema Warna Global (Mading Indonesia Platform)
- **Primary:** `#8E1EA2`
- **Secondary:** `#C654C3`
- **Accent:** `#ED96D7`
- **Soft Light:** `#FFC0DE`
- **Neutral Dark (Text):** `#241A26`
- **Neutral Muted:** `#6F6571`
- **Background:** `#FAF8FA`
- **Surface:** `#FFFFFF`
- **Border:** `#E9E2EA`

### Typografi & Visual Elements
- **Font Utama:** `Plus Jakarta Sans`
- **Radius Component:**
  - Button & Input: `12px` (`rounded-xl`)
  - Card: `16px` (`rounded-2xl`)
  - Modal / Large Card: `20px` - `24px`
- **Visual Style:** Modern, soft gradients, clean whitespace, subtle organic abstract shapes (blobs) pada hero section.

---

## 7. Struktur Folder Project (Laravel)

Proyek ini dibangun menggunakan **Laravel 11/12**, **Blade**, **Tailwind CSS**, **Alpine.js**, dan **Lucide Icons**.

```text
mading-indonesia/
├── app/
│   ├── Enums/                     # UserRole, PostStatus, ReviewAction, dll.
│   ├── Models/                    # User, University, Post, Category, dll.
│   │   └── Scopes/                # UniversityScope (Akses isolasi admin)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/              # Login, Register (Member)
│   │   │   ├── Public/            # Home, Search, University Explorer, Detail Post
│   │   │   ├── SuperAdmin/        # Dashboard, Approval, CRUD Univ & Category
│   │   │   └── UniversityAdmin/   # Dashboard, CRUD Post, Univ Profile
│   │   ├── Middleware/            # Role Check, Theme Injector, Scope Guard
│   │   └── Requests/              # Form Validation (SuperAdmin & UnivAdmin)
│   ├── Policies/                  # PostPolicy, UniversityPolicy
│   └── Services/                  # PostWorkflowService, UniversityService, ThemeService
├── database/
│   ├── migrations/                # Tabel sesuai ERD
│   └── seeders/                   # SuperAdmin, Univ (ITB, UI, UGM, dll), Categories
├── resources/
│   ├── css/                       # app.css, theme.css (CSS Variables)
│   ├── js/                        # app.js, Alpine initialization, preview scripts
│   └── views/
│       ├── components/            # UI components (Button, Input, Modal, Badge)
│       ├── layouts/               # public.blade, super-admin.blade, university-admin.blade
│       ├── public/                # Landing page, detail universitas & artikel
│       ├── super-admin/           # Dashboard Super Admin
│       └── university-admin/      # Dashboard Admin Universitas
└── routes/
    ├── web.php                    # Entry points
    ├── public.php                 # Rute Publik & Member
    ├── super-admin.php            # Prefix /super-admin (Protected)
    └── university-admin.php       # Prefix /admin (Protected)
```

---

## 8. Aturan Bisnis & Keamanan Utama

1. **Registrasi Terbuka Hanya untuk Member:** Public register otomatis memiliki role `member`. Role `university_admin` hanya dibuat oleh Super Admin.
2. **Strict Scope Isolation:** `UniversityScope` dan `BelongsToUniversity` trait mencegah Admin Universitas A mengakses atau memanipulasi data Universitas B (termasuk via peretasan URL/ID).
3. **Data Post Sanitization:** Manipulasi `university_id` dari request client harus diabaikan; nilai `university_id` selalu diambil dari session `auth()->user()->university_id`.
4. **Validasi Server-Side Mutlak:** Semua input form (termasuk kode HEX warna dan *file upload*) wajib divalidasi server-side via *Form Requests*.
5. **Visibility Guard:** Hanya post dengan `status = 'published'` dan `universities.status = 'active'` yang ditampilkan pada area publik.

---

## 9. Rencana Modul Prompt (Coding Phases)

Untuk pengembangan bertahap menggunakan AI / Developer:

- **`[P01]`** Laravel Setup & Authentication (Multi-role Auth System).
- **`[P02]`** Database Migrations, Enums, Models, & Seeders.
- **`[P03]`** Role Middleware, Policies, & Global University Scope.
- **`[P04]`** Super Admin: University Management & Admin Creation.
- **`[P05]`** Design System, Layouts, & Dynamic Theme Engine.
- **`[P06]`** University Admin: Content Management (CRUD Draft/Posts).
- **`[P07]`** Content Approval Engine (`PostWorkflowService` & Reviews).
- **`[P08]`** Public Portal: Landing Page, Hero, & Global Search.
- **`[P09]`** Public Portal: University Explorer & Public Profile Page.
- **`[P10]`** Super Admin Dashboard & Activity Logging System.
- **`[P11]`** University Admin Dashboard & Profile Management.
- **`[P12]`** Security Hardening, Automated Testing, & Optimization.