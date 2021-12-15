import {
  templateRulesInputExample,
} from './input';

class Day14 {
  seed: string;
  rules: Map<string, string> = new Map();
  counts: Record<string, number> = {};

  constructor(public input: string) {
    this.init();
  }

  init() {
    const [seed, rules] = this.input.split('\n\n');
    this.seed = seed;
    rules.split('\n')
      .forEach(r => {
        const [key, value] = r.split(' -> ');
        this.rules.set(key, value);
      });
  }

  createPolymerNTimes(seed: string, iterations: number = 1) {
    let polymer = seed;
    for (let i = 0; i < iterations; i++) {
      polymer = this.createPolymer(polymer);
    }
    return polymer;
  }

  getUniqueCounts(polymer: string) {
    for (let i = 0; i < polymer.length; i++) {
      const key = polymer[i];
      if (this.counts[key]) {
        this.counts[key] += 1;
      } else {
        this.counts[key] = 1;
      }
    }
  }

  createPolymer(template: string) {
    let prev = template[0];
    let polymer = template[0];

    for (let i = 1; i < template.length; i++) {
      const curr = template[i];
      const rule = this.rules.get(`${prev}${curr}`);

      if (rule) {
        polymer += rule + curr;
      } else {
        polymer += curr;
      }

      prev = curr;
    }

    return polymer;
  }
}

const day14 = new Day14(templateRulesInputExample);
const polymerAfter10 = day14.createPolymerNTimes('NN', 40);
day14.getUniqueCounts(polymerAfter10);
const min = Math.min(...Object.values(day14.counts));
const max = Math.max(...Object.values(day14.counts));

console.log(
  polymerAfter10,
);

// answer 2937
// example answer 1588
