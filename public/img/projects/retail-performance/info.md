# 📌 Document Info & Project Specification

File ini berisi dokumentasi lengkap mengenai struktur, konten, serta teknis dari website **Store Performance Analytics Project**.

---

## 🌟 Ringkasan Proyek (Overview)

* **Nama Proyek:** Store Performance Analytics Dashboard
* **Pemilik / Analis:** M. Raffa Izzel Hendro
* **Lokasi Analis:** Banjar, Jawa Barat, Indonesia
* **Kontak:** `1mraffaizzelh@gmail.com` | `+62 895 3004 6420`
* **Tujuan Website:** Menampilkan hasil analisis data performa penjualan toko retail periode 2023–2024 secara interaktif, menyajikan KPI utama, serta menyediakan opsi pengunduhan dataset Excel.

---

## 📐 Ringkasan Metrik Utama (KPI Summary)

| Indikator KPI | Nilai Metrik | Keterangan |
| :--- | :--- | :--- |
| **Total Revenue** | **Rp37.757.500** | Pendapatan kotor dari seluruh transaksi |
| **Total Transactions** | **991 Transaksi** | Jumlah transaksi penjualan yang sukses |
| **Average Order Value (AOV)** | **Rp38.100** | Rata-rata nilai per transaksi |
| **Average Quantity** | **3,1 Item** | Rata-rata jumlah barang dalam satu transaksi |
| **Best Performing Category** | **Sabun** | Kategori barang dengan kontribusi revenue tertinggi |
| **Best Performing City** | **Jakarta** | Kota cabang dengan total revenue terbesar |

---

## 🛠 Spesifikasi Teknis & Framework Website

### 1. Front-End Technology Stack
* **HTML5:** Struktur dokumen semantik dengan komponen navigasi, header responsive, dashboard preview, KPI grid, serta form kontak.
* **CSS3 (Custom CSS):**
  * Menggunakan CSS Variables untuk konsistensi skema warna (`--primary-color: #0FA3A3`).
  * Desain modern berbasis **Flexbox** & **CSS Grid**.
  * Efek visual advance: Glassmorphism sidebar, animasi hover 3D transform, serta *sparkline glow effects*.
  * Responsive total (Breakpoint: `1024px`, `900px`, `800px`, `600px`, `480px`).
* **JavaScript (Vanilla ES6+):**
  * **Interactivity:** Toggle sidebar mobile (`showSidebar()`, `hideSidebar()`).
  * **Intersection Observer API:** Animasi kemunculan elemen saat di-scroll (`featureObserver`, `dataCardObserver`, `kpiObserver`).
  * **Counter Animation:** Animasi angka KPI berjalan secara *real-time* saat memasuki *viewport* menggunakan pembentukan format Rupiah (`id-ID`).
  * **Interactive UX:** Dynamic scroll to top button, floating navbar effect, serta handling form feedback.

### 2. Integrasi Third-Party
* **EmailJS Integration:** Layanan pengiriman pesan langsung via form kontak tanpa reload halaman (`service_p248k7u` & `template_x9gg2nk`).
* **Font Awesome v6.4.0:** Digunakan untuk seluruh ikon visual antarmuka.
* **Google Fonts:** Menggunakan *typeface* `Poppins` (weights: 300, 400, 500, 600, 700, 800).

---

## 🗂 Struktur File Proyek (File Structure)

```text
store-performance-project/
│
├── data/
│   └── store_data.xlsx       # Raw & Cleaned Dataset Excel
│
├── website/
│   ├── index.html            # File Utama HTML
│   ├── style.css             # Layouting & Animasi Styling
│   ├── script.js             # Logika JS, Animate-on-Scroll, & EmailJS
│   └── src/
│       ├── image.png         # Favicon / Icon Dashboard
│       ├── profile-photo.jpg # Foto Profil Analis
│       ├── dashboard_img.png # Screenshot Preview Dashboard
│       └── *.svg             # Menu & Close Icons
│
├── info.md                   # Spesifikasi & Dokumentasi Proyek Ini
└── README.md                 # Penjelasan Singkat Proyek
```

---

## 🎯 Navigasi & Struktur Konten Website (`index.html`)

1. **Header / Hero Section:**
   * Headline: *Store Performance Analytics Project*.
   * Deskripsi umum & Tombol aksi (*View Dashboard* & *Contact Me*).
   * Visual representasi dashboard.

2. **Dashboard Preview Section (`#dashboard`):**
   * Tampilan pratinjau grafik Excel interaktif.
   * Tombol unduh file dataset `store_data.xlsx`.
   * Ringkasan kualifikasi data (991 transaksi tervalidasi & kalkulasi tingkat lanjut).
   * Fitur analitis: *Revenue Trend, Monthly Pattern, Payment Method Behavior, Top Performing Products*.

3. **About Data Section (`#about`):**
   * Penjelasan volume data & cakupan periode (2023–2024).
   * Informasi tools yang digunakan (*Excel, PivotTable, PivotChart, Slicer, Timeline*).
   * 7 Kolom Utama Data: *Tanggal, Produk, Cabang, Kategori, Metode Pembayaran, Quantity, Revenue*.

4. **KPI Summary Section (`#kpi`):**
   * 6 Grid Card interaktif dengan animasi kalkulasi otomatis untuk metrik-metrik bisnis utama.

5. **Contact Section (`#contact`):**
   * Card profil pengembang lengkap dengan tautan media sosial (LinkedIn, GitHub, Instagram, Twitter/X).
   * Form pesan terintegrasi EmailJS.

6. **Footer Section:**
   * Tautan navigasi cepat, kategori layanan, informasi kontak, serta informasi hak cipta.