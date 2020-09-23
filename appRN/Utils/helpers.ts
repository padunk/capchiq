const toUpperCase = (str: string): string => str.toUpperCase();
const toLowerCase = (str: string): string => str.toLowerCase();
const concatString = (source: string, ...target: string[]): string =>
  source.concat(...target);

export const capitalizeFirstLetter = (str: string): string =>
  concatString(toUpperCase(str.slice(0, 1)), toLowerCase(str.slice(1)));
