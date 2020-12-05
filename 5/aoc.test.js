const aoc = require('./aoc')

test('getRow', () => {
  expect(aoc.getRow('FBFBBFF')).toBe(44)
})

test('getCol', () => {
  expect(aoc.getCol('RLR')).toBe(5)
})

test('getSeatId', () => {
  expect(aoc.getSeatId('BFFFBBF', 'RRR')).toBe(567)
  expect(aoc.getSeatId('FFFBBBF', 'RRR')).toBe(119)
  expect(aoc.getSeatId('BBFFBBF', 'RLL')).toBe(820)
})
