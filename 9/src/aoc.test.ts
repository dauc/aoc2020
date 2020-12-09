import { Day9 } from "./aoc"

const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`

const part1answer = 127
let day = new Day9(input, 5)

test('part1', () => {
  expect(day.part1()).toBe(part1answer)
})

test('part2', () => {
  expect(day.part2(part1answer)).toBe(62)
})
