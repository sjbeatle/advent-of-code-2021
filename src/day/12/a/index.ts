import {
  caveMapInput,
} from './input';

enum Category {
  'BIG' = 'BIG',
  'SMALL' = 'SMALL',
}

enum Bookends {
  'START' = 'start',
  'END' = 'end',
}

function isBig(cave: string) {
  return cave === cave.toUpperCase();
}

class CaveMap {
  fromTos: Map<string, Cave[]> = new Map();
  caves: Map<string, Cave> = new Map();
  paths: string[][] = [];

  constructor(input: string) {
    input
      .split('\n')
      .forEach(p => {
        const [from, to] = p.split('-');
        const fCave = new Cave(from);
        const tCave = new Cave(to);
        this.caves.set(fCave.id, fCave);
        this.caves.set(tCave.id, tCave);
        this.addPath(fCave.id, tCave);
        this.addPath(tCave.id, fCave);
      });
  }

  generatePaths(from: Cave[] = this.cavesFromStart, breadcrumbs: string[] = ['start']) {
    from
      .filter(f => {
        const isEnd = f.id === Bookends.END;
        if (isEnd) {
          this.paths.push([...breadcrumbs, f.id]);
        }
        return !isEnd;
      })
      .forEach(f => {
        const tos = this.fromTos.get(f.id)
          .filter(t => {
            const isStart = t.id === Bookends.START;
            const isToSmall = t.category === Category.SMALL;
            const visited = breadcrumbs.includes(t.id);
            return !isStart && !(isToSmall && visited);
          });

        this.generatePaths(tos, [...breadcrumbs, f.id]);
      });
  }

  addPath(from: string, to: Cave) {
    const fromTo = this.fromTos.get(from);
    if (fromTo) {
      fromTo.push(to);
    } else {
      this.fromTos.set(from, [to]);
    }
  }

  get cavesFromStart(): Cave[] {
    return this.fromTos.get(Bookends.START);
  }
}

class Cave {
  id: string;
  category: Category;

  constructor(input: string) {
    this.id = input;
    this.category = isBig(input) ? Category.BIG : Category.SMALL;
  }
}

const caveMap = new CaveMap(caveMapInput);
caveMap.generatePaths();
console.log(`There are ${caveMap.paths.length} paths through the cave system.`);

// answer 4659
// example answers 10, 19, 226
