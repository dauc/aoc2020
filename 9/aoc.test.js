const aoc = require('./aoc')

test('isThisValid', () => {
  const range = [...Array(25).keys()]
  expect(aoc.isThisValid(26, range)).toBe(true)
})
