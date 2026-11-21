export function getSlides(count = 18): Promise<GalleryItemData[]> {
  const colors: string[] = [];

  // Use a golden ratio offset to ensure colors are visually distinct
  const goldenRatioConjugate = 0.618033988749895;
  let hue = Math.random();

  for (let i = 0; i < count; i++) {
    hue += goldenRatioConjugate;
    hue %= 1;

    const h = Math.floor(hue * 360);
    const s = 50 + Math.random() * 10; // Soft saturation
    const l = 80 + Math.random() * 5;  // High lightness for pastel feel

    colors.push(`hsl(${h}, ${s}%, ${l}%)`);
  }

  // Shuffle the array to ensure random order on every call
  const shuffled = colors
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => ({ src: value }));

  return Promise.resolve(shuffled);
}
