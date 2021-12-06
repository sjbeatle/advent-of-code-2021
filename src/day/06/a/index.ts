import {
  timers,
} from './input';

const days = 80;
let timersCopy = [...timers];

for (let i = 0; i < days; i++) {
  const births = timersCopy.filter(a => a === 0).length;

  timersCopy = timersCopy.map(a => a === 0 ? 6 : a - 1);

  for (let j = 0; j < births; j++) {
    timersCopy.push(8);
  }
}

console.log(`There are ${timersCopy.length} lanternfish after 80 days.`);

// answer 352195
// example answer 5934
