const aoc = require('./aoc')

test('part1', () => {
  const input = `
L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`

  expect(aoc.part1(input)).toStrictEqual(37)
  expect(aoc.part2(input)).toStrictEqual(26)
})
