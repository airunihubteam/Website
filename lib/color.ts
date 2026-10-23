// Relative luminance of an sRGB color, per WCAG.
function luminance(rgb: number[]) {
  const [r, g, b] = rgb.map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// A "#rrggbb" color shaded toward black just enough for white text on it to read at the given
// contrast (WCAG AA for body text is 4.5:1). Dark colors come back unchanged; light ones, like
// a pink or a yellow, become a deeper shade of the same hue.
export function readableShade(hex: string, contrast = 4.5) {
  const base = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
  for (let step = 0; step <= 50; step++) {
    const shade = base.map((channel) => Math.round(channel * (1 - step / 50)));
    if (1.05 / (luminance(shade) + 0.05) >= contrast) {
      return `#${shade.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
    }
  }
  return "#000000";
}
