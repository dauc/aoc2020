const aoc = require('./aoc')
const fs = require('fs')

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const parsed = aoc.parse(data)
  // console.log(parsed)
  // console.log(parsed[0].row, parsed[0].col)
  console.log(aoc.part1(parsed))
  console.log(aoc.part2(parsed))
})
