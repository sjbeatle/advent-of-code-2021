import {
  signalPatterns,
} from './input';

// const numberSegmentDisplayMap = new Map([
//   [0, 'abcefg'],
//   [1, 'cf'],
//   [2, 'acdeg'],
//   [3, 'acdfg'],
//   [4, 'bcdf'],
//   [5, 'abdfg'],
//   [6, 'abdefg'],
//   [7, 'acf'],
//   [8, 'abcdefg'],
//   [9, 'abcdfg'],
// ]);
const uniqueSegmentsCounts = [2, 3, 4, 7];

const outputValueDigits = signalPatterns
  .split('\n')
  .map(o => o.split(' | ')[1].split(' '));

const outputValueDigitsWithUniqueSegmentsCount = outputValueDigits
  .reduce((a, b) => a + b.filter(s => uniqueSegmentsCounts.includes(s.length)).length, 0);

console.log(`The digits 1, 4, 7, or 8 appear ${outputValueDigitsWithUniqueSegmentsCount} times in the output values`);

// answer 365
// example answer 26
