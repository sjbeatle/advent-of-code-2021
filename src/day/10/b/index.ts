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
    this.readLines();
  }

  private readLines() {
    this.lines.forEach(l => l.read());
  }

  get corruptLines(): Line[] {
    return this.lines.filter(l => l.corrupted);
  }

  get totalSyntaxErrorScore(): number {
    return this.corruptLines.reduce((a, b) => a + b.errorPoints, 0);
  }
}

class Line {
  syntax: string;
  syntaxError: Close;
  chunks: Chunk[];

  constructor(line: string) {
    this.syntax = line;
  }

  read() {
    const track: string[] = [];
    this.syntax.split('').some((c, i) => {
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

    return this;
  }

  get length() {
    return this.syntax.length;
  }

  get corrupted() {
    return !!this.syntaxError;
  }

  get errorPoints() {
    return points.get(this.syntaxError);
  }
}

class Chunk {
  openTag: string;
  closeTag: string;
  content: string;

  constructor(chunk: string) {
    const chunkChars = chunk.split('');
    this.openTag = chunkChars.shift();
    this.closeTag = chunkChars.pop();
    this.content = chunkChars.join('');
  }
}

console.log(`The total syntax error score is ${new NavigationSubsystem(navigationSubsystemInput).totalSyntaxErrorScore}`);

// answer 265527
// example answer 26397
