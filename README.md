Berikut adalah file README.md yang bersih, profesional, dan lengkap untuk proyek Vidoy Downloader Anda. Anda bisa langsung menyalin kode ini dan menyimpannya dengan nama README.md di folder utama (atau di repositori GitHub Anda).
# Vidoy Downloader

Vidoy Downloader adalah aplikasi web *Full-Stack* modern yang dirancang untuk mengekstrak dan mengunduh video secara *real-time*. Menggunakan pendekatan desain warm-cream ala Zapier, aplikasi ini mendukung pengunduhan video berbasis *Direct Link* maupun konversi *stream* HLS (`.m3u8`) menggunakan integrasi FFmpeg.

---

## Fitur Utama

- **Antarmuka Modern (Zapier-inspired UI):** Mengusung palet warna krem hangat (`#fffefb`), kopi pekat (`#201515`), dan aksen oranye jenuh (`#ff4f00`) dengan tipografi yang bersih.
- **Dukungan HLS & FFmpeg:** Mampu memproses dan mengonversi stream video M3U8 secara langsung dari balik layar.
- **Ekstraksi Instan:** Mendapatkan informasi video (judul, ID, dan *thumbnail*) dengan cepat sebelum proses unduh dimulai.
- **Arsitektur Terpisah:** Dibangun dengan *Backend* Node.js/Express dan *Frontend* React (Vite) menggunakan Bootstrap.

---

## Struktur Proyek

```text
vidoy/
├── vidoy-backend/        # Server API (Node.js + Express + FFmpeg)
│   ├── controllers/      # Logika ekstraksi dan unduh video
│   ├── routes/           # Pengaturan rute API
│   ├── utils/            # Fungsi pendukung
│   ├── server.js         # Titik masuk utama server
│   ├── Dockerfile        # Konfigurasi container
│   └── apt-packages      # Daftar dependensi sistem (FFmpeg)
│
└── vidoy-frontend/       # Antarmuka Pengguna (React + Vite)
    ├── src/
    │   ├── App.jsx       # Komponen utama Landing Page
    │   └── index.css     # Kustomisasi gaya dan tema warna
    └── package.json
