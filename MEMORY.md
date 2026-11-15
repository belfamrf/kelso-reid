# MEMORY: 02-jasa-lokal (proyek demo 2)

Diperbarui: 15 November 2026. Folder ini **belum punya kode dan belum ada git**; isinya baru catatan status dan keputusan yang sudah terkunci.

## Status

- Isi folder: hanya `CLAUDE.md` dan file ini.
- Urutan: `01-wellness` (KERN) sudah live → sekarang demo ini → lalu `03-hospitality`.
- Catatan portofolio lengkap ada di `..\00-website-pribadi\MEMORY.md` dan `..\01-wellness\MEMORY.md`. **Jangan menyalin isinya ke sini lagi**; versi lama file ini adalah salinan 23 Oktober yang sudah basi.

## Yang sudah terkunci (dari kartu di website pribadi)

Sumbernya `00-website-pribadi/src/content/projects.ts`. Kalau salah satu diubah, kartu di website pribadi harus ikut diubah.

| Hal | Isi |
|---|---|
| Jenis bisnis | **Renovation contractor** (renovasi rumah), bukan klinik |
| Nama | belum ada; perlu nama fiktif yang wajar untuk Melbourne |
| Lokasi | **Melbourne, Australia** (fiktif) |
| Audiens | Pemilik rumah yang sedang membandingkan tiga penawaran |
| Tujuan | "Win bigger renovation jobs." |
| Aksi utama | **Request a site visit** (bukan booking online) |
| Scope | **Website saja** — tanpa brand identity/logo kit, ini yang membedakan dari KERN |
| Bahasa situs | Inggris; dokumen proyek Indonesia |

## Aturan yang tidak boleh dilanggar

- Label **concept project** terlihat di halaman, form, dan metadata.
- Tidak ada testimoni, logo klien, angka pencapaian, atau alamat/jam buka karangan.
- Foto hanya dari sumber berlisensi (Wikimedia Commons), dicatat di `CREDITS.md` dan halaman `/credits`.
- Bahasa copy formal-tenang, tanpa kontraksi berlebihan dan tanpa em dash di body copy (pola yang sama dengan KERN).

## Pola teknis mengikuti KERN

Next.js 16 App Router + Tailwind 4, repo GitHub sendiri, deploy Vercel, subdomain sendiri (mis. `renovation.belfamuhammad.com`), lalu satu halaman studi kasus di website pribadi + kartu meja dihubungkan ke halaman itu.

Catatan DNS: domain `belfamuhammad.com` DNS-nya di Domainesia (NS `ns1/ns2.domainesia.net`). Subdomain baru = tambah record CNAME di panel Domainesia, lalu `vercel domains verify`.

## Langkah berikutnya

1. ~~Brief + brand brief~~ — selesai 15 November 2026 di `BRIEF.md`.
2. ~~Tawarkan 3 arah desain, pilih satu~~ — selesai; pemilik memilih **Arah B "Reading the Quotes"**, terkunci di `BRIEF.md` dan `DESIGN.md`.
3. Nama final: 3 kandidat (Kelso & Reid — rekomendasi; Ashgrove Build Co.; Harlow & Vance), belum diputuskan pemilik.
4. Bangun halaman, QA (lint/build/320–1440/reduced motion), Lighthouse mobile.
5. Deploy + subdomain `renovation.belfamuhammad.com`, lalu halaman studi kasus `/work/renovation` + kartu di website pribadi.

## Berkas di folder ini

| Berkas | Isi |
|---|---|
| `CLAUDE.md` | Aturan kerja (salinan dari folder induk) |
| `MEMORY.md` | File ini |
| `BRIEF.md` | Brief terkunci: bisnis, audiens, aksi, aturan konten, batasan teknis |
| `DESIGN.md` | Sistem desain: warna, huruf, tata letak, komponen, motion, aksesibilitas, publikasi |
| `README.md` | Cara menjalankan proyek + susunan berkas |
| `CREDITS.md` | Lisensi tiga foto Wikimedia |

## Pembaruan 15 November 2026 — situs dibangun dan live di Vercel

- **Halaman utama** `src/app/page.tsx`: hero + tujuh bagian bernomor (Three quotes, What we renovate, How the job runs, What we put in writing, Work, FAQ, Request a site visit).
- **Elemen khas** `src/components/quote-comparison.tsx`: pembanding Penawaran A/B, delapan baris. Di desktop memakai `<table>` asli; di mobile dua daftar yang bertukar lewat tombol `aria-pressed`. Ada region `aria-live` yang membacakan pilihan, dan catatan kejujuran "Illustration only".
- **Bagian lain:** `reveal.tsx` (IntersectionObserver berbasis waktu, 26px/620ms, stagger 60ms), `site-visit-form.tsx` (validasi per field, status demo jujur), halaman `/credits`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (1200×630, sudah dicek ukurannya), `icon.tsx` (64×64).
- **Foto:** tiga foto Wikimedia, dioptimasi lewat `scripts/optimize-photos.mjs` (sharp, saturasi 0,6) jadi 192 KB / 162 KB / 45 KB. Bahan mentah di `_raw-photos/` (tidak di-commit); metadata lisensi di `scripts/photo-sources.json`.
- **QA struktural** `scripts/qa.mjs` (puppeteer-core, Chrome headless): 320/375/768/1440 tanpa overflow, tiga gambar termuat, delapan anchor hidup, toggle A/B bekerja (`aria-pressed` + `aria-live` + lima coretan), form kosong memunculkan 4 field invalid lalu status demo saat diisi benar, enam `<details>` bisa dibuka, reduced motion tidak menyembunyikan apa pun, tanpa JavaScript konten tetap terlihat.
- **Lighthouse di live:** mobile **100 / 100 / 100 / 100** (LCP 1,4 s, CLS 0, TBT 10 ms), desktop **100 / 100 / 100 / 100** (LCP 0,3 s).
- **Repo GitHub:** `belfamrf/kelso-reid` (publik), `main` sinkron. **Vercel:** project `kelso-reid`, deployment produksi READY di `https://kelso-reid.vercel.app`.
- **Subdomain menunggu DNS:** `renovation.belfamuhammad.com` sudah ditambahkan ke project Vercel. Record yang harus dibuat di Domainesia: **CNAME `renovation` → `9d018f7dbeec8a88.vercel-dns-017.com`**. Setelah aktif, jalankan `vercel domains verify renovation.belfamuhammad.com`.
- **Belum:** review visual oleh pemilik (model sesi ini text-only), kartu share dikaitkan ke halaman studi kasus di website pribadi, dan penautan kartu meja (`live` + `caseHref`).

