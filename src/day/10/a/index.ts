import {
  navigationSubsystemInput,
} from './input';

const close = [
  ']',
  '}',
  ')',
  '>',
]

const tagMap = new Map([
  [']', '['],
  ['}', '{'],
  [')', '('],
  ['>', '<'],
]);

const points = new Map([
  [')', 3],
  [']', 57],
  ['}', 1197],
  ['>', 25137],
]);

class NavigationSubsystem {
  lines: Line[];

  constructor(input: string) {
    this.lines = input.split('\n').map(l => new Line(l));
  }

  get corruptLines(): Line[] {
    return this.lines.filter(l => l.corrupted);
  }

  get totalSyntaxErrorScore(): number {
    return this.corruptLines.reduce((a, b) => a + b.errorScore, 0);
  }
}

class Line {
  syntax: string;
  syntaxError: string;

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
  }

  get corrupted() {
    return !!this.syntaxError;
  }

  get errorScore() {
    return points.get(this.syntaxError);
  }
}

console.log(`The total syntax error score is ${new NavigationSubsystem(navigationSubsystemInput).totalSyntaxErrorScore}`);

// answer 265527
// example answer 26397
