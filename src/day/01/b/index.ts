import {
  // example,
  measurements,
} from './input';

let inc = 0;

for (let index = 3; index < measurements.length; index++) {
  if (measurements[index] > measurements[index - 3]) inc++
}

console.log(inc, ' sliding measurements are larger than the previous measurement');
// answer 1130
// example answer 5
