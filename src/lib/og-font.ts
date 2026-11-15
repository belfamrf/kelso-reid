// Kartu share 1200x630 dengan huruf display yang sama dengan situs.
// Kalau Google Fonts tidak bisa dihubungi saat build, kartu tetap dirender
// dengan huruf bawaan.
export async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500",
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}
