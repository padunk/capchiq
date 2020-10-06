const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const toUpperCase = (str: string): string => str.toUpperCase();
const toLowerCase = (str: string): string => str.toLowerCase();
const concatString = (source: string, ...target: string[]): string =>
  source.concat(...target);

export const capitalizeFirstLetter = (str: string): string =>
  concatString(toUpperCase(str.slice(0, 1)), toLowerCase(str.slice(1)));

const getMonth = (str: string): number => new Date(str).getMonth();
const getYear = (str: string): number => new Date(str).getFullYear();

export const toMonthYear = (str: string): string =>
  `${months[getMonth(str)]}  ${getYear(str)}`;
