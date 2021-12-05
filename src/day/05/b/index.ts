import {
  linesList,
} from './input';

const lines = linesList.split('\n').map(c => c.split(' -> ').map(p => p.split(',').map(n => parseInt(n, 10))));
const straightLines = lines.filter(l => {
  return l[0][0] === l[1][0] || l[0][1] === l[1][1];
});
const diagonalLines = lines.filter(l => {
  return Math.abs(l[0][0] - l[1][0]) === Math.abs(l[0][1] - l[1][1]);
});

const occurredPoints: any = {};

straightLines.forEach(l => {
  if (l[0][0] === l[1][0]) {
    const max = Math.max(l[0][1], l[1][1]);
    const min = Math.min(l[0][1], l[1][1]);
    for (let index = min; index <= max; index++) {
      const k = `${l[0][0]},${index}`;
      occurredPoints[k] = occurredPoints[k] ? ++occurredPoints[k] : 1;
    }
  } else {
    const max = Math.max(l[0][0], l[1][0]);
    const min = Math.min(l[0][0], l[1][0]);
    for (let index = min; index <= max; index++) {
      const k = `${index},${l[0][1]}`;
      occurredPoints[k] = occurredPoints[k] ? ++occurredPoints[k] : 1;
    }
  }
});

diagonalLines.forEach(l => {
  const isXIncreasing = l[0][0] < l[1][0];
  const isYIncreasing = l[0][1] < l[1][1];
  for (let index = 0; index <= Math.abs(l[0][0] - l[1][0]); index++) {
    const newX = isXIncreasing ? l[0][0] + index : l[0][0] - index;
    const newY = isYIncreasing ? l[0][1] + index : l[0][1] - index;
    const k = `${newX},${newY}`;
    occurredPoints[k] = occurredPoints[k] ? ++occurredPoints[k] : 1;
  }
});

let count = 0;
Object.keys(occurredPoints).forEach(k => {
  if (occurredPoints[k] > 1) {
    count++;
  }
});

// console.log('>> TESTING >> lines', lines);
// console.log('>> TESTING >> straightLines', straightLines);
// console.log('>> TESTING >> diagonalLines', diagonalLines);
// console.log('>> TESTING >> occurredPoints', occurredPoints);
console.log('At least two lines overlap', count, 'points');

// answer 5294
// example answer 5
