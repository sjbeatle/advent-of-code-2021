import {
  awf,
} from './input';

const Axis = [
  'x',
  'y',
];

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

class FoldedPaper {
  unfolds: string[] = [];
  message: string[][];

  constructor(input: string) {
    this.message = input
      .split('\n')
      .map(l => l.split(''));
  }

  unfoldNTimes(n: number) {
    for (let i = 0; i < n; i++) {
      this.unfold();
    }
  }

  unfold() {
    const axis = Axis[getRandomInt(2)];
    if (axis === 'y')
      this.horizontalUnfold();
    else
      this.verticalUnfold();

    return this;
  }

  horizontalUnfold() {
    const rowCount = this.message.length;
    const colCount = this.message[0].length;

    /* unfold line
    -----------------------------------------------*/
    this.message.push(Array(colCount).fill('.'));

    /* create new unfolded section
    -----------------------------------------------*/
    for (let i = 0; i < rowCount; i++) {
      this.message.push(Array(colCount).fill('.'));
    }

    /* mark the unfolded section
    -----------------------------------------------*/
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        const ogHas = this.message[i][j] === '#';
        this.message[i][j] = ogHas
          ? getRandomInt(2)
            ? '#'
            : '.'
          : '.';
        const ogStillHas = this.message[i][j] === '#';
        const char = ogHas
          ? ogStillHas
            ? getRandomInt(2) ? '#' : '.'
            : '#'
          : '.';
        this.message[rowCount + (rowCount - i)][j] = char;
      }
    }

    this.unfolds.push(`fold along y=${rowCount}`);
  }

  verticalUnfold() {
    const rowCount = this.message.length;
    const colCount = this.message[0].length;

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j <= colCount; j++) {
        this.message[i].push('.');
      }
    }

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        const ogHas = this.message[i][j] === '#';
        this.message[i][j] = ogHas
          ? getRandomInt(2)
            ? '#'
            : '.'
          : '.';
        const ogStillHas = this.message[i][j] === '#';
        const char = ogHas
          ? ogStillHas
            ? getRandomInt(2) ? '#' : '.'
            : '#'
          : '.';
        this.message[i][colCount + (colCount - j)] = char;
      }
    }

    this.unfolds.push(`fold along x=${colCount}`);
  }

  get rowCount(): number {
    return this.message.length;
  }

  get colCount(): number {
    return this.message[0].length;
  }

  get output(): string {
    return this.message.map(r => r.join('')).join('\n');
  }

  get points(): string {
    const points: string[] = [];
    this.message
      .forEach((r, ri) => {
        r.forEach((c, ci) => {
          if (c === '#')
            points.push(`${ci},${ri}`);
        });
      });

    return shuffle(points).join('\n');
  }

  get transparentPaper(): string {
    return this.points + '\n\n' + this.unfolds.reverse().join('\n');
  }
}

const tp = new FoldedPaper(awf);
console.log(`tp.output\n${tp.output}`);
tp.unfoldNTimes(12);
// console.log(`tp.output\n${tp.output}`);
console.log('>> TESTING >> tp.transparentPaper', tp.transparentPaper);
