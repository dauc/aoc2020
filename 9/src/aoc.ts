// https://adventofcode.com/2020/day/8

// Checks if `val` is valid using `range` as possible choices.
// valid means `val` is the sum of any two numbers in `range.
const isThisValid = (val: number, range: number[]) => {
  for (let i = 0; i < range.length; i++) {
    for (let j = i + 1; j < range.length; j++) {
      if (range[i] + range[j] === val) return true;
    }
  }
  return false
}

export class Day9 {
  sequence: number[];
  preambleLength: number;

  constructor(input: string, preambleLength = 25) {
    this.sequence = input.trim().split('\n').map(x => Number(x));
    this.preambleLength = preambleLength;
  }

  // return the value of the first number in the sequence that isn't valid.
  part1 () : number {
    for (let i = this.preambleLength; i < this.sequence.length; i++) {
      if (isThisValid(this.sequence[i], this.sequence.slice(i - this.preambleLength, i)) === false) {
        return this.sequence[i]
      }
    }

    return 0
  }

  part2 (subsetSum = 258585477) : number {
    for (let i = 0; i < this.sequence.length; i++) {
      let sum = 0
      for (let j = i; j < this.sequence.length; j++) {
        sum += this.sequence[j]
        if (sum === subsetSum) {
          const slice = this.sequence.slice(i, j + 1)
          return Math.min(...slice) + Math.max(...slice)
        }
        if (sum > subsetSum) continue;
      }
    }

    return 0
  }
}
