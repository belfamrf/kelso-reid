// Pemeriksaan struktural situs di Chrome headless.
// Bukan penilaian visual: yang dicek hanya hal yang bisa diukur
// (lebar, gambar termuat, anchor, toggle, form, reduced motion, tanpa JS).
//
// Pakai: node scripts/qa.mjs http://localhost:4323
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const base = process.argv[2] ?? "http://localhost:4323";
const shots = join(tmpdir(), "opencode", "kelso-qa");
const widths = [320, 375, 768, 1440];

await mkdir(shots, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

const problems = [];

for (const width of widths) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  await page.goto(base, { waitUntil: "networkidle0" });

  // Gulir dulu supaya gambar lazy ikut dimuat, kalau tidak pemeriksaan
  // "gambar termuat" akan selalu gagal untuk foto di bawah layar.
  await page.evaluate(async () => {
    const step = Math.ceil(document.documentElement.scrollHeight / 8);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 200));
  });

  const metrics = await page.evaluate(() => {
    const images = Array.from(document.images).map((img) => ({
      src: img.currentSrc.split("/").pop(),
      ok: img.complete && img.naturalWidth > 0,
    }));
    const anchors = Array.from(document.querySelectorAll('a[href^="#"]')).map((a) => ({
      href: a.getAttribute("href"),
      ok: Boolean(document.querySelector(a.getAttribute("href"))),
    }));
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      images,
      anchors,
      h1: document.querySelector("h1")?.textContent?.trim() ?? "",
      hidden: document.querySelectorAll('[data-motion="pending"]').length,
    };
  });

  if (metrics.scrollWidth > metrics.innerWidth) {
    problems.push(`${width}px: overflow horizontal (${metrics.scrollWidth} > ${metrics.innerWidth})`);
  }
  for (const img of metrics.images) {
    if (!img.ok) problems.push(`${width}px: gambar gagal dimuat: ${img.src}`);
  }
  for (const a of metrics.anchors) {
    if (!a.ok) problems.push(`${width}px: anchor mati: ${a.href}`);
  }
  if (!metrics.h1.includes("The whole job")) problems.push(`${width}px: H1 tidak ditemukan`);

  await page.screenshot({ path: join(shots, `${width}.png`), fullPage: width >= 768 });
  console.log(
    `${width}px: scrollWidth=${metrics.scrollWidth} gambar=${metrics.images.length} anchor=${metrics.anchors.length} h1="${metrics.h1}"`,
  );
  await page.close();
}

// 375px: interaksi pembanding, FAQ, dan form.
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 900 });
await page.goto(base, { waitUntil: "networkidle0" });

const sync = await page.evaluate(() => {
  const lists = Array.from(document.querySelectorAll("main dl"));
  const shown = lists.filter((dl) => !dl.hasAttribute("hidden")).map((dl) => dl.getAttribute("aria-label"));
  const pressed = Array.from(document.querySelectorAll('button[aria-pressed="true"]')).map((b) => b.textContent?.trim());
  const live = document.querySelector('[aria-live="polite"]')?.textContent?.trim() ?? "";
  return { shown, pressed, live };
});
console.log("pembanding awal:", JSON.stringify(sync));

await page.evaluate(() => {
  const button = Array.from(document.querySelectorAll("button")).find((b) => b.textContent?.includes("The cheapest quote"));
  button?.click();
});
await new Promise((r) => setTimeout(r, 250));
const after = await page.evaluate(() => {
  const lists = Array.from(document.querySelectorAll("main dl"));
  return {
    shown: lists.filter((dl) => !dl.hasAttribute("hidden")).map((dl) => dl.getAttribute("aria-label")),
    pressed: Array.from(document.querySelectorAll('button[aria-pressed="true"]')).map((b) => b.textContent?.trim()),
    live: document.querySelector('[aria-live="polite"]')?.textContent?.trim() ?? "",
    strikes: document.querySelectorAll("dl .strike").length,
  };
});
console.log("pembanding setelah klik:", JSON.stringify(after));
if (!after.shown.includes("The cheapest quote")) problems.push("375px: tombol A tidak menukar daftar");
if (!after.pressed.includes("The cheapest quote")) problems.push("375px: aria-pressed tidak berpindah");
if (!after.live.includes("cheapest")) problems.push("375px: aria-live tidak membacakan pilihan");

// Form: kosong harus memunculkan error, lalu isi benar harus menampilkan status demo.
await page.evaluate(() => {
  document.querySelector("#site-visit")?.scrollIntoView();
  document.querySelector('button[type="submit"]')?.click();
});
await new Promise((r) => setTimeout(r, 200));
const errorCount = await page.evaluate(
  () => document.querySelectorAll('[aria-invalid="true"]').length,
);
console.log("form kosong: field invalid =", errorCount);
if (errorCount < 4) problems.push(`375px: validasi form tidak jalan (invalid=${errorCount})`);

await page.evaluate(() => {
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  set("name", "Test Person");
  set("email", "test@example.com");
  set("postcode", "3000");
  const select = document.getElementById("type");
  if (select) {
    select.value = "Kitchen";
    select.dispatchEvent(new Event("input", { bubbles: true }));
  }
  document.querySelector('button[type="submit"]')?.click();
});
await new Promise((r) => setTimeout(r, 300));
const formStatus = await page.evaluate(
  () => document.querySelector("#site-visit p[aria-live]")?.textContent?.trim() ?? "",
);
console.log("form valid:", formStatus);
if (!/nothing was sent/i.test(formStatus)) problems.push("375px: status demo form tidak muncul");

// FAQ: <details> harus bisa dibuka tanpa JavaScript tambahan.
const faq = await page.evaluate(() => {
  const details = document.querySelector("details");
  details.open = true;
  return { count: document.querySelectorAll("details").length, open: Boolean(details.open) };
});
console.log("faq:", JSON.stringify(faq));

await page.close();

// Reduced motion: tidak boleh ada elemen yang disembunyikan.
const rm = await browser.newPage();
await rm.setViewport({ width: 375, height: 900 });
await rm.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await rm.goto(base, { waitUntil: "networkidle0" });
const rmState = await rm.evaluate(() => ({
  pending: document.querySelectorAll('[data-motion="pending"]').length,
  visibleText: document.body.innerText.includes("The whole job"),
}));
console.log("reduced motion:", JSON.stringify(rmState));
if (rmState.pending > 0) problems.push("reduced motion: masih ada elemen disembunyikan");
await rm.close();

// Tanpa JavaScript: konten harus tetap ada.
const nojs = await browser.newPage();
await nojs.setViewport({ width: 375, height: 900 });
await nojs.setJavaScriptEnabled(false);
await nojs.goto(base, { waitUntil: "load" });
const nojsState = await nojs.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim() ?? "",
  hidden: document.querySelectorAll("[data-motion]").length,
}));
console.log("tanpa JS:", JSON.stringify(nojsState));
if (!nojsState.h1.includes("The whole job")) problems.push("tanpa JS: konten tidak terlihat");
await nojs.close();

// Kartu share dan ikon.
for (const path of ["/opengraph-image", "/icon", "/credits", "/sitemap.xml", "/robots.txt"]) {
  const res = await fetch(base + path);
  console.log(`${path}: ${res.status} ${res.headers.get("content-type")}`);
  if (!res.ok) problems.push(`${path}: status ${res.status}`);
}

await browser.close();

if (problems.length === 0) {
  console.log(`\nOK. Screenshot di ${shots}`);
} else {
  console.log("\nMASALAH:");
  for (const p of problems) console.log(" - " + p);
  process.exitCode = 1;
}
