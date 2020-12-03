const aoc = require('./aoc')

const input = '..##.......\n#...#...#..\n.#....#..#.\n..#.#...#.#\n.#...##..#.\n..#.##.....\n.#.#.#....#\n.#........#\n#.##...#...\n#...##....#\n.#..#...#.#'

test('parse', () => {
  const parsed = aoc.parse(input)
  expect(parsed).toHaveLength(11)
  expect(parsed[0]).toHaveLength(11)
})

test('part1', () => {
  const parsed = aoc.parse(input)
  expect(aoc.part1(parsed)).toBe(7)
})

test('part2', () => {
  const parsed = aoc.parse(input)
  expect(aoc.part2(parsed)).toBe(336)
})
