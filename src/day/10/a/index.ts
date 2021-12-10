import {
  navigationSubsystemInput,
} from './input';

enum Open {
  '[' = '[',
  '{' = '{',
  '(' = '(',
  '<' = '<',
}

enum Close {
  ']' = ']',
  '}' = '}',
  ')' = ')',
  '>' = '>',
}

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
  [Close[')'], 3],
  [Close[']'], 57],
  [Close['}'], 1197],
  [Close['>'], 25137],
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
  syntaxError: Close;

  constructor(line: string) {
    this.syntax = line;
    this.read();
  }

  private read() {
    const track: string[] = [];
    this.syntax
      .split('')
      .some((c, i) => {
        if (i === 0) {
          track.push(c);
          return;
        }

        if (c in Close) {
          const prev = track.pop();
          if (tagMap.get(c) !== prev) {
            this.syntaxError = c as Close;
            return true;
          }
        } else {
          track.push(c);
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
