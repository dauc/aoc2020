import { parseData, part1, part2 } from "./aoc01"

const parseInput = '1721\n979\n366\n299\n675\n1456'
const input = [
  1721,
  979,
  366,
  299,
  675,
  1456
]

test('parse', () => {
  expect(parseData(parseInput)).toStrictEqual(input)
})

test('part1', () => {
  expect(part1(input)).toBe(514579)
})

test('part2', () => {
  expect(part2(input)).toBe(241861950)
})
