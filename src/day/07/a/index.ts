import {
  positions,
} from './input';

const startPos = positions.split(',').map(p => parseInt(p, 10));
const largestPos = Math.max(...startPos);
const smallestPos = Math.min(...startPos);
const fuelOptions: number[] = [];

for (let i = smallestPos; i <= largestPos; i++) {
  fuelOptions.push(startPos.reduce((a, b) => a + Math.abs(b - i), 0));
}

const leastFuelUsed = Math.min(...fuelOptions);

console.log(`The crabs must spend at LEAST ${leastFuelUsed} fuel to align`);

// answer 37
// example answer 355989
