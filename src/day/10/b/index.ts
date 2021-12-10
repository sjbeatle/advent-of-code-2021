import {
  navigationSubsystemInput,
} from './input';

const close = [
  ']',
  '}',
  ')',
  '>',
];

const tagMap = new Map([
  ['[', ']'],
  ['{', '}'],
  ['(', ')'],
  ['<', '>'],
  [']', '['],
  ['}', '{'],
  [')', '('],
  ['>', '<'],
]);

const points = new Map([
  [')', 1],
  [']', 2],
  ['}', 3],
  ['>', 4],
]);

class NavigationSubsystem {
  lines: Line[];

  constructor(input: string) {
    const lines = input.split('\n').map(l => new Line(l));
    this.lines = this.removeCorruptLine(lines);
  }

  private removeCorruptLine(lines: Line[]): Line[] {
    return lines.filter(l => !l.corrupted);
  }

  get autocompleteScores(): number[] {
    return this.lines
      .map(l => l.autocompleteScore)
      .sort((a, b) => a > b ? 1 : -1);
  }

  get middleAutoCompleteScore(): number {
    const scores = this.autocompleteScores;
    const middleIndex = Math.floor(scores.length / 2);

    return scores[middleIndex];
  }
}

class Line {
  syntax: string;
  syntaxError: string;
  incompleteSequence: string[];

  constructor(line: string) {
    this.syntax = line;
    this.read();
  }

  private read() {
    const sequence: string[] = [];
    this.syntax
      .split('')
      .some((c, i) => {
        if (i === 0) {
          sequence.push(c);
          return;
        }

        if (close.includes(c)) {
          const prev = sequence.pop();
          if (tagMap.get(c) !== prev) {
            this.syntaxError = c;
            return true;
          }
        } else {
          sequence.push(c);
        }
      });
    this.incompleteSequence = sequence;
  }

  get completionSequence(): string[] {
    if (this.corrupted)
      return [];

    return this.incompleteSequence
      .map(c => tagMap.get(c))
      .reverse();
  }

  get corrupted(): boolean {
    return !!this.syntaxError;
  }

  get autocompleteScore(): number {
    return this.completionSequence
      .reduce((a, b) => (a * 5) + points.get(b), 0);
  }
}

console.log(`The middle autocomplete score is ${new NavigationSubsystem(navigationSubsystemInput).middleAutoCompleteScore}`);

// answer 3969823589
// example answer 288957
