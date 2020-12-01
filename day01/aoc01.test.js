const aoc01 = require('./aoc01')

const input = [
  1721,
  979,
  366,
  299,
  675,
  1456
]

test('part1', () => {
  expect(aoc01.part1(input)).toBe(514579)
})

test('part2', () => {
  expect(aoc01.part2(input)).toBe(241861950)
})
