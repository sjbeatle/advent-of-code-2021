import {
  // example,
  measurements,
} from './input';

let inc = 0;
const slidingMeasurement: number[] = [];

for (let index = 2; index < measurements.length; index++) {
  const m = measurements[index - 2] + measurements[index - 1] + measurements[index];
  slidingMeasurement.push(m);
  if (m > slidingMeasurement[index - 3]) inc++
}

console.log(inc, ' sliding measurements are larger than the previous measurement');
