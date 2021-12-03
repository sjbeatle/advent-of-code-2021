import {
  // example,
  diagnosticsReport,
} from './input';

/* Helper functions
-----------------------------------------------*/
function isOneCommon(matrix: string[], index: number): boolean {
  const oneBitTotal = matrix.reduce((a, b) => b[index] === '1' ? ++a : a, 0);
  return oneBitTotal >= (matrix.length / 2);
}

function getRating(report: string[], getInverse = false): string {
  let filteredReport = [...report];
  let i = 0;

  while (filteredReport.length > 1) {
    const mostCommon = isOneCommon(filteredReport, i) ? 1 : 0;
    const filterParam = getInverse ? 1 - mostCommon : mostCommon;
    filteredReport = filteredReport.filter(b => parseInt(b[i], 10) === filterParam);
    i++;
  }

  return filteredReport[0];
}

/* Answer
-----------------------------------------------*/
const oxygenRating = parseInt(getRating(diagnosticsReport), 2);
const co2Rating = parseInt(getRating(diagnosticsReport, true), 2);
const lifeSupportRating = oxygenRating * co2Rating;

console.log('The life support rating of the submarine is', lifeSupportRating);
// answer 3385170
// example answer 230
