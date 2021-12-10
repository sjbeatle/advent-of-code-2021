import {
  heightMapInput,
} from './input';

class HeightMap {
  elevations: Elevation[] = [];

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
