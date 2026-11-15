# Brief: Kelso & Reid — concept project 02-jasa-lokal

Disusun: 15 November 2026. Dokumen ini mengunci strategi sebelum desain dan kode. Mengikuti bentuk `01-wellness/BRIEF.md`.

## Ringkasan

| Hal | Keputusan |
|---|---|
| Proyek | Demo portofolio **02-jasa-lokal** |
| Status | **Concept project**, bukan bisnis nyata |
| Nama | **Kelso & Reid** (menunggu konfirmasi pemilik; alternatif: Ashgrove Build Co., Harlow & Vance) |
| Kategori | Renovation contractor (renovasi rumah) |
| Lokasi | Melbourne, Australia (fiktif) |
| Bahasa | English |
| Target | Pemilik rumah yang sedang **membandingkan tiga penawaran** |
| Janji | **"The whole job, on paper."** |
| Layanan | Dapur, kamar mandi, ekstensi, renovasi seluruh rumah |
| Tindakan utama | **Request a site visit** lewat form |
| Scope | **Website saja** — tanpa logo kit, beda dari 01-wellness |
| Label kejujuran | "Concept project" di footer, form, dan metadata |

## Brand brief

| Hal | Isi |
|---|---|
| Target tamu | Pemilik rumah di Melbourne yang sudah punya 2–3 penawaran dan takut ada biaya tersembunyi |
| Pesan utama | Penawaran yang baik bisa dibaca baris per baris; kami menuliskannya sejak awal |
| Gaya bahasa | Tenang, lugas, dewasa. Bukan tukang yang membanggakan diri, bukan korporat yang dingin |
| Alasan memilih | Lingkup ditulis lengkap (pembuangan puing, izin, perlindungan lantai, jadwal bayar) · satu orang yang bertanggung jawab dari survei sampai serah terima · urutan kerja jelas sebelum mulai |
| Diferensiasi | Kontraktor yang mengajari cara menilai penawaran, bukan yang mendesak supaya cepat tanda tangan |
| Nada | "Straight and steady" — jujur, tanpa hype, tanpa menakut-nakuti |

## Bentuk website

Satu halaman panjang, navigasi anchor:

1. Header + hero
2. **Reading three quotes** (elemen khas: pembanding Penawaran A / Penawaran B)
3. What we renovate: kitchens, bathrooms, extensions, whole houses
4. How the job runs: empat tahap dari survei sampai serah terima
5. What we put in writing: daftar hal yang sering tidak tertulis di penawaran lain
6. Work: foto berlisensi dengan keterangan jujur (peralatan/situs, bukan proyek klien)
7. FAQ
8. Request a site visit: form demo
9. Footer + label concept project

## Aturan konten

- **Tanpa satu pun angka**: tidak ada "sejak 2004", "500 proyek", jumlah staf, atau rating.
- Tanpa testimoni, nama klien, logo, atau foto proyek yang dipretensikan sebagai milik kami.
- **Tanpa angka harga.** Yang dijelaskan adalah apa yang mengubah biaya (lingkup, akses, material, izin), bukan tarif karangan.
- Pembanding penawaran diberi keterangan jujur: ini ilustrasi pelajaran, **bukan penawaran nyata dari pesaing**.
- Tidak ada scarcity palsu ("slot bulan ini hampir habis") dan tidak ada hitungan mundur.
- Foto memakai stok berlisensi; sumber dicatat di `CREDITS.md` dan halaman `/credits`.
- Seluruh situs ditandai **concept project**.

## Kontak

- Form "Request a site visit": nama, email, jenis renovasi, kode pos, pesan.
- Pengiriman lewat Formspree (endpoint di environment variable, tidak masuk git).
- Sampai endpoint ada, form berjalan dalam mode demo yang jujur (tidak berpura-pura terkirim).
- Tidak ada tautan sosial yang mati.

## Batasan teknis

- Next.js 16 App Router, TypeScript, Tailwind 4, `src/`.
- Target Lighthouse mobile minimal **95** untuk Performance, Accessibility, Best Practices, SEO.
- WCAG 2.2 AA; hormati `prefers-reduced-motion`; situs tetap terbaca tanpa JavaScript.
- Mobile-first; tanpa scroll hijacking.
- Pelajaran dari KERN yang wajib diikuti: gambar LCP memakai prop `preload` (bukan `priority`, yang sudah dideprekasi di Next 16), dan animasi memakai `IntersectionObserver` berbasis waktu (bukan CSS `animation-timeline: view()`, yang tidak jalan di iOS Safari).

## Keputusan yang sudah dikunci

- Arah desain: **Arah B — "Reading the Quotes"** (editorial tepercaya).
- Warna: kertas hangat `#f4efe6`, ink `#191714`, satu aksen bata `#a63a1f`.
- Huruf: **Newsreader** (display) + **Public Sans** (body/UI).
- Elemen khas: **pembanding Penawaran A / Penawaran B**.
- Scope website saja; identitas cukup wordmark teks di header, tanpa kit logo.
- Repo GitHub terpisah, project Vercel terpisah, subdomain netral `renovation.belfamuhammad.com`.

## Terbuka

- Nama final (3 kandidat di Ringkasan).
- Foto stok final saat build.
- Endpoint Formspree untuk mode demo.
- Nama repo GitHub dan project Vercel.
