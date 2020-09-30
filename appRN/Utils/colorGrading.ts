const hexToRGB = (hexColor: string): number[] | undefined => {
  if (hexColor[0] !== '#') {
    return;
  }

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5), 16);

  return [r, g, b];
};

const rgbToHexColor = (r: number, g: number, b: number) =>
  `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

/**
 * generateColor based on hex color
 * @param {string} color
 * @param {number} grading
 */

export const generateColor = (color: string, grading = 500) => {
  const grade = Object.freeze({
    100: 1.431,
    200: 1.386,
    300: 1.33,
    400: 1.22,
    600: 1 - 0.26,
    700: 1 - 0.502,
    800: 1 - 0.676,
    900: 1 - 0.808,
  });

  if (grading === 500) {
    return color;
  }

  const wrap = (c: number) => (g: number) =>
    Math.floor(c * g) > 255 ? 255 : Math.floor(c * g);

  let [red, green, blue] = hexToRGB(color);
  red = wrap(red)(grade[grading]);
  green = wrap(green)(grade[grading]);
  blue = wrap(blue)(grade[grading]);

  // console.log(red, green, blue);

  return rgbToHexColor(red, green, blue);
};
