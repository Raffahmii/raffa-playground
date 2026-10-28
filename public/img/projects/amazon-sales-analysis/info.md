# 📌 Project Information & Technical Specification

File ini berisi dokumentasi teknis, analisis bisnis, struktur folder, serta rincian data untuk proyek **Amazon Sales Analysis Dashboard**.

---

## 🌟 Ringkasan Proyek (Overview)

* **Nama Proyek:** Amazon Sales Analysis Dashboard
* **Analis & Pengembang:** M. Raffa Izzel Hendro
* **Tujuan Proyek:** Mengolah dan menganalisis data transaksi penjualan Amazon periode 1 Januari 2023 – 31 Desember 2023 untuk menemukan *insight* bisnis terkait performa wilayah, kategori produk, efektivitas diskon, serta pola perilaku transaksi pelanggan.
* **Tech Stack Utama:** PostgreSQL (SQL Query), Python (Pandas & Matplotlib), Tableau (Interactive Dashboard), Git & GitHub.

---

## 📐 Ringkasan Metrik Utama (Dashboard KPI Summary)

Berdasarkan analisis dashboard periode **1 Jan 2023 – 31 Des 2023**:

| Indikator KPI | Nilai Metrik | Keterangan |
| :--- | :--- | :--- |
| **Total Revenue** | **Rp16.477.169,18** | Total pendapatan kotor kotor selama periode 2023 (+0,54% vs periode sebelumnya) |
| **Total Orders** | **50.000 Transaksi** | Total volume pesanan yang berhasil diproses (+148 transaksi) |
| **Average Order Value (AOV)** | **Rp657,33** | Rata-rata nilai belanja pelanggan per pesanan (+0,59%) |
| **Average Rating** | **3,00 / 5,00** | Rata-rata kepuasan pelanggan dari seluruh produk (+0,78%) |
| **Kategori Teratas** | **Beauty** | Kategori dengan kontribusi revenue terbesar (> Rp2.800.000) |
| **Wilayah Teratas** | **Middle East & North America** | Wilayah dengan total revenue tertinggi (> Rp4.125.000) |

---

## 📊 Detail temuan Analisis (Key Analytical Insights)

1. **Performa Kategori Produk:**
   * **Beauty** menduduki peringkat pertama dalam perolehan pendapatan, disusul oleh **Books** dan **Electronics**.
   * **Sports** menghasilkan kontribusi pendapatan paling rendah di antara kategori lainnya.

2. **Performa Wilayah (Region):**
   * Distribusi pendapatan relatif seimbang di seluruh wilayah global.
   * **Middle East (Rp4.166.359)** dan **North America (Rp4.125.812)** memimpin, diikuti oleh **Asia (Rp4.096.518)** dan **Europe (Rp4.088.479)**.

3. **Metode Pembayaran (Payment Method - PM):**
   * Penggunaan metode pembayaran terdistribusi merata (~19.79% hingga 20.22%), menandakan preferensi pembayaran pelanggan yang sangat beragam.

4. **Dampak Diskon Terhadap Revenue (`Discount By Avg Revenue`):**
   * Diskon yang lebih tinggi (**> 15% - 30%**) berhubungan dengan **Rata-rata Revenue yang lebih rendah** (Rp519,6 pada diskon 30% vs Rp747,6 pada diskon 0%).
   * *Insight:* Pemberian diskon berlebihan berpotensi menggerus margin tanpa memberikan peningkatan proporsional pada *Average Order Value*.

5. **Hubungan Rating & Revenue (`Revenue By Rating`):**
   * Kontribusi pendapatan tertinggi berasal dari produk dengan rating **1,5 hingga 4,5**.
   * Produk dengan rating sempurna (**5,0**) memberikan kontribusi revenue yang lebih kecil, mengindikasikan jumlah ulasan/volume pembelian yang lebih rendah pada kategori produk tersebut.

---

## 🛠 Spesifikasi Teknis & Framework

### 1. Database & SQL Query (`sql/analysis.sql`)
* **Pengolahan:** PostgreSQL untuk *Data Validation*, *Aggregation*, dan *KPI Extraction*.
* **Cakupan Query:** Perhitungan Total Revenue, Total Orders, AOV, Grouping per Category, Region, Payment Method, serta analisis segmentasi diskon.

### 2. Python Data Processing (`python/analysis.ipynb`)
* **Data Cleaning:** Penanganan nilai hilang (*missing values*), pengecekan duplikasi, dan penyesuaian tipe data tanggal/numerik.
* **Exploratory Data Analysis (EDA):** Analisis korelasi antar variabel, analisis statistik deskriptif, dan visualisasi awal menggunakan `Pandas` & `Matplotlib`.

### 3. Tableau Dashboard (`dashboard/` & `tableau/`)
* **Komponen Dashboard:**
  * KPI Cards dengan pembanding performa sebelumnya.
  * Line Chart: *Revenue Trend Over Time* (Bulanan).
  * Bar Charts: *Revenue by Category*, *Revenue by Region*, *Discount by Avg Revenue*.
  * Donut Chart: *Revenue by Payment Method*.
  * Combination Area Line Chart: *Revenue by Rating*.

---

## 🗂 Struktur Repositori & File Proyek

```text
Amazon-Sales-Dashboard/
│
├── dashboard/
│   ├── dashboard.png              # Screenshot Tampilan Visual Dashboard
│   └── tableau_dashboard.twbx     # File Tableau Packaged Workbook
│
├── data/
│   ├── amazon_sales.csv           # Raw Dataset Transaksi Sales
│   └── amazon_sales_clean.xlsx    # Cleaned Dataset Siap Visualisasi
│
├── images/
│   └── dashboard-preview.png      # High-Resolution Mockup Preview
│
├── python/
│   └── analysis.ipynb             # Jupyter Notebook (EDA & Data Cleaning)
│
├── sql/
│   └── analysis.sql               # Script SQL Queries PostgreSQL
│
├── tableau/                       # File Pendukung Tableau
├── info.md                        # Dokumentasi Spesifikasi Proyek Ini
└── ReadME.md                      # Dokumentasi Utama Repositori GitHub
```

---

## 🎯 Rekomendasi Strategis Bisnis

1. **Optimasi Strategi Diskon:** Batasi diskon besar (di atas 20%) karena terbukti menurunkan nilai rata-rata transaksi. Fokuskan promosi pada *bundling* produk dibanding pemotongan harga langsung.
2. **Pengembangan Stok Produk:** Tingkatkan alokasi persediaan pada kategori berkinerja tinggi seperti **Beauty** dan **Books**.
3. **Pemasaran Regional:** Pertahankan kinerja kuat di Middle East dan North America sembari menyusun kampanye khusus untuk meningkatkan penjualan di region Europe dan Asia.