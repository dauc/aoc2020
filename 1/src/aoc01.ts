// https://adventofcode.com/2020/day/1

export class Day1 {
  expenses: number[];

  constructor(input: string) {
    this.expenses = input.split('\n').map(x => +x)
  }

  part1 () : number {
    const expenses = this.expenses
    for (let i = 0; i < expenses.length; i++) {
      for (let j = 0; j < i; j++) {
        if (expenses[i] + expenses[j] === 2020) {
          return expenses[i] * expenses[j]
        }
      }
    }

    return 0
  }

  part2 () : number {
    const expenses = this.expenses
    for (let i = 0; i < expenses.length; i++) {
      for (let j = 0; j < i; j++) {
        for (let k = 0; k < j; k++) {
          if (expenses[i] + expenses[j] + expenses[k] === 2020) {
            return expenses[i] * expenses[j] * expenses[k]
          }
        }
      }
    }

    return 0
  }
}
