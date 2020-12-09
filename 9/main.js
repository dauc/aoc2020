const aoc = require('./aoc')
const fs = require('fs')

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  // let day = new Day9(data)
  console.log(aoc.part1(data))
  console.log(aoc.part2(data))
})
