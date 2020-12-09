// https://adventofcode.com/2020/day/8


// Checs if `val` is valid using `range` as possible choices.
// valid means `val` is the sum of any two numbers in `range.
const isThisValid = (val, range) => {
  for (let i = 0; i < range.length; i++) {
    for (let j = i + 1; j < range.length; j++) {
      if (range[i] + range[j] === val) return true;
    }
  }
  return false
}


class Day9 {
  constructor(input, preambleLength = 25) {
    this.sequence = input.trim().split('\n')
    this.preambleLength = preambleLength
  }
}

// return the value of the first number in the sequence that isn't valid.
const part1 = (input, preambleLength = 25) => {
  let sequence = input.trim().split('\n').map(x => Number(x))
  for (let i = preambleLength; i < sequence.length; i++) {
    if (isThisValid(sequence[i], sequence.slice(i - preambleLength, i)) === false) {
      return sequence[i]
    }
  }
}

const part2 = (input, subsetSum = 258585477) => {
  let sequence = input.trim().split('\n').map(x => Number(x))
  for (let i = 0; i < sequence.length; i++) {
    let sum = 0
    for (j = i; j < sequence.length; j++) {
      sum += sequence[j]
      if (sum === subsetSum) {
        const slice = sequence.slice(i, j + 1)
        console.log(i, j, slice.length, slice, Math.min(...slice), Math.max(...slice))
        return Math.min(...slice) + Math.max(...slice)
      }
      if (sum > subsetSum) continue;
    }
  }

  return 0
}

module.exports = {
  // Day9,
  isThisValid,
  part1,
  part2,
}
