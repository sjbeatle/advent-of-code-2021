import {
  heightMapInput,
} from './input';

class HeightMap {
  elevations: Elevation[] = [];

  constructor(input: string) {
    input
      .split('\n')
      .map(
      (r, ri) => r
          .split('')
          .map(
            (c, ci) =>
              this.elevations.push(new Elevation(parseInt(c, 10), ri, ci)),
          ),
      );

    this.getAllNeighborsForAllElevations();
  }

  private getAllNeighborsForAllElevations() {
    this.elevations.forEach(e => {
      const neighbors: Elevation[] = [];
      neighbors.push(this.getTopNeighbor(e));
      neighbors.push(this.getRightNeighbor(e));
      neighbors.push(this.getBottomNeighbor(e));
      neighbors.push(this.getLeftNeighbor(e));
      e.setNeighbors(neighbors.filter(n => !!n));
    });
  }

  getTopNeighbor(elevation: Elevation): Elevation {
    return this.getElevation(elevation.row - 1, elevation.col);
  }

  getRightNeighbor(elevation: Elevation): Elevation {
    return this.getElevation(elevation.row, elevation.col + 1);
  }

  getBottomNeighbor(elevation: Elevation): Elevation {
    return this.getElevation(elevation.row + 1, elevation.col);
  }

  getLeftNeighbor(elevation: Elevation): Elevation {
    return this.getElevation(elevation.row, elevation.col - 1);
  }

  getElevation(ri: number, ci: number): Elevation {
    return this.elevations.find(e => e.row === ri && e.col === ci);
  }

  get lowestElevations(): Elevation[] {
    return this.elevations.filter(e => e.isLowerThanAllNeighbors);
  }
}

class Elevation {
  value: number;
  row: number;
  col: number;
  neighbors: Elevation[] = [];

  constructor(input: number, row: number, col: number) {
    this.value = input;
    this.row = row;
    this.col = col;
  }

  setNeighbors(neighbors: Elevation[]) {
    this.neighbors = neighbors;
  }

  get isLowerThanAllNeighbors(): boolean {
    let isLowest = true;
    this.neighbors.some(n => {
      if (this.value >= n.value) {
        isLowest = false;
        return true;
      }
    });

    return isLowest;
  }

  get riskLevel(): number {
    return this.value + 1;
  }
}

const startTime = new Date().getTime();
const heightMap = new HeightMap(heightMapInput);
const sumOfLowPointRiskLevels = heightMap
  .lowestElevations
  .reduce((a, b) => a + b.riskLevel, 0);
const elapsedTime = new Date().getTime() - startTime;

console.log(`The sum of all Risk Levels for all Low Points is ${sumOfLowPointRiskLevels}`);
console.log(elapsedTime);
// answer 491
// wrong: 1841 (too high) need to exclude neighbors that are the same value, duh!
// example answer 15
