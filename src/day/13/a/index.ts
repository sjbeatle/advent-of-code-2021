import {
  transparentPaperInput,
} from './input';

class TransparentPaper {
  folds: string[];
  matrix: number[][];

  constructor(input: string) {
    const [points, folds] = input.split('\n\n');
    this.folds = folds.split('\n').map(i => i.split(' ').pop());
    const allXs: number[] = [];
    const allYs: number[] = [];
    points
      .split('\n')
      .forEach(p => {
        allXs.push(parseInt(p.split(',')[0], 10));
        allYs.push(parseInt(p.split(',')[1], 10));
      });
    const rowL = Math.max(...allYs) + 1;
    const colL = Math.max(...allXs) + 1;
    this.matrix = Array.from(Array(rowL), _ => Array(colL).fill(0));
    points
      .split('\n')
      .forEach(p => {
        const x = parseInt(p.split(',')[0], 10);
        const y = parseInt(p.split(',')[1], 10);
        this.markPoint(x, y);
      });
  }

  markPoint(x: number, y: number) {
    this.matrix[y][x] = 1;
  }

  setPoint(val: number, x: number, y: number) {
    this.matrix[y][x] = Math.max(this.matrix[y][x], val);
  }

  fold(axis: string, index: number) {
    if (axis === 'y')
      this.horizontalFold(index);
    else
      this.verticalFold(index);
  }

  foldByRule(rule: string) {
    const [axis, index] = rule.split('=');
    this.fold(axis, parseInt(index, 10));
  }

  horizontalFold(f: number) {
    const foldIndex = f + 1;
    const rMatrix = this.matrix.splice(foldIndex);
    //remove fold row
    this.matrix.pop();

    rMatrix
      .forEach(((r, ri) => {
        r.forEach((c, ci) => {
          this.setPoint(c, ci, f - (ri + 1));
        });
      }));
  }

  verticalFold(f: number) {
    this.matrix
      .forEach((r, ri) => {
        r.forEach((c, ci) => {
          if (ci > f) {
            this.setPoint(c, f - (ci - f), ri)
          }
        });
      })

    // remove folded cols
    this.matrix.forEach(r => {
      for (let i = 0; i <= f; i++) {
        r.pop();
      }
    });
  }

  get visibleDotsCount(): number {
    return this.matrix.reduce((a, c) => a + c.reduce((ca, cc) => ca + cc, 0), 0);
  }
}

const tp = new TransparentPaper(transparentPaperInput);
tp.foldByRule(tp.folds[0]);
console.log(tp.visibleDotsCount);

// answer 753
// example answer 17
