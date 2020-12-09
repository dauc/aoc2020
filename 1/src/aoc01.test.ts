import { Day1 } from "./aoc01"

let day : Day1 = new Day1('1721\n979\n366\n299\n675\n1456')

test('part1', () => {
  expect(day.part1()).toBe(514579)
})

test('part2', () => {
  expect(day.part2()).toBe(241861950)
})
