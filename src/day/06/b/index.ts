import {
  timers,
} from './input';

const days = 256;
const adultTimer = 6;
const childTimer = 8;
const timerCounts: Record<number, number> = {};

// initialize counts
for (let i = 0; i <= childTimer; i++) {
  timerCounts[i] = 0;
}

// seed population
timers.forEach(t => timerCounts[t] = ++timerCounts[t]);

for (let i = 0; i < days; i++) {
  let creators = timerCounts['0'];
  Object.keys(timerCounts).map(k => parseInt(k, 10)).sort().forEach( // sort may not be necessary, but doesn't hurt
    t => {
      if (t + 1 > childTimer)
        timerCounts[t] = creators; // births
      else if (t === adultTimer)
        timerCounts[t] = timerCounts[t + 1] + creators;
      else
        timerCounts[t] = timerCounts[t + 1];
    },
  );
}

const totalLanternfish = Object.values(timerCounts).reduce((a, b) => a + b);

console.log(`There are ${totalLanternfish} lanternfish after 256 days.`);

// answer 1600306001288
// example answer 26984457539
