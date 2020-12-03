const aoc = require('./aoc02')

test('parse', () => {
  const parsed = [{
    min: '1',
    max: '3',
    char: 'a',
    pass: 'abcde'
  }]
  expect(aoc.parse('1-3 a: abcde')).toEqual(parsed)
})

test('countChar', () => {
  expect(aoc.countChar('a', 'aaa')).toBe(3)
  expect(aoc.countChar('a', 'aaab')).toBe(3)
  expect(aoc.countChar('a', 'baaa')).toBe(3)
  expect(aoc.countChar('a', 'ababa')).toBe(3)

  // In this case, match doesn't find anything and returns null.
  expect(aoc.countChar('a', 'b')).toBe(0)
})

test('passwordIsValid', () => {
  expect(aoc.passwordIsValid(1, 3, 'a', 'abcde')).toBe(true)
  expect(aoc.passwordIsValid(1, 3, 'b', 'cdefg')).toBe(false)
  expect(aoc.passwordIsValid(2, 9, 'c', 'ccccccccc')).toBe(true)
})

test('part1', () => {
  const input = '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc\n'
  const parsed = aoc.parse(input)
  expect(aoc.part1(parsed)).toBe(2)
})

test('passwordIsValidPart2', () => {
  expect(aoc.passwordIsValidPart2(1, 3, 'a', 'abcde')).toBe(true)
  expect(aoc.passwordIsValidPart2(1, 3, 'b', 'cdefg')).toBe(false)
  expect(aoc.passwordIsValidPart2(2, 9, 'c', 'ccccccccc')).toBe(false)
})

test('part2', () => {
  const input = '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc\n'
  const parsed = aoc.parse(input)
  expect(aoc.part2(parsed)).toBe(1)
})
