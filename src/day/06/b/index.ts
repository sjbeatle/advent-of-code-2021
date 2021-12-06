import {
  ages,
} from './input';

const days = 256;
const adultTimer = 6;
const childTimer = 8;
const timerCounts: { [key: string]: number } = {};

// initialize counts
for (let i = 0; i <= childTimer; i++) {
  timerCounts[i] = 0;
}

// seed population
ages.forEach(a => timerCounts[a] = ++timerCounts[a]);

for (let i = 0; i < days; i++) {
  let births = timerCounts['0'];
  Object.keys(timerCounts).map(k => parseInt(k, 10)).sort().forEach( // sort may not be necessary, but doesn't hurt
    a => {
      if (a + 1 > childTimer)
        timerCounts[a] = births;
      else if (a === adultTimer)
        timerCounts[a] = timerCounts[a + 1] + births;
      else
        timerCounts[a] = timerCounts[a + 1];
    },
  );
}

const totalLanternfish = Object.keys(timerCounts).reduce((a, b) => a + timerCounts[b], 0);

console.log(`There are ${totalLanternfish} lanternfish after 256 days.`);

// answer 1600306001288
// example answer 26984457539
