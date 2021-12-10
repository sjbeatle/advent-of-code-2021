import {
  signalAndDisplayPatterns,
} from './input';

enum Segments {
  'a' = 'a',
  'b' = 'b',
  'c' = 'c',
  'd' = 'd',
  'e' = 'e',
  'f' = 'f',
  'g' = 'g',
}

const digitMap = new Map([
  ['abcefg', 0],
  ['cf', 1],
  ['acdeg', 2],
  ['acdfg', 3],
  ['bcdf', 4],
  ['abdfg', 5],
  ['abdefg', 6],
  ['acf', 7],
  ['abcdefg', 8],
  ['abcdfg', 9],
]);

class Patterns {
  patterns: Pattern[];

  constructor(input: string) {
    this.patterns = input
      .split('\n')
      .map(p => new Pattern(p));
  }

  get displays(): number[] {
    return this.patterns.map(p => p.mappedDisplayNumber);
  }

  displaysSum() {
    return this.displays.reduce((a, b) => a + b);
  }
}

class Pattern {
  signals: string[];
  digits: string[];
  sixSegmentSignals: string[];
  fiveSegmentSignals: string[];
  signalOneSegments: string;
  signalFourSegments: string;
  signalSevenSegments: string;
  signalEightSegments: string; // never used though :/
  segmentMap: Map<string, string> = new Map();

  constructor(input: string) {
    const signalsAndDigits = input.split(' | ');
    const signals = signalsAndDigits[0].split(' ');
    const digits = signalsAndDigits[1].split(' ');
    this.signals = signals;
    this.digits = digits;
    this.fiveSegmentSignals = signals.filter(s => s.length === 5);
    this.sixSegmentSignals = signals.filter(s => s.length === 6);
    this.signalOneSegments = this.getUniqueSignalByLength(2);
    this.signalFourSegments = this.getUniqueSignalByLength(4);
    this.signalSevenSegments = this.getUniqueSignalByLength(3);
    this.signalEightSegments = this.getUniqueSignalByLength(7);

    this.generateMapping();
  }

  get mappedDisplayNumber(): number {
    return parseInt(
      this.segmentMappedDigits
        .map(digit => {
          return digitMap.get(digit);
        })
        .join(''),
      10,
    );
  }

  private get segmentMappedDigits(): string[] {
    return this.digits
      .map(segments => {
        return segments
          .split('')
          .map(segment => this.segmentMap.get(segment))
          .sort()
          .join('');
      });
  }

  private generateMapping() {
    this.segmentMap.set(this.segmentMapFor(Segments.a), Segments.a);
    this.segmentMap.set(this.segmentMapFor(Segments.b), Segments.b);
    this.segmentMap.set(this.segmentMapFor(Segments.c), Segments.c);
    this.segmentMap.set(this.segmentMapFor(Segments.d), Segments.d);
    this.segmentMap.set(this.segmentMapFor(Segments.e), Segments.e);
    this.segmentMap.set(this.segmentMapFor(Segments.f), Segments.f);
    this.segmentMap.set(this.segmentMapFor(Segments.g), Segments.g);
  };

  private getUniqueSignalByLength(len: number): string {
    return this.signals.find(s => s.length === len);
  };

  private removeChars(removeChars: string, signal: string) {
    const re = new RegExp(`[${removeChars}]`, 'g');
    return signal.replace(re, '');
  }

  private getSingleRemainingChar(remove: string, signals: string[]) {
    let char: string;

    signals.some(s => {
      const remaining = this.removeChars(remove, s);
      const hasOneLeft = remaining.length === 1;
      if (hasOneLeft)
        char = remaining;

      return hasOneLeft;
    });

    return char;
  }

  private getSegmentMapKeyByValue(value: string) {
    const entry = [...this.segmentMap].find(([_k, v]) => v === value);
    return entry && entry[0];
  }

  private segmentMapFor(segment: Segments): string {
    const mapping = this.getSegmentMapKeyByValue(segment);

    if (mapping)
      return mapping;

    const methods = {
      a: this.aSegmentMap,
      b: this.bSegmentMap,
      c: this.cSegmentMap,
      d: this.dSegmentMap,
      e: this.eSegmentMap,
      f: this.fSegmentMap,
      g: this.gSegmentMap,
    };

    return methods[segment].call(this);
  }

  private aSegmentMap(): string {
    return this.removeChars(this.signalOneSegments, this.signalSevenSegments);
  }

  private bSegmentMap(): string {
    const removeChars = this.signalOneSegments + this.segmentMapFor(Segments.a) + this.segmentMapFor(Segments.g) + this.segmentMapFor(Segments.d);
    return this.getSingleRemainingChar(removeChars, this.sixSegmentSignals);
  }

  private cSegmentMap(): string {
    return this.signalOneSegments.replace(this.segmentMapFor(Segments.f), '');
  }

  private dSegmentMap(): string {
    const removeChars = this.signalOneSegments + this.segmentMapFor(Segments.a) + this.segmentMapFor(Segments.g);
    return this.getSingleRemainingChar(removeChars, this.fiveSegmentSignals);
  }

  private eSegmentMap(): string {
    const removeChars = this.signalOneSegments + this.segmentMapFor(Segments.a) + this.segmentMapFor(Segments.g) + this.segmentMapFor(Segments.d) + this.segmentMapFor(Segments.b);
    return this.getSingleRemainingChar(removeChars, this.sixSegmentSignals);
  }

  private fSegmentMap(): string {
    const removeChars = this.segmentMapFor(Segments.a) + this.segmentMapFor(Segments.g) + this.segmentMapFor(Segments.d) + this.segmentMapFor(Segments.b) + this.segmentMapFor(Segments.e);
    return this.getSingleRemainingChar(removeChars, this.sixSegmentSignals);
  }

  private gSegmentMap(): string {
    const removeChars = this.signalFourSegments + this.signalSevenSegments;
    return this.getSingleRemainingChar(removeChars, this.sixSegmentSignals);
  }
}

const patterns = new Patterns(signalAndDisplayPatterns);

console.log(`All display values add up to ${patterns.displaysSum()}`);

// answer 975706
// example answer 61229
