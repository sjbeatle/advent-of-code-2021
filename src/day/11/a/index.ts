import {
  octoEnergyLevelSeed,
} from './input';

class OctopusesGarden {
  octos: Map<string, Octo> = new Map();

  constructor(input: string) {
    input
      .split('\n')
      .forEach(
        (r, ri) => r
          .split('')
          .forEach(
            (c, ci) =>
              this.octos.set(`${ri}:${ci}`, new Octo(parseInt(c, 10), ri, ci)),
          ),
      );
  }

  generateElevationsNeighbors(): OctopusesGarden {
    this.octos.forEach(e => this.setOctoNeighbors(e));
    return this;
  }

  findOcto(ri: number, ci: number): Octo {
    const index = `${ri}:${ci}`;
    return this.octos.get(index);
  }

  setOctoNeighbors(o: Octo) {
    o.neighbors = [
      this.findOcto(o.row - 1, o.col), // top
      this.findOcto(o.row - 1, o.col + 1), // top-right
      this.findOcto(o.row, o.col + 1), // right
      this.findOcto(o.row + 1, o.col + 1), // bottom-right
      this.findOcto(o.row + 1, o.col), // bottom
      this.findOcto(o.row + 1, o.col - 1), // bottom-left
      this.findOcto(o.row, o.col - 1), // left
      this.findOcto(o.row - 1, o.col - 1), // top-left
    ].filter(n => !!n);
  }

  walk(stepCount: number) {
    let flashCount = 0;

    for (let i = 0; i < stepCount; i++) {
      flashCount += this.step();
    }

    return flashCount;
  }

  step() {
    let flashCount = 0;

    /* First bump everyone
    -----------------------------------------------*/
    this.bumpAll();

    /* Next iterate over flashed items
    -----------------------------------------------*/
    let iterationFlashCount = 0;

    do {
      iterationFlashCount = this.iterate();
      flashCount += iterationFlashCount;
    } while (iterationFlashCount);

    /* Last reset flashed octos to zero
    -----------------------------------------------*/
    this.resetFlashing();

    return flashCount;
  }

  bumpAll() {
    this.octos.forEach(o => o.bumpEnergyLevel());
  }

  iterate(): number {
    let flashedCount = 0;

    this.octos.forEach(o => {
      if (o.isFlashing || (o.energyLevel <= o.energyLimit))
        return;

      flashedCount += 1;
      o.isFlashing = true; // you've popped!! take out of commission
      o.neighbors.forEach(n => n.bumpEnergyLevel());
    });

    return flashedCount;
  }

  resetFlashing() {
    Array.from(this.octos.values())
      .filter(o => o.isFlashing)
      .forEach(o => {
        o.isFlashing = false;
        o.energyLevel = 0;
      });
  }
}

class Octo {
  energyLimit = 9;
  energyLevel: number;
  row: number;
  col: number;
  neighbors: Octo[] = [];
  isFlashing = false;

  constructor(input: number, row: number, col: number) {
    this.energyLevel = input;
    this.row = row;
    this.col = col;
  }

  bumpEnergyLevel() {
    this.energyLevel += 1;
  }
}

const steps = 100;
console.log(`There are ${
  new OctopusesGarden(octoEnergyLevelSeed)
    .generateElevationsNeighbors()
    .walk(100)
} total flashes after ${steps} steps.`);

// answer 1700
// example answer 1656
