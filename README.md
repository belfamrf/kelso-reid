# Kelso & Reid

Situs konsep untuk kontraktor renovasi fiktif di Melbourne. Bahasa situs Inggris; dokumen proyek Indonesia.

**Kelso & Reid bukan bisnis nyata.** Formulirnya tidak mengirim apa pun, dan angka serta proyek di dalamnya fiktif.

- Brief dan keputusan yang dikunci: `BRIEF.md`
- Sistem desain: `DESIGN.md`
- Status pekerjaan: `MEMORY.md`
- Lisensi foto: `CREDITS.md` dan halaman `/credits`

## Perintah

```powershell
npm run dev     # http://localhost:3000
npm run lint
npm run build
npm run photos  # optimasi ulang foto dari _raw-photos ke public/photos
```

## Susunan

- `src/app/page.tsx` — halaman utama, tujuh bagian bernomor
- `src/components/quote-comparison.tsx` — elemen khas: pembanding Penawaran A / B
- `src/components/reveal.tsx` — animasi masuk berbasis IntersectionObserver
- `src/components/site-visit-form.tsx` — form demo dengan validasi
- `src/app/credits/page.tsx` — halaman lisensi foto
- `src/app/opengraph-image.tsx` — kartu share 1200×630
