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

// get month and year from milliseconds eg: 1601369108294
const getMonth = (milDate: number): number => new Date(milDate).getMonth();
const getYear = (milDate: number): number => new Date(milDate).getFullYear();

export const toMonthYear = (strDate: number): string =>
  `${months[getMonth(strDate)]}  ${getYear(strDate)}`;
