import {
  // example,
  commands,
} from './input';

enum Commands {
  forward = 'forward',
  down = 'down',
  up = 'up',
};

const position = {
  h: [0],
  d: [0],
  a: [0],
};

let i = 0;
const execute = {
  forward(n: number) {
    position.h.push(position.h[i] + n);
    position.d.push(position.d[i] + (n * position.a[i]));
    position.a.push(position.a[i]); // no change
    i++;
  },
  down(n: number) {
    position.h.push(position.h[i]); // no change
    position.d.push(position.d[i]); // no change
    position.a.push(position.a[i] + n);
    i++;
  },
  up(n: number) {
    position.h.push(position.h[i]); // no change
    position.d.push(position.d[i]); // no change
    position.a.push(position.a[i] - n);
    i++;
  },
};

commands.forEach(c => {
  const [ command, unit ] = c.split(' ');
  execute[command as Commands](parseInt(unit));
});

const multiple = position.h[i] * position.d[i];

console.log('The final horizontal position multiplied by the final depth is', multiple);
// answer 1488311643
// example answer 900
