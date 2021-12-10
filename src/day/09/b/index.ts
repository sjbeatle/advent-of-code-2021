import {
  heightMapInput,
} from './input';

class HeightMap {
  elevations: Elevation[] = [];
  basins: Basin[] = [];

  constructor(input: string) {
    input
      .split('\n')
      .forEach(
        (r, ri) => r
          .split('')
          .forEach(
            (c, ci) =>
              this.elevations.push(new Elevation(parseInt(c, 10), ri, ci)),
          ),
      );

    this.generateElevationsNeighbors();
    this.generateBasins();
  }

  private generateBasins() {
    this.lowestElevations.forEach(e => this.basins.push(new Basin(e)));
  }

  private generateElevationsNeighbors() {
    this.elevations
      .forEach(e => {
        e.neighbors = [
          this.findElevationTopNeighbor(e),
          this.findElevationRightNeighbor(e),
          this.findElevationBottomNeighbor(e),
          this.findElevationLeftNeighbor(e),
        ].filter(n => !!n);
      });
  }

  private findElevation(ri: number, ci: number): Elevation {
    return this.elevations.find(e => e.row === ri && e.col === ci);
  }

  private findElevationTopNeighbor(elevation: Elevation): Elevation {
    return this.findElevation(elevation.row - 1, elevation.col);
  }

  private findElevationRightNeighbor(elevation: Elevation): Elevation {
    return this.findElevation(elevation.row, elevation.col + 1);
  }

  private findElevationBottomNeighbor(elevation: Elevation): Elevation {
    return this.findElevation(elevation.row + 1, elevation.col);
  }

  private findElevationLeftNeighbor(elevation: Elevation): Elevation {
    return this.findElevation(elevation.row, elevation.col - 1);
  }

  private get lowestElevations(): Elevation[] {
    return this.elevations.filter(e => e.isLowerThanAllNeighbors);
  }
}

class Elevation {
  value: number;
  row: number;
  col: number;

  constructor(input: number, row: number, col: number) {
    this.value = input;
    this.row = row;
    this.col = col;
  }

  private _neighbors: Elevation[] = [];
  get neighbors() {
    return this._neighbors;
  }
  set neighbors(val: Elevation[]) {
    this._neighbors = val;
  }

  private _basin: Basin;
  get basin() {
    return this._basin;
  }
  set basin(val: Basin) {
    this._basin = val;
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

  get hasBasin() {
    return !!this.basin;
  }
}

class Basin {
  source: Elevation;
  elevations: Elevation[];

  constructor(source: Elevation) {
    this.source = source;
    this.elevations = [source];

    this.generateBasinFlowElevations();
  }

  private generateBasinFlowElevations(sourceElevation?: Elevation) {
    if (
      sourceElevation
      && (sourceElevation.hasBasin || sourceElevation.value === 9)
    )
      return;

    let elevation = sourceElevation;
    if (elevation) {
      this.add(elevation);
    } else { // initial recursion
      elevation = this.source;
    }

    elevation.basin = this;
    elevation.neighbors.forEach(n => this.generateBasinFlowElevations(n));
  }

  add(elevation: Elevation) {
    this.elevations.push(elevation);
  }

  get size() {
    return this.elevations.length;
  }
}

const startTime = new Date().getTime();
const heightMap = new HeightMap(heightMapInput);
const threeLargestBasinsProduct = heightMap
  .basins
    .map(b => b.size)
    .sort((a, b) => a > b ? 1 : -1)
    .slice(-3)
    .reduce((a, b) => a * b);
const elapsedTime = new Date().getTime() - startTime;

console.log(`The product of the three largest basins is ${threeLargestBasinsProduct}`);
console.log(elapsedTime);

// answer 1075536
// example answer 1134
