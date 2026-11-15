// Mengambil tangkapan layar situs live untuk halaman studi kasus di website pribadi.
// Jalankan dari folder 02-jasa-lokal: node scripts/capture-work.mjs
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const out = join("C:", "Users", "USER", "Documents", "Proyek_Klien", "00-website-pribadi", "public", "work", "renovation");
await mkdir(out, { recursive: true });

const shots = [
  { file: "hero-1440.jpg", width: 1440, height: 900, dsf: 2, target: null },
  { file: "quotes-1440.jpg", width: 1440, height: 900, dsf: 2, target: "#quotes-title", offset: -96 },
  { file: "screen-375.jpg", width: 375, height: 812, dsf: 2, target: "#quotes-title", offset: -72 },
];

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--force-color-profile=srgb"],
});

for (const shot of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: shot.dsf });
  await page.goto("https://renovation.belfamuhammad.com/", { waitUntil: "networkidle0" });

  if (shot.target) {
    await page.evaluate(
      async ({ target, offset }) => {
        const el = document.querySelector(target);
        const y = el.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo(0, y);
      },
      { target: shot.target, offset: shot.offset },
    );
  }

  // Beri waktu reveal dan gambar selesai.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  await page.screenshot({ path: join(out, shot.file), type: "jpeg", quality: 82 });
  console.log(`captured ${shot.file} (${shot.width * shot.dsf}x${shot.height * shot.dsf})`);
  await page.close();
}

await browser.close();
