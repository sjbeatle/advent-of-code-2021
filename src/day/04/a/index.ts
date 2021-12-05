import {
  draws,
  boards,
} from './input';

/* Helper functions
-----------------------------------------------*/
const winners = [
  [0,1,2,3,4],
  [5,6,7,8,9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],
  [0,5,10,15,20],
  [1,6,11,16,21],
  [2,7,12,17,22],
  [3,8,13,18,23],
  [4,9,14,19,24],
];

function bingo(drawIndices: number[]): boolean {
  return winners.some(w => {
    const intersection = w.filter(i => drawIndices.includes(i));
    return intersection.length === w.length;
  });
}

const parsedBoards: (string | number)[][] = boards
  .split('\n\n')
  .map(
    b => b
      .replace(/\n/g, ' ')
      .split(' ')
      .filter(c => !!c)
      .map(c => parseInt(c, 10))
  );
const boardDrawIndices: { [key: number]: number[]} = {};

let winningDraw: number;
let winningBoard: (string | number)[];
let BINGO = false

draws.some(d => {
  parsedBoards.some((b, i) => {
    const index = b.indexOf(d);
    if (index >= 0) {
      b[index] = 'X';
      if (!boardDrawIndices[i]) {
        boardDrawIndices[i] = [index];
      } else {
        boardDrawIndices[i].push(index);
      }

      BINGO = bingo(boardDrawIndices[i]);
    }

    if (BINGO) {
      winningDraw = d;
      winningBoard = b;
    }

    return BINGO; // stops the loop if BINGO is true
  });
  return BINGO; // stops the loop if BINGO is true
});

if (!winningBoard)
  console.error('Umm.. this shouldn\'t happen');

const winningBoardSum: number = winningBoard.filter(c => typeof c === 'number').reduce((a: number, b: number) => a + b) as number;
const finalScore = winningBoardSum * winningDraw;

console.log('The final score for the winning board will be', finalScore);

// answer 44088
// example answer: 188 * 24 = 4512
