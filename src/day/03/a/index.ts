import {
  // example,
  diagnosticsReport,
} from './input';


/* Helper functions
-----------------------------------------------*/
function getRates(matrix: string[]) {
  const oneBitTotals = new Array(matrix[0].length).fill(0);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < oneBitTotals.length; j++) {
      if (matrix[i][j] === '1')
        oneBitTotals[j]++;
    }
  }

  const rate = oneBitTotals.map(t => t > matrix.length / 2 ? 0 : 1).join('');
  const inverseRate = rate.split('').map(d => 1 - parseInt(d, 10)).join('');

  return [rate, inverseRate];
}

/* Answer
-----------------------------------------------*/
const [gammaRate, epsilonRate] = getRates(diagnosticsReport);
const powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

console.log('The power consumption of the submarine is', powerConsumption);
// answer 3882564
// example answer 198
