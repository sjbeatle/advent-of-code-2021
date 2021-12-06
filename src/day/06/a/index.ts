import {
  ages,
} from './input';

const days = 80;
let timers = [...ages];

for (let i = 0; i < days; i++) {
  const births = timers.filter(a => a === 0).length;

  timers = timers.map(a => a === 0 ? 6 : a - 1);

  for (let j = 0; j < births; j++) {
    timers.push(8);
  }
}

console.log(`There are ${timers.length} lanternfish after 80 days.`);

// answer 352195
// example answer 5934
