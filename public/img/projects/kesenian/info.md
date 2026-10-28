<div align="center">

# 🎭 Giri Adiwarna Management Information System

### GAMIS — Sistem Informasi Organisasi Kesenian SMKN 1 Banjar

> **1 Suara · 1 Rasa · 1 Extra · We Are The Best Yes**

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Alpine.js](https://img.shields.io/badge/Alpine.js-3.x-8BC0D0?style=for-the-badge&logo=alpinedotjs&logoColor=white)](https://alpinejs.dev)

[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)]()
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue?style=flat-square)]()

</div>

---

## 📖 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Filosofi Nama](#-filosofi-nama)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#️-tech-stack)
- [Arsitektur Sistem](#️-arsitektur-sistem)
- [Skema Database](#️-skema-database)
- [Instalasi](#-instalasi)
- [Akun Default](#-akun-default)
- [Struktur Project](#-struktur-project)
- [User Roles](#-user-roles)
- [Routes Ringkasan](#-routes-ringkasan)
- [Color Palette](#-color-palette)
- [Roadmap](#️-roadmap)
- [Developer](#-developer)
- [Lisensi](#-lisensi)

---

## 📌 Tentang Project

**Giri Adiwarna Management Information System (GAMIS)** adalah sistem informasi berbasis web untuk organisasi **Kesenian Giri Adiwarna SMKN 1 Banjar**. Dibangun untuk **menggantikan administrasi manual** (buku tulis & file Excel terpisah-pisah) menjadi **sistem digital terpusat** yang modern, cepat, dan aman.

### 🎯 Kenapa GAMIS Dibuat?

| Masalah Sebelumnya | Solusi GAMIS |
|---|---|
| Data anggota tercatat di buku | Database anggota terpusat + search |
| Absensi manual pakai kertas | Absensi digital per cabang |
| Kas dicatat di buku terpisah | Sistem kas dengan laporan PDF/Excel |
| Dokumentasi tercecer di HP | Album digital terorganisir |
| Riwayat kepengurusan hilang | Timeline kepengurusan per periode |
| Data susah dicari | Search global + filter |
| Laporan susah dibuat | Export PDF/Excel instan |

### 🎁 Fungsi Utama

1. **Website Publik** — Media informasi & publikasi organisasi ke masyarakat
2. **Sistem Internal** — Tools operasional harian untuk pengurus
3. **Arsip Digital** — Menyimpan sejarah & prestasi organisasi
4. **Portfolio Project** — Showcase Full-Stack Development untuk developer

---

## 🗿 Filosofi Nama

**Giri Adiwarna** berasal dari bahasa **Sanskerta**:

| Kata | Arti | Makna |
|---|---|---|
| **Giri** | Gunung | Kekuatan, keteguhan, solidaritas yang kokoh |
| **Adiwarna** | Seni / Keindahan | Ekspresi kreativitas & pelestarian budaya |

> *"Bahwa Kesenian SMKN 1 Banjar menjunjung tinggi nilai seni budaya dengan dasar kekuatan dan solidaritas untuk mencapai kesuksesan bersama."*

**Tagline:** `1 Suara · 1 Rasa · 1 Extra · We Are The Best Yes`

---

## ✨ Fitur Utama

### 🌐 Website Publik (Landing Page)

- **Hero Section:** Typing animation tagline, Parallax background, CTA buttons, dan loading screen 3 detik.
- **Tentang Kami & Filosofi:** Makna nama Giri Adiwarna, filosofi logo, serta quote organisasi.
- **Visi & Misi:** Visi card dengan aksen gradient gold dan 5 poin misi utama.
- **Divisi (6 Cabang):** Padus, Seni Tari, Dance, Band, Musik, serta Seni Rupa & Teater.
- **Prestasi:** Grid prestasi dengan filter tingkat (Sekolah/Kabupaten/Provinsi/Nasional) dan detail peserta.
- **Dokumentasi:** Lightbox gallery, album terorganisir, dan media viewer.
- **Event & Jadwal:** Date block visual dan detail info kegiatan.

### 🔐 Dashboard Internal

| Modul | Fitur | Akses |
|---|---|---|
| **Dashboard** | Statistik real-time, quick actions | Semua role |
| **Anggota** | CRUD, approve, alumni massal, serah terima jabatan | Sekretaris+ |
| **Kepengurusan** | Kelola jabatan & periode, timeline | Ketua, Pembina |
| **Absensi** | Input per cabang, rekap, riwayat pribadi | Sekretaris+ |
| **Kas** | Input bulk, verifikasi, laporan, export PDF/Excel | Bendahara+ |
| **Dokumentasi** | Album + media (foto/video), lightbox gallery | PDD+ |
| **Prestasi** | CRUD prestasi + peserta multi | PDD+ |
| **Pengumuman** | Publish/draft, target role, lampiran | Sekretaris+ |
| **Jadwal & Event** | CRUD jadwal, kalender kegiatan | Sekretaris+ |
| **Laporan** | Export PDF/Excel dengan filter custom | Ketua, Pembina |
| **Audit Log** | Tracking semua aktivitas user | Ketua, Pembina |
| **Pengaturan** | CRUD periode, clear cache, system info | Ketua, Pembina |

---

## 🛠️ Tech Stack

### Backend & Frontend

- **Framework:** Laravel 12.x
- **Language:** PHP 8.2+
- **Database:** PostgreSQL 13+
- **Template Engine:** Blade
- **CSS Framework:** Tailwind CSS 3.x
- **JS Framework:** Alpine.js 3.x
- **Build Tool:** Vite 7.x

### Packages & Libraries

- `laravel/breeze` (Authentication scaffold)
- `spatie/laravel-permission` (Role & permission management)
- `barryvdh/laravel-dompdf` (Export PDF)
- `maatwebsite/excel` (Export Excel)
- `intervention/image` (Image processing)
- `simplesoftwareio/simple-qrcode` (QR code generator)
- **UI:** AOS, SweetAlert2, Chart.js, Flowbite

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────────────────────────────────────────┐
│   🌐 PUBLIC LAYER (Landing Page)                     │
│   ─────────────────────────────────────             │
│   • Tidak perlu login                                │
│   • Data dari database (dinamis)                     │
│   • SEO-friendly                                     │
├─────────────────────────────────────────────────────┤
│   🔐 INTERNAL LAYER (Dashboard)                      │
│   ─────────────────────────────────────             │
│   • Perlu login + role-based access                  │
│   • CRUD semua data                                  │
│   • Export laporan                                   │
└─────────────────────────────────────────────────────┘
```

---

## 🗄️ Skema Database

**15 Tabel Utama + 3 Spatie Tables + 9 Enums**

```
users ────┬── kepengurusan ──── jabatan ──── periode
          ├── absensi ──── jadwal_kegiatan
          ├── kas_pembayaran ──── kas_kategori
          ├── dokumentasi_album ──── dokumentasi_media
          ├── prestasi_peserta ──── prestasi
          ├── pengumuman
          └── audit_log
```

### 🎯 Enum Types

- **RoleUser:** `anggota`, `pdd`, `bendahara`, `sekretaris`, `ketua`, `wakil_ketua`, `pembina`
- **StatusAnggota:** `aktif`, `alumni`, `nonaktif`
- **JenisKegiatan:** `latihan`, `pentas`, `lomba`, `rapat`
- **StatusAbsensi:** `hadir`, `izin`, `sakit`, `alpa`
- **StatusKas:** `lunas`, `belum_lunas`
- **TipeMedia:** `foto`, `video`
- **TingkatPrestasi:** `sekolah`, `kabupaten`, `provinsi`, `nasional`
- **TargetPengumuman:** `semua`, `anggota`, `pengurus`
- **Cabang:** `padus`, `seni_tari`, `dance`, `band`, `musik`, `seni`

---

## 🚀 Instalasi

```bash
# Clone Repository
git clone https://github.com/RaffaHmii/website-kesenian.git
cd website-kesenian/kesenian

# Install Dependencies
composer install
npm install

# Setup Environment
cp .env.example .env
php artisan key:generate

# Configure DB (.env) & Run Migration
php artisan migrate --seed

# Link Storage
php artisan storage:link

# Run Local Development
npm run dev
php artisan serve
```

---

## 👤 Akun Default

*Password default untuk semua akun:* **`password`**

| Email | Role | Nama |
|---|---|---|
| `pembina@giriadiwarna.test` | Pembina | Lin Karlina |
| `ketua@giriadiwarna.test` | Ketua | Rikza Fariq Harii |
| `wakil@giriadiwarna.test` | Wakil Ketua | Agung Mulyana |
| `sekretaris1@giriadiwarna.test` | Sekretaris | Chika Syalsa Atifah |
| `bendahara1@giriadiwarna.test` | Bendahara | Siti Anisa |
| `pdd@giriadiwarna.test` | PDD | Josephine Abigail |

---

## 📁 Struktur Project

```
website-kesenian/
└── kesenian/
    ├── app/
    │   ├── Enums/                  # 9 Enum PHP
    │   ├── Exports/                # Export Excel
    │   ├── Http/Controllers/       # Auth, Dashboard, Public
    │   ├── Models/                 # 14 Model Eloquent
    │   └── Services/               # Attendance & Image Services
    ├── database/
    │   ├── migrations/             # Migrations PostgreSQL
    │   └── seeders/                # Database Seeders
    ├── resources/
    │   ├── css/ & js/
    │   └── views/                  # Blade Views (Public & Dashboard)
    └── routes/                     # web.php & auth.php
```

---

## 🎭 User Roles Matrix

| Role | Level | Primary Responsibilities |
|---|---|---|
| **Pembina** | 1 | Full akses + monitoring & pengawasan |
| **Ketua / Wakil** | 2-3 | Full management, laporan, audit log, & pengaturan |
| **Sekretaris** | 4 | Anggota, absensi, jadwal kegiatan, & pengumuman |
| **Bendahara** | 5 | Kas, laporan keuangan, & export transaksi |
| **PDD** | 6 | Dokumentasi album, publikasi, & prestasi |
| **Anggota** | 7 | Access view-only & riwayat personal |

---

## 🎨 Color Palette

| Name | Hex Code | Role |
|---|---|---|
| **Primary BG** | `#1E2328` | Main Dark Background |
| **Secondary BG** | `#2A2E34` | Panel / Sidebar Background |
| **Card Surface** | `#3B3F46` | Surface Elements |
| **Gold Accent** | `#F5B301` | Primary Brand Accent |
| **Gold Hover** | `#FEB053` | Hover & Active States |
| **Gold Dark** | `#C28A00` | Borders & Darker Accents |

---

## 👨‍💻 Developer

**M Raffa Izzel H**  
*Full Stack Developer*  
- **GitHub:** [RaffaHmii](https://github.com/RaffaHmii)  
- **Email:** 1mraffaizzelh@gmail.com  

---

## 📄 Lisensi

Proyek ini dilesensikan di bawah [MIT License](LICENSE).