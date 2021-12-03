import {
  // example,
  diagnosticsReport,
} from './input';

/* Helper functions
-----------------------------------------------*/
function commonBit(matrix: string[], index: number): number {
  const oneBitTotal = matrix.reduce((a, b) => b[index] === '1' ? ++a : a, 0);
  return oneBitTotal >= (matrix.length / 2) ? 1 : 0;
}

function findRating(report: string[], getInverse = false): string {
  let filteredReport = [...report];
  let i = 0;

  while (filteredReport.length > 1) {
    const mostCommon = commonBit(filteredReport, i);
    const filterParam = getInverse ? 1 - mostCommon : mostCommon;
    filteredReport = filteredReport.filter(b => b[i] === String(filterParam));
    i++;
  }

  return filteredReport[0];
}

/* Answer
-----------------------------------------------*/
const oxygenRating = parseInt(findRating(diagnosticsReport), 2);
const co2Rating = parseInt(findRating(diagnosticsReport, true), 2);
const lifeSupportRating = oxygenRating * co2Rating;

console.log('The life support rating of the submarine is', lifeSupportRating);
// answer 3385170
// example answer 230
