# Dzaky Portfolio — Code & Stories

Portofolio pribadi **Muhamad Dzaky Putra Fardian**, dengan tampilan manga interaktif: panel komik, tekstur kertas, tinta hitam, dan aksen merah vermilion.

## Stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · Lenis · HTML5 Canvas 2D.

Visual dekoratif dibuat dengan kode CSS dan Canvas. Foto profil menggunakan foto asli; tidak menggunakan gambar hasil generasi AI.

## Fitur

- **BookFloat di Chapter 03:** buku membuka saat hover atau tap, kartu teknologi menyebar dengan spring, tilt, dan drift. Memilih kartu memperbarui detail teknologi.
- Smooth scrolling Lenis, scrollbar bergaya tepi buku, penanda chapter, dan progres membaca.
- Simulasi permukaan tinta, perahu kertas, riak dan percikan interaktif melalui Canvas 2D.
- Huruf judul, stiker, dan balon percakapan yang dapat ditarik.
- Foto dengan tilt interaktif serta pilihan warna asli atau filter manga.
- Notebook interaktif, transisi panel, speed lines, dan efek impact saat klik.
- Filter proyek, dialog detail, perjalanan belajar, dan grafik kontribusi GitHub.
- Mode malam, pengaturan kurangi animasi, dukungan keyboard, dan layout responsif.

## Proyek

| Proyek | Repository |
| --- | --- |
| OfficeFlow | [office-management](https://github.com/Aelitaaaa/office-management) |
| Penjualan Obat | [penjualan_obat_fix](https://github.com/Aelitaaaa/penjualan_obat_fix) |
| Perpus Masamba | [perpusMasamba](https://github.com/Aelitaaaa/perpusMasamba) |
| Portofolio Dzaky | [PortofolioDzaky](https://github.com/Aelitaaaa/PortofolioDzaky) |

## Menjalankan secara lokal

Build telah diuji dengan Node.js 24 dan npm.

```bash
git clone https://github.com/Aelitaaaa/dzaky-portfolio.git
cd dzaky-portfolio
npm ci
npm run dev
```

Buka alamat dev server yang muncul di terminal.

```bash
npm run build
npm run preview
```

## Mengganti konten

| Berkas | Isi |
| --- | --- |
| `src/data/mangaData.ts` | Profil, proyek, teknologi, perjalanan, dan kontak |
| `src/components/BookFloat.tsx` | Interaksi buku dan kartu teknologi |
| `src/components/MangaDetails.tsx` | Detail interaktif dan navigasi chapter |
| `src/components/InkStage.tsx` | Simulasi tinta Canvas |
| `src/components/PhotoPanel.tsx` | Panel foto dan filter manga |
| `src/hooks/useLenisSmoothScroll.ts` | Perilaku smooth scroll |
| `src/index.css` | Palet, layout, scrollbar, dan dekorasi manga |
| `public/dzaky-portrait.jpeg` | Foto profil |

Isi `cvUrl`, LinkedIn, atau URL demo pada data profil/proyek untuk mengaktifkan tautan terkait. Preferensi sistem `prefers-reduced-motion` dan tombol kurangi animasi membatasi gerakan; scroll sentuh tetap native.

## Deployment Vercel

Deployment belum dilakukan. Konfigurasi `vercel.json` sudah tersedia untuk digunakan setelah akun Vercel siap.

1. Impor repository **Aelitaaaa/dzaky-portfolio**, branch **main**.
2. Pilih preset **Vite**, root directory di root repository.
3. Gunakan build command `npm run build` dan output directory `dist`.
4. Pilih Node.js 24.x, lalu deploy.

Tidak memerlukan database atau environment variable. Grafik kontribusi menggunakan layanan publik `github-contributions-api.jogruber.de`; tampilan menyediakan status error dan retry jika layanan tidak tersedia. Font dimuat dari Google Fonts dengan font sistem sebagai fallback.

## Lisensi dan kredit

Kode menggunakan [MIT License](LICENSE). Pengembangan dan modifikasi portofolio: **Muhamad Dzaky Putra Fardian**.

Fondasi awal berasal dari [template-porto-pantai](https://github.com/ryhndastra/template-porto-pantai) oleh Reyhand Astra. Pemberitahuan hak cipta asal dipertahankan untuk bagian kode template yang digunakan.

[React Bits](https://github.com/DavidHDev/react-bits) menjadi referensi ide interaksi. Komponen BookFloat dan detail manga ditulis khusus untuk portofolio ini.
