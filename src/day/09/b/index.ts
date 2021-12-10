import {
  heightMapInput,
} from './input';

class HeightMap {
  elevations: Elevation[] = [];
  basinSources: Elevation[];

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
    this.basinSources = this.lowestElevations;
    this.basinSources.forEach(s => this.getBasinFromElevation(s));
  }

  getBasinFromElevation(elevation: Elevation, source?: Elevation) {
    if (elevation.isInBasin || elevation.value === 9)
      return;

    const basinSource = source || elevation;

    elevation.basinSource = basinSource;
    basinSource.basin.push(elevation);

    elevation.neighbors.forEach(n => this.getBasinFromElevation(n, elevation.basinSource));

    return basinSource;
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
  basinSource: Elevation;
  basin: Elevation[] = [];

  constructor(input: number, row: number, col: number) {
    this.value = input;
    this.row = row;
    this.col = col;
  }

  setNeighbors(neighbors: Elevation[]) {
    this.neighbors = neighbors;
  }

  get isInBasin() {
    return !!this.basinSource;
  }

  get isBasinSource() {
    return this.basinSource === this;
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
const threeLargestBasinsProduct = heightMap.basinSources
  .map(s => s.basin.length)
  .sort((a, b) => a > b ? 1 : -1)
  .slice(-3)
  .reduce((a, b) => a * b);
const elapsedTime = new Date().getTime() - startTime;

console.log(`The product of the three largest basins is ${threeLargestBasinsProduct}`);
console.log(elapsedTime);

// answer 1075536
// example answer 1134
