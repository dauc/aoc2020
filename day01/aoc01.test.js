const aoc = require('./aoc01')

const parse_input = "1721\n979\n366\n299\n675\n1456"
const input = [
  1721,
  979,
  366,
  299,
  675,
  1456
]

test('parse', () => {
  expect(aoc.parse(parse_input)).toStrictEqual(input)
})

test('part1', () => {
  expect(aoc.part1(input)).toBe(514579)
})

test('part2', () => {
  expect(aoc.part2(input)).toBe(241861950)
})
