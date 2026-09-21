# Dzaky Putra — Code & Stories

Portofolio React + TypeScript + Vite dengan gaya manga, diadaptasi dari template pantai Reyhand Astra. Konten mengikuti repository publik GitHub Aelitaaaa yang diperiksa pada 21 September 2026.

## Menjalankan di komputer

Gunakan Node.js 24 LTS dan npm (build sudah diuji dengan Node 24).

```bash
git clone https://github.com/Aelitaaaa/dzaky-manga-portfolio.git
cd dzaky-manga-portfolio
npm ci
npm run dev
```

Buka alamat yang muncul di terminal. Untuk build produksi:

```bash
npm run build
npm run preview
```

## Deploy ke Vercel

1. Di Vercel, pilih **Add New → Project**.
2. Impor repository **Aelitaaaa/dzaky-manga-portfolio** dan pilih branch **main**.
3. Biarkan Root Directory di root repository. Gunakan **Framework Preset: Vite**, **Build Command: npm run build**, dan **Output Directory: dist**. Pilih Node.js 24.x pada pengaturan build.
4. Klik **Deploy**. Tidak ada environment variable atau database yang diperlukan.
5. Setelah Git integration terhubung, push ke branch main akan memicu deployment berikutnya.

Konfigurasi dasar tersedia dalam `vercel.json`. URL produksi ditambahkan setelah deployment berhasil.

## Mengganti konten

Edit `src/data/mangaData.ts`:

- `profile`: nama, bio, email, username GitHub, LinkedIn, dan tautan CV.
- `projects`: daftar proyek, penjelasan, teknologi, URL repository, dan URL demo.
- `layers`: teknologi beserta proyek terkait.
- `journey`: perjalanan belajar/pengembangan.

Email yang terpasang bersumber dari repository PortofolioDzaky. Periksa kembali sebelum publikasi. Tautan CV, LinkedIn, dan demo sengaja kosong karena belum ada URL yang terverifikasi; tombol tidak muncul bila kosong. Tambahkan berkas CV milik sendiri ke `public/cv.pdf`, lalu isi `cvUrl: '/cv.pdf'` untuk mengaktifkan unduhan.

Ilustrasi karakter adalah ilustrasi manga, bukan foto pemilik. Ganti `public/midnight-manga.webp` jika ingin memakai gambar lain. Warna, ukuran, serta layout berada di `src/index.css`.

## Proyek terpasang

- [OfficeFlow](https://github.com/Aelitaaaa/office-management): React, TypeScript, NestJS, PostgreSQL, Prisma; informasi modul dari README dan struktur kode.
- [Penjualan Obat](https://github.com/Aelitaaaa/penjualan_obat_fix): Laravel 8, PHP, MySQL, Blade; fitur dari routes dan controller.
- [Perpus Masamba](https://github.com/Aelitaaaa/perpusMasamba): Laravel 8, PHP, MySQL, Bootstrap; fitur mengikuti routes, pengelolaan pengguna dan buku, serta controller peminjaman/pengembalian.
- [Portofolio Dzaky](https://github.com/Aelitaaaa/PortofolioDzaky): HTML, CSS, JavaScript, AOS, Swiper.

Tidak ada angka pengalaman, statistik proyek, atau alamat demo buatan.

## Animasi dan interaksi

- Intro per sesi dengan tombol lewati.
- Smooth scrolling Lenis, indikator progress baca, navigasi aktif.
- Huruf judul, balon percakapan, dan stiker bisa ditarik; kembali ke posisi awal.
- Parallax ilustrasi, efek zoom, ticker berjalan, dan reveal panel saat scroll.
- Partikel tinta saat klik/sentuh.
- Interaksi tumpahkan tinta dan gambar ulang pada profil, menggantikan flood/rebuild pada template pantai.
- Filter proyek, spring hover kartu, dan dialog detail (Escape, klik luar, focus trap browser).
- Pipeline teknologi interaktif beserta tautan ke proyek terkait.
- Grafik kontribusi GitHub asli Aelitaaaa, pilihan periode, loading/error/retry.
- Mode malam tersimpan di perangkat dan tombol mengurangi animasi.
- Dukungan preferensi sistem `prefers-reduced-motion`, navigasi keyboard, dan tampilan mobile.
- Salin email dan tautan kontak.

Efek pantai (ombak, bebek, kepiting) diganti dengan interaksi manga; bukan simulasi fisika pantai yang sama.

## Layanan eksternal

Grafik kontribusi memakai layanan publik `https://github-contributions-api.jogruber.de/v4/Aelitaaaa`. Angka yang ditampilkan adalah kontribusi GitHub, bukan jumlah commit. Jika layanan sedang tidak tersedia, tampil pesan dan tombol coba lagi. Google Fonts memuat font; font sistem menjadi fallback.

## Kredit

Template awal: [ryhndastra/template-porto-pantai](https://github.com/ryhndastra/template-porto-pantai), lisensi MIT. Lisensi dan pemberitahuan hak cipta asal dipertahankan di `LICENSE`. Struktur dan sebagian hook smooth scrolling berasal dari template tersebut; tampilan manga dan komponen halaman merupakan adaptasi baru. Ilustrasi hero dibuat menggunakan image generation untuk proyek ini.
