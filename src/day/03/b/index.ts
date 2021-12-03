import {
  // example,
  report,
} from './input';

/* Helper functions
-----------------------------------------------*/
function oneBitTotalByColumn(matrix: string[]): number[] {
  const rowLength = matrix.length;
  const colLength = matrix[0].length;
  const oneBitTotals = new Array(colLength).fill(0);
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (matrix[i][j] === '1')
        oneBitTotals[j]++;
    }
  }

  return oneBitTotals;
}

function findRating(report: string[], getInverse = false, index = 0): string[] {
  const oneBitTotals = oneBitTotalByColumn(report);
  const filteredReport = report.filter(b => {
    const bitValue = b[index];
    if (oneBitTotals[index] >= (report.length / 2))
      return getInverse ? bitValue === '0' : bitValue === '1';
    else
      return getInverse ? bitValue === '1' : bitValue === '0';
  });

  return filteredReport.length === 1
    ? filteredReport
    : findRating(filteredReport, getInverse, ++index);
}

/* Answer
-----------------------------------------------*/
const oxygenRating = parseInt(findRating(report)[0], 2);
const co2Rating = parseInt(findRating(report, true)[0], 2);
const lifeSupportRating = oxygenRating * co2Rating;

console.log('The life support rating of the submarine is', lifeSupportRating);
// answer 3385170
// example answer 230
