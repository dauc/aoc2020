const aoc = require('./aoc01')
const fs = require('fs')

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsed = aoc.parse(data)
  console.log(aoc.part1(parsed))
  console.log(aoc.part2(parsed))
})
