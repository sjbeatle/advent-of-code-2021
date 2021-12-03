import {
  // example,
  report,
} from './input';


/* Helper functions
-----------------------------------------------*/
function findRate(matrix: string[], getInverse = false): string {
  const rowLength = matrix.length;
  const colLength = matrix[0].length;
  const oneBitTotals = new Array(colLength).fill(0);
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (matrix[i][j] === '1')
        oneBitTotals[j]++;
    }
  }

  return getInverse
    ? oneBitTotals.map(t => t > rowLength / 2 ? '0' : '1').join('')
    : oneBitTotals.map(t => t > rowLength / 2 ? '1' : '0').join('');
}

/* Answer
-----------------------------------------------*/
const gammaRate = parseInt(findRate(report), 2);
const epsilonRate = parseInt(findRate(report, true), 2)
const powerConsumption = gammaRate * epsilonRate;

console.log('The power consumption of the submarine is', powerConsumption);
// answer 3882564
// example answer 198
