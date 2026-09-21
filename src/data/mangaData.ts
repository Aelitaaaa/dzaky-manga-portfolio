// Edit identitas, tautan, dan proyek di sini sebelum dipublikasikan.
export const profile = {
  name: "Dzaky Putra",
  fullName: "Muhamad Dzaky Putra Fardian",
  role: "Web Developer",
  education: "Teknik Informatika · Universitas Gunadarma",
  bio: "Saya suka mengubah ide menjadi aplikasi yang dapat dipakai sehari-hari. Dari antarmuka, alur aplikasi, sampai database — setiap bagian punya cerita tersendiri.",
  email: "dzakyputrafardian@gmail.com",
  githubUsername: "Aelitaaaa",
  linkedin: "",
  cvUrl: "",
};
export const projects = [
  {
    id: "office",
    title: "OfficeFlow",
    label: "OFFICE MANAGEMENT",
    category: "Full-stack",
    year: "PUBLIC",
    symbol: "01",
    color: "pink",
    artTitle: "ORDER.\nBUILD.\nDELIVER.",
    description:
      "Sistem operasional kantor: pesanan, pembelian bahan, surat jalan, invoice, pembayaran, dan dokumen.",
    stack: ["React", "TypeScript", "NestJS", "PostgreSQL", "Prisma"],
    role: "Aplikasi full-stack",
    details: [
      "Frontend React dan TypeScript terpisah dari REST API NestJS.",
      "Autentikasi JWT dan akses berdasarkan peran pengguna.",
      "Pengelolaan pesanan, supplier, surat jalan, invoice, serta pembayaran.",
      "Soft delete, pemulihan data, upload dokumen, dan activity log.",
    ],
    status: "Repository publik · office-management",
    github: "https://github.com/Aelitaaaa/office-management",
    demo: "",
  },
  {
    id: "pharmacy",
    title: "Penjualan Obat",
    label: "PHARMACY MANAGEMENT",
    category: "Full-stack",
    year: "PUBLIC",
    symbol: "02",
    color: "blue",
    artTitle: "TRACK.\nMANAGE.\nSIMPLIFY.",
    description:
      "Aplikasi Laravel untuk data obat, pasien, supplier, transaksi pembelian, penjualan, dan stock opname.",
    stack: ["Laravel 8", "PHP", "MySQL", "Blade"],
    role: "Aplikasi web berbasis Laravel",
    details: [
      "Pengelolaan master data obat, pasien, dan supplier.",
      "Pencatatan pembelian serta penjualan dengan detail transaksi.",
      "Halaman stock opname dan laporan omset.",
      "Rute aplikasi dilindungi autentikasi pengguna.",
    ],
    status: "Repository publik · penjualan_obat_fix",
    github: "https://github.com/Aelitaaaa/penjualan_obat_fix",
    demo: "",
  },
  {
    id: "library",
    title: "Perpus Masamba",
    label: "LIBRARY MANAGEMENT",
    category: "Full-stack",
    year: "PUBLIC",
    symbol: "03",
    color: "yellow",
    artTitle: "ONE BOOK.\nA THOUSAND\nSTORIES.",
    description:
      "Aplikasi perpustakaan untuk mengelola buku, kategori, pengguna, serta pencatatan peminjaman dan pengembalian.",
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    role: "Pengembangan aplikasi web",
    details: [
      "Hak akses administrator, petugas, dan peminjam.",
      "Katalog buku dengan cover, kategori, dan stok.",
      "Pencatatan peminjaman dan pengembalian buku.",
      "Pengelolaan akun pengguna dan pembaruan profil.",
    ],
    status: "Repository publik · perpusMasamba",
    github: "https://github.com/Aelitaaaa/perpusMasamba",
    demo: "",
  },
  {
    id: "portfolio",
    title: "Portofolio Dzaky",
    label: "PERSONAL WEBSITE",
    category: "Frontend",
    year: "PUBLIC",
    symbol: "04",
    color: "pink",
    artTitle: "A LITTLE\nABOUT\nME.",
    description:
      "Versi portofolio sebelumnya, berisi profil, skill, layanan, slider proyek, dan informasi kontak.",
    stack: ["HTML", "CSS", "JavaScript", "AOS", "Swiper"],
    role: "Website personal",
    details: [
      "Halaman profil, skill, layanan, proyek, dan kontak.",
      "Animasi ketika scroll menggunakan AOS.",
      "Slider galeri proyek dengan Swiper.",
      "Tautan email, WhatsApp, dan profil sosial.",
    ],
    status: "Repository publik · PortofolioDzaky",
    github: "https://github.com/Aelitaaaa/PortofolioDzaky",
    demo: "",
  },
];
export type MangaProject = (typeof projects)[number];
export const layers = [
  {
    name: "Frontend",
    caption: "Yang kamu lihat.",
    icon: "01",
    items: [
      {
        name: "React",
        detail: "Komponen antarmuka dan interaksi aplikasi.",
        project: "office",
      },
      {
        name: "Tailwind CSS",
        detail: "Styling responsif dan sistem tampilan yang konsisten.",
        project: "office",
      },
      {
        name: "JavaScript",
        detail: "Logika interaksi dan komunikasi dengan API.",
        project: "portfolio",
      },
      {
        name: "Bootstrap",
        detail: "Komponen antarmuka aplikasi perpustakaan.",
        project: "library",
      },
    ],
  },
  {
    name: "Backend",
    caption: "Yang bekerja di balik layar.",
    icon: "02",
    items: [
      {
        name: "Laravel",
        detail: "Routing, autentikasi, dan logika aplikasi web.",
        project: "pharmacy",
      },
      {
        name: "NestJS",
        detail: "Backend modular untuk aplikasi manajemen kantor.",
        project: "office",
      },
      {
        name: "Node.js",
        detail: "Runtime JavaScript untuk backend OfficeFlow.",
        project: "office",
      },
    ],
  },
  {
    name: "Database",
    caption: "Tempat cerita tersimpan.",
    icon: "03",
    items: [
      {
        name: "PostgreSQL",
        detail: "Database relasional untuk pesanan dan dokumen kantor.",
        project: "office",
      },
      {
        name: "MySQL",
        detail: "Data obat, pengguna, supplier, dan transaksi penjualan.",
        project: "pharmacy",
      },
      {
        name: "Prisma",
        detail: "Pemodelan data dan akses database dari backend.",
        project: "office",
      },
    ],
  },
  {
    name: "Tools",
    caption: "Teman di setiap proses.",
    icon: "04",
    items: [
      {
        name: "VS Code",
        detail: "Editor untuk menulis, merapikan, dan menelusuri kode.",
        project: "office",
      },
      {
        name: "Git",
        detail: "Pencatatan perubahan kode dan pengelolaan versi.",
        project: "pharmacy",
      },
      {
        name: "Vercel",
        detail: "Target deployment untuk portofolio ini.",
        project: "",
      },
    ],
  },
];
export const journey = [
  {
    year: "2024",
    title: "Mulai dari kebutuhan sehari-hari.",
    tag: "BELAJAR & MEMBANGUN",
    text: "Mengeksplorasi Laravel, database MySQL, dan aplikasi pengelolaan data melalui proyek penjualan obat serta eksplorasi landing page.",
  },
  {
    year: "2025",
    title: "Menyusun alur yang lebih lengkap.",
    tag: "PENGEMBANGAN WEB",
    text: "Menyusun website portofolio personal: profil, skill, layanan, galeri proyek, dan kontak dengan animasi scroll.",
  },
  {
    year: "2026",
    title: "Masih banyak chapter berikutnya.",
    tag: "TERUS BEREKSPLORASI",
    text: "Mendalami React, NestJS, dan PostgreSQL sambil membangun aplikasi manajemen kantor dan eksperimen personal.",
  },
];
