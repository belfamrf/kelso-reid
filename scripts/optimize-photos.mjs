// Menyiapkan foto mentah dari Wikimedia Commons jadi aset situs.
// Sumber asli ada di `_raw-photos/` (tidak di-commit besar-besaran: lihat .gitignore).
// Hasil ada di `public/photos/`.
//
// Modifikasi yang dicatat di CREDITS.md: dipotong ukurannya, diturunkan saturasinya,
// dan dikompres ulang. Tidak ada perubahan isi.
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const from = join(process.cwd(), "_raw-photos");
const to = join(process.cwd(), "public", "photos");

const jobs = [
  { file: "room-mid-renovation", width: 1800, quality: 76 },
  { file: "lath-plaster", width: 1600, quality: 76 },
  { file: "kitchen-floor", width: 648, quality: 80 },
];

await mkdir(to, { recursive: true });

for (const { file, width, quality } of jobs) {
  const target = join(to, `${file}.jpg`);
  const info = await sharp(join(from, `${file}.jpg`))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .modulate({ saturation: 0.6 })
    .jpeg({ quality, mozjpeg: true })
    .toFile(target);
  const size = (await stat(target)).size;
  console.log(`${file}.jpg: ${info.width}x${info.height}, ${Math.round(size / 1024)} KB`);
}
