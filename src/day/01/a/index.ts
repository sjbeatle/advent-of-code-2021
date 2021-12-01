import {
  // example,
  measurements,
} from './input';

let inc = 0;
for (let i = 0; i < measurements.length; i++) {
  if (measurements[i] > measurements[i - 1]) inc++;
}

console.log(inc, ' measurements are larger than the previous measurement');
