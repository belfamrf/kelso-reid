---
name: Kelso & Reid
description: The whole job, on paper. A Melbourne renovation contractor set like a considered trade paper, not a glossy builder's brochure.
colors:
  paper: "#f4efe6"
  paper-deep: "#ebe4d8"
  ink: "#191714"
  ink-soft: "#5c564d"
  line: "#ddd5c8"
  brick: "#a63a1f"
  check: "#2f4a34"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Public Sans, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.14em"
---

# Design System: Kelso & Reid

## Overview

Situs satu halaman untuk kontraktor renovasi fiktif di Melbourne. Tugasnya bukan memamerkan foto proyek, tapi membuat pemilik rumah yang sedang memegang tiga penawaran berpikir: *"orang ini menuliskan hal-hal yang tidak ditulis yang lain."*

Karena itu desainnya terasa seperti **kertas kerja yang rapi**, bukan brosur: permukaan kertas hangat, garis rambut, tipografi editorial, dan satu aksen bata yang hanya muncul untuk hal yang perlu diperhatikan. Tidak ada kartu melayang, gradien, atau foto sinematik.

Prinsip yang dipegang: satu ide besar per layar, satu aksen warna, satu interaksi yang diingat.

## Colors

| Nama | Nilai | Dipakai untuk |
|---|---|---|
| `paper` | `#f4efe6` | Latar utama |
| `paper-deep` | `#ebe4d8` | Blok pembeda (kutipan, catatan kejujuran) |
| `ink` | `#191714` | Teks utama, judul |
| `ink-soft` | `#5c564d` | Teks sekunder, keterangan |
| `line` | `#ddd5c8` | Garis rambut, batas tabel |
| `brick` | `#a63a1f` | Aksen tunggal: tanda pada pembanding, garis coret, tautan aktif, tombol utama |
| `check` | `#2f4a34` | Hanya untuk tanda centang di pembanding; tidak pernah jadi bidang besar |

Kontras terukur di atas `paper`: `ink` 14,9:1 · `ink-soft` 6,2:1 · `brick` 5,6:1 · `check` 8,4:1. Semuanya lolos WCAG AA untuk teks normal.

### Named Rules

- **Satu aksen saja.** `brick` adalah satu-satunya warna yang menarik mata. Kalau sebuah elemen butuh perhatian, pakai `brick`; jangan menambah warna baru.
- **Hijau hanya centang.** `check` tidak boleh jadi latar, tombol, atau judul. Kalau muncul di luar tanda centang, itu kesalahan.
- **Garis, bukan bayangan.** Pemisah memakai `line` setebal 1px. Tidak ada `box-shadow` kecuali satu lembar pembanding yang sengaja terlihat seperti kertas di atas meja.

## Typography

- **Newsreader** untuk judul dan angka kutipan. Ukuran optiknya besar dan `line-height` rapat (0,98). Bobot 400–500; tidak pernah bold tebal.
- **Public Sans** untuk isi, label, form, dan tombol. Bobot 400 untuk isi, 600 untuk label huruf kapital berspasi.
- Skala: display `clamp(3rem, 9vw, 6rem)` · headline `clamp(2.25rem, 5vw, 3.5rem)` · sub-judul `1.5rem` · body `1.0625rem` (17px) · small `0.9375rem` · label `0.8125rem` kapital, spasi `0.14em`.
- Lebar baris isi maksimal **68ch**; kutipan dan catatan maksimal 60ch.

### Hierarchy

| Peran | Huruf | Ukuran | Catatan |
|---|---|---|---|
| H1 hero | Newsreader 400 | clamp 3–6rem | Satu baris panjang, tanpa titik dua |
| H2 bagian | Newsreader 400 | clamp 2,25–3,5rem | Didahului nomor bagian `01`–`07` dalam label |
| H3 kartu/tahap | Public Sans 600 | 1,125rem | Bukan serif: ini label kerja, bukan judul |
| Isi | Public Sans 400 | 1,0625rem | `text-wrap: pretty` |
| Label | Public Sans 600 | 0,8125rem | Kapital, spasi lebar |

### Named Rules

- **Serif untuk berpikir, sans untuk bekerja.** Judul dan kutipan memakai Newsreader; instruksi, tahap, dan tabel memakai Public Sans.
- **Jangan ada huruf ketiga.** Tidak ada mono, tidak ada aksen dekoratif.

## Layout

- Kontainer maksimal **1200px**, padding samping 16px (mobile) sampai 40px (desktop).
- Dua kolom hanya dipakai di bagian yang memang berpasangan: kolom isi 68ch + kolom samping 18rem untuk catatan kaki bagian. Di bawah 900px semuanya satu kolom.
- Spasi vertikal antarbagian **96px mobile / 128px desktop**; judul bagian ke isi 24–32px.
- Grid 12 kolom untuk bagian Work dan pembanding; sisanya aliran satu kolom yang tenang.
- Garis rambut `line` selebar kontainer memisahkan bagian, dan setiap bagian dibuka dengan label nomor + nama bagian.

## Elevation & Depth

Hampir semuanya datar. Satu pengecualian: **lembar pembanding** memakai `paper` di atas `paper-deep` dengan garis 1px dan offset 6px `ink` di sisi kanan-bawah (bukan blur), supaya terasa seperti lembar fotokopi yang diletakkan di atas meja. Tidak ada bayangan lembut di elemen lain.

## Shapes

Sudut **0px** di semua elemen: tombol, input, tabel, gambar. Satu-satunya bentuk miring adalah **cap "Concept project"** di footer, diputar −3°, dengan garis tepi `brick` 2px dan huruf kapital berspasi.

## Components

### Header

Nama di kiri dalam Newsreader 1,375rem; di kanan tautan anchor 14px Public Sans (`How it runs`, `What's in writing`, `Work`, `FAQ`) dan tombol `Request a site visit` bergaris `ink` 1px. Di bawah 800px: hanya nama dan tombol, tanpa menu (sama seperti pola di website pribadi).

### Buttons

Dua gaya saja.

| Gaya | Tampilan | Dipakai |
|---|---|---|
| Utama | Latar `brick`, teks `paper`, tinggi minimal 48px, padding 20px | Request a site visit, kirim form |
| Garis | Latar transparan, garis `ink` 1px, teks `ink` | Tautan sekunder, "See how the job runs" |

Tidak ada tombol bulat, tidak ada ikon dekoratif. Panah `→` hanya dipakai pada tautan teks.

### Quote Comparison (signature)

Inti situs. Satu blok yang membandingkan **Penawaran A ("the cheapest quote")** dan **Penawaran B ("ours")** pada delapan baris:

1. Waste removal · 2. Permits and inspections · 3. Floor and furniture protection · 4. Start and finish dates · 5. Payment schedule · 6. Who is on site daily · 7. Material allowances · 8. What happens when something unexpected is found

Kolom A menampilkan `Not stated` untuk baris yang tidak ditulis; kolom B menampilkan centang `check` dan satu baris penjelasan pendek.

- **Desktop:** tabel dua kolom; kolom yang dipilih disorot latar `paper-deep` dan garis atas `brick`. Kolom lain **tidak diredupkan** (opacity turun akan menjatuhkan kontras teks di bawah AA), cukup dibiarkan tenang.
- **Mobile:** satu tabel yang sama tidak dipaksakan; dipakai dua daftar definisi (A dan B) yang bertukar lewat dua tombol, dengan `aria-pressed`.
- **Animasi:** garis coret `brick` menarik dari kiri ke kanan (380ms) pada baris yang tidak tertulis di A setiap kali B dipilih. Hanya `transform`/`opacity`.
- **Kejujuran:** di bawah blok selalu ada catatan `paper-deep`: *"Illustration only. This is not a real quote, and not a claim about any other contractor."*

### Scope List

Empat baris layanan (kitchens, bathrooms, extensions, whole houses). Setiap baris: nomor kecil, nama dalam Newsreader 1,5rem, satu kalimat isi, garis `line` di bawah. Saat hover/fokus, hanya nomor yang berubah ke `brick` — tidak ada kartu, tidak ada gambar.

### Stage Timeline

Empat tahap: `01 Site visit` → `02 Written scope and quote` → `03 Build` → `04 Handover`. Garis horizontal 1px dengan titik `brick` di setiap tahap; di mobile menjadi garis vertikal. Isi tiap tahap maksimal dua kalimat, fokus pada apa yang dilihat pemilik rumah, bukan jargon bangunan.

### Written List

Daftar hal yang sering tidak tertulis (pembuangan puing, izin, perlindungan lantai, jadwal bayar, tanggal mulai dan selesai, siapa yang ada di lokasi setiap hari). Dua kolom di desktop, satu di mobile. Setiap butir: tanda centang `check` + satu kalimat tentang apa yang akan tertulis di penawaran.

### Work

Dua atau tiga foto berlisensi, lebar penuh, dengan keterangan yang jujur: peralatan, material, atau lokasi kerja — **bukan** diklaim sebagai proyek klien. Keterangan memuat sumber dan tautan ke `/credits`.

### FAQ

Lima sampai tujuh pertanyaan, memakai `<details>` asli supaya tetap bekerja tanpa JavaScript. Pertanyaan memakai Public Sans 600; jawaban maksimal tiga kalimat.

### Site Visit Form

Field: nama, email, jenis renovasi (pilihan), kode pos, pesan. Validasi saat submit, error per field dengan `aria-describedby`, status dikirim di `aria-live="polite"`. Catatan form: *"Concept project. Demo form, no real bookings."* Tinggi target minimal 44px.

### Footer

Nama, satu kalimat penutup, tautan ke `/credits`, dan cap **Concept project**. Tanpa tautan sosial sampai ada URL asli.

### Credits Page

`/credits` berisi tiga foto (jika tiga dipakai): fotografer, tautan Commons, lisensi, dan catatan modifikasi (grayscale/crop). Canonical sendiri, masuk sitemap.

## Motion

- Reveal berbasis **waktu**, bukan scroll-scrub: `IntersectionObserver` (threshold 0,18, `rootMargin` bawah −8%), `translateY(26px)` + `opacity 0` → `1` selama **620ms**, stagger 60ms maksimal 240ms.
- Garis bagian tumbuh `scaleX(0→1)` 500ms saat masuk.
- Coret pembanding 380ms dengan delay 120ms.
- Hover/fokus: transisi warna 150ms, tanpa menggeser tata letak.
- `prefers-reduced-motion`: tidak ada transform, tidak ada stagger; pergantian A/B langsung.
- Tanpa JavaScript: semua konten terlihat; kelas reveal hanya ditambahkan oleh JS.

## Accessibility

- WCAG 2.2 AA. Kontras sudah diukur (lihat Colors).
- Pembanding punya dua tombol dengan `aria-pressed` dan satu region `aria-live="polite"` yang membacakan ringkasan: *"Showing our quote. Waste removal is not stated in the cheapest quote."*
- Tabel memakai `<table>` dengan `<caption>` tersembunyi dan `scope` yang benar di desktop; di mobile dipakai dua `<dl>` dari data yang sama.
- Fokus jelas: outline 3px `brick`, offset 3px, tidak pernah dihapus.
- Urutan tab mengikuti urutan baca; tombol skip ke konten di awal halaman.
- Form: label asli, error tekstual, `aria-invalid`, tanpa placeholder sebagai label.

## Performance

- Target Lighthouse mobile **≥95** untuk Performance, Accessibility, Best Practices, SEO (KERN: 95–96; halaman studi kasus KERN: 97).
- Gambar LCP memakai prop **`preload`**, bukan `priority` (dideprekasi di Next 16 — penyebab skor 89 di `/work/kern` sebelum diperbaiki). `sizes` harus cocok dengan lebar tampil sebenarnya.
- Maksimal tiga gambar, masing-masing ≤ 220 KB setelah optimasi, lebar 1600–1800px, WebP/AVIF lewat `next/image`.
- JS kecil: satu komponen klien untuk reveal + pembanding. Tanpa pustaka animasi, tanpa Lenis, tanpa analytics di situs demo.
- Dua keluarga huruf saja, subset latin, hanya bobot yang dipakai.
- Tidak ada `animation-timeline: view()` (gagal di iOS Safari — pelajaran KERN).

## Publication

- Repo GitHub terpisah dan publik; project Vercel terpisah.
- Subdomain **`renovation.belfamuhammad.com`** (sengaja netral supaya tidak perlu diganti kalau nama berubah). Record CNAME ditambahkan di Domainesia, lalu `vercel domains verify`.
- Setelah live: halaman studi kasus `/work/renovation` di website pribadi, kartu meja dihubungkan (`live` + `caseHref`), sitemap bertambah, dan kartu share 1200×630 dibuat sendiri.
- Lighthouse diukur pada domain asli, bukan hanya build lokal.

## Content Rules

- Tanpa angka apa pun: tahun berdiri, jumlah proyek, jumlah staf, rating, harga.
- Tanpa testimoni, nama klien, atau foto yang diklaim sebagai proyek sendiri.
- Pembanding selalu disertai catatan bahwa itu ilustrasi, bukan penawaran pesaing.
- Bahasa Inggris, kalimat pendek, tanpa kontraksi berlebihan, tanpa em dash di body copy.
- Semua yang terlihat harus bisa dipertanggungjawabkan sebagai fiksi yang jujur.

## References

| Referensi | Yang diambil | Yang tidak diambil |
|---|---|---|
| Naim Law | Ketenangan serif + sans, garis rambut, kewibawaan tanpa dekorasi | Nuansa firma hukum |
| SemiconBio | Satu aksen tegas di halaman yang tenang | Palet biru-emasnya |
| palaraiffeisen.ch | Keberanian memakai satu blok interaktif sebagai pusat halaman | Model bangunan 3D |

## Do's and Don'ts

### Do

- Mulai setiap bagian dari satu kalimat yang bisa dibaca sendiri.
- Pakai `brick` hanya untuk hal yang memang paling penting di layar itu.
- Biarkan ruang kosong; bagian yang tenang membuat pembanding terasa penting.
- Tulis label tabel dengan huruf kapital berspasi supaya terbaca sebagai dokumen.
- Uji pembanding dengan keyboard dan pembaca layar sebelum menambah hiasan.

### Don't

- Jangan menambah kartu melayang, gradien, atau bayangan lembut.
- Jangan memakai foto stok bangunan megah yang tidak berhubungan dengan renovasi rumah.
- Jangan menulis angka yang tidak bisa dibuktikan, termasuk "100% on time".
- Jangan membuat pembanding terlihat seperti iklan yang menjelekkan pesaing; nadanya menjelaskan, bukan menyerang.
- Jangan menaruh dua ajakan bertindak yang bersaing di satu layar.
