const aoc = require('./aoc')

test('getGroupCount', () => {
  const input = 'abcx\nabcy\nabcz\n'
  expect(aoc.getGroupCount(input)).toBe(6)
})

test('part1', () => {
  const input = 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb\n'
  expect(aoc.part1(input)).toBe(11)
})

test('part2', () => {
  const input = 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb\n'
  expect(aoc.part2(input)).toBe(6)
})
